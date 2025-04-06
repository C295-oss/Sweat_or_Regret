from flask import Flask, request, jsonify
from google import genai
from datalayer import  UserLayer


client = genai.Client(api_key="AIzaSyDmuCdB-kdSp3zjJXy5kK-AwORJ3FKa9xg")
app = Flask(__name__)

userConnection = UserLayer() 

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

def getScenario(scenario, prev):
    response = client.models.generate_content(
        model="gemini-2.0-flash", 
        contents=f"""
            Think of yourself as a DM. Write a scenario based on {scenario}. 
            The scenario should follow along with what has already happened: {prev}.
            If nothing is provided regarding what has previously happened, then start a new scenario.
            Describe the environment that the user is in briefly, as well as the scenario.
            Scenario should be semi-short.
            Do not describe the year, date, or environment. Should start by describing the environment briefly.
            Do not add any other text unless it pertains to the scenario. Ex "Ok, here's your prompt:"
            Provide 4 options the user could take.
        """
    )

    return response


def getPotentialMoves(scenario, categories):
    response = client.models.generate_content(
        model="gemini-2.0-flash", 
        contents=f"""
            Given this scenario: {scenario}, you must provide EXACTLY 4 distinct options the user could take.
            
            Important rules:
            1. You MUST provide exactly 4 options - no more, no less.
            2. Format your response as four short statements separated by commas ONLY.
            3. Each option must correspond to one of these categories: {categories}
            4. Each option should be a concise physical action the player will perform.
            5. Do not include any explanations, introductions, or additional text.
            
            Example format:
            "Climb the fence quickly,Crawl through the tight space,Sprint across the open field,Search for hidden clues"
        """
    )

    options = response.text.strip().split(',')
    if len(options) == 4:
        return options
    else:
        default_options = ["Use strength to force through", 
                           "Move quickly to dodge", 
                           "Carefully maintain balance", 
                           "Find a creative solution"]
        while len(options) < 4:
            options.append(default_options[len(options) - 1])
    
    return ', '.join(options[:4])


def getMoveRequirements(scenario, moves, categories):
    response = client.models.generate_content(
        model="gemini-2.0-flash", 
        contents=f"""
            Given this scenario: {scenario}, and these potential moves: {moves}.
            
            Assign a difficulty rating between 1-10 for the average human to acheive it.

            Important rules:
            1. You MUST provide exactly 4 options - no more, no less.
            2. Format your response as four integers separated by commas ONLY.
            3. 0 is very easy, while 10 is extremely hard. 6 should be the average ability of a human.
            4. Do not include any explanations, introductions, or additional text.
            
            Example format:
            "2,6,4,5"
        """
    )

    options = response.text.strip().split(',')
    options_int = [int(x) for x in options]

    if len(options) == 4:
        return options_int
    else:
        default_options = [6, 4, 2, 3]
        while len(options) < 4:
            options.append(default_options[len(options) - 1])
    
    return ', '.join(options[:4])


def getMoveResult(scenario, action, player_death:bool, is_success:bool):
    response = client.models.generate_content(
        model="gemini-2.0-flash", 
        contents=f"""
            Given this scenario: {scenario}, and the player's action: {action}.
    
            Generate the outcome of this action with these parameters:
            - Player death: {player_death}
            - Action success: {is_success}
            
            Requirements:
            1. Return ONLY the narrative outcome as a single paragraph.
            2. No introductions, explanations, or meta-commentary.
            3. Be vivid and specific to the scenario and action taken.
        """
    )
    return response


def getProbabilities(stats, requirements):
    probs = []
    for i in range(0,3):
        if stats[i] >= requirements[i]:
            probs.append(1.0)
        else:
            probs.append(stats[i]/requirements[i])

    return probs


@app.route("/")
def main():
    return "<h1> Hello. This is the main file.</h1>"


# Example function call: http://127.0.0.1:5001/getScenarioAndMoves/[4,5,2,3]
@app.route("/getScenarioAndMoves/<stats>/<prev>")
def getScenarioAndMoves(stats, prev):
    stats = [float(s) for s in stats if s.isdigit()]

    # get the scenario and actions
    categories = ["Strength", "Stamina/Endurance", "Agility/Speed", "Wildcard"]
    
    scenario = getScenario("Zombie Apocolypse", prev)
    moves = getPotentialMoves(scenario.text, categories)
    requirement = getMoveRequirements(scenario.text, moves, categories)
    probability = getProbabilities(stats, requirement)

    # Switched to json. Originally a dictionary
    return {"scenario":scenario.text, "moves":moves, "probability": probability};


@app.route("/getResult/<scenario>/<action>/<death>/<success>")
def getActionResult(scenario, action, death, success):
    result = getMoveResult(scenario, action, death, success)

    return {"result": result.text}


"""
Parameters:
- username: str
- password: str
- sex: char
- miletime: int
- plankTime: int
- burpees: int
- pushups: int
- situps: int
- squats: int
- fourtyYdDash: int
- flexibility: int

endPoint: "/createUser

"""

@app.route("/createUser", methods=["POST"])
def createUser():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    try:
        response = userConnection.create_user(data["username"], data["password"], data["sex"], data["miletime"], data["plankTime"], data["burpees"], data["pushups"], data["situps"], data["squats"], data["fourtyYdDash"], data["flexibility"])
    except Exception as e:
        print("Error creating user:", e)
        return jsonify({"status": "500", "message": "Internal server error."}), 500

    print("response:", response)

    if response:
        data = {"status": "200", "message": "User created successfully."}
        print("data", data)
        return jsonify(data), 200
    else:
        data = {"status": "400", "message": "User creation failed ."}
        print("data", data)
        return jsonify(data), 400








"""
Parameters:
- username: str

endPoint: "/getUserStats

"""
@app.route("/getUserStats", methods=["POST"])
def getUserStats():
    print("Start of get user stats")
    data = request.get_json()
    if not data:
        return jsonify({"status": "400",}), 400
    # username = data["username"]
    # if not username:
    #     return jsonify({"status": "400", "message": "Not username."}), 400
    
    response = userConnection.get_user_stats(data["username"])

    if response is None:
        return jsonify({"status": "400", "message": "User not found."}), 400
    

    if response:
        data = {"status": "200", "message": "User stats retrieved successfully.", "stats": response}
        return jsonify(data), 200
    else:
        data = {"status": "400", "message": "User not found."}
        return jsonify(data), 400
    

"""
Parameters:
- username: str

endPoint: "/userExists

"""
@app.route("/userExists", methods=["POST"])
def getUser():
    data = request.get_json()
    
    if not data:
        return jsonify({"status": "400",}), 400
    
    username = data["username"]

    print("username:", username)
    response = userConnection.user_exists(data["username"])

    if response is None:
        return jsonify({"status": "400", "message": "User not found."}), 400
    

    if response:
        data = {"status": "200", "message": "Username exists", "exists": True}
        return jsonify(data), 200
    else: 
        data = {"status": "400", "message": "User not found.", "exists": False}
        return jsonify(data), 400
    

"""
Parameters:
- username: str

endPoint: "/getUserProfile

"""
@app.route("/getUserProfile", methods=["GET"])
def getUserProfile():
    username = request.get_json("username")
    if not username:
        return jsonify({"status": "400", "message": "username not found", "test": username}), 400
    
    response = userConnection.get_user_profile(username)

    if response is None:
        return jsonify({"status": "400", "message": "User not found."}), 400
    

    if response:
        data = {"status": "200", "message": "User profile retrieved successfully.", "profile": response}
        print(data)
        return jsonify(data), 200
    else:
        data = {"status": "400", "message": "User not found.", "data": None}
        return jsonify(data), 400
    



"""
Parameters:
- username: str
- miletime: int
- plankTime: int
- burpees: int
- pushups: int
- situps: int
- squats: int
- fourtyYdDash: int
- flexibility: int

endPoint: "/updateUserProfile

"""
@app.route("/updateUserProfile", methods=["POST"])
def updateUserStats():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    response = userConnection.update_user_stats(data["username"], data["miletime"], data["plankTime"], data["burpees"], data["pushups"], data["situps"], data["squats"], data["fourtyYdDash"], data["flexibility"])

    stats = userConnection.get_user_stats(data["username"])
    profile = userConnection.get_user_profile(data["username"])
    

    if response:
        data = {"status": "200", "message": "User stats updated successfully.","profile": profile,  "stats": stats}
        return jsonify(data), 200
    else:
        data = {"status": "400", "message": "User stats update failed."}
        return jsonify(data), 400
    


"""
Parameters:
- username: str
- password: str

endPoint: "/login
"""
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    print("data at begin:", data)
    response = userConnection.valid_user(data["username"], data["password"])

    profile = userConnection.get_user_profile(data["username"])
    stats = userConnection.get_user_stats(data["username"])
    print("response on server for verify:", response)
    if response:
        data = {"status": "200", "message": "User logged in successfully.", "profile": profile, "stats": stats}
        print("data: ", data)
        print("response: ", response)
        return jsonify(data), 200
    else:
        data = {"status": "400", "message": "User login failed."}
        print("data: ", data)
        print("response: ", response)
        return jsonify(data), 400

    




if __name__ == "__main__":
    app.run(port=5001, debug=True)
