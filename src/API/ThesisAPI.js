/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import axios from "axios";
var apiUrl = "https://api.thesis.uno/api";

if(process.env.NODE_ENV !== "development") {
    apiUrl = "https://api.thesis.uno/api";
} else {
    apiUrl = "https://localhost:44312/api";
}

export default class ThesisAPIService {
  static bearerPropertyName = 'bearer'

  /* DEPARTMENTS */

  static async getAllDepartments() {
    var response = await axios.get(`${apiUrl}/Departments`)
    return response;
  }
  
  static async getDepartmentById(id) {
    var response = await axios.get(`${apiUrl}/Departments/${id}`)
    return response
  }

  static async postDepartment(model) {
    var response = await axios.post(`${apiUrl}/Departments/`, model)
    return response
  }

  /* PROJECTS */

  static async getProjectsByDepartmentId(id) {
      var response = await axios.get(`${apiUrl}/Departments/${id}/projects`);
      return response;
  }

  static async postProject({ title, summary, departmentId }) {
    var response = await axios.post(`${apiUrl}/Projects`, { title: title, summary: summary, departmentId: Number(departmentId) }, { validateStatus: () => true })

    switch(response.status) {
      case 200: 
          return { ok: true, message: "Successfully created project!"}
      case 400:;
      case 500:
          return { ok: false, message: response.data.Message }
  }
  }

  /* LOGIN */
  
  static async loginWithCredentials({login, password}) {
    var response = await axios({
        method: 'post',
        url: `${apiUrl}/Auth/Login`,
        data: {
            userName: login,
            password: password
        },
        validateStatus: () => true
    })
    
    switch(response.status) {
        case 200: 
            return { ok: true, bearer: response.data.accessToken, userName: response.data.userName }
        case 400:;
        case 500:
            return { ok: false, message: response.data.Message }
    }
  }

  static async registerNewUser({email, password}) {
    var response = await axios.post(`${apiUrl}/Users`, { userName: email, password: password}, { validateStatus: () => true })
    
    switch(response.status) {
      case 200: 
          return { ok: true }
      case 400:;
      case 500:
          return { ok: false, message: response.data.Message }
    }
  }
    
    /*Tasks */
    
    static async getTasksByProjectId(id) {
        var response = await axios.get(`${apiUrl}/Projects/${id}/tickets`);
        return response;
    }

    static async UpdateTask(model) {
        var response = await axios.put(`${apiUrl}/Tickets`, model);

        switch(response.status) {
            case 200: 
                return { ok: true }
            case 400:;
            case 500:
                return { ok: false, message: response.data.Message }
          }
    }
  

  static async handleEmailToken(token) {
    var response = await axios.get(`${apiUrl}/Tokens/Email/${token}`, { validateStatus: () => true })
    switch(response.status) {
      case 200: 
          return { ok: true, message: 'Successfully confirmed email!' }
      case 400:;
      case 500:
          return { ok: false, message: response.data.Message }
    }
  }
}