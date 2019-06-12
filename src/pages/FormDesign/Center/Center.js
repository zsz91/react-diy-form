import React, { Component, Fragment } from 'react';
import { Row, Col, Icon } from 'antd';
import styles from './center.less';
import FormDiy from './FormDiy';

export default class CenterContent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { setting, formConfig, nowField } = this.props;
    if(!setting.length){
      return <div className={styles.noItemDiv}>
        <div className={styles.noItem}>
        </div>
        <span>
            从左侧点击添加字段
        </span>
      </div>
    }

    let value = {};
    for(let i = 0 ; i<setting.length; i++){
      let item = setting[i];
      if(typeof item.key === 'undefined'){
        item.key = i + item.type + item.name;
      }
      value[item.key] = item.detailProps.defaultValue;
    }

    return <div className={styles.center}>
      <FormDiy
        readOnly
        deleteField={this.props.deleteField}
        chooseField={this.props.chooseField}
        config={setting}
        nowField={nowField}
        value={value}
        nameSpan={
          {
            big: 10,
            small: 10,
          }
        }
        fileSpan={{big:formConfig.fileSpan, small: formConfig.fileSpan}}
      />
    </div>;
  }
}
