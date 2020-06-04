import React, { useState, useEffect } from 'react';
import Modal, { ModalProps } from 'antd/lib/modal';
import { StarProps } from '../interface';

export default (props: ModalProps & StarProps & { children: JSX.Element | JSX.Element[] }) => {
  const { visible, destroyOnClose, children, format: formate, ...rest } = props;
  const [exist, setExist] = useState<boolean | undefined>(visible);
  useEffect(() => {
    if (visible) setExist(visible);
  });
  const elements = exist ? (
    <Modal
      destroyOnClose
      visible={visible}
      afterClose={() => setExist(false)}
      okText={formate ? formate({ id: 'confirm' }) : '确定'}
      cancelText={formate ? formate({ id: 'cancel' }) : '取消'}
      {...rest}
    >
      {children}
    </Modal>
  ) : (
    <div />
  );

  return elements;
};
