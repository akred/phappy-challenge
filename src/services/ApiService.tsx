import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * ApiService
 * This service is an Api wrapper managing the JWT token expiration (we can use axios interceptor instead if we want :)
 * If it returns a 401 error (token expired), the refreshAuthLogic will be run, and the service retries to get the new token
 */
class ApiService {
  instance: AxiosInstance;

  public constructor(baseURL: string) {
    const token = localStorage.getItem(TOKEN);
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    // Function that will be called before each request
    this.instance.interceptors.request.use(request => {
      if (this.getAccessToken()) {
        request.headers['Authorization'] = `Bearer ${this.getAccessToken()}`;
      }
      return request;
    });
    // Function that will be called after each response
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        if (error.response.status === 401) {
          console.log(
            "Not able to refresh the token, please login again : " + error
          );
          // Need to found a solution to redirect
          // history.push(LOGIN_URL);
        }
        return Promise.reject(error);
      }
    );
  }

  getAccessToken = () => {
    return localStorage.getItem(TOKEN);
  };

  /**
   * All methods listed below are wrappers from axios ones, which handles the instance with token
   */
  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.get(url, config);
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.request(config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.delete(url, config);
  }

  head<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.head(url, config);
  }

  options<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.options(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.post(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.put(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch(url, data, config);
  }
}

export const BASE_URL = "https://frontend-test-api.aircall.io";
export const TOKEN = "token";
export const apiService = new ApiService(BASE_URL);
