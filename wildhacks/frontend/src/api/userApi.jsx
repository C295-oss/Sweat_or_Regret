// import axios from 'axios';
import { BASE_URL } from '../global/const';
const UserAPI = {

    // CreateUser: async (userData) => {
    //     try {
    //         const response = await axios.post(`http://localhost:5000/api/createUser`, userData, {
    //             headers: {
    //                 "content-Type": "application/json",
    //             },
    //             body: JSON.stringify(userData),
    //         });

    //         if(!response.ok) {
    //             throw error;
    //         }

    //         return await response.json();
    //     } catch (error) {
    //         console.error("Error creating the user:",error);
    //     }
    // },
};

export default UserAPI;





  /**
 * This function is get the visible listings available
 *
 * @param token - The unique token user will have to confirm identiy
 * @returns the response body from the server
 */
  export async function login(Username, Password){

    const bodySent = {
      username: Username,
      password: Password,
    };
    // console.log("Token being sent:", Token);
  
    // send put request
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodySent), // send the token in the request body
    });
  
    // console.log("api response:", response);
    
  
    // if (!response.ok) {
    //   throw new Error('Profile update failed');
    // }
  
    const data = await response.json(); 
    data.status = Number(response.status);
    console.log("response user: ", data);
  
    console.log("response message: ",data.message); 
  
    return data;
  }