import axios from "axios"

export default {
    //Api end-point for createing users
    create(postData, token) {
        return axios({
                method: 'POST',
                url: process.env.REACT_APP_BASE_URL + '/employees',
                data: postData,
                headers: {
                    "Content-Type": "multipart/form-data",
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
            
    },

    login(email,password){
       return axios({
            method: 'POST',
            url: process.env.REACT_APP_BASE_URL + '/login',
            data: {
                email: email,
                password: password
            },
            headers: {
                "Content-Type": "multipart/form-data"
            }
      })
    }
}