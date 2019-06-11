import React,{ Component, Fragment} from 'react';
import {Row, Col} from 'antd';
import Left from './Left/Left';
import styles from './index.less'
import CenterContent from './Center/Center';
import RightContent from './Right/RightContent';
import DefautProps from './typeDefaultProps';
import { deepCopy } from './utils';

export default class Index extends Component{
  constructor(props){
    super(props);
    this.state={
      setting: [], // 字段数组
      nowField: null, // 当前操作的字段 是字段数组中的一个
      height: '500px',
      formConfig: {  // 表单属性.
        fileSpan: 1, // 单列还是双列 只能 是 1 或者 2
      },
    }
  }

  componentDidMount() {
    this.changeState('height', document.body.offsetHeight - 112,);
  };

  changeState = (key, value) => {
    this.setState({
      [key]: value,
    })
  };

  deleteField = (index) => {  // 删除
    const { setting } = this.state;
    setting.splice(index,1);
    this.changeState('setting', setting);
    this.changeState('nowField', null);
  };

  chooseField = (index) => { // 选择
    const { setting } = this.state;
    const nowField = {
      ...setting[index],
      index,
    };
    this.changeState('nowField', nowField);
  };

  changeNowField = (newValue) => { // 修改
    this.changeState('nowField', newValue);
    const { setting } = this.state;
    setting[newValue.index] = newValue;
    this.changeState('setting', setting);
  };

  changeFormConfig = ( key, value ) => {
    const { formConfig } = this.state;
    formConfig[key] = value;
    this.changeState('formConfig',formConfig);
  };

  addField = (type) => { // 新增
    const { setting } = this.state;
    const nowField = deepCopy(DefautProps[type]);
    setting.push(nowField);
    nowField.index = setting.length -1 ;
    this.changeState('setting', setting);
    this.changeState('nowField', nowField);
  };

  render(){
    const { height } = this.state;
    return <Row
      className={styles.total}
      style={{height}}>
      <Col
        xxl={3}
        xl={4}
        className={styles.height100}
      >
        <Left
          {...this.state}
          addField={this.addField}/>
      </Col>
      <Col
        xxl={24-3-4}
        xl={24-4-6}
        className={styles.height100}
      >
        <CenterContent
          {...this.state}
          deleteField={this.deleteField}
          chooseField={this.chooseField}
        />
      </Col>
      <Col
        xxl={4}
        xl={6}
        className={styles.height100}
      >
        <RightContent
          {...this.state}
          changeFormConfig={this.changeFormConfig}
          changeNowField={this.changeNowField}/>
      </Col>
    </Row>;
  }
}
