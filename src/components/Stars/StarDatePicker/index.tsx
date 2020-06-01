import React from 'react';
import { DatePicker } from 'antd';
import { RangePickerProps, DatePickerProps } from 'antd/lib/date-picker';
import zh_CN from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';

export default (
  props: Omit<DatePickerProps, 'onChange'> & {
    onChange?: (dt: string) => void;
  },
) => {
  const { value, onChange, style, ...rest } = props;

  //格式化时间
  let date: moment.Moment | undefined;
  if (moment.isMoment(value)) date = value;
  else date = value ? moment(value?.toString()) : undefined;

  const restProps = rest as DatePickerProps;
  return (
    <DatePicker
      style={style}
      locale={zh_CN}
      value={date}
      onChange={(m) => {
        if (m) {
          onChange!(m.format('YYYY-MM-DD HH:mm:ss'));
        }
      }}
      {...restProps}
    />
  );
};

export const StarRangePicker = (
  props: Omit<RangePickerProps, 'value'> & {
    value?: string[];
    onRangeChange?: (range: string[]) => void;
  },
) => {
  const { value, onRangeChange, style, onChange, ...rest } = props;
  const moments: [moment.Moment | null, moment.Moment | null] = [null, null];
  if (value) {
    if (value[0]) moments[0] = moment(value[0]);
    if (value[1]) moments[1] = moment(value[1]);
  }

  const restProps = rest as RangePickerProps;
  return (
    <DatePicker.RangePicker
      style={style}
      locale={zh_CN}
      value={moments}
      onChange={(m) => {
        if (m) {
          onRangeChange &&
            onRangeChange([
              m[0]!.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
              m[1]!.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            ]);
        }
      }}
      {...restProps}
    />
  );
};
