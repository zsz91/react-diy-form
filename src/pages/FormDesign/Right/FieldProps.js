import React, { Component, Fragment } from 'react';
import styles from './right.less';
import {
  Format, DefaultValue, IsRequired, IsEditable,
  EditName, EditDescribe, DefaultValueNumber, IsRequiredNumber,
  DefaultValueDatePicker, DatePickerType, RadioGroupOpitionEdit } from './Basic';

export default class FieldProps extends Component {
  constructor(props) {
    super(props);
  }

  changeValue = (key, value) => {
    const { nowField, changeNowField } = this.props;
    nowField[key] = value;
    changeNowField(nowField);
  };

  changeDetailProps = (key, value) => {
    const { nowField, changeNowField } = this.props;
    nowField.detailProps[key] = value;
    changeNowField(nowField);
  };

  switchType = () => {
    const { nowField, changeNowField } = this.props;
    switch (nowField.type) { // 对应typeDefaultProps 中的类型
      case 'input' :
        return (
        <Fragment>
          <Format
            value={nowField.detailProps.format}
            changeDetailProps={this.changeDetailProps}
          />
          <DefaultValue
            value={nowField.detailProps.defaultValue}
            changeDetailProps={this.changeDetailProps}
          />
          <IsRequired
            value={nowField.required}
            changeValue={this.changeValue}
          />
          <IsEditable
            value={!nowField.disabled}
            changeValue={this.changeValue}
          />
        </Fragment>);
      case 'textarea' :
        return (
          <Fragment>
            <Format
              value={nowField.detailProps.format}
              changeDetailProps={this.changeDetailProps}
            />
            <DefaultValue
              value={nowField.detailProps.defaultValue}
              changeDetailProps={this.changeDetailProps}
            />
            <IsRequired
              value={nowField.required}
              changeValue={this.changeValue}
            />
            <IsEditable
              value={!nowField.disabled}
              changeValue={this.changeValue}
            />
          </Fragment>);
      case 'inputNumber' :
        return (
          <Fragment>
            <DefaultValueNumber
              value={nowField.detailProps.defaultValue}
              changeDetailProps={this.changeDetailProps}
            />
            <IsRequiredNumber
              nowField={nowField}
              changeValue={this.changeValue}
              changeDetailProps={this.changeDetailProps}
            />
            <IsEditable
              value={!nowField.disabled}
              changeValue={this.changeValue}
            />
          </Fragment>);
      case 'datePicker' :
        return (
          <Fragment>
            <DatePickerType
              value={nowField.showTime}
              changeValue={this.changeValue}
            />
            <DefaultValueDatePicker
              value={nowField.detailProps.defaultValue}
              changeDetailProps={this.changeDetailProps}
              showTime={nowField.showTime}
            />
            <IsRequired
              value={nowField.required}
              changeValue={this.changeValue}
            />
            <IsEditable
              value={!nowField.disabled}
              changeValue={this.changeValue}
            />
          </Fragment>);
      case 'radioGroup':
        return (
          <Fragment>
            <RadioGroupOpitionEdit
              options={nowField.options}
              defaultValue={nowField.detailProps.defaultValue}
              changeDetailProps={this.changeDetailProps}
              changeValue={this.changeValue}
            />
            <IsRequired
              value={nowField.required}
              changeValue={this.changeValue}
            />
            <IsEditable
              value={!nowField.disabled}
              changeValue={this.changeValue}
            />
          </Fragment>);
      default:
        break;
    }
    return null;
  };

  render() {
    const { nowField } = this.props;
    if (!nowField) {
      return null;
    }
    return (
      <div>
        <EditName
          value={nowField.name}
          changeValue={this.changeValue}
          />
        <EditDescribe
          value={nowField.detailProps.describe}
          changeDetailProps={this.changeDetailProps}
        />
        {this.switchType()}
      </div>
    );
  }
}
