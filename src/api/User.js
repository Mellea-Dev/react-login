import axios from "axios"

export default {
    //Api end-point for createing users
    create(postData, token) {
        return axios({
                method: 'POST',
                url: process.env.REACT_APP_BASE_URL + '/admin-register',
                data: postData,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + token,

                }
            })
           
    },

    getAll(token) {
        return axios({
                method: 'GET',
                url: process.env.REACT_APP_BASE_URL + '/admin-list',
                headers: {
                    "Authorization": 'Bearer ' + token,
                }
            })
            
    }
}