const props = {
  input:{
    type: 'input',
    name: '单行文本', // 文本
    required: false, // 是否必填,
    detailProps:{
      describe: '', // 描述信息
      format: '', // 格式 电话/邮箱 身份证等
      defaultValue: '', // 默认值
    },
  }
};

export default props;
