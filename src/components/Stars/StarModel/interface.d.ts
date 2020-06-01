export interface StarAction {
  type: string;
  payload?: any;
  [props: string]: any;
}

export type StarReducer<S = any, A extends StarAction = StarAction> = (
  state: S | undefined,
  action: A,
) => S;

export interface StarEffectsCommand {
  put: <A extends StarAction>(action: A) => any;
  call: Function;
  select: Function;
  take: Function;
  cancel: Function;
  [key: string]: any;
}

export type StarEffect = (action: StarAction, effects: StarEffectsCommand) => void;

export interface StarParams {
  size: number;
  page: number;
  params?: Record<string, any>;
  orders?: Record<string, 'ASC' | 'DESC'>;
}

export interface StarPage {
  size: number;
  page: number;
  total: number;
  data?: any[];
}

export interface StarModelState {
  data: {
    entity: any;
    list: any[];
    page: StarPage;
  };
  params: { list: any; page: StarParams };
}

export interface StarModelEffects {
  add: StarEffect;
  update: StarEffect;
  remove: StarEffect;
  get: StarEffect;
  list: StarEffect;
  paging: StarEffect;
}

export interface StarModelReducers {
  _update: StarReducer<StarModelState>;
  _get: StarReducer<StarModelState>;
  _list: StarReducer<StarModelState>;
  _paging: StarReducer<StarModelState>;
}

export interface StarModel {
  namespace: string;
  state: StarModelState;
  effects: StarModelEffects;
  reducers: StarModelReducers;
}
