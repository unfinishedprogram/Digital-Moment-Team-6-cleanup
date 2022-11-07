import React, { useState } from "react";
import input_styles from '../../../../styles/input.module.scss'

interface Props {
  isChecked: boolean;
  label: string;
  id: string;
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: Props) => {
  return (
    <div className={input_styles['text-input']}>
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
    </div>
  );
};
export default Checkbox;