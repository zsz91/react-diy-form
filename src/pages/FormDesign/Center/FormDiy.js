import {
  Col, Form, Input, Select, DatePicker,
  Checkbox, Button, Radio, Switch, Upload,
  Icon, InputNumber, Cascader, TreeSelect, Badge,
} from 'antd';
import React, { Component, Fragment } from 'react';
import styles from './FormDiy.less';
import moment from 'moment';
import ButtonUploadFormDesign from './ButtonUploadFormDesign';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const { MonthPicker, RangePicker } = DatePicker;

const countSpecialField = (filedSpanBig, nameSpanBig) => {
  let style = {};
  if (document.body.clientWidth > 1400) {
    if (filedSpanBig === 5) { // 当设置一行排列5个字段时 自定义宽度为20%
      style = { width: '20%' };
    }
    if (filedSpanBig === 1 && nameSpanBig === 2) {  // 当一行显示一个字段 然后名字又特别长时 使用这个width
      style = { width: '6%' };
    }
  }
  return style;
};

const ColDom = ({ children, filedSpan, onClick, giveBorder }) => {
  const bigSpan = Math.ceil(24 / filedSpan.big);
  const smallSpan = Math.ceil(24 / filedSpan.small);
  const styleThis = {
    ...countSpecialField(filedSpan.big),
    boxSizing: 'border-box',
    padding: '15px 10px 0px 10px',
  };
  if (giveBorder) {
    styleThis.border = '1px solid #0DB3A6';
  } else {
    styleThis.border = '1px solid transparent';
  }

  return (
    <Col
      xl={smallSpan}
      xxl={bigSpan}
      style={styleThis}
      onClick={onClick}
    >
      {children}
    </Col>
  )
    ;
};

const FormItemDom = ({ info, children, nameSpan }) => {
  return <FormItem
    label={info.name}
    required={info.required || false}
    labelCol={{
      xl: nameSpan.small,
      xxl: nameSpan.big,
    }}
    wrapperCol={{
      xl: 24 - nameSpan.small,
      xxl: 24 - nameSpan.big,
    }}
    colon={false}
  >
    {children}
  </FormItem>;
};


export default class FormArray extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatTime = (time, formatTimeConfig = 'YYYY-MM-DD HH:mm') => {
    return moment(time);
  };

  datePickerOnchange = (dateString, key) => {
    const { changeValue } = this.props;
    changeValue(dateString, key);
  };

  defaultPropsCount = (info, value) => {
    const itemDisabled = typeof info.disabled !== 'undefined' ? info.disabled : false;
    const readOnly = typeof info.readOnly !== 'undefined' ? info.readOnly : false;
    const placeholder = typeof info.placeholder !== 'undefined' ? info.placeholder : '';
    const options = typeof info.options !== 'undefined' ? info.options : [];
    let itemValue = typeof value[info.key] === 'undefined' ? '' : value[info.key];
    if (['select', 'radioGroup'].indexOf(info.type) > -1) {
      itemValue = typeof itemValue === 'number' ? itemValue.toString() : itemValue;
      itemValue = typeof itemValue === 'boolean' ? itemValue + '' : itemValue;
    } else if (['selectMultiple', 'checkBoxMutiple', 'cascader'].indexOf(info.type) > -1) {
      itemValue = typeof itemValue === 'number' ? itemValue.toString() : itemValue;
      // 数字变成 字符串

      itemValue = typeof itemValue === 'string' && itemValue ? itemValue.split(',') : itemValue;
      // 有值且值是字符串则 变成数组

      itemValue = !itemValue ? [] : itemValue;
      // 没有值则变成空数组

      for (let i = 0; i < itemValue.length; i++) {
        itemValue[i] = typeof itemValue[i] === 'number' ? itemValue[i].toString() : itemValue[i];
        // 每一个值数字变成字符串
      }

    } else if (['datePicker', 'monthPicker'].indexOf(info.type) > -1) {
      if (typeof itemValue !== 'object') {
        if (itemValue) {
          itemValue = moment(itemValue);
        } else {
          itemValue = null;
        }/*格式化时间*/
      }
    } else if (['rangePicker'].indexOf(info.type) > -1) {
      if (typeof itemValue !== 'object') {
        const endValue = typeof value[info.endKey] === 'undefined' ? null : value[info.endKey];
        if (itemValue) {
          itemValue = [moment(itemValue), moment(endValue)];
        } else {
          itemValue = undefined;
        }
      }
    } else if (info.type === 'checkBox') {
      itemValue = !!itemValue;
    } else if (info.type === 'switch') {
      itemValue = !!value[info.key];
    }
    /*if(info.type === 'selectPeople'){
      itemValue = typeof itemValue !== 'object' ? {key:itemValue,label: ''} : itemValue;
    }*/

    const defaultProps = {
      readOnly: this.props.readOnly ? true : readOnly,
      disabled: this.props.disabled ? true : itemDisabled,
      value: itemValue,
      placeholder: placeholder,
      options: options,
    };
    return defaultProps;
  };

  rangeOnChange = (dateStrings = [], key, endKey) => {
    const { changeValue } = this.props;
    changeValue(dateStrings[0], key);
    changeValue(dateStrings[1], endKey);
  };

  deleteItem = (e, index) => {
    if (e && e.preventDefault) {
      e.stopPropagation();
      e.preventDefault();
    }
    const { deleteField } = this.props;
    deleteField(index);
  };

  domAssembly = () => {
    const { changeValue, value, config, fileSpan, nameSpan, nowField } = this.props;
    return config.map((info, i) => {
      let fieldDom = null;
      const defaultProps = this.defaultPropsCount(info, value);
      switch (info.type) {
        case 'input': // 普通文本
          fieldDom = <Input {...defaultProps}
                            style={info.style || {}}
                            onChange={(e) => {
                              changeValue(e.target.value, info.key);
                            }}/>;
          break;
        case 'inputNumber': // 数字文本
          fieldDom =
            <Fragment>
              <InputNumber
                {...defaultProps}
                style={info.style || { width: '100%' }}
                min={0}
                max={info.max ? info.max : Infinity}
                onChange={(value) => {
                  changeValue(value, info.key);
                }}/>
              {info.formatter ? <span>{info.formatter}</span> : ''}
            </Fragment>
          ;
          break;

        case 'idCard':
          fieldDom = <Fragment>
            <Input {...defaultProps}
                   style={info.style || {}}
                   onChange={(e) => {
                     changeValue(e.target.value, info.key);

                   }}/>
          </Fragment>;
          break;
        case 'phone':
          fieldDom = <Fragment>
            <InputNumber {...defaultProps}
                         style={info.style || { width: '100%' }}
                         min={0}
                         max={info.max ? info.max : Infinity}
                         onChange={(value) => {
                           changeValue(value, info.key);

                         }}/>
          </Fragment>;
          break;
        case 'checkBoxMutiple': // 多选 checkbox
          fieldDom = <CheckboxGroup {...defaultProps}
                                    onChange={(value) => {
                                      changeValue(value, info.key);
                                    }}/>;
          break;
        case 'cascader': // 级联选择
          fieldDom = <Cascader value={defaultProps.value}
                               options={defaultProps.options}
                               style={{ width: '100%' }}
                               onChange={(value, selectedOptions) => {
                                 changeValue(value, info.key);
                               }}/>; // 返回数组 [parent,child]
          break;

        case 'selectMultiple': // 下拉多选
          fieldDom = <Select {...defaultProps}
                             mode="multiple"
                             allowClear
                             style={{ width: '100%' }}
                             onChange={(value) => {
                               changeValue(value, info.key);
                             }}>
            {defaultProps.options.map((optionItem) => {
              return <Option key={typeof optionItem.key !== 'boolean' ? optionItem.key + '' : optionItem.key}>
                {optionItem.name}
              </Option>;
            })}
          </Select>;
          break;
        case 'select': // 下拉单选
          fieldDom = <Select {...defaultProps}
                             style={{ width: '100%' }}
                             allowClear={typeof info.allowClear !== 'undefined' ? info.allowClear : true}
                             onChange={(value) => {
                               changeValue(value, info.key);
                             }}>
            {defaultProps.options.map((optionItem) => {
              return <Option key={typeof optionItem.key !== 'boolean' ? optionItem.key + '' : optionItem.key}>
                {optionItem.name}
              </Option>;
            })}
          </Select>;
          break;
        case 'checkBox': // 布尔值选择
          fieldDom = <Checkbox checked={defaultProps.value}
                               disabled={defaultProps.disabled}
                               onChange={(e) => {
                                 changeValue(e.target.checked, info.key);
                               }}>
            {info.text}
          </Checkbox>;
          break;
        // case 'editable': // 可编辑的富文本
        //   fieldDom = <div className={styles.Editable}>
        //     <Editable onChange={changeValue}
        //               filedKey={info.key}
        //               disabled={defaultProps.disabled}
        //               value={defaultProps.value}
        //     />
        //   </div>;
        //   break;

        case 'datePicker': // 日期选择
          fieldDom = <DatePicker showTime={info.showTime}
                                 {...defaultProps}
                                 style={{ width: '100%' }}
                                 format={info.format}
                                 onChange={(date, dateString) => {
                                   this.datePickerOnchange(dateString, info.key);
                                 }}>
          </DatePicker>;
          break;

        case 'rangePicker': // 时间段选择
          if (info.disabledDate && info.disabledDate === 'afterYesterday') {  // 禁用今天之前的时间
            defaultProps.disabledDate = (current) => {
              // Can not select days before today and today
              return current < moment().add(-1, 'days');
            };
          }
          fieldDom = <RangePicker showTime={info.showTime}
                                  {...defaultProps}
                                  style={{ width: '100%' }}
                                  format={info.format}
                                  placeholder={info.placeholder || ['开始日期', '结束日期']}
                                  onChange={(dates, dateStrings) => {
                                    this.rangeOnChange(dateStrings, info.key, info.endKey);
                                  }}>
          </RangePicker>;
          break;

        case 'monthPicker': // 年月 选择
          fieldDom =
            <MonthPicker{...defaultProps}
                        style={{ width: '100%' }}
                        format={info.format}
                        onChange={(date, dateString) => {
                          this.datePickerOnchange(dateString, info.key);
                        }}>
            </MonthPicker>;
          break;

        case 'textarea': // 文本框
          fieldDom = <TextArea {...defaultProps}
                               autosize={{ minRows: 4, maxRows: 6 }}
                               onChange={(e) => {
                                 changeValue(e.target.value, info.key);
                               }}/>;
          break;
        case 'radioGroup': // 圆形 选择框
          fieldDom = <RadioGroup value={defaultProps.value}
                                 disabled={defaultProps.disabled}
                                 style={{ width: '100%' }}
                                 onChange={(e) => {
                                   changeValue(e.target.value, info.key);
                                 }}>

            {defaultProps.options.map((optionItem) => {
              const radioValue = typeof optionItem.key !== 'boolean' ? optionItem.key + '' : optionItem.key;
              return <Radio key={radioValue} value={radioValue}>
                {optionItem.name}
              </Radio>;
            })}
          </RadioGroup>;
          break;
        case 'switch': // 开关
          fieldDom = <Switch    {...defaultProps}
                                checked={defaultProps.value}
                                checkedChildren={info.checkedChildren || ''}
                                unCheckedChildren={info.unCheckedChildren || ''}
                                onChange={(e) => {
                                  changeValue(e, info.key);
                                }}/>;
          break;
        case 'text':
          fieldDom = <div>{defaultProps.value || info.value}</div>;
          break;
        case 'TreeSelect':
          fieldDom = <TreeSelect {...defaultProps}
                                 {...info.props}
                                 onChange={(v) => changeValue(v, info.key)}/>;
          break;
        case 'buttonUpload':
          fieldDom = <ButtonUploadFormDesign onChange={(url) => {
            changeValue(url, info.key);
          }}
                                   {...info}
                                   {...defaultProps}
          />;
          break;
        default:
          fieldDom = null;
          break;
      }
      return (
        <ColDom
          filedSpan={info.fileSpan || fileSpan}
          key={info.type + i}
          giveBorder={nowField && nowField.index === i}
          onClick={() => {
            this.props.chooseField(i);
          }}
        >
          <FormItemDom
            info={info}
            nameSpan={info.nameSpan || nameSpan}>
            {
              nowField && nowField.index === i ?
                <Badge
                  count={
                    <Icon
                      type="close-square"
                      // theme={'filled'}
                      className={styles.closeIcon}
                      onClick={(e) => {
                        this.deleteItem(e, i);
                      }}
                    />
                  }
                >
                  {fieldDom}
                </Badge> : fieldDom
            }

          </FormItemDom>
        </ColDom>
      );
    });
  };

  render() {
    const { style } = this.props;
    return (
      <div className={styles.FormArray}
           style={style}>
        {this.domAssembly()}
      </div>
    );
  }
}

