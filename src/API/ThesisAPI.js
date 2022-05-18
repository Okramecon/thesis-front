/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import axios from "axios";
import {HttpTransportType, HubConnectionBuilder} from "@microsoft/signalr";
var apiUrl = "https://api.thesis.uno/api";

if(process.env.NODE_ENV !== "development") {
    apiUrl = "https://api.thesis.uno/api";
} else {
    apiUrl = "https://localhost:44312/api";
}

var chatSocketUrl = "https://api.thesis.uno/chat";

if(process.env.NODE_ENV !== "development") {
  chatSocketUrl = "https://api.thesis.uno/chat";
} else {
  chatSocketUrl = "https://localhost:44312/chat";
}

const getBearerToken = () => {
  return localStorage.getItem('bearer')
}

const handleResponse = (response, okMessage, badMessage) => {
  switch(response.status) {
    case 200:
      return { ok: true, message: okMessage, data: response.data};
      case 200:
      return { ok: true, message: okMessage, data: null};
    case 400:;
    case 500:
      return { ok: false, message: badMessage };
    case 401: 
      return { ok: false, message: 'You are not logged in!' };
    case 403: 
      return { ok: false, message: 'You are not allowed to do that!' };
    default: 
      return { ok: false, message: 'Oops! Something went wrong' };
  }
}

export default class ThesisAPIService {
  static mediaUrl = 'https://api.thesis.uno/uploads'
  /* DEPARTMENTS */

  static async getAllDepartments() {
      var response = await axios.get(`${apiUrl}/Departments`, { headers: {
        'Authorization': getBearerToken()
      }})
      return handleResponse(response, 'Successfully fetched departments', 'Couldnt fetch departments')
  }

  static async getDepartmentById(id) {
      var response = await axios.get(`${apiUrl}/Departments/${id}`, { headers: {
        'Authorization': getBearerToken()
      }})
      return handleResponse(response, 'Successfully fetched department', response.data.Message, { headers: {
        'Authorization': getBearerToken()
      }})
  }

  static async postDepartment(model) {
    var response = await axios.post(`${apiUrl}/Departments/`, model, { headers: {
      'Authorization': getBearerToken()
    }})
    
    return handleResponse(response, 'Successfully created department!', response.data.Message)
  }

  static async addUserToDepartmentByEmail(userEmail, departmentId) {
    var response = await axios.get(`${apiUrl}/Departments/addUserByEmail/${departmentId}?userName=${userEmail}`, { headers: {
      'Authorization': getBearerToken()
    }})
    
    return handleResponse(response, 'Successfully created department!', response.data.Message)
  }

  /* PROJECTS */

  static async getProjectsByDepartmentId(id) {
    var response = await axios.get(`${apiUrl}/Departments/${id}/projects`, { headers: {
      'Authorization': getBearerToken()
    }});
    return response;
  }

  static async postProject({ title, summary, departmentId }) {
    alert("r");
    var response = await axios.post(`${apiUrl}/Projects`, { title: title, summary: summary, departmentId: Number(departmentId) },
        {
        headers: {
        'Authorization': getBearerToken()
    }})
    return handleResponse(response, 'Successfully created project!', response.data.Message)
  }

  static async getProjectById(id) {
    var response = await axios.get(`${apiUrl}/Projects/${id}`, { headers: {
        'Authorization': getBearerToken()
      }})
    return handleResponse(response, 'Successfully fetched department', response.data.Message, { headers: {
        'Authorization': getBearerToken()
      }})
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
            return {
              ok: true,
              bearer: response.data.accessToken,
              userName: response.data.userName,
              expires: response.data.accessTokenExpireDate,
              userId: response.data.userId,
              roles: response.data.roles
            }
        case 400:;
        case 500:
            return { ok: false, message: response.data.Message }
        default: return { ok: false, message: 'Oops! Something went wrong' };
    }
  }

  static async registerNewUser(registerData) {
    var response = await axios.post(`${apiUrl}/Users`, { ...registerData, userName: registerData.email }, { validateStatus: () => true })
    return handleResponse(response, 'Confirmation code sent to your email!', response.data.Message)
  }
  
  /*Tasks */
  
  static async getTasksByProjectId(id) {
      var response = await axios.get(`${apiUrl}/Projects/${id}/tickets`);
      return handleResponse(response, 'Successfully fetched tasks!', response.data.Message)
  }

  static async UpdateTask(model) {
    var response = await axios.put(`${apiUrl}/Tickets`, model, { validateStatus: () => true, headers: {
      'Authorization': getBearerToken() 
    }});

    return handleResponse(response, 'Successfully saved changes!', response.data.Message)
  }

  static async createTicket(model) {
    var response = await axios.post(`${apiUrl}/Tickets`, model, { validateStatus: () => true, headers: {
      'Authorization': getBearerToken() 
    }});

    return handleResponse(response, 'Successfully saved changes!', response.data.Message)
  }

  static async getTasksComments(id) {
    var response = await axios.get(`${apiUrl}/Tickets/${id}/comments`);
    return handleResponse(response, 'Successfully fetched tasks!', response.data.Message)
  }

  /*Comments*/

  static async postComment(model) {
    var response = await axios.post(`${apiUrl}/Comments`, model, { validateStatus: () => true, headers: {
      'Authorization': getBearerToken() 
    }});

    return handleResponse(response, 'Successfully posted comment!', response.data.Message)
  }

  /* TOKENS */

  static async handleEmailToken(token) {
    var response = await axios.get(`${apiUrl}/Tokens/Email/${token}`, { validateStatus: () => true })

    return handleResponse(response, 'Successfully confirmed email!', response.data.Message)
  }

  /* NEWS */

  static async getNewsByDepartmentId(departmentId) {
    var response = await axios.get(`${apiUrl}/News/byDepartmentId?departmentId=${departmentId}`, { validateStatus: () => true })
    
    return handleResponse(response, 'Successfully fetched department!', response.data.Message)
  }

  static async postNews(model) {
    var response = await axios.post(`${apiUrl}/News/`, model, { validateStatus: () => true , headers: {
      'Authorization': getBearerToken() 
    }})
    
    return handleResponse(response, 'Successfully posted news!', response.data.Message)
  }

  /* BOARD */

  static async getBoardByProjectId(projectId) {
    var response = await axios.get(`${apiUrl}/Boards/byProjectId?projectId=${projectId}`, { validateStatus: () => true })
    
    return handleResponse(response, 'Successfully fetched board!', response.data.Message)
  }

  /* Chat */

  static getNewChatConnection() {
    return new HubConnectionBuilder()
        .withUrl(chatSocketUrl,
            {
              skipNegotiation: true,
              transport: HttpTransportType.WebSockets,
              accessTokenFactory: () => getBearerToken().slice(7)
            })
        .withAutomaticReconnect()
        .build();
  }

  static async getChatRoom(chatId) {
    var response = await axios.get(`${apiUrl}/Chatrooms?chatId=${chatId}`, { validateStatus: () => true })
    return handleResponse(response, 'Successfully fetched board!', response.data.Message)
  }

  static async getCommonChatRoom(userId) {
    const currentUserId = localStorage.getItem("userId");
    var response = await axios.get(`${apiUrl}/Chatrooms/common?userId1=${currentUserId}&userId2=${userId}`, { validateStatus: () => true })
    return handleResponse(response, 'Successfully fetched board!', response.data.Message)
  }

  static async getUserChats(username) {
    var response = await axios.get(`${apiUrl}/Chatrooms/user?username=${username}`, { validateStatus: () => true })
    return handleResponse(response, 'Successfully fetched board!', response.data.Message)
  }

  static async searchUsers(searchQuery) {
    var response = await axios.get(`${apiUrl}/Users/search?searchStr=${searchQuery}`, { headers: {
        'Authorization': getBearerToken()
      }})
    return handleResponse(response, 'Successfully fetched board!', response.data.Message)
  }
  /* MEDIA */

  static async postFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${apiUrl}/Medias`, formData, { validateStatus: () => true, headers: {
      'Authorization': getBearerToken() 
    }})
  }
}