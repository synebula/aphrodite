import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { StarTableProps } from './interface';

export default (props: StarTableProps) => {
  const { className, toolbar, format, onAddClick } = props;

  if (toolbar)
    return (
      <div className={className}>
        {toolbar === true ? (
          <Button type="primary" onClick={() => onAddClick?.call(null)}>
            <PlusOutlined />
            {format ? format({ id: 'add' }) : '增加'}
          </Button>
        ) : (
          toolbar()
        )}
      </div>
    );
  return <div />;
};
