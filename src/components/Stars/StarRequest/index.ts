import message, { Message } from './message';

export type StarWrapperRequest = (
  url: string,
  options?: Record<string | number, any>,
) => Promise<any>;

export default function request(
  proxy: StarWrapperRequest,
): (url: string, options?: Record<string | number, any>) => Promise<Message> {
  return async function (url: string, options?: Record<string | number, any>): Promise<Message> {
    const res = await proxy(url, options);
    const msg = message(res);
    return msg;
  };
}
