import axios from "axios";

class UserService{
    addUser(Object, profileImage) {
        return axios.post("http://localhost:8080/add", Object, {
            params: {
                profileImage: profileImage
            }
        });
    }
    

    getAllUsers(){
        return axios.get("http://localhost:8080")
    }

    deleteEmployee(id){
        return axios.delete(`http://localhost:8080/${id}`)
    }
    updateEmployee(id,Object){
        return axios.put(`http://localhost:8080/${id}`,Object)
    }
    getUser(id){
        return axios.get(`http://localhost:8080/${id}`)
    }
}
  
export default new UserService();