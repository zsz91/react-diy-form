import React, { Component, Fragment } from 'react';
import { Upload, message } from 'antd';
import ButtonForm from './ButtonForm';
//import * as service from './UploadImgDiy/service';

export default class ButtonUploadFormDesign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileSize: props.fileSize || 2,
      name: '',
    };
  }

  checkSize(file) {
    const { fileSize } = this.state;
    let flag = false;

    if (fileSize && file.size / 1024 / 1024 > fileSize) {
      message.error(`单个文件大小不能超过${fileSize}MB!`);
      flag = true;
    }

    return flag;
  }

  uploadFile = () => {
    const { onChange } = this.props;
    const file = this.fileInput.files[this.fileInput.files.length - 1];
    this.setState({
      name: file.name,
    })
    // if (!file || this.checkSize(file)) {
    //   return;
    // }

    // service.uploadFile({
    //   file: file,
    // }).then(res => {
    //   if (res) {
    //     message.success('上传成功');
    //     onChange && onChange(res, this.fileInput);
    //   }
    // });
  };

  selectFile = () => {
    this.fileInput.click();
  };

  render() {
    const { accept, buttonName, buttonClassName, value, readOnly, disabled } = this.props;
    return (
      <Fragment>
        <label>
          <ButtonForm name={buttonName}
                      handleClick={this.selectFile}
                      className={buttonClassName}
          />
          <input type="file"
                 accept={accept}
                 style={{ display: 'none' }}
                 onChange={this.uploadFile}
                 ref={input => {
                   this.fileInput = input;
                 }}
          />
          {this.state.name}
          {/*{this.fileInput && this.fileInput.value
          || value
          || <span style={{ color: '#D2D2D2' }}>未选择任何文件</span>}*/}
        </label>
      </Fragment>
    );
  }
}
