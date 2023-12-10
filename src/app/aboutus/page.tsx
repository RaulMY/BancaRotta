const people = [
  {
    name: 'Chun Him Cheung',
    imageUrl:
      './chunhim.jpeg',
  },
  {
    name: 'Dominic Lim',
    imageUrl:
      './dominic.jpeg',
  },
  {
    name: 'Raul Merino',
    imageUrl:
      './raul.jpeg',
  },
  {
    name: 'Joe Ritter',
    imageUrl:
      './joe.jpeg',
  },
]

export default function AboutUsPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our team</h2>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
