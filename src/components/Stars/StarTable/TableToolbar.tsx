import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import { StarTableProps } from './interface';

export default (props: StarTableProps) => {
  const { formatMessage } = useIntl();
  const { className, toolbar, onAddClick } = props;

  if (toolbar)
    return (
      <div className={className}>
        {toolbar === true ? (
          <Button type="primary" onClick={() => onAddClick?.call(null)}>
            <PlusOutlined />
            {formatMessage({ id: 'add' })}
          </Button>
        ) : (
          toolbar()
        )}
      </div>
    );
  return <div />;
};
