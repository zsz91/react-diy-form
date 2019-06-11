import React, { Component, Fragment } from 'react';
import { Row, Col, Icon, Tabs } from 'antd';
import styles from './right.less';

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
    const { nowField } = this.props;
    return (
        <Tabs defaultActiveKey="1"
              onChange={this.changeKey}
              className={styles.right}>
          <TabPane tab={'字段属性'}
                   key="1"
                   className={styles.tabOne}>

          </TabPane>
          <TabPane tab={'表单属性'}
                   key="2"
                   className={styles.tabOne}
          >
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      );
  }
}
