import { Modal } from 'antd';
import Form from 'antd/es/form';
import React from 'react';
import { Control } from '../StarControl';
import StarForm from '../StarForm';
import { StarFormField } from '../StarForm/interface';
import { StarTableProps } from './interface';

export default (
  props: StarTableProps & {
    show: boolean;
    entity: any;
    mode: 'add' | 'edit' | 'view';
    close: () => void;
    destroy?: () => void;
  },
) => {
  const { columns, show, mode, entity, close, destroy, onSaveClick, format } = props;

  const fields: StarFormField[] = [];
  columns.forEach((col) => {
    if (col.form) {
      if (col.form === true) {
        fields.push({
          control: Control.text,
          label: col.title,
          name: col.dataIndex,
        });
      } else {
        const form = col.form as { control: Control };
        fields.push({
          control: form!.control,
          label: col.title,
          name: col.dataIndex,
          ...col.form,
        });
      }
    }
  });

  const [form] = Form.useForm();

  return (
    <Modal
      title={
        format ? format({ id: mode }) : mode == 'add' ? '增加' : mode == 'edit' ? '编辑' : '查看'
      }
      visible={show}
      onOk={async () => {
        try {
          let values = await form.validateFields();
          values = { ...entity, ...values };
          onSaveClick && onSaveClick(values, mode);
          close();
        } catch (error) {
          console.error('form fields validate error! ', error);
        }
      }}
      onCancel={() => close()}
      afterClose={() => destroy && destroy()}
      okButtonProps={{ hidden: mode === 'view' }}
      destroyOnClose
    >
      <StarForm
        style={{ padding: '20px 40px' }}
        form={form}
        fields={fields}
        entity={entity}
        readonly={mode === 'view'}
      />
    </Modal>
  );
};
