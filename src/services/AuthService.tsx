import axios from "axios";

const API_URL = "https://frontend-test-api.aircall.io";

class AuthService {
  async login(username: string, password: string) {
    return await axios
      .post(API_URL + "/auth/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("TOKEN", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("TOKEN");
  }

  getCurrentToken() {
    return localStorage.getItem('TOKEN');
  }
}

export default new AuthService();
