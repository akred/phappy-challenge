import { apiService, BASE_URL, TOKEN } from "./ApiService";
import isEmpty from "lodash/isEmpty";

// We set abritary 59000 sec (10min - 10 sec)
const REFRESH_TOKEN_TIMER = 59000;
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
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem(TOKEN, response.data.access_token);
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

  isAuthenticated() {
    return !isEmpty(localStorage.getItem(TOKEN));
  }

  /**
   * This method will be trigger before 10 min if no request has been done
   */
  refreshTokenBeforeExpiration() {
    setInterval(() => {
      return apiService
        .post(BASE_URL + "/auth/refresh-token")
        .then((tokenRefreshResponse) => {
          localStorage.setItem(TOKEN, tokenRefreshResponse.data.access_token);
        })
        .catch((err) => {
          return {
            error: err,
            message: "Cannot refresh token, token is expired !",
          };
        })
    }, REFRESH_TOKEN_TIMER)
  }
}

export default new AuthService();
