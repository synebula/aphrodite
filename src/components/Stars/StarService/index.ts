import { stringify } from 'qs';
import StarRequest, { StarWrapperRequest } from '../StarRequest';
import { Message } from '../StarRequest/message';
import { StarParams } from '../StarModel/interface';

export interface StarService {
  add: (payload: Record<string, any>) => Promise<Message>;
  update: (payload: Record<string, any>) => Promise<Message>;
  remove: (payload: number | string) => Promise<Message>;
  get: (payload: number | string) => Promise<Message>;
  list: (payload: Record<string, any>) => Promise<Message>;
  paging: (payload: StarParams) => Promise<Message>;
}
export default (server: string, request: StarWrapperRequest): ((url: string) => StarService) => {
  return (url: string): StarService => {
    const req = StarRequest(request);
    return {
      add: async (payload) => {
        return req(`${server}/${url}`, {
          method: 'POST',
          data: payload,
        });
      },
      remove: async (payload) => {
        return req(`${server}/${url}/${payload}`, {
          method: 'DELETE',
        });
      },
      update: async (payload) => {
        return req(`${server}/${url}/${payload.id}`, {
          method: 'PUT',
          data: payload,
        });
      },

      get: async (payload) => {
        return req(`${server}/${url}/${payload}`);
      },
      list: async (payload) => {
        const urlParams = stringify(payload);
        return req(`${server}/${url}?${urlParams}`);
      },
      paging: async (payload) => {
        const { size, page, params } = payload;
        const urlParams = stringify(params);
        return req(`${server}/${url}/segments/${size}/pages/${page}?${urlParams}`);
      },
    };
  };
};
