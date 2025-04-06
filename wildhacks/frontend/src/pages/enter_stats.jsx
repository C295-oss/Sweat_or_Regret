import Button from "../components/ui/button";
import React, { useState, useEffect } from "react";
import { register } from "../api/userApi.jsx";
import { useNavigate } from "react-router-dom";

const Enter_stats = () => {

    const [sex, setSex] = useState("");
    const [mileTime, setMileTime] = useState("");
    const [plankTime, setPlankTime] = useState("");
    const [burpees, setBurpees] = useState("");
    const [pushUps, setPushUps] = useState("");
    const [sitUps, setSitUps] = useState("");
    const [squats, setSquats] = useState("");
    const [yardDash, setYardDash] = useState("");
    const [flexible, setFlexible] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (
            !sex ||
            !mileTime ||
            !plankTime ||
            !burpees ||
            !pushUps ||
            !sitUps ||
            !squats ||
            !yardDash ||
            !flexible
          ) {
            setErrorMessage("Please fill in all the fields.");
            return false;
          }
        
        setErrorMessage("");

        console.log("All data:", {
        sex, mileTime, plankTime, burpees, pushUps, sitUps, squats, yardDash, flexible
        });
        try {
          // - username: str
          // - password: str
          // - sex: char
          // - miletime: int
          // - plankTime: int
          // - burpees: int
          // - pushups: int
          // - situps: int
          // - squats: int
          // - fourtyYdDash: int
          // - flexibility: int
          
            const profile = {

            }

            const response = await register
            const response = await UserAPI.createUser({sex:sex,username:localStorage.getItem("temp_username"),password:localStorage.getItem("temp_password"),miletime:mileTime,planktime:plankTime,burpees:burpees,pushups:pushUps,situps:sitUps,squat:squats,fourtyYdDash:yardDash,flexiblity:flexible})

        } catch(error) {
            alert(error.message);
        }

        
        return true;
    };
    

    return (
        <div className="flex w-380 h-350 flex-col items-center justify-center p-2 bg-zinc-800">

          <h3 className="enter-stats-header">Enter Stats</h3>
          <br/>
          <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sex">Choose a sex:</label>
                <select
                    id="sex"
                    name="sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    required
                >
                    <option value="" disabled>Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="mileTime">What is your best mile time in minutes?</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                id="mileTime"
                name="mileTime"
                value={mileTime}
                onChange={(e) => setMileTime(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter your mile time."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="plankTime">What is your best plank time in minutes?</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                id="plankTime"
                name="plankTime"
                value={plankTime}
                onChange={(e) => setPlankTime(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter your plank time."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="burpees">What is the max amount of burpees you can do?</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                id="burpees"
                name="burpees"
                value={burpees}
                onChange={(e) => setBurpees(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter your max amount of burpees."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="pushUps">What is the max amount of push ups you can do?</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                id="pushUps"
                name="pushUps"
                value={pushUps}
                onChange={(e) => setPushUps(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter your max amount of push ups."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="sitUps">What is the max amount of sit ups you can do?</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                id="sitUps"
                name="sitUps"
                value={sitUps}
                onChange={(e) => setSitUps(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter your max amount of sit ups."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="squats">What is the max amount of squats you can do?</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                id="squats"
                name="squats"
                value={squats}
                onChange={(e) => setSquats(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter you max amount of squats."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="yardDash">What is your best 40 yard dash time in seconds?</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                id="yardDash"
                name="yardDash"
                value={yardDash}
                onChange={(e) => setYardDash(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter your best 40 yard dash time."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="flexible">How flexible are you on a scale from 1 - 10?</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                max="10"
                id="flexible"
                name="flexible"
                value={flexible}
                onChange={(e) => setFlexible(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                        e.preventDefault();
                    }
                }}
                placeholder="Enter your flexiblity."
                required
              />
            </div>
    
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    
            <br />

            <div className="button-container">
              <Button
                label="Next"
                onClick={handleSubmit}
                navigateTo="/home"
                className="submit-button"
              />
            </div>
                
          
          </form>
        </div>
      );

};

export default Enter_stats;