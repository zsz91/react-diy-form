import React, { Component, Fragment } from 'react';
import { Input, Radio, Row, Tabs } from 'antd';
import styles from './right.less';
import FieldProps from './FieldProps';
import { FormArrange } from './Basic';

const { TabPane } = Tabs;

export default class RightContent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  changeKey = (key) => {
    console.log(key);
  };

  render() {
    const { nowField, changeNowField, formConfig } = this.props;
    return (
        <Tabs
          defaultActiveKey="1"
          onChange={this.changeKey}
          className={styles.right}>
          <TabPane
            tab={'字段属性'}
            key="1"
            className={styles.tabOne}>
          <FieldProps
            nowField={nowField}
            changeNowField={changeNowField}/>
          </TabPane>
          <TabPane
            tab={'表单属性'}
            key="2"
            className={styles.tabOne}
          >
            <FormArrange
              value={formConfig.fileSpan}
              changeFormArrange={(e)=>{this.props.changeFormConfig('fileSpan', e.target.value)}}
            />

          </TabPane>
        </Tabs>
      );
  }
}
