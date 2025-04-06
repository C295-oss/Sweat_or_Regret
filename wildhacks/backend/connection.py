import sqlite3
from datalayer import DataLayerMen, DataLayerWomen, UserLayer

from character import Character

def get_connection(db_name="sweatorregret.db"):
    """
    Establishes a connection to the SQLite database.

    Args:
        db_name (str): The name of the database file.

    Returns:
        sqlite3.Connection: A connection object to the SQLite database.
    """
    try:
        connection = sqlite3.connect(db_name)
        print(f"Connected to the database: {db_name}")
        return connection
    except sqlite3.Error as e:
        print(f"Error connecting to database: {e}")
        return None

# Example usage
if __name__ == "__main__":
    conn = get_connection()
    menDict = DataLayerMen(conn)
    womenDict = DataLayerWomen(conn)

    # print("men endurance: ", menDict.getEndurance(600, 91,  35))
    # print("men strength: ", menDict.getStrength(17, 40, 40))
    # print("men agility: ", menDict.getAgility(600, 10))

    user = UserLayer(conn)
    created  =  user.create_user("testuser", "password123", "M", 600, 90, 30, 20, 25, 15, 40, 5)
    print("User created:", created)
    user_stats = user.get_user_stats("testuser")
    print(user_stats)
    user.update_user_stats("testuser", 300, 95, 35, 25, 30, 20, 45, 6)
    user_stats = user.get_user_stats("testuser")
    print(user_stats)
    



    # character = Character()
    # menPush = menDict.get_pushup_Scale(50)

    if conn:
        conn.close()
        print("Connection closed.")





