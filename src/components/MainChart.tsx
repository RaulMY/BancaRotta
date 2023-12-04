'use client'
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import datapoints from '../utils/test_data_webapp.json';
import { Container } from '@mui/material';

const MAX_ROW = 20;

interface Datapoint {
  cik: string;
  mrktCap: string;
  company_name: string;
  market_cap_category_fix: string;
  date: string;
  GICS_sector: string;
  GICS_industry_group: string;
  GICS_industry: string;
  score: string;
}

const INDUSTRIES = [
  'Communication Services', 'Consumer Discretionary', 'Consumer Staples', 'Energy',
  'Financials', 'Health Care', 'Industrials', 'Information Technology',
  'Materials', 'Real Estate', 'Utilities'
];

const CATEGORIES = ['Nano Cap (<100M)', 'Micro Cap (100-500M)', 'Small Cap (500-5000M)', 'Mid Cap (5000M-10000M)', 'Large_Mega Cap (>10000M)'];

const Heatmap: React.FC = () => {
  const heatmapRef = useRef<SVGSVGElement | null>(null);
  const width = 400;
  const height = 400;
  const gridSize = 100;

  const [company, setCompany] = useState<Datapoint | null>(null);

  useEffect(() => {
    const svg = d3.select(heatmapRef.current)
      .attr('width', width)
      .attr('height', height);
    let maxY = 0;
    let maxX = 0
    let extraY = 0;
    let prevCategory = '';
    let prevIndustry = '';
    const data: [number, number, number, Datapoint][] = datapoints.map((datapoint, i) => {
      const { score, market_cap_category_fix, GICS_sector } = datapoint;
      if (prevCategory !== market_cap_category_fix) {
        maxX = i;
        prevCategory = market_cap_category_fix
      }
      if (prevIndustry !== GICS_sector) {
        extraY = maxY;
        prevIndustry = GICS_sector
      }
      const indexCategory = CATEGORIES.indexOf(market_cap_category_fix) || 0;
      const x = (i - maxX) % MAX_ROW + indexCategory * MAX_ROW;
      const y = Math.floor((i - maxX)/MAX_ROW) + extraY;
      maxY = Math.max(maxY, y);
      return [x, y, Number(score), datapoint]
    });
    const colorScale = d3.scaleSequential(d3.interpolateViridis)
      .domain([0, d3.max(data, d => d[2]) as number]);

    const rectSize = {
      width: width / gridSize,
      height: height / gridSize
    };

    // Create a tooltip
    const tooltip = d3.select('#heatmap')
      .append('div')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.7)')
      .style('color', '#fff')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('visibility', 'hidden');

    svg.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('x', d => (d[0] || 0) * rectSize.width)
      .attr('y', d => (d[1] || 0) * rectSize.height)
      .attr('width', rectSize.width)
      .attr('height', rectSize.height)
      .attr('fill', d => colorScale(d[2] || 0))
      .on('click', (_, d) => {
        setCompany(d[3]);
      })
      .on('mouseover', function (event, d) {
        const [x, y] = d3.pointer(event);
        tooltip.style('visibility', 'visible')
          .html(`${d[3].company_name}`) // Set tooltip content
          .style('left', `${x}px`)
          .style('top', `${y}px`);
        d3.select(this).attr('fill', 'orange'); // Change color on hover
      })
      .on('mouseout', function (_, d) {
        tooltip.style('visibility', 'hidden');
        d3.select(this).attr('fill', colorScale(d[2] || 0)); // Revert color on mouseout
      });
  }, []);

  return (
    <div className='flex items-center flex-col'>
      <div id="heatmap" className='relative'>
        <svg ref={heatmapRef} width={300} height={300}>
          {/* SVG container for the heatmap */}
        </svg>
      </div>
      {company && (
        <div>
          <h2>{company.company_name}</h2>
          <p>Current Market Cap in millions (USD): {company.mrktCap} ({company.market_cap_category_fix})</p>
          <p>This prediction was made with a 10-K filed on {company.date}</p>
          <p>GICS Sector: {company.GICS_sector}</p>
          <p>GICS Industry Group: {company.GICS_industry_group}</p>
          <p>GICS Industry: {company.GICS_industry}</p>
          <p>Score: {company.score}</p>
        </div>
      )}
    </div>
  );
};

export default Heatmap;

