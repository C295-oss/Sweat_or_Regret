import sqlite3
from datalayer import DataLayerMen, DataLayerWomen

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

    print("men endurance: ", menDict.getEndurance(600, 91,  35))
    print("men strength: ", menDict.getStrength(17, 40, 40))
    print("men agility: ", menDict.getAgility(600, 10))


    character = Character()
    menPush = menDict.get_pushup_Scale(50)

    if conn:
        conn.close()
        print("Connection closed.")





