import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputProps extends TextFieldProps {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <TextField
      label={label}
      {...props}
    />
  );
};

export default Input;
