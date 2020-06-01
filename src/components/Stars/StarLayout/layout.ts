import { ColProps } from 'antd/lib/col';

/**
 * 一行展示四条数据
 */
export const colLayout = {
  fourPerRow: { xxl: 6, xl: 6, lg: 8, md: 12, sm: 24, xs: 24 } as ColProps,

  /**
   * 一行展示三条数据
   */
  threePerRow: { xxl: 8, xl: 8, lg: 12, md: 12, sm: 24, xs: 24 } as ColProps,

  /**
   * 一行展示两条数据
   */
  twoPerRow: { xxl: 12, xl: 12, lg: 12, md: 12, sm: 24, xs: 24 } as ColProps,

  /**
   * 一行展示两条数据
   */
  onePerRow: { span: 24 } as ColProps,
};
