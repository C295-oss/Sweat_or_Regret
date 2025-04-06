import { getUserStats } from '../api/userApi'
import { useEffect, useState } from 'react';
import { Link } from "react-router";
import './home.css'

export default function Home() {
  const [mainText, setMainText] = useState('Loading...');
  const [strength, setStrength] = useState(4);
  const [stamina, setStamina] = useState(4);
  const [agility, setAgility] = useState(4);
  const [wildcard, setWildcard] = useState(4);

  
  const [options, setOptions] = useState([
    'Strength Action',
    'Stamina Action',
    'Agility Action',
    'Wildcard Action'
  ]);

  const [probs, setProbs] = useState([0.0, 0.0, 0.0, 0.0]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await getUserStats(localStorage.getItem('local_username'));
        console.log("response from server front end stats:", response);
  
        setStrength(response.stats.Strength);
        setStamina(response.stats.Endurance);
        setAgility(response.stats.Agility);
        setWildcard(5);
      } catch (err) {
        console.error("Error fetching user stats:", err.message);
      }
    };
  
    fetchUserStats();
  }, []);
  

  async function fetchData() {
    const statsObj = [
      strength,
      stamina,
      agility,
      wildcard
    ]

    try {
      
      // const statsParam = encodeURIComponent(JSON.stringify(statsObj));
      // const statsParam = statsObj.values;
        
      // Make the API call
      const response = await fetch(`http://127.0.0.1:5001/getScenarioAndMoves/${statsObj}/${mainText}`);
        
      // Check response status before trying to parse JSON
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
        
      // Need to await the JSON parsing
      const json = await response.json();
        
      console.log("API response:", json);
        
      // Update state with fetched data
      if (json.scenario) setMainText(prev => prev + '\n\n\n' + json.scenario + '\n\n\n');
      if (json.moves) setOptions(json.moves);
      if (json.probability) setProbs(json.probability);
    }
    catch (err) {
      console.error("Error fetching data:", err.message);
      setMainText("Failed to load scenario. Please try again.");
    }
  }

  // The useEffect Hook allows you to perform side effects in your components.
  useEffect(() => { 
    fetchData();
    // Add dependency array to prevent infinite loop
  }, []);


  async function handleOptionClick(action, index) {
    // disableButtons();
    const success = Math.random() < probs[index];
  
    try {
      const res = await fetch(
        `http://127.0.0.1:5001/getResult/${encodeURIComponent(mainText)}/${encodeURIComponent(action)}/False/${success}`
      );
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const json = await res.json();
      console.log("Action result:", json);
      setMainText(mainText + '\n\n\n' + json.result + '\n\n\n');
    } catch (err) {
      console.error("Failed to get result:", err.message);
      setMainText("Something went wrong when processing your action.");
    }

    fetchData();
  }


  // Create a stats array for rendering
  const statsArray = [
    { id: 1, name: "Strength", value: strength, setter: setStrength },
    { id: 2, name: "Stamina", value: stamina, setter: setStamina },
    { id: 3, name: "Agility", value: agility, setter: setAgility },
    { id: 4, name: "Wildcard", value: wildcard, setter: setWildcard }
  ];

  return (
    <div className="flex w-screen h-screen p-2 bg-zinc-800">   
      {/* Stats Section */}
      <div className="w-1/2 p-4">
        <h1 className="text-white font-bold text-2xl mb-2">Sweat or Regret</h1>
        <h2 className="text-white font-bold text-4xl mb-6">Personal Stats</h2>


        <div className="grid grid-cols-3 gap-2 bg-zinc-800 p-3 rounded-lg mb-4">
          <Link to='/' className="text-violet-400 hover:text-violet-200 font-medium text-center py-2 px-4 rounded-md hover:bg-violet-900/30 transition-all duration-200">Welcome</Link>
          <Link to='/enter_stats' className="text-violet-400 hover:text-violet-200 font-medium text-center py-2 px-4 rounded-md hover:bg-violet-900/30 transition-all duration-200">Enter Stats</Link>
          <Link to='/profile' className="text-violet-400 hover:text-violet-200 font-medium text-center py-2 px-4 rounded-md hover:bg-violet-900/30 transition-all duration-200">My Profile</Link>
        </div>

        <div className="h-px bg-violet-500 w-full my-4"></div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {statsArray.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-zinc-700 border-2 border-violet-600 rounded-lg p-4 text-center transition-all duration-200 hover:bg-zinc-600 hover:-translate-y-1"
            >
              <p className="text-violet-300 text-sm font-semibold uppercase tracking-wider">
                {stat.name}
              </p>
              <h1 className="font-bold text-5xl my-1 text-white">
                {stat.value}
              </h1>
            </div>
          ))}
        </div>

        <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg mt-6 transition-all duration-200 shadow-lg">
          20 Minute jog for stamina boost!
        </button>

        <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg mt-6 transition-all duration-200 shadow-lg">
          20 push-ups for a strength boost!
        </button>

        <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg mt-6 transition-all duration-200 shadow-lg">
          10 minutes of stretches for agility boost!
        </button>
        
        <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg mt-6 transition-all duration-200 shadow-lg">
          Wildcard!
        </button>
        
      </div>

      {/* Scenario and Options Section */}
      <div className="w-1/2 p-4">
        <div className="rounded-2xl w-full h-3/4 text-white p-6 bg-zinc-900 overflow-auto text-pretty">
          <h1 className="text-xl font-bold mb-4">Scenario</h1>
          <p className="text-lg whitespace-pre-wrap">{mainText}</p>
        </div>

        {/* Options */}
        <div id="action-div" className="grid grid-cols-2 gap-3 mt-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={async () => await handleOptionClick(option, index)}
              className="bg-zinc-700 p-3 rounded-lg hover:bg-zinc-600 text-white border border-violet-600 flex flex-col items-start transition-all duration-200 hover:-translate-y-1"
            >
              <span className="font-bold">{option}</span>
              <span className="text-sm text-violet-300">
                Success chance: {Math.round(probs[index] * 100)}%
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
