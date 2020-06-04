import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useState } from 'react';
import { clone } from '../utils';
import { StarColumn, StarOperation, StarTableProps } from './interface';
import style from './style.less';
import TableForm from './TableForm';
import TableQuery from './TableQuery';
import TableToolbar from './TableToolbar';

/**
 * 导出组件
 */
export default (props: StarTableProps) => {
  const { columns, autoForm, pagination, format, onPageChanged, onAddClick, ...rest } = props;
  const [tableFormExist, setTableFormExist] = useState(false);
  const [tableFormShow, setTableFormShow] = useState(false);
  const [tableFormMode, setTableFormMode] = useState<'add' | 'edit' | 'view'>('add');
  const [entity, setEntity] = useState({});

  const showTableForm = (mode: 'add' | 'edit' | 'view') => {
    setTableFormExist(true);
    setTableFormShow(true);
    setTableFormMode(mode);
  };

  /**
   * 初始化分页信息
   * @param props Table属性信息
   */
  const initPagination = () => {
    let wrapper = pagination;
    if (wrapper) {
      wrapper = {
        total: wrapper.total,
        showTotal: wrapper.total
          ? (total) => (format ? format({ id: 'pagination.total' }, { total }) : '')
          : undefined,
        showSizeChanger: true,
        onChange: (page, size) => {
          if (onPageChanged) onPageChanged(page, size);
        },
        onShowSizeChange: (page, size) => {
          if (onPageChanged) onPageChanged(page, size);
        },
        ...wrapper,
      };
    } else {
      wrapper = {
        showSizeChanger: true,
        onChange: (page, size) => {
          if (onPageChanged) onPageChanged(page, size);
        },
        onShowSizeChange: (page, size) => {
          if (onPageChanged) onPageChanged(page, size);
        },
      };
    }
    return wrapper;
  };

  /**
   * 初始化操作栏
   */
  const initOperation = (): StarColumn | undefined => {
    const { operation, onViewClick, onEditClick, onRemoveClick, onEntityLoading } = props;
    let result: StarColumn | undefined;
    if (operation) {
      //默认配置
      result = {
        dataIndex: 'id',
        title: format ? format({ id: 'operation' }) : '操作',
        align: 'center',
        width: '10%',
      };

      const { view, edit, remove, ...rest } = operation as StarOperation;

      //操作栏的渲染方法
      const render = (value: any, record: any) => (
        <Space>
          {
            // 判断查看按钮显示
            (operation === true || view) && (
              <span>
                <a
                  onClick={() => {
                    let entity = clone(record);
                    if (onEntityLoading) entity = onEntityLoading(value, entity); // 如果有entity加载事件，替换为加载后的数据
                    setEntity(entity); //设置当前实体
                    showTableForm('view'); // 设置TableForm 打开
                    onViewClick && onViewClick(value, entity);
                  }}
                >
                  <Tooltip title={format ? format({ id: 'view' }) : '查看'}>
                    <EyeOutlined />
                  </Tooltip>
                </a>
              </span>
            )
          }
          {
            // 判断编辑按钮显示
            (operation === true || edit) && (
              <span>
                <a
                  onClick={() => {
                    let entity = clone(record);
                    if (onEntityLoading) entity = onEntityLoading(value, entity); // 如果有entity加载事件，替换为加载后的数据
                    setEntity(entity); //设置当前实体
                    showTableForm('edit'); // 设置TableForm 打开
                    onEditClick && onEditClick(value, entity);
                  }}
                >
                  <Tooltip title={format ? format({ id: 'edit' }) : '编辑'}>
                    <EditOutlined />
                  </Tooltip>
                </a>
              </span>
            )
          }
          {
            // 判断删除按钮显示
            (operation === true || remove) && (
              <a>
                <Popconfirm
                  title={format ? format({ id: 'remove.confirm' }) : '确认删除'}
                  onConfirm={() => onRemoveClick && onRemoveClick(value, record)}
                >
                  <Tooltip title={format ? format({ id: 'remove' }) : '删除'}>
                    <DeleteOutlined />
                  </Tooltip>
                </Popconfirm>
              </a>
            )
          }
        </Space>
      );
      result.render = render;
      result = { ...result, ...rest };
    }
    return result;
  };

  const tablePagination = initPagination();

  const operation = initOperation();
  const tableColumns = [...columns];
  if (operation) {
    tableColumns.push(operation);
  }

  return (
    <div>
      <TableQuery format={format} columns={columns} {...rest} />
      <div className={style.container}>
        <TableToolbar
          className={style.toolbar}
          columns={columns}
          format={format}
          onAddClick={() => {
            if (autoForm) {
              showTableForm('add');
              setEntity({});
            }
            onAddClick && onAddClick();
          }}
          {...rest}
        />
        <div className={style.table}>
          <Table
            columns={tableColumns.filter((c) => !c.hidden)}
            pagination={tablePagination}
            {...rest}
          />
        </div>
        {autoForm && tableFormExist && (
          <TableForm
            mode={tableFormMode}
            entity={entity}
            columns={columns}
            show={tableFormShow}
            format={format}
            close={() => {
              setTableFormShow(false);
            }}
            destroy={() => setTableFormExist(false)}
            {...rest}
          />
        )}
      </div>
    </div>
  );
};
