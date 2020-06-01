import { StarParams, StarAction, StarPage } from '@/components/Stars/StarModel/interface';

type AnyAction = StarAction & Record<string, any>;

/**
 * 默认的action类型
 */
export const ActionType = {
  add: 'add',
  update: 'update',
  remove: 'remove',
  get: 'get',
  list: 'list',
  paging: 'paging',
};

/**
 * 提供简单组成action的方法
 * @param type action类型
 * @param payload action载荷
 * @param other 其他附属信息
 */
export function action(type: string, payload?: any, other?: { [field: string]: any }): AnyAction {
  if (typeof other !== 'object') {
    return {
      type,
      payload,
    };
  }
  return {
    type,
    payload,
    ...other,
  };
}

/**
 * 默认的action快速方法
 */
export const actions = {
  /**
   * 增加对象action
   */
  add: (namespace: string, entity: { [field: string]: any }) => action(`${namespace}/add`, entity),
  /**
   * 增加对象action
   */
  update: (namespace: string, entity: { [field: string]: any }) =>
    action(`${namespace}/update`, entity),
  /**
   * 增加对象action
   */
  remove: (namespace: string, key: string | number) => action(`${namespace}/remove`, key),
  /**
   * 增加对象action
   */
  get: (namespace: string, key: string | number) => action(`${namespace}/get`, key),
  /**
   * 增加对象action
   */
  list: (namespace: string, params: { [field: string]: any }) =>
    action(`${namespace}/list`, params),
  /**
   * 增加对象action
   */
  page: (namespace: string, param?: StarParams) => action(`${namespace}/paging`, param),

  /**
   * 直接更新state中entity值
   */
  _get: (namespace: string, entity: { [field: string]: any }) =>
    action(`${namespace}/_get`, entity),

  /**
   * 直接更新state中list值
   */
  _list: (namespace: string, list: Record<string, any>[]) => action(`${namespace}/_list`, list),

  /**
   * 直接更新state中page值
   */
  _paging: (namespace: string, page: StarPage) => action(`${namespace}/_paging`, page),
};

/**
 * 通过构造是传入的namespace辅助快速构造action
 */
interface IAction {
  /**
   * redux命名空间
   */
  namespace: string;

  /**
   * 创建一个action
   * @param type action类型
   * @param payload action载荷
   * @param other 其他附属信息
   */
  act(method: string, payload?: any, other?: { [field: string]: any }): AnyAction;
}

/**
 * Action类, 通过构造是传入的namespace辅助快速构造action
 */
export class Action implements IAction {
  namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  /**
   * 创建一个action
   * @param type action类型
   * @param payload action载荷
   * @param other 其他附属信息
   */
  act(
    method: string,
    payload?: Record<string, any> | string | number,
    other?: Record<string, any>,
  ): AnyAction {
    let type;
    if (this.namespace && this.namespace !== '') type = `${this.namespace}/${method}`;
    else type = method;

    if (typeof other !== 'object') {
      return {
        type,
        payload,
      };
    }
    return {
      type,
      payload,
      ...other,
    };
  }
}
