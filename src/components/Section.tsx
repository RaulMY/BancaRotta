'use server';

interface SectionProps {
  header: string;
  description: string;
  subheader: string;
  features: {
    name: string;
    description: string;
    icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>>
  }[];
  id: string;
  right?: boolean;
  imageSrc: string;
  alt: string;
}

const Section: React.FC<SectionProps> = ({ header, description, subheader, features, id, imageSrc, alt, right = true }) => {
  return (
    <div
      id={id}
      className="overflow-hidden 
        [&:nth-child(even)]:bg-emerald-200 [&:nth-child(odd)]:bg-white
        [&:nth-child(even)]:text-gray-800 [&:nth-child(odd)]:text-gray-900
        py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {right ? (
              <>
                <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">{subheader}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{header}</p>
                    <p className="mt-6 text-lg leading-8 ">
                      {description}
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
                      {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold">
                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                            {feature.name}
                          </dt>{' '}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <img
                  src={`/${imageSrc}`}
                  className="w-[24rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[32rem] md:-ml-4 lg:-ml-0"
                  width={300}
                  height={600}
                  alt={alt}
                />
              </>
            ) : (
              <>
                <img
                  src={`/${imageSrc}`}
                  className="w-[24rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[32rem] md:-ml-4 lg:-ml-0"
                  width={300}
                  height={600}
                  alt={alt}
                />
                <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">{subheader}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{header}</p>
                    <p className="mt-6 text-lg leading-8 ">
                      {description}
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
                      {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold">
                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                            {feature.name}
                          </dt>{' '}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  )
}

export default Section;
