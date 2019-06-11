import React, { Component, Fragment } from 'react';
import { Row, Col, Icon } from 'antd';
import styles from './left.less';
import config from './Config'

export default class Left extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  componentDidMount() {

  }

  render() {
    return <div className={styles.left}>
      <Row className={styles.title}>
        基础字段
      </Row>
      <Row className={styles.list}>
        {
          config.basicColumns.map((x)=>{
            return (
            <Row className={styles.item}
                 onClick={()=>{this.props.addField(x.type)}}
                 key={x.type}>
              <span style={{paddingLeft: '5px'}}>
              <object data={x.icon}
                      width={14}
                      height={14}
                      className={styles.icon}
                      type="image/svg+xml"
              />
              </span>
              <span>{x.name} </span>
            </Row>)
          })
        }
      </Row>
      <Row className={styles.title}>
        增强字段
      </Row>
      <Row className={styles.list}>
        {
          config.plusColumns.map((x)=>{
            return (
              <Row className={styles.item}
                   onClick={()=>{this.props.addField(x.type)}}
                   key={x.type}>
              <span style={{paddingLeft: '5px'}}>
              <object data={x.icon}
                      width={14}
                      height={14}
                      className={styles.icon}
                      type="image/svg+xml"
              />
              </span>
                <span>{x.name} </span>
              </Row>)
          })
        }
      </Row>
    </div>;
  }
}
