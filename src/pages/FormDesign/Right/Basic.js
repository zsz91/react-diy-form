import React, { Component, Fragment } from 'react';
import { Select, Row, Input, Checkbox, Radio, InputNumber,DatePicker  } from 'antd';
import moment from 'moment';
import styles from './right.less';

const { TextArea } = Input;


const Title = ({ name }) => {
  return (
    <h3 className={styles.title}>
      {name}
    </h3>);
};

const ShellOutSide = ({ children, title }) => {
  return <Fragment>
    <Row>
      <Title
        name={title}
      />
    </Row>
    <Row className={styles.width80}>
      {children}
    </Row>
  </Fragment>;
};


/**
 * 格式
 * */
const Format = ({ value, changeDetailProps }) => {
  const options = [
    {
      key: '无',
      name: '无',
    },
    {
      key: 'phone',
      name: '手机号码',
    },
    {
      key: 'email',
      name: '邮箱',
    },
    {
      key: 'idCard',
      name: '身份证号码',
    },
  ];
  return (
    <ShellOutSide
      title={'格式'}
    >
      <Select
        onChange={(dataValue) => {
          changeDetailProps('format', dataValue);
        }}
        value={value}
        className={styles.width100}
        allowClear={false}
      >
        {options.map((x) => {
          return <Option key={x.key}
          >
            {x.name}
          </Option>;
        })}
      </Select>
    </ShellOutSide>);
};

/**
 * 默认值
 * */
const DefaultValue = ({ value, changeDetailProps }) => {
  return (
    <ShellOutSide
      title={'默认值'}
    >
      <Input
        value={value}
        className={styles.width100}
        onChange={(e) => {
          changeDetailProps('defaultValue', e.target.value);
        }}
      />
    </ShellOutSide>
  );
};

/**
 * 日期- 类型
 * */
const DatePickerType = ({ value, changeValue }) => {
  const changeShowTime = (x) => {
    if(x === '0'){
      changeValue('showTime', false);
    }else{
      changeValue('showTime', true);
    }
  };

  const options = [
    {
      key: '0',
      name: '日期',
    },
    {
      key: '1',
      name: '日期时间',
    },
  ];
  return (
    <ShellOutSide
      title={'类型'}
    >
      <Select
        onChange={(dataValue) => {
          changeShowTime(dataValue);
        }}
        value={value ? '1' : '0'}
        className={styles.width100}
        allowClear={false}
      >
        {options.map((x) => {
          return <Option key={x.key}
          >
            {x.name}
          </Option>;
        })}
      </Select>
    </ShellOutSide>);
};


/**
 * 默认值日期选择
 * */
const DefaultValueDatePicker = ({ value, changeDetailProps, showTime }) => {

  const datePickerOnchange = (dateString) => {
    changeDetailProps('defaultValue', dateString);
  };
  let valueStr  = value;
  if (typeof valueStr !== 'object') {
    if (valueStr) {
      valueStr = moment(valueStr);
    } else {
      valueStr = null;
    }/*格式化时间*/
  }
  console.log(valueStr);

  return (
    <ShellOutSide
      title={'默认值'}
    >
      <DatePicker
        value={valueStr}
        className={styles.width100}
        format={showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
        showTime={showTime}
        onChange={(date, dateString) => {
          datePickerOnchange(dateString);
        }}
      />
    </ShellOutSide>
  );
};

/**
 * 默认值数字
 * */
const DefaultValueNumber = ({ value, changeDetailProps }) => {
  return (
    <ShellOutSide
      title={'默认值'}
    >
      <InputNumber
        value={value}
        className={styles.width100}
        onChange={(e) => {
          changeDetailProps('defaultValue', e);
        }}
      />
    </ShellOutSide>
  );
};
/**
 * 校验- 文本
 * */
const IsRequired = ({ value, changeValue }) => {
  return (
    <ShellOutSide
      title={'校验'}
    >
      <Checkbox
        checked={value}
        onChange={(e) => {
          changeValue('required', e.target.checked);
        }}
      >
        必填
      </Checkbox>
    </ShellOutSide>);
};

/**
 * 校验- 数字
 * */
const IsRequiredNumber = (
  {
    nowField,
    changeDetailProps,
    changeValue,
  }) => {
  return (
    <ShellOutSide
      title={'校验'}
    >
      <Row>
        <Checkbox
          checked={nowField.required}
          onChange={(e) => {
            changeValue('required', e.target.checked);
          }}
        >
          必填
        </Checkbox>
      </Row>
      <Row>
        <Checkbox
          checked={nowField.detailProps.limit}
          onChange={(e) => {
            changeDetailProps('limit', e.target.checked);
          }}
        >
          限定数值范围
        </Checkbox>
      </Row>
      {nowField.detailProps.limit ?
        <Row style={{padding: '10px'}}>
          <InputNumber
            value={nowField.detailProps.min}
            onChange={(e) => {changeDetailProps('min', e)}}/>
          &nbsp; ~&nbsp;
          <InputNumber
            value={nowField.detailProps.max}
            onChange={(e) => {changeDetailProps('max', e)}}
          />
        </Row>
        : null}
    </ShellOutSide>);
};

/**
 * 字段权限- 可编辑
 * */
const IsEditable = ({ value, changeValue }) => {
  return (
    <ShellOutSide
      title={'字段权限'}
    >
      <Checkbox
        checked={value}
        onChange={(e) => {
          changeValue('disabled', !e.target.checked);
        }}
      >
        可编辑
      </Checkbox>
    </ShellOutSide>);
};


const EditName = ({ value, changeValue }) => {
  return (
    <ShellOutSide
      title={'标题'}
    >
      <Input
        value={value}
        className={styles.width100}
        onChange={(e) => {
          changeValue('name', e.target.value);
        }}
      />
    </ShellOutSide>);
};

const EditDescribe = ({ value, changeDetailProps }) => {
  return (
    <ShellOutSide
      title={'描述信息'}
    >
        <TextArea
          value={value}
          className={styles.width100}
          autosize={{ minRows: 4, maxRows: 6 }}
          onChange={(e) => {
            changeDetailProps('describe', e.target.value);
          }}
        />
    </ShellOutSide>);
};

const FormArrange = ({ value, changeFormArrange }) => {
  return (
    <ShellOutSide
      title={'表单布局'}
    >
      <Radio.Group
        value={value}
        buttonStyle="solid"
        onChange={changeFormArrange}
      >
        <Radio.Button value={1}>
          单列
        </Radio.Button>
        <Radio.Button value={2}>
          双列
        </Radio.Button>
      </Radio.Group>
    </ShellOutSide>);
};

const RadioGroupOpitionEdit = ({options, changeDetailProps, defaultValue, changeValue}) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const optionsOnChange = (index,value) => {
      const opt = options;
      opt[index].name = value;
      changeValue('options',opt);
  };

  return (
    <ShellOutSide
      title={'选项'}
    >
      <Radio.Group
        onChange={(e)=>{changeDetailProps('defaultValue', e.target.value)}}
        value={defaultValue}>
        {
          options.map((item, indexA) => {
            return (
              <Radio
                style={radioStyle}
                key={item.key}
                value={item.key}>
                <Input value={item.name}
                       onChange={(e)=>{optionsOnChange(indexA,e.target.value)}}/>
              </Radio>
            )
          })
        }
      </Radio.Group>
    </ShellOutSide>);
};


export {
  Format, DefaultValue, IsRequired,
  IsEditable, EditName, EditDescribe,
  DefaultValueNumber, IsRequiredNumber,FormArrange,
  DefaultValueDatePicker,DatePickerType,
  RadioGroupOpitionEdit,
};
