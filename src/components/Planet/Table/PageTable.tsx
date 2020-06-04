import React, { useEffect } from 'react';
import { StarTableProps } from '@/components/Stars/StarTable/interface';
import StarTable from '@/components/Stars/StarTable';
import { StarModelState } from '@/components/Stars/StarModel/interface';
import { actions } from '@/components/Stars/utils/action';

export default (
  props: StarTableProps & {
    name: string;
    model: StarModelState;
    loading: boolean;
    onload?: () => void;
  },
) => {
  const {
    name,
    dispatch,
    model: {
      data: { page: data },
      params: { page: params },
    },
    columns,
    loading,
    onload,
    formate,
    ...rest
  } = props;

  /**
   * 页面初始化加载数据
   */
  useEffect(() => {
    onload ? onload!() : dispatch!(actions.page(name, { page: 1, size: 10 }));
  }, []);

  const ds = data && data.data ? data.data.map((d: any) => ({ key: d.id, ...d })) : [];

  return (
    <StarTable
      loading={loading}
      columns={columns}
      dataSource={ds}
      pagination={{
        pageSize: data.size,
        current: data.page,
        total: data.total,
      }}
      onQueryClick={(param) => {
        params.page = 1;
        params.params = param;
        dispatch(actions.page(name, params));
      }}
      onPageChanged={(page, size) => {
        params.page = page;
        params.size = size;
        dispatch(actions.page(name, params));
      }}
      onRemoveClick={async (v) => {
        await dispatch(actions.remove(name, v));
        dispatch(actions.page(name, params));
      }}
      onSaveClick={async (values: any, mode) => {
        if (mode === 'add') await dispatch(actions.add(name, values));
        else await dispatch(actions.update(name, values));
        dispatch(actions.page(name, params));
      }}
      operation
      toolbar
      autoForm
      {...rest}
    />
  );
};
