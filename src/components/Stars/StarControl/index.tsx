import React, { useEffect, useState } from 'react';
import { Input, InputNumber, Select, Switch } from 'antd';
import { StarControlOption, StartControlProps } from './interface';
import StarDatePicker, { StarRangePicker } from '../StarDatePicker';

export enum Control {
  text,
  number,
  boolean,
  select,
  multiselect,
  datetime,
  daterange,
  timerange,
}

export default (props: StartControlProps) => {
  const [selectOptions, setSelectOptions] = useState<StarControlOption[]>([]);
  const { control, readonly, options, searching, style, ...rest } = props;
  useEffect(() => {
    setSelectOptions(options || []);
  }, []);

  let element: JSX.Element;
  switch (control) {
    case Control.text:
      element = <Input style={{ width: '100%', ...style }} readOnly={readonly} {...rest} />;
      break;
    case Control.number:
      element = <InputNumber style={{ width: '100%', ...style }} readOnly={readonly} {...rest} />;
      break;
    case Control.boolean:
      element = <Switch style={style} disabled={readonly} {...rest} />;
      break;
    case Control.select:
    case Control.multiselect: {
      const extra: any = {};
      if (control === Control.multiselect) {
        extra.mode = 'multiple';
      }
      if (searching) {
        extra.notFoundContent = null;
      }

      element = (
        <Select
          showSearch={searching}
          disabled={readonly}
          onSearch={async (v) => {
            if (typeof searching === 'function') {
              const result = await searching(v);
              setSelectOptions(result);
            }
          }}
          style={{ width: '100%' }}
          options={selectOptions}
          filterOption={false}
          {...extra}
          {...rest}
        />
      );
      break;
    }
    case Control.datetime:
      element = (
        <StarDatePicker style={{ width: '100%', ...style }} inputReadOnly={readonly} {...rest} />
      );
      break;
    case Control.daterange:
      element = (
        <StarRangePicker style={{ width: '100%', ...style }} inputReadOnly={readonly} {...rest} />
      );
      break;
    default:
      element = <Input style={style} readOnly={readonly} {...rest} />;
      break;
  }
  return element;
};

// class 版本 暂时不适用
// export default class StarControl extends PureComponent<StartControlProps> {
//   state: { options: StarControlOption[] } = { options: [] };

//   componentDidMount() {
//     const { options } = this.props;
//     this.setState({ options });
//   }

//   render() {
//     const { control: type, searching, ...rest } = this.props;
//     const { options } = this.state;

//     let control: JSX.Element;
//     switch (type) {
//       case Control.text:
//         control = <Input style={{ width: '100%' }} {...rest} />;
//         break;
//       case Control.number:
//         control = <InputNumber style={{ width: '100%' }} {...rest} />;
//         break;
//       case Control.boolean:
//         control = <Switch {...rest} />;
//         break;
//       case Control.select:
//       case Control.multiselect:
//         const extra: any = {};
//         if (type === Control.multiselect) {
//           extra.mode = 'multiple';
//         }
//         if (searching) {
//           extra.notFoundContent = null;
//         }

//         control = (
//           <Select
//             showSearch={searching}
//             onSearch={async (v) => {
//               if (typeof searching === 'function') {
//                 const result = await searching(v);
//                 this.setState({ options: result });
//               }
//             }}
//             style={{ width: '100%' }}
//             options={options}
//             filterOption={false}
//             {...extra}
//             {...rest}
//           ></Select>
//         );
//         break;
//       default:
//         control = <Input {...rest} />;
//         break;
//     }
//     return control;
//   }
// }
