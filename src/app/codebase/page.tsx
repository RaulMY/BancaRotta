import { SparklesIcon, ArrowDownCircleIcon, FingerPrintIcon, FunnelIcon, BookmarkSquareIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'EDGAR Data Wrangling',
    description:
      'Download, process, and wrangle the EDGAR data from Huggingface',
    icon: ArrowDownCircleIcon,
  },
  {
    name: 'Label Creation and Matching',
    description:
      'Before doing any EDA or Modelling we need to match the 10-Ks from EDGAR to bankruptcy filings in the following year',
    icon: BookmarkSquareIcon,
  },
  {
    name: 'Fine-tuning',
    description:
      'The bulk of our predictions come from a fine-tuned BERT model pre-trained on financial documents (finBERT, Yang 2020)',
    icon: FunnelIcon,
  },
  {
    name: 'Metrics and Evaluation',
    description:
      'We evaluated our results on a few different metrics, across different thresholds, ratios and evaluation methods',
    icon: SparklesIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center flex flex-col justify-center items-center">
          <img 
            src="/github.png"
            alt="github"
            width={300}
          />
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Codebase</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Repository link pending
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
