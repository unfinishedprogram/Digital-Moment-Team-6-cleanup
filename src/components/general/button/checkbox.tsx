import React, { useState } from "react";
interface Props{
  isChecked: boolean;
  label: string;
  id: string;
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: Props) =>{
  return(
    <label htmlFor={props.label}>
      {props.label}
      <input 
        type="checkbox" 
        id={props.id}
        value={props.value}
        checked={props.isChecked} 
        onChange={props.handleChange}
      />
    </label>
  );
};
export default Checkbox;