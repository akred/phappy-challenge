import axios from "axios";

const API_URL = "https://frontend-test-api.aircall.io";

/**
 * AuthService
 * Provide actions such as login
 */
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

  async getAuthenticatedUser() {
    const result = await axios.get(API_URL + "/me")
    return result?.data
  }
}

export default new AuthService();
