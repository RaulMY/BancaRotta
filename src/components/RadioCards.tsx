'use client'

type Option = {
  name: string;
  amount: number;
}

const RadioCards = ({ title, value, options, onChange }: { title: string; value: string; options: Option[]; onChange: (name: string) => void }) => {
  return (
    <div>
      <h3 className="mb-5 text-lg text-center font-medium text-gray-900 dark:text-white">{title}</h3>
      <ul className="grid w-full gap-3 grid-cols-2">
        {options.map(({ name, amount }, i) => (
          <li key={`${i}_name`}>
            <label
              htmlFor="hosting-small"
              onClick={() => onChange(name)}
              className={`inline-flex items-center text-center justify-center w-full p-2 text-gray-500 bg-white border ${name === value ? 'border-green-600' : 'border-gray-200'} rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700`}
            >                           
              <div className="block">
                <div className="w-full text-xs font-semibold">{name}</div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RadioCards;
