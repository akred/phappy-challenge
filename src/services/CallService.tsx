import { AxiosResponse } from "axios";
import { apiService, BASE_URL } from "./ApiService";

/**
 * CallService
 * Handle differents actions such as list calls and update them
 *
 * TODO need to handle errors cases
 */
class CallService {
  /**
   * Get calls
   * @param offset page number
   * @param limit number of calls per page
   * @returns
   */
  async getCalls(offset?: number, limit?: number): Promise<AxiosResponse<ApiDataType>> {
    const calls: AxiosResponse<ApiDataType> = await apiService
      .get<ApiDataType>(BASE_URL + "/calls", { params: { offset, limit } })
    return calls;
  }

  /**
   * Get one call specified by it's ID
   * @param id
   * @returns
   */
  async getCall(id: number) {
    const result = await apiService.get(BASE_URL + `/calls/${id}`);
    return result?.data;
  }

  /**
   * Add note to a call specified by it's ID
   * @param id
   * @returns
   */
  async addNote(id: number) {
    return await apiService
      .post(BASE_URL + `/calls/${id}/note`)
      .then((response) => {
        return response.data;
      });
  }

  /**
   * Archive call specified by it's ID
   * @param id
   * @returns
   */
  async archiveCall(id: number) {
    return await apiService
      .put(BASE_URL + `/calls/${id}/archive`)
      .then((response) => {
        return response.data;
      });
  }
}

export default new CallService();
