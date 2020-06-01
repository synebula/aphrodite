import React from 'react';
import { Button, Card, Col, Form, Row, Space } from 'antd';
import { useIntl } from 'umi';
import { Control } from '../StarControl';
import StarForm from '../StarForm';
import { StarFormField } from '../StarForm/interface';
import { StarTableProps } from './interface';

export default (props: StarTableProps) => {
  const { formatMessage } = useIntl();
  const { columns, queryStyle, onQueryClick: onQuery } = props;

  /**
   * 声明组件的默认样式
   */
  const { queriesCol, buttonsCol } = {
    queriesCol: queryStyle
      ? queryStyle.cols.queriesCol
      : { xxl: 20, xl: 18, lg: 18, md: 18, sm: 24, xs: 24 },
    buttonsCol: queryStyle
      ? queryStyle.cols.buttonsCol
      : { xxl: 4, xl: 6, lg: 6, md: 6, sm: 24, xs: 24 },
  };

  const fields: StarFormField[] = [];
  columns.forEach((col) => {
    if (col.search) {
      if (col.search === true) {
        fields.push({
          control: Control.text,
          label: col.title,
          name: col.dataIndex,
        });
      } else {
        const form = col.search as { control: Control };
        fields.push({
          control: form!.control,
          label: col.title,
          name: col.dataIndex,
          ...col.search,
        });
      }
    }
  });

  const [form] = Form.useForm();
  return (
    <Card>
      <Row>
        <Col {...queriesCol}>
          <StarForm layout={3} form={form} fields={fields} />
        </Col>
        <Col
          {...buttonsCol}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Space
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                if (onQuery) onQuery(form.getFieldsValue());
              }}
            >
              {formatMessage({ id: 'query' })}
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              {formatMessage({ id: 'reset' })}
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
