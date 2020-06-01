import { message } from 'antd';

export interface Message {
  status: number;
  data?: any;
  message?: string;
  success(show?: boolean): boolean;
}

export default (data: any): Message => {
  let msg: Message = { status: 200, success: () => true };
  if (data) {
    if (typeof data === 'object') msg = data;
    else if (typeof data === 'string') {
      msg = { ...msg, ...JSON.parse(data) };
    } else {
      msg.data = data;
    }
  }

  msg.data = msg.data ? msg.data : null;

  msg.success = (show) => {
    let success = false;
    if (msg) {
      switch (msg.status) {
        case 200:
          if (show) message.info(msg.message || '操作成功');
          success = true;
          break;
        case 400:
          message.warn(msg.message || '操作失败');
          break;
        case 500:
          message.error(msg.message || '操作错误');
          break;
        default:
          break;
      }
    }
    return success;
  };

  return msg;
};
