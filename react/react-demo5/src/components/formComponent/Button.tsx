import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from '@/type/componentsType'

const ButtonComponent = (props: ButtonProps) => {
  const {
    type= 'default',
    htmlType= 'button',
    ButtonTxt= ''
  } = props || {};

  return (
    <Button
      type={type}
      htmlType={htmlType}
    >
      {ButtonTxt}
    </Button>
  )
};

export default ButtonComponent;
