import axios from "axios";

const API_URL = "https://frontend-test-api.aircall.io";

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
  async getCalls(offset: number, limit: number) {
    const result = await axios.get(API_URL + "/calls", { params : { offset, limit } })
    return result?.data
  }

  /**
   * Get one call specified by it's ID
   * @param id
   * @returns
   */
  async getCall(id: number) {
    const result = await axios.get(API_URL + "/calls/${id}")
    return result?.data
  }

  /**
   * Add note to a call specified by it's ID
   * @param id
   * @returns
   */
  async addNote(id: number) {
    return await axios
        .post(API_URL + "/calls/${id}/note")
        .then(response => {
            return response.data;
        });
  }

  /**
   * Archive call specified by it's ID
   * @param id
   * @returns
   */
  async archiveCall(id: number) {
    return await axios
        .put(API_URL + "/calls/${id}/archive")
        .then(response => {
            return response.data;
        });
  }

}

export default new CallService();
