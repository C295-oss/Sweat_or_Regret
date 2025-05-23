import Button from "../components/ui/button";
import React, { useState, useEffect } from "react";
import { register, userExists, updateUserProfile } from "../api/userApi.jsx";
import { useNavigate } from "react-router-dom";
import "./enter_stats.css";

const Enter_stats = () => {
    const navigate = useNavigate();

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



    useEffect(() => {
        const fetchUser = async () => {
            const username = localStorage.getItem("local_username");
            const password = localStorage.getItem("local_password");
            if (!username || !password) {
                navigate("/login");
                return;
            }
            const userHere = await userExists(username);
            console.log("use effect username:", userHere);

        if(userHere.status == 200) {
          const profile = JSON.parse(localStorage.getItem("profile"));
          console.log("profile:", profile);
          setSex(profile.sex);
          setMileTime(profile.miletime);
          setPlankTime(profile.plank);
          setBurpees(profile.burpees);
          setPushUps(profile.pushups);
          setSitUps(profile.situps);
          setSquats(profile.squat);
          setYardDash(profile.fourtyYdDash);
          setFlexible(profile.flexibility);
          console.log("user exists pass:", userHere);
        } else {
            // User does not exist, redirect to login page  
            // console.log("user exists fail:", userHere);
            alert("User does not exist. Please register first.");
            localStorage.removeItem("local_username");
            localStorage.removeItem("local_password");
            localStorage.removeItem("profile");
            localStorage.removeItem("stats");
            localStorage.removeItem("verify");
            setErrorMessage("User does not exist. Please register first.");
            setSex("");
            setMileTime("");
            setPlankTime("");
            setBurpees("");
            setPushUps("");
            setSitUps("");
            setSquats("");
            setYardDash("");
            setFlexible("");
            setErrorMessage("");
            navigate("/login");
            return;

        }




        }
        fetchUser();
    }, []);

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

        // console.log("All data:", {
        // sex, mileTime, plankTime, burpees, pushUps, sitUps, squats, yardDash, flexible
        // });

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
              username: localStorage.getItem("temp_username"),
              password: localStorage.getItem("temp_password"),
              sex: sex[0],
              miletime: mileTime,
              plankTime: plankTime,
              burpees: burpees,
              pushups: pushUps,
              situps: sitUps,
              squats: squats,
              fourtyYdDash: yardDash,
              flexibility: flexible
            }

            if(!profile.username || !profile.password) {
                alert("Please register first.");
                return;
            }
            const response = await userExists(profile.username);
            // if urer already exists
            if(response.status == 200) {
              const profile = {
                username: localStorage.getItem("temp_username"),
                miletime: mileTime,
                plankTime: plankTime,
                burpees: burpees,
                pushups: pushUps,
                situps: sitUps,
                squats: squats,
                fourtyYdDash: yardDash,
                flexibility: flexible
              }
              const response = await updateUserProfile(profile);
              if(response.status != 200) {
                console.log("Response:", response.message);
                throw new Error("Failed to update user profile.");
              }
              else{
                const profile = response.profile;
                console.log("profile after update:", profile);
                  const newProfile = {
                    mileTime: profile.miletime,
                    plankTime: profile.plankTime,
                    burpees: profile.burpees,
                    pushUps: profile.pushups,
                    sitUps: profile.situps,
                    squats: profile.squats,
                    yardDash: profile.fourtyYdDash,
                    flexibility: profile.flexibility,
                  }

                localStorage.setItem("profile", JSON.stringify(newProfile));
                console.log("User profile updated successfully.");
                console.log("Response:", response.message);
                navigate("/home")
              }

            }
            // if user does not exist
            else{
              const response = await register(profile)
              if(localStorage.getItem("local_username") && localStorage.getItem("local_password")) {
            
                console.log("Response:", response);
                if(response.status != 200) {
                  console.log("Response:", response.message);
                  throw new Error("Failed to register user.");
    
                }
                else{
                  console.log("User registered successfully.");console.log("Response:", response.message);
                  navigate("/login")
                }
              }
            }
          } catch{
            console.error("Error:", error);
            setErrorMessage("An error occurred. Please try again.");
            alert(error.message);
          }  
        return true;
    };


    


    
    

    return (
        <div className="flex w-380 h-350 flex-col items-center justify-center p-2 bg-zinc-800">

          <h1 className="enter-stats-header">Enter Stats</h1>
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
                    <option value="M">Male</option>
                    <option value="F">Female</option>
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
              label="Submit"
              onClick={handleSubmit}
              className="submit-button"
            />
          </div>
          </form>
        </div>
      );
    }

export default Enter_stats;