import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

/**
 * ApiService
 * This service is an Api wrapper managing the JWT token expiration.
 * If it returns a 401 error, the refreshAuthLogic will be run, and the request retried with the new token
 */
class ApiService {

    instance: AxiosInstance;

    public constructor(baseURL: string) {
        const token = localStorage.getItem(TOKEN);
        this.instance = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            },
        });
        // Function that will be called to refresh authorization
        const refreshAuthLogic = (failedRequest: any) => this.instance.post(baseURL + '/auth/refresh-token').then(tokenRefreshResponse => {
            localStorage.setItem(TOKEN, tokenRefreshResponse.data.access_token);
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
            return Promise.resolve();
        });

        // Instantiate the interceptor (you can chain it as it returns the axios instance)
        createAuthRefreshInterceptor(this.instance, refreshAuthLogic);


    }

    getAccessToken = () => { return localStorage.getItem(TOKEN); }

    injectToken = () => {
        // Use interceptor to inject the token to requests
        this.instance.interceptors.request.use(request => {
            request.headers['Authorization'] = `Bearer ${this.getAccessToken()}`;
            return request;
        });
    }

    /**
     * All methods listed below are wrappers from axios ones, which handles the instance with token
     */
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        this.injectToken()
        return this.instance.get(url, config)
    }

    request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R> {
        this.injectToken()
        return this.instance.request(config);
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        this.injectToken()
        return this.instance.delete(url, config)
    }

    head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        this.injectToken()
        return this.instance.head(url, config)
    }

    options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        this.injectToken()
        return this.instance.options(url, config)
    }

    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        this.injectToken()
        return this.instance.post(url, data, config)
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        this.injectToken()
        return this.instance.put(url, data, config)
    }

    patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        this.injectToken()
        return this.instance.patch(url, data, config)
    }
}

export const BASE_URL = "https://frontend-test-api.aircall.io";
export const TOKEN = "token";
export const apiService = new ApiService(BASE_URL);