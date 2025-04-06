import { useState } from 'react';

export default function Home() {
  const [mainText, setMainText] = useState('Welcome to the dashboard!');
  
  const options = [
    { id: 1, text: 'Option 1 Details' },
    { id: 2, text: 'Option 2 Details' },
    { id: 3, text: 'Option 3 Details' },
    { id: 4, text: 'Option 4 Details' },
    { id: 5, text: 'Option 5 Details' },
    { id: 6, text: 'Option 6 Details' }
  ];

  const [strength, setStrength] = useState(5);
  const [stamina, setStamina] = useState(5);
  const [agility, setAgility] = useState(5);

  const stats = [
    {id: 1, text: "Strength", value: strength},
    {id: 2, text: "Stamina", value: stamina},
    {id: 3, text: "Agility", value: agility},
  ];


  const handleOptionClick = (text) => {
    setMainText(text);
  };

  return (
    <div className="flex w-screen h-screen p-2 bg-zinc-800">   
      <div className="grid grid-cols-2 gap-4 w-1/2">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className="text-7xl bg-zinc-700 border-2 border-violet-600 rounded-lg p-4 text-center transition-all duration-200 hover:bg-zinc-600 hover:-translate-y-1"
          >
            <p className="text-violet-300 text-sm font-semibold uppercase tracking-wider">
              {stat.text}
            </p>
            <h1 className="font-bold text-9xl my-1 text-white">
              {stat.value}
            </h1>
          </div>
        ))}

        <div className="grid grid-rows-2 gap-4 text-white font-bold">
          <button>
            Don't forget to touch grass!!!
          </button>

          <button>
            test
          </button>
        </div>

      </div>
      
      {/* Stats */}
      {/* <div className="w-1/2">
          
        <h1 className="text-white font-bold">Sweat or Regret</h1>

        <h2 className="text-white font-bold text-4xl">Personal Stats</h2>

        <div className="text-3xl font-bold ml-10 text-left text-white border-l-4 pl-2 border-violet-600">
          <p>Strength: {strength}</p>
          <p>Stamina/Endurance: {stamina}</p>
          <p>Agility/Speed: {agility}</p>
        </div>

      </div> */}

      <div className="w-3/5 p-4">
        <div className="rounded-2xl w-full h-3/4 text-white p-4 bg-zinc-900 ">
          <h1>{mainText}</h1>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.text)}
              className="bg-white p-2 rounded-lg hover:bg-gray-100 text-white"
            >
              Option {option.id}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}