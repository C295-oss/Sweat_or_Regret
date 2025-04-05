from flask import Flask 
import sqlite3 as sql
from google import genai


client = genai.Client(api_key="AIzaSyCkMunEJLQTp4-yqZ-WRwdWxUuq1TqjJmc")
# app = Flask(__name__)


def getScenario(scenario):
    response = client.models.generate_content(
        model="gemini-2.0-flash", 
        contents=f"""
            Think of yourself as a DM. Write a scenario involving {scenario}. 
            Describe the enviornment that the user is in briefly, as well as the scenario.
            Scenario should be semi-short.
            Do not describe the year, date, or enviornment. Should start by describing the enviornment briefly.
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
            "Climb the fence quickly, Crawl through the tight space, Sprint across the open field, Search for hidden clues"
        """
    )

    options = response.text.strip().split(',')
    if len(options) == 4:
        return options
    else:
        default_options = ["Use strength to force through", "Move quickly to dodge", "Carefully maintain balance", "Find a creative solution"]
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
            3. 0 is very easy, while 10 is extremely hard. 3-6 should be the average ability of a human.
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
        default_options = [6, 4, 2, 4]
        while len(options) < 4:
            options.append(default_options[len(options) - 1])
    
    return ', '.join(options[:4])


def getMoveResult(scenario, action, is_success:bool, alive:bool):
    pass



@app.route("/")
def main():
    return "<h1> Hello. This is the main file.</h1>"


@app.route("/getScenarioAndMoves/<scenario>/<stats>")
def getScenarioAndMoves(scenario="zombie apocalypse", stats=[5,5,5,5]):
    
    # get the scenario and actions
    categories = ["Strength", "Stamina/Endurance", "agility/speed", "Wildcard"]
    
    
    scenario = getScenario(scenario)
    moves = getPotentialMoves(scenario, categories)
    probability = getMoveRequirements(scenario, moves, categories)

    # Output the scenario and action -- DEBUGGING PURPOSES ONLY...
    # print(scenario.text)
    # print("\n\n\n")
    
    # for i in range(0,4):
        # print(f"{categories[i]}: {moves[i]} ({probability}%)")
    

    return {"scenario":scenario, "moves":moves, "probability": probability}
