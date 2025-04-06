import math
import sqlite3
class DataLayerMen:

    def __init__(self, db_connection):
        self.db_connection = db_connection



        # dictionary for endurance
        self.mileTimeScaleDict = self.get_mileTime_Scale_dict(self.get_cursor())
        self.plankTimeScaleDict = self.get_plankTime_Scale_dict(self.get_cursor())
        self.burpeesScaleDict = self.get_burpees_Scale_dict(self.get_cursor())

        # dictinaries for strength
        self.pushupScaleDict = self.get_pushup_Scale_dict(self.get_cursor())
        self.squatScaleDict = self.get_squat_Scale_dict(self.get_cursor())
        self.situpScaleDict = self.get_situp_Scale_dict(self.get_cursor())

        # dictionaries for agility
        self.flexibilityScaleDict = self.get_flexibility_Scale_dict()

    def getEndurance(self, mileTimeNum, plankTimeNum, burpeesNum):
        mileTimeScale = self.get_mileTime_Scale(mileTimeNum)
        plankTimeScale = self.get_plankTime_Scale(plankTimeNum)
        burpeesScale = self.get_burpees_Scale(burpeesNum)

        return int(math.floor((mileTimeScale + plankTimeScale + burpeesScale) / 3))
    

    def getStrength(self, pushupNum, squatNum, situpNum):
        pushupScale = self.get_pushup_Scale(pushupNum)
        squatScale = self.get_squat_Scale(squatNum)
        situpScale = self.get_situp_Scale(situpNum)

        return int(math.floor((pushupScale + squatScale + situpScale) / 3))
    
    def getAgility(self, flexibilityNum, mileTimeNum):
        flexibilityScale = self.get_flexibility_Scale(flexibilityNum)
        mileTimeScale = self.get_mileTime_Scale(mileTimeNum)

        return int(math.floor((flexibilityScale + mileTimeScale) / 2))
            



    def get_cursor(self):
        return self.db_connection.cursor()
    

    def get_mileTime_Scale_dict(self,cursor):
        sql_mileTime = """
            SELECT * FROM menMileTimeScale;
        """
        cursor.execute(sql_mileTime)
        mile_time_scale = cursor.fetchall()
        dict_mileTime = {}
        for row in mile_time_scale:
            dict_mileTime[row[0]] = [row[1], row[2]]
        return dict_mileTime
    


    def get_plankTime_Scale_dict(self, cursor):
        sql_plankTime = """
            SELECT * FROM plankTimeScale;
        """
        cursor.execute(sql_plankTime)
        plank_time_scale = cursor.fetchall()
        dict_plankTime = {}
        for row in plank_time_scale:
            dict_plankTime[row[0]] = [row[1], row[2]]
        return dict_plankTime


    def get_burpees_Scale_dict(self, cursor):
        sql_burpees = """
            SELECT * FROM menBurpeesScale;
        """
        cursor.execute(sql_burpees)
        burpees_scale = cursor.fetchall()
        dict_burpees = {}
        for row in burpees_scale:
            dict_burpees[row[0]] = [row[1], row[2]]
        return dict_burpees




    def get_pushup_Scale_dict(self, cursor):
        sql_pushup = """
            SELECT * FROM menPushupScale;
        """
        cursor.execute(sql_pushup)
        pushup_scale = cursor.fetchall()
        dict_pushup = {}
        for row in pushup_scale:
            dict_pushup[row[0]] = [row[1], row[2]]
        return dict_pushup
    

    def get_squat_Scale_dict(self, cursor):
        sql_squat = """
            SELECT * FROM menSquatScale;
        """
        cursor.execute(sql_squat)
        squat_scale = cursor.fetchall()
        dict_squat = {}
        for row in squat_scale:
            dict_squat[row[0]] = [row[1], row[2]]
        return dict_squat
    

    def get_situp_Scale_dict(self, cursor):
        sql_situp = """
            SELECT * FROM menSitupScale;
        """
        cursor.execute(sql_situp)
        situp_scale = cursor.fetchall()
        # print("situp scale: ", situp_scale)
        dict_situp = {}
        for row in situp_scale:
            dict_situp[row[0]] = [row[1], row[2]]
        # print("passed situp scale dict: ", dict_situp)
        return dict_situp


    def get_flexibility_Scale_dict(self):
        # This is a placeholder for the flexibility scale dictionary.
        flexDict = {1:[1,1], 2:[2,2], 3:[3,3], 4:[4,4], 5:[5,5], 6:[6,6], 7:[7,7], 8:[8,8], 9:[9,9], 10:[10,10]}
        return flexDict
    



    # Endurance scaling functions
    def get_mileTime_Scale(self, data):
        for key, value in self.mileTimeScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    
    def get_plankTime_Scale(self, data):
        for key, value in self.plankTimeScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    
    def get_burpees_Scale(self, data):
        for key, value in self.burpeesScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    
    # Strength scaling functions
    def get_pushup_Scale(self, data):
        for key, value in self.pushupScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        
        return -1
    
    def get_squat_Scale(self, data):
        for key, value in self.squatScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    
    def get_situp_Scale(self, data):
        for key, value in self.situpScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
            
        return -1
    
    # Agility scaling functions
    def get_flexibility_Scale(self, data):
        for key, value in self.flexibilityScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1


class DataLayerWomen:

    def __init__(self, db_connection):
        self.db_connection = db_connection



        # # dictionary for endurance
        self.mileTimeScaleDict = self.get_mileTime_Scale_dict(self.get_cursor())
        self.plankTimeScaleDict = self.get_plankTime_Scale_dict(self.get_cursor())
        self.burpeesScaleDict = self.get_burpees_Scale_dict(self.get_cursor())

        # # dictinaries for strength
        self.pushupScaleDict = self.get_pushup_Scale_dict(self.get_cursor())
        self.squatScaleDict = self.get_squat_Scale_dict(self.get_cursor())
        self.situpScaleDict = self.get_situp_Scale_dict(self.get_cursor())

        # dictionaries for agility
        self.flexibilityScaleDict = self.get_flexibility_Scale_dict()



    def get_cursor(self):
        return self.db_connection.cursor()
    


    def getEndurance(self, mileTimeNum, plankTimeNum, burpeesNum):
        mileTimeScale = self.get_mileTime_Scale(mileTimeNum)
        plankTimeScale = self.get_plankTime_Scale(plankTimeNum)
        burpeesScale = self.get_burpees_Scale(burpeesNum)

        return int(math.floor((mileTimeScale + plankTimeScale + burpeesScale) / 3))
    

    def getStrength(self, pushupNum, squatNum, situpNum):
        pushupScale = self.get_pushup_Scale(pushupNum)
        squatScale = self.get_squat_Scale(squatNum)
        situpScale = self.get_situp_Scale(situpNum)

        return int(math.floor((pushupScale + squatScale + situpScale) / 3))
    
    def getAgility(self, flexibilityNum, mileTimeNum):
        flexibilityScale = self.get_flexibility_Scale(flexibilityNum)
        mileTimeScale = self.get_mileTime_Scale(mileTimeNum)

        return int(math.floor((flexibilityScale + mileTimeScale) / 2))
    

    def get_mileTime_Scale_dict(self, cursor):
        sql_mileTime = """
            SELECT * FROM womenMileTimeScale;
        """
        cursor.execute(sql_mileTime)
        mile_time_scale = cursor.fetchall()
        dict_mileTime = {}
        for row in mile_time_scale:
            dict_mileTime[row[0]] = [row[1], row[2]]
        return dict_mileTime
    
    def get_plankTime_Scale_dict(self, cursor):
        sql_plankTime = """
            SELECT * FROM plankTimeScale;
        """
        cursor.execute(sql_plankTime)
        plank_time_scale = cursor.fetchall()
        dict_plankTime = {}
        for row in plank_time_scale:
            dict_plankTime[row[0]] = [row[1], row[2]]
        return dict_plankTime

    def get_burpees_Scale_dict(self, cursor):
        sql_burpees = """
            SELECT * FROM womenBurpeesScale;
        """
        cursor.execute(sql_burpees)
        burpees_scale = cursor.fetchall()
        dict_burpees = {}
        for row in burpees_scale:
            dict_burpees[row[0]] = [row[1], row[2]]
        return dict_burpees




    def get_pushup_Scale_dict(self, cursor):
        sql_pushup = """
            SELECT * FROM womenPushupScale;
        """
        cursor.execute(sql_pushup)
        pushup_scale = cursor.fetchall()
        dict_pushup = {}
        for row in pushup_scale:
            dict_pushup[row[0]] = [row[1], row[2]]
        return dict_pushup
    
    def get_squat_Scale_dict(self, cursor):
        sql_squat = """
            SELECT * FROM womenSquatScale;
        """
        cursor.execute(sql_squat)
        squat_scale = cursor.fetchall()
        dict_squat = {}
        for row in squat_scale:
            dict_squat[row[0]] = [row[1], row[2]]
        return dict_squat
    
    def get_situp_Scale_dict(self, cursor):
        sql_situp = """
            SELECT * FROM womenSitupScale;
        """
        cursor.execute(sql_situp)
        situp_scale = cursor.fetchall()
        dict_situp = {}
        for row in situp_scale:
            dict_situp[row[0]] = [row[1], row[2]]
        return dict_situp

    def get_flexibility_Scale_dict(self):
        # This is a placeholder for the flexibility scale dictionary.
        flexDict = {1:[1,1], 2:[2,2], 3:[3,3], 4:[4,4], 5:[5,5], 6:[6,6], 7:[7,7], 8:[8,8], 9:[9,9], 10:[10,10]}
        return flexDict
    




    # Endurance scaling functions
    def get_mileTime_Scale(self, data):
        for key, value in self.mileTimeScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    
    def get_plankTime_Scale(self, data):
        for key, value in self.plankTimeScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    
    def get_burpees_Scale(self, data):
        for key, value in self.burpeesScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    
    # Strength scaling functions
    def get_pushup_Scale(self, data):
        for key, value in self.pushupScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    
    def get_squat_Scale(self, data):
        for key, value in self.squatScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    
    def get_situp_Scale(self, data):
        for key, value in self.situpScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    
    # Agility scaling functions
    def get_flexibility_Scale(self, data):
        for key, value in self.flexibilityScaleDict.items():
            if data >= value[0] and data <= value[1]:
                return key
        return -1
    

class UserLayer:
    def __init__(self, db_connection):
        self.db_connection = db_connection
        self.DataLayerMen = DataLayerMen(db_connection)
        self.DataLayerWomen = DataLayerWomen(db_connection)

    def get_cursor(self):
        return self.db_connection.cursor()
    
    def create_user(self, username, password, sex, miletime, plankTime, burpees,pushups, situps,  squat, fourtyYdDash, flexibility):
        sql_create_profile = """--sql
        INSERT INTO profile(username, password, sex) VALUES (?, ?, ?);
        """
        sql_create_profile_data = """--sql
        INSERT INTO stats(username, miletime, planktime, burpees, pushups, situps, squats, fourtyYdDash, flexibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        """

        if(self.user_exists(username)):
            return False


        cursor = self.get_cursor()
        cursor.execute(sql_create_profile, (username,  password, sex))

        cursor.execute(sql_create_profile_data, (username, miletime, plankTime, burpees, pushups, situps, squat, fourtyYdDash, flexibility))
        if(cursor.rowcount == 0):
            return False
        
        self.db_connection.commit()
        return True
    

    def  valid_user(self, username, password):
        sql_validate_user = """--sql
        SELECT * FROM profile WHERE username = ? AND password = ?;
        """
        cursor = self.get_cursor()
        cursor.execute(sql_validate_user, (username, password))

        user = cursor.fetchone()
        if user is None:
            return False
        
        return True
    
    def user_exists(self, username):
        sql_user_exists = """--sql
        SELECT * FROM profile WHERE username = ?;
        """
        cursor = self.get_cursor()
        cursor.execute(sql_user_exists, (username,))

        user = cursor.fetchone()
        if user is None:
            return False
        
        return True


    def get_user_profile(self,  username):
        sql_get_user_stats = """--sql
        SELECT profile.username, profile.sex, stats.miletime, stats.planktime, stats.burpees, stats.pushups, stats.situps, stats.squats, stats.fourtyYdDash, stats.flexibility FROM profile JOIN stats ON profile.username = stats.username WHERE profile.username = ?;
        """
        cursor = self.get_cursor()
        cursor.execute(sql_get_user_stats, (username,))

        user_stats = cursor.fetchone()
        if user_stats is None:
            return None
        # Extract the relevant columns from the fetched row
        user_stats  =  {"username": username, "sex":  user_stats[1], "miletime": user_stats[2], "plank": user_stats[3], "burpees": user_stats[4], "pushups": user_stats[5], "situps": user_stats[6], "squat": user_stats[7], "fourtyYdDash": user_stats[8], "flexibility": user_stats[9]}

        return user_stats
    

    def get_user_stats(self,  username):
        
        user_profile = self.get_user_profile(username)
        if user_profile is None:
            return None
        

        endurance = 0
        strength = 0
        agility = 0

        if(user_profile["sex"] == "M"):
            endurance = self.DataLayerMen.getEndurance(user_profile["miletime"], user_profile["plank"], user_profile["burpees"])
            strength = self.DataLayerMen.getStrength(user_profile["pushups"], user_profile["squat"], user_profile["situps"])
            agility = self.DataLayerMen.getAgility(user_profile["flexibility"], user_profile["miletime"])
   
        elif(user_profile["sex"] == "F"):
            endurance = self.DataLayerWomen.getEndurance(user_profile["miletime"], user_profile["plank"], user_profile["burpees"])
            strength = self.DataLayerWomen.getStrength(user_profile["pushups"], user_profile["squat"], user_profile["situps"])
            agility = self.DataLayerWomen.getAgility(user_profile["flexibility"], user_profile["miletime"])
        else:
            endurance = 0
            strength = 0
            agility = 0
       

        stats = {
            "username": username,
            "Endurance": endurance,
            "Strength": strength,
            "Agility": agility
        }

        return stats


    def update_user_stats(self, username, mileTime, plankTime, burpees, pushups, situps, squat, fourtyYdDash, flexibility):
        sql_update_user_stats = """--sql
        UPDATE stats SET miletime = ?, planktime = ?, burpees = ?, pushups = ?, situps = ?, squats = ?, fourtyYdDash = ?, flexibility = ? WHERE username = ?;
        """
        cursor = self.get_cursor()
        cursor.execute(sql_update_user_stats, (mileTime, plankTime, burpees, pushups, situps, squat, fourtyYdDash, flexibility, username))
        if(cursor.rowcount == 0):
            return False
        
        self.db_connection.commit()

        return True







