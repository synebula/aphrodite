import React, { useState, useEffect } from 'react';
import Modal, { ModalProps } from 'antd/lib/modal';
import { useIntl } from 'umi';

export default (props: ModalProps & { children: JSX.Element | JSX.Element[] }) => {
  const { formatMessage } = useIntl();
  const { visible, destroyOnClose, children, ...rest } = props;
  const [exist, setExist] = useState<boolean | undefined>(visible);
  useEffect(() => {
    if (visible) setExist(visible);
  });
  const elements = exist ? (
    <Modal
      destroyOnClose
      visible={visible}
      afterClose={() => setExist(false)}
      okText={formatMessage({ id: 'confirm' })}
      cancelText={formatMessage({ id: 'cancel' })}
      {...rest}
    >
      {children}
    </Modal>
  ) : (
    <div />
  );

  return elements;
};
