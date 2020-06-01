import { StarService } from '@/components/Stars/StarService';
import { StarModel } from './interface';

export default ({ add, remove, update, get, list, paging }: StarService): StarModel => {
  return {
    namespace: '',
    state: {
      data: {
        entity: {},
        list: [],
        page: { size: 10, page: 1, total: 0 },
      },
      params: { list: {}, page: { size: 10, page: 1 } },
    },
    effects: {
      *add({ payload }, { call }) {
        const msg = yield call(add, payload);
        msg.success(true);
      },
      *remove({ payload }, { call, put }) {
        const msg = yield call(remove, payload);
        if (msg.success(true)) {
          yield put({
            type: '_remove',
            payload,
          });
        }
      },
      *update({ payload }, { call, put }) {
        const msg = yield call(update, payload);
        if (msg.success(true)) {
          yield put({
            type: '_update',
            payload,
          });
        }
      },

      *get({ payload }, { call, put }) {
        const msg = yield call(get, payload);
        if (msg.success()) {
          yield put({
            type: '_get',
            payload: msg.data,
          });
        }
      },
      *list({ payload }, { call, put }) {
        const msg = yield call(list, payload);
        if (msg.success()) {
          yield put({
            type: '_list',
            payload: msg.data,
            params: payload,
          });
        }
      },
      *paging({ payload }, { call, put }) {
        const msg = yield call(paging, payload);
        if (msg.success()) {
          yield put({
            type: '_paging',
            payload: msg.data,
            params: payload,
          });
        }
      },
    },

    reducers: {
      _update(state, { payload }) {
        return {
          ...state!,
          data: {
            ...state!.data,
            entity: payload,
          },
        };
      },

      _get(state, { payload }) {
        return {
          ...state!,
          data: {
            ...state!.data,
            entity: payload,
          },
        };
      },

      _list(state, { payload, params }) {
        return {
          ...state,
          data: { ...state!.data, list: payload },
          params: { ...state!.params, list: params },
        };
      },

      _paging(state, { payload, params }) {
        return {
          ...state,
          data: { ...state!.data, page: payload },
          params: { ...state!.params, page: params },
        };
      },
    },
  };
};
