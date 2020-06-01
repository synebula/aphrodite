export interface StarControlOption {
  value: string;
  label: string;
}

export interface StartControlProps {
  control?: boolean | Control;
  value?: any;
  onChange?: (value: any) => null;
  options?: StarControlOption[];

  /**
   * 该参数只在select/multiselect组件下有效
   */
  searching?: boolean | SearchFunction;

  /**
   * 标识select是否同时传递label和value值
   */
  labelInValue?: boolean;

  readonly?: boolean;

  [field: string]: any;
}

export type SearchFunction = (value: string) => Promise<StarControlOption[]>;
