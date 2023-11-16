import {
  AxiosResponse, 
  AxiosRequestConfig, 
  CreateAxiosDefaults,
  AxiosInstance, 
  default as axios
} from 'axios';

export default class Api {
  private instance: AxiosInstance;
  private logs: string;

  constructor(defaults?: CreateAxiosDefaults<any>) {
    this.logs = process.env.LOGS?? 'never';
    const timeout: string = process.env.REQUEST_TIMEOUT?? '5000';
    this.instance = axios.create(defaults?? {
      baseURL: process.env.API_BASE_URL,
      timeout: Number.parseInt(timeout)
    });
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }

  public async request<T>(config: AxiosRequestConfig<any>): Promise<Partial<AxiosResponse<T, any>>> {
    let response: Partial<AxiosResponse<T, any>>;
    await this.instance<T>(config)
      .then((data: Partial<AxiosResponse<T,any>>) => {
        if (['always'].includes(this.logs)) {
          console.log(`           ${config.url} returned ${data.status}: ${data.statusText}`);
          console.log(`           ${config.url} response headers: ${data.headers}`);
          console.log(`           ${config.url} response body: headers: ${JSON.stringify(data.data)}`);
        }
        response = data
      }).catch((error: any) => {
        if (error.response) {
          if (['>200', 'always'].includes(this.logs)) {
            console.log(`         ${config.url} returned non 2xx status - ${error.response.status}:  ${error.response.statusText}`);
            console.log(`         Response body: ${JSON.stringify(error.response.data)}`);
          }
          response = error.response;
        } else if (error.request) {
          if (['>200', 'onFail', 'always'].includes(this.logs)) {
            console.log(`           ${config.url} could not be processed`);
            console.log(`           Request was: ${error.request}`);
          }
        } else {
          throw new Error(`Request could not be made because of error: ${error.message}`);
        }
      });
    return response;
  }
}

export const api = new Api();
