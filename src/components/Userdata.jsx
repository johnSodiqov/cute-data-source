import { baseUrl1 } from "../utils/Fetch";
import Fetchdata from "../utils/Fetch"

class Userdata {
    async getuser() {
       let user = Fetchdata.get(`${baseUrl1}`) 
       .then(respons =>{
        return respons.data;
       })
       .catch(e =>{console.log(e)})

       return user;
    }

    async deluser(id) {
        let user = Fetchdata.delete(`${baseUrl1}/${id}`) 
        .then(respons =>{
         return respons.data;
        })
        .catch(e =>{console.log(e)})
 
        return user;
     }

     async postuser(add) {
        let user = Fetchdata.post(`${baseUrl1}` ,add) 
        .then(respons =>{
         return respons.data;
        })
        .catch(e =>{console.log(e)})
 
        return user;
     }
     async editUser(add,id) {
        let user = Fetchdata.put(`${baseUrl1}/${id}`,add) 
        .then(respons =>{
         return respons.data;
        })
        .catch(e =>{console.log(e)})
 
        return user;
     }
}

export default new Userdata();