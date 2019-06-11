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
    const { setting, formConfig } = this.props;
    if(!setting.length){
      return <div className={styles.noItemDiv}>
        <div className={styles.noItem}>
        </div>
        <span>
            从左侧点击添加字段
        </span>
      </div>
    }
    return <div className={styles.center}>
      <FormDiy
        readOnly
        deleteField={this.props.deleteField}
        chooseField={this.props.chooseField}
        config={setting}
        value={{}}
        fileSpan={{big:formConfig.fileSpan, small: formConfig.fileSpan}}
      />
    </div>;
  }
}
