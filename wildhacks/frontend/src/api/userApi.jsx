// import axios from "axios";

const UserAPI = {

    CreateUser: async (userData) => {
        try {
            const response = await fetch(`http://localhost:5000/api`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if(!response.ok) {
                throw error;
            }

            return await response.json();
        } catch (error) {
            console.error("Error creating the user:",error);
        }
    },
};

export default UserAPI;