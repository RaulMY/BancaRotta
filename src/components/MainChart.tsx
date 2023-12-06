'use client'
import { useEffect, useRef, useState, Fragment, type SyntheticEvent } from 'react';
import * as d3 from 'd3';
import datapoints from '../utils/final_webapp_clean.json';
import Slider from './Slider';
import RadioCards from './RadioCards';
import { FormControlLabel, Switch, Autocomplete, TextField } from '@mui/material';

interface Datapoint {
  cik: string;
  mrktCap: string;
  company_name: string;
  market_cap_category_fix: string;
  filing_date: string;
  GICS_sector: string;
  GICS_industry_group: string;
  GICS_industry: string;
  score_full_30: string;
  max_score: string;
  section_7: string;
}

const industryOptions = [
  {
    name: 'Communication Services',
    amount: 30
  },
  {
    name: 'Consumer Discretionary',
    amount: 30
  },
  {
    name: 'Consumer Staples',
    amount: 30
  },
  {
    name: 'Energy',
    amount: 30
  },
  {
    name: 'Financials',
    amount: 30
  },
  {
    name: 'Health Care',
    amount: 30
  },
  {
    name: 'Industrials',
    amount: 30
  },
  {
    name: 'Information Technology',
    amount: 30
  },
  {
    name: 'Materials',
    amount: 30
  },
  {
    name: 'Real Estate',
    amount: 30
  },
  {
    name: 'Utilities',
    amount: 30
  },
  {
    name: 'All of them',
    amount: 3000
  },
];

const sizesOptions = [
  {
    name: 'Nano Cap (<100M)',
    amount: 30
  },
  {
    name: 'Micro Cap (100-500M)',
    amount: 30
  },
  {
    name: 'Small Cap (500-5000M)',
    amount: 30
  },
  {
    name: 'Mid Cap (5000M-10000M)',
    amount: 30
  },
  {
    name: 'Large_Mega Cap (>10000M)',
    amount: 3000
  },
  {
    name: 'All of them',
    amount: 3000
  },
];

const distressWords = ['covenant', 'default', 'breach', 'violate', 'amend', 'restrictive', 'waiver', 'Chapter 11', 'Chapter 7', 'downgrade','bankruptcy'];

const filtered: Datapoint[] = datapoints.filter((datapoint) => {
  const filingDate = new Date(datapoint.filing_date);
  return filingDate.getFullYear() === 2023 && datapoint.company_name;
})

const nameOptions = filtered.map((datapoint, i) => ({ label: datapoint.company_name, id: `${i}_name` }));

const Heatmap: React.FC = () => {
  const heatmapRef = useRef<SVGSVGElement | null>(null);
  const width = 400;
  const height = 400;
  const gridSize = 55;

  const [company, setCompany] = useState<Datapoint | null>(null);
  const [industry, setIndustry] = useState<string>('All of them');
  const [size, setSize] = useState<string>('All of them');
  const [threshold, setThreshold] = useState<number>(0.3);
  const [withThreshold, toggleThreshold] = useState<boolean>(true);
  const [withMaxScore, toggleMaxScore] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const svg = d3.select(heatmapRef.current)
    .attr('width', width)
    .attr('height', height);
    const data: [number, number, number, Datapoint][] = filtered.map((datapoint, i) => {
      const { max_score, score_full_30 } = datapoint;
      const x = i % gridSize;
      const y = Math.floor(i/gridSize);
      return [x, y, Number(withMaxScore ? max_score : score_full_30), datapoint]
    });
    const colorScale = d3.scaleSequential([0, 1], ["rgb(41, 172, 0)", "rgb(234, 23, 47)"]);

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

    svg.selectAll('rect').data(data).join('rect')
      .attr('x', d => (d[0] || 0) * rectSize.width)
      .attr('y', d => (d[1] || 0) * rectSize.height)
      .attr('width', rectSize.width)
      .attr('height', rectSize.height)
      .attr('fill', d => {
        if (withThreshold) {
          return colorScale(d[2] >= threshold ? 1 : 0)
        }
        return colorScale(d[2])
      })
      .attr('fill-opacity', (d) => {
        const { GICS_sector, market_cap_category_fix, company_name } = d[3];
        const hasBeenFound = searchTerm ? company_name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1 : true;
        return (industry === 'All of them' || industry === GICS_sector) && (size === 'All of them' || size === market_cap_category_fix) && hasBeenFound ? 1 : 0.5;
      })
      .on('click', (_, d) => {
        const element = document.getElementById('companySection');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
        d3.select(this).attr('fill', colorScale(withThreshold ? (d[2] >= threshold ? 1 : 0) : d[2])); // Revert color on mouseout
      });
  }, [threshold, industry, size, withThreshold, searchTerm, withMaxScore]);

  useEffect(() => {
    if (!withThreshold) {
      const newThreshold = withMaxScore ? 0.65 : 0.3;
      setThreshold(newThreshold);
    }
  }, [withThreshold, withMaxScore]);

  const handleCompanyChange = (_: SyntheticEvent<Element, Event>, value: { label: string; id: string; } | null) => {
    const companyName = value;
    const chosenCompany = filtered.find((datapoint) => datapoint.company_name === companyName?.label);
    if (!chosenCompany) return;
    setCompany(chosenCompany);
  };

  const handleCompanyInput = (_: SyntheticEvent<Element, Event>, value: string) => {
    setSearchTerm(value);
  };

  const highlightWords = (text: string, wordsToHighlight: string[]): JSX.Element => {
    const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) => {
          if (wordsToHighlight.includes(part.toLowerCase())) {
            return <span className="bold text-red-500" key={index}>{part}</span>;
          }
          return <Fragment key={index}>{part}</Fragment>;
        })}
      </>
    );
  };

  return (
    <div className='flex items-center flex-col'>
      <div className='w-full grid gap-y-4 mt-4 md:grid-cols-2 lg:grid-cols-7 md:gap-x-4'>
        <div className='lg:order-1 lg:col-span-2'>
          <RadioCards title="Pick a sector" value={industry} options={industryOptions} onChange={(name: string) => setIndustry(name)}/>
        </div>
        <div className='flex justify-center order-first md:col-span-2 lg:order-2 lg:col-span-3'>
          <div id="heatmap" className='relative'>
            <svg ref={heatmapRef} width={400} height={400}>
              {/* SVG container for the heatmap */}
            </svg>
          </div>
        </div>
        <div className='lg:order-2 lg:col-span-2'>
          <RadioCards title="Pick a market size" value={size} options={sizesOptions} onChange={(name: string) => setSize(name)}/>
        </div>
      </div>

      <div className='mt-4'>
        <Autocomplete
          disablePortal
          id="company-name"
          options={nameOptions}
          sx={{ width: 300 }}
          onChange={handleCompanyChange}
          onInputChange={handleCompanyInput}
          renderInput={(params) => <TextField {...params} label="Company" />}
        />
      </div>
      <FormControlLabel control={<Switch
          checked={withMaxScore}
          onChange={() => toggleMaxScore(prev => !prev)}
          inputProps={{ 'aria-label': 'controlled' }}
        />} label="Use max score" />
      <div className='grid grid-cols-2 mb-2'>
        <FormControlLabel control={<Switch
          checked={withThreshold}
          onChange={() => toggleThreshold(prev => !prev)}
          inputProps={{ 'aria-label': 'controlled' }}
        />} label="Use threshold" />
        {withThreshold ? <Slider value={threshold} onChange={(event) => setThreshold(Number(event.target.value))}/> : null}
      </div>
      <div id="companySection" className='grid gap-y-4 mt-4 md:grid-cols-2 md:gap-x-4'>
        {company && (
          <>
            <div className=''>
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">{company.company_name}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{Number(withMaxScore ? company.max_score : company.score_full_30) >= threshold ? 'Identified as possible bankruptcy' : 'Not identified as possible bankruptcy'}</p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">FinBERT Score</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">{Number(withMaxScore ? company.max_score : company.score_full_30).toFixed(4)}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Market Cap</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">{company.mrktCap}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">10-K filed on</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">{company.filing_date}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">GICS Sector</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">{company.GICS_sector}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">GICS Industry Group</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">{company.GICS_industry_group}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">GICS Industry</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
                      {company.GICS_industry}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="px-4 py-6">
              <dt className="text-sm font-medium leading-6 text-gray-900">Highest Scoring Chunk</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
                {highlightWords(company.section_7, distressWords)}
              </dd>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Heatmap;

