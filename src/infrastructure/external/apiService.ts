import { create } from 'apisauce';



class ApiService {
  client: any;

  constructor () {
    this.client = create({
      baseURL: 'https://restcountries.com/v3.1',
      headers: {
        Accept: 'application/json'
      }
    });
  }

  async get(url: string) {
    const result = await this.client.get(url);
    if (result.ok) return result.data;
    throw new Error(result.data.message);
  }

  // async post(url: string, data: any) {

  // }
}

export default new ApiService();