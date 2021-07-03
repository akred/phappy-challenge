import {apiService, BASE_URL, TOKEN} from "./ApiService"


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
      });
  }

  logout() {
    localStorage.removeItem(TOKEN);
  }

  getCurrentToken() {
    return localStorage.getItem(TOKEN);
  }

  async getAuthenticatedUser() {
    const result = await apiService.get(BASE_URL + "/me")
    return result?.data
  }
}

export default new AuthService();
