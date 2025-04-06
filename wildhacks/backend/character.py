import math
class Character:
    def __init__(self, endurance, agility, strength):
        """
        Initializes a Character instance with endurance, agility, and strength.

        Args:
            endurance (int): The endurance value of the character.
            agility (int): The agility value of the character.
            strength (int): The strength value of the character.
        """
        self._endurance = endurance
        self._agility = agility
        self._strength = strength

    def __init__(self):
        """
        Initializes a Character instance with default values for endurance, agility, and strength.
        """
        self._endurance = 0
        self._agility = 0
        self._strength = 0

    def get_endurance(self):
        """
        Gets the endurance value of the character.

        Returns:
            int: The endurance value.
        """
        return self._endurance

    def get_agility(self):
        """
        Gets the agility value of the character.

        Returns:
            int: The agility value.
        """
        return self._agility

    def get_strength(self):
        """
        Gets the strength value of the character.

        Returns:
            int: The strength value.
        """
        return self._strength
    

    def set_endurance(self, mileTimeScale, plankTimeScale, burpeesScale):
        """
        Sets the endurance value of the character.

        Args:
            mileTimeScale (int): The mile time scale value.
            plankTimeScale (int): The plank time scale value.
            burpeesScale (int): The burpees scale value.
        """
        self._endurance = int(math.floor((mileTimeScale + plankTimeScale + burpeesScale) / 3))


    def set_strength(self, pushupScale, squatScale, situpScale):
        """
        Sets the strength value of the character.

        Args:
            pushupScale (int): The push-up scale value.
            squatScale (int): The squat scale value.
            situpScale (int): The sit-up scale value.
        """
        self._strength = int(math.floor((pushupScale + squatScale + situpScale) / 3))


    def set_agility(self, flexibilityScale, mileTimeScale):
        """
        Sets the agility value of the character.

        Args:
            flexibilityScale (int): The flexibility scale value.
            mileTimeScale (int): The mile time scale value.
        """
        self._agility = int(math.floor((flexibilityScale + mileTimeScale) / 2))