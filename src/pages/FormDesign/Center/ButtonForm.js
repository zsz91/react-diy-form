/**
 * 钟是志
 * 2019年1月10日
 * 一个Button
 */

import React, { Component,Fragment } from 'react';
import { Button, Icon } from 'antd';
import styles from './FormDiy.less';
export default class ButtonForm extends Component {
  render(){
    const { handleClick, icon, name, className, type ,htmlType,loading, disabled, size, style, boxStyle} = this.props;
    return (
      <span className={styles.ButtonDiy} style={{...boxStyle}}>
      <Button onClick={()=>{handleClick()}} loading={loading}
              className={styles[className]}
              style={{...style}}
              type={type}
              disabled={disabled}
              htmlType={htmlType}
      >
        {icon ? <Icon type={icon} /> : null}
        {name}
      </Button>
    </span>
    );
  }
}

