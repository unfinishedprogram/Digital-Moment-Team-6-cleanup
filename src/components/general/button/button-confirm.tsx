import React, { PropsWithChildren } from "react";
import styles from "../../../../styles/button.module.scss";

interface IButtonProps {
  disabled?: boolean,
}

export default class ButtonConfirm extends React.Component<PropsWithChildren<IButtonProps>>{
  render(): React.ReactNode {
    const { disabled, children } = this.props;
    return (
      <div className={`${styles.button} ${styles.confirm} ${disabled ? styles.disabled : ""}`}>
        {children}
      </div>
    )
  }
}