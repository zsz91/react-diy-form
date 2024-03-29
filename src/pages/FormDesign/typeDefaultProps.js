const props = {
  input:{
    type: 'input',
    name: '单行文本',
    required: false, // 是否必填,
    disabled: false, // 是否可编辑
    detailProps:{
      describe: '', // 描述信息
      format: '无', // 格式 电话 = phone 邮箱 = email 身份证 = idCard
      defaultValue: '', // 默认值
    },
  },
  textarea: {
    type: 'textarea',
    name: '多行文本', //
    required: false, // 是否必填,
    disabled: false, // 是否可编辑
    detailProps:{
      describe: '', // 描述信息
      format: '无', // 格式 电话 = phone 邮箱 = email 身份证 = idCard
      defaultValue: '', // 默认值
    },
  },
  inputNumber:{
    type: 'inputNumber',
    name: '数字', //
    required: false, // 是否必填,
    disabled: false, // 是否可编辑
    detailProps:{
      limit: false, // 是否限定数值范围
      min: 1, // 限定数值最小值
      max: 100, // 限定数值最大值
      describe: '', // 描述信息
      defaultValue: '', // 默认值
    },
  },
  datePicker:{
    type: 'datePicker',
    name: '日期时间',
    required: false, // 是否必填,
    disabled: false, // 是否可编辑
    showTime: false, // 类型 日期false => YYYY-MM-DD 时间true => YYYY-MM-DD HH:mm:ss
    detailProps:{
      describe: '', // 描述信息
      defaultValue: '', // 默认值
    },
  },
  radioGroup:{
    type: 'radioGroup',
    name: '单选按钮组',
    required: false, // 是否必填,
    disabled: false, // 是否可编辑
    options: [
      {
        key: '0',
        name: '选项1',
      },
      {
        key: '1',
        name: '选项2',
      },
      {
        key: '2',
        name: '选项3',
      }
    ], // 选项
    detailProps:{
      describe: '', // 描述信息
      defaultValue: '', // 默认值
    },
  },
  select:{
    type: 'select',
    name: '下拉框',
    required: false, // 是否必填,
    disabled: false, // 是否可编辑
    options: [
      {
        key: '0',
        name: '选项1',
      },
      {
        key: '1',
        name: '选项2',
      },
      {
        key: '2',
        name: '选项3',
      }
    ], // 选项
    detailProps:{
      describe: '', // 描述信息
      defaultValue: '', // 默认值
    },
  },
  checkBoxMutiple:{
    type: 'checkBoxMutiple',
    name: '复选框组',
    required: false, // 是否必填,
    disabled: false, // 是否可编辑
    options: [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' },
    ],
    detailProps:{
      describe: '', // 描述信息
      defaultValue: [], // 默认值
    },
  },
  buttonUpload:{
    type: 'buttonUpload',
    name: '附件',
    buttonName: '选择文件',
    buttonClassName: 'defaultBlue',
    detailProps:{
      describe: '', // 描述信息
      defaultValue: [], // 默认值
    },
  }


};

export default props;
