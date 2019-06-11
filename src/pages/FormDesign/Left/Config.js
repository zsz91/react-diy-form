import react from 'react';
import 单行文本 from '../Icon/单行文本.svg';
import 单选按钮组 from '../Icon/单选按钮组.svg';
import 多行文本 from '../Icon/多行文本.svg';
import 数字 from '../Icon/数字.svg';
import 日期时间 from '../Icon/日期时间.svg';
import 复选框组 from '../Icon/复选框组.svg';
import 下拉框 from '../Icon/下拉框.svg';
import 下拉复选框 from '../Icon/下拉复选框.svg';
import 附件 from '../Icon/附件.svg';

/**
 * input
 inputNumber
 idCard
 phone
 checkBoxMutiple
 cascader
 selectMultiple
 select
 selectPeople
 selectPeople2
 selectTeacher
 selectStudent
 selectMyStudent
 checkBox
 editable
 datePicker
 rangePicker
 monthPicker
 textarea
 radioGroup
 switch
 editor
 upload
 buttonUpload
 text
 *
 * */


const columns = [
  {
    type: 'input',
    name: '单行文本',
    icon: 单行文本,
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 多行文本,
  },
  {
    type: 'inputNumber',
    name: '数字',
    icon: 数字,
  },
  {
    type: 'datePicker',
    name: '日期时间',
    icon: 日期时间,
  },
  {
    type: 'radioGroup',
    name: '单选按钮组',
    icon: 单选按钮组,
  },
  {
    type: 'checkBoxMutiple',
    name: '复选框组',
    icon: 复选框组,
  },
  {
    type: 'select',
    name: '下拉框',
    icon: 下拉框,
  },
  {
    type: 'selectMultiple',
    name: '下拉复选框',
    icon: 下拉复选框,
  }
];

const plusColumns = [
  {
    type: 'buttonUpload',
    name: '附件',
    icon: 附件,
  },
];

const config = {
  basicColumns: columns,
  plusColumns,
};

export default config;
