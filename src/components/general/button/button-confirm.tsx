import React, { PropsWithChildren } from "react";
import styles from "../../../../styles/button.module.scss";

interface IButtonProps {
  disabled?: boolean,
  type?: "button" | "submit" | "reset" | undefined,
}

export default class ButtonConfirm extends React.Component<PropsWithChildren<IButtonProps>>{
  render(): React.ReactNode {
    const { disabled, type, children } = this.props;
    return (
      <button type={type} className={`${styles.button} ${styles.confirm} ${disabled ? styles.disabled : ""}`}>
        {children}
      </button>
    )
  }
}