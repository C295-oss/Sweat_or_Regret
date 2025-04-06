import math
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
    






