import { apiService, BASE_URL, TOKEN } from "./ApiService"

/**
 * AuthService
 * Provide actions such as login
 */
class AuthService {
  async login(username: string, password: string) {
    return await apiService
      .post(BASE_URL + "/auth/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem(TOKEN, JSON.stringify(response.data.access_token));
        }

        return response.data;
      })
      .catch((err) => {
        return {
          error: err,
          message: "Cannot login, service unavaiblable",
        };
      });
  }

  logout() {
    localStorage.removeItem(TOKEN);
  }

  getCurrentToken() {
    return localStorage.getItem(TOKEN);
  }

  async getAuthenticatedUser() {
    return apiService
      .get(BASE_URL + "/me")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return {
          error: err,
          message: "Cannot login, service unavaiblable",
        };
      });
  }
}

export default new AuthService();
