import { ColProps } from 'antd/lib/col';
import { FormInstance, FormItemProps } from 'antd/lib/form';
import { StartControlProps } from '../StarControl/interface';

export type StarFormField = Omit<FormItemProps, 'children'> &
  StartControlProps & { children?: any };

export interface StarFormProps {
  form?: FormInstance;
  style?: React.CSSProperties;
  className?: string;

  /**
   * 表单布局, 可以为数字表示一行多少个字段, 也可以直接指定样式
   */
  layout?: number | { itemCol: ColProps; labelCol?: ColProps; wrapperCol?: ColProps };
  fields: StarFormField[];
  entity?: any;
  readonly?: boolean;
}
