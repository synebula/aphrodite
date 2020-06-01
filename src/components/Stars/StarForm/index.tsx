import React from 'react';
import { Col, Form, Row } from 'antd';
import { ColProps } from 'antd/lib/col';
import FormItem from 'antd/lib/form/FormItem';
import StarControl, { Control } from '../StarControl';
import { colLayout } from '../StarLayout/layout';
import { StarFormField, StarFormProps } from './interface';
import { formColLayout } from './layout';

/**
 * 获取表单的布局信息
 * @param layout 布局信息
 */
const loadLayout = (
  config?: number | { itemCol: ColProps; labelCol?: ColProps; wrapperCol?: ColProps },
) => {
  let layout = config;
  if (!layout) layout = 1;
  let itemCol: ColProps;
  let labelCol = formColLayout.labelCol;
  let wrapperCol = formColLayout.wrapperCol;
  if (typeof layout === 'number') {
    switch (layout) {
      case 2:
        itemCol = colLayout.twoPerRow;
        break;
      case 3:
        itemCol = colLayout.threePerRow;
        break;
      case 4:
        itemCol = colLayout.fourPerRow;
        break;
      default:
        itemCol = colLayout.onePerRow;
    }
  } else {
    itemCol = layout.itemCol;
    if (layout.labelCol) labelCol = layout.labelCol;
    if (layout.wrapperCol) wrapperCol = layout.wrapperCol;
  }
  return { itemCol, labelCol, wrapperCol };
};

/**
 * 导出组件
 */
export default (props: StarFormProps) => {
  const { style, className, layout, form, fields, entity, readonly } = props;

  // 定义样式
  const { itemCol, labelCol, wrapperCol } = loadLayout(layout);

  /**
   * 渲染表单组件方法
   */
  const fieldsRender = (): JSX.Element => {
    const components: JSX.Element[] = [];

    fields.forEach((field) => {
      if (field) {
        // 过滤children传递到input等组件
        const { rules, children, ...rest } = field;

        // 一些特殊处理
        const extra: StarFormField = {};
        // Switch的值字段是checked
        if (field.control === Control.boolean) extra.valuePropName = 'checked';
        if (field.control === Control.daterange) extra.trigger = 'onRangeChange';
        components.push(
          <Col key={field.id ? field.id! : field.name!.toString()} {...itemCol}>
            <FormItem
              name={field.name}
              label={field.label}
              labelCol={labelCol}
              wrapperCol={wrapperCol}
              rules={rules}
              {...extra}
            >
              <StarControl readonly={readonly} {...rest} />
            </FormItem>
          </Col>,
        );
      }
    });
    return <Row>{components}</Row>;
  };
  return (
    <Form style={style} className={className} form={form} initialValues={entity}>
      {fieldsRender()}
    </Form>
  );
};
