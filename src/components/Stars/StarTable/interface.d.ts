import { ColProps } from 'antd/lib/col';
import { ColumnType, TableProps } from 'antd/lib/table';
import { Control } from '../StarControl';
import { StarFormField } from '../StarForm/interface';

export interface StarColumn extends ColumnType<any> {
  /**
   * 是否在table中隐藏
   */
  hidden?: boolean;

  /**
   * 是否允许搜索
   */
  search?: boolean | { control: Control };

  /**
   * 是否创建自动表单
   */
  form?: boolean | (StarFormField & StarOperation);
}

export interface StartQueryStyle {
  cols: {
    /**
     * 条件区样式
     */
    queriesCol?: ColProps;

    /**
     * 单个条件区样式
     */
    conditionCol?: ColProps;

    /**
     * 按钮区样式
     */
    buttonsCol?: ColProps;

    /**
     * 单个搜索文案样式
     */
    labelCol?: ColProps;

    /**
     * 单个搜索控件样式
     */
    wrapperCol?: ColProps;
  };
}

export interface StarOperation extends StarColumn {
  add?: boolean = true;
  edit?: boolean = true;
  view?: boolean = true;
  remove?: boolean = true;
}

export interface StarTableProps extends TableProps<any> {
  /**
   * table列信息
   */
  columns: StarColumn[];

  /**
   * 操作栏信息
   */
  operation?: boolean | StarOperation;

  /**
   * 定义table工具栏
   */
  toolbar?: boolean | (() => React.ReactNode);

  /**
   * 是否创建自动表单
   */
  autoForm?: boolean;

  /**
   * table查询功能样式
   */
  queryStyle?: StartQueryStyle;

  /**
   * 点击查询时触发事件
   */
  onQueryClick?: (params) => void;

  /**
   * 点击添加时触发事件
   */
  onAddClick?: () => void;

  /**
   * 点击添加时触发事件
   */
  onSaveClick?: (values: any, mode: 'add' | 'edit' | 'view') => void;

  /**
   * 点击查看时触发事件
   */
  onViewClick?: (key: string | number, values: any) => void;

  /**
   * 点击编辑时触发事件
   */
  onEditClick?: (key: string | number, values: any) => void;

  /**
   * 点击删除时触发事件
   */
  onRemoveClick?: (key: string | number, values: any) => void;

  /**
   * 加载实体对象事件
   * @param key 实体的ID
   * @param values 表格中的实体行信息
   */
  onEntityLoading?: (key: string | number, values: any) => any;

  /**
   * 分页时触发事件
   */
  onPageChanged?: (page, size) => void;
}
