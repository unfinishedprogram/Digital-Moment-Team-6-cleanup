import React, { PropsWithChildren } from "react";
import styles from "../../../../styles/button.module.scss";

interface IButtonProps {
  disabled?: boolean,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: () => any;
}

export default class ButtonConfirm extends React.Component<PropsWithChildren<IButtonProps>>{
  render(): React.ReactNode {
    const { onClick, disabled, type, children } = this.props;
    return (
      <button onClick={onClick} type={type} className={`${styles.button} ${styles.confirm} ${disabled ? styles.disabled : ""}`}>
        {children}
      </button>
    )
  }
}
