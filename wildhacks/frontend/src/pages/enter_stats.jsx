import Button from "../components/ui/button";
import React, { useState } from "react";

export default function Enter_stats() {

    // return (
    // <div className="flex min-h-screen flex-col items-center justify-center p-4">
    //     <h1 className="text-4xl font-bold tracking-tight">Enter Stats</h1>

        
    //     <Button></Button>
    // </div>
    // );

    //const [userName, setUserName] = useState("");
    const [mileTime, setMileTime] = useState("");
    const [plankTime, setPlankTime] = useState("");
    const [burpees, setBurpees] = useState("");
    const [pushUps, setPushUps] = useState("");
    const [sitUps, setSitUps] = useState("");
    const [squats, setSquats] = useState("");
    const [yardDash, setYardDash] = useState("");
    const [flexible, setFlexible] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    

    const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if passwords match
    // if (passWord !== confirmPassword) {
    //     setErrorMessage("Passwords do not match!");
    //     return;
    // }

    // // Proceed with form submission (here we just log the values)
    // console.log("Form submitted:", { userName, passWord });
    setErrorMessage(""); // Clear error message if validation passes
    };
    

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-bold tracking-tight">Enter Stats</h1>
    
          <form onSubmit={handleSubmit}>
            {/* <div className="input-container">
              <label htmlFor="userName">Username:</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div> */}
    
            <div className="input-container">
              <label htmlFor="mileTime">What is your best mile time?</label>
              <input
                type="number"
                min="1"
                id="mileTime"
                name="mileTime"
                value={mileTime}
                onChange={(e) => setMileTime(e.target.value)}
                placeholder="Enter your mile time."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="plankTime">What is your best plank time?</label>
              <input
                type="number"
                min="1"
                id="plankTime"
                name="plankTime"
                value={plankTime}
                onChange={(e) => setPlankTime(e.target.value)}
                placeholder="Enter your plank time."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="burpees">What is the max amount of burpees you can do?</label>
              <input
                type="number"
                min="1"
                id="burpees"
                name="burpees"
                value={burpees}
                onChange={(e) => setBurpees(e.target.value)}
                placeholder="Enter your max amount of burpees."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="pushUps">What is the max amount of push ups you can do?</label>
              <input
                type="number"
                min="1"
                id="pushUps"
                name="pushUps"
                value={pushUps}
                onChange={(e) => setPushUps(e.target.value)}
                placeholder="Enter your max amount of push ups."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="sitUps">What is the max amount of sit ups you can do?</label>
              <input
                type="number"
                min="1"
                id="sitUps"
                name="sitUps"
                value={sitUps}
                onChange={(e) => setSitUps(e.target.value)}
                placeholder="Enter your max amount of sit ups."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="squats">What is the max amount of squats you can do?</label>
              <input
                type="number"
                min="1"
                id="squats"
                name="squats"
                value={squats}
                onChange={(e) => setSquats(e.target.value)}
                placeholder="Enter you max amount of squats."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="yardDash">What is your best 40 yard dash time?</label>
              <input
                type="number"
                min="1"
                id="yardDash"
                name="yardDash"
                value={yardDash}
                onChange={(e) => setYardDash(e.target.value)}
                placeholder="Enter your best 40 yard dash time."
                required
              />
            </div>
            <br/>
            <div className="input-container">
              <label htmlFor="flexible">How flexible are you on a scale from 1 - 10?</label>
              <input
                type="number"
                min="1"
                max="10"
                id="flexible"
                name="flexible"
                value={flexible}
                onChange={(e) => setFlexible(e.target.value)}
                placeholder="Enter your flexiblity."
                required
              />
            </div>
    
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    
            <br />
    
            <input type="submit" value="Submit" />
          </form>
        </div>
      );

};