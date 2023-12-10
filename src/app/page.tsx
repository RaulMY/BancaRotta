import Hero from '../components/Hero';
import Section from '../components/Section';
import { ScaleIcon, Square3Stack3DIcon, ClipboardDocumentCheckIcon} from '@heroicons/react/20/solid'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Section
        header="Bankruptcy Prediction in 2023"
        subheader="Basis for NLP Models"
        description='SEC EDGAR: Electronic Data Gathering, Analysis, and Retrieval system'
        features={[
          {
            name: 'Item 3',
            description: 'Legal Proceedings',
            icon: ClipboardDocumentCheckIcon,
          },
          {
            name: 'Item 7',
            description:
              'Management Discussion & Analysis',
            icon: Square3Stack3DIcon,
          },
          {
            name: 'Item 7A',
            description: 'Quantitative and Qualitative Disclosures About Market Risk',
            icon: ScaleIcon,
          },
        ]}
        id="10K"
        imageSrc={'10-k.png'}
        alt='10K'
      />
      <Section
        header="EDGAR Corpus in 2023"
        subheader="Dataset"
        description='Edgar Corpus Dataset consists of 241,000 filings'
        features={[
          {
            name: 'Item 7 - Total',
            description: '~1.8 billion tokens',
            icon: ClipboardDocumentCheckIcon,
          },
          {
            name: 'Item 7 - Average',
            description:
              '~9 thousand token length',
            icon: Square3Stack3DIcon,
          },
        ]}
        id="EDGAR"
        imageSrc={'edgar.png'}
        alt='edgar'
        right={false}
      />
    </div>
  );
}
