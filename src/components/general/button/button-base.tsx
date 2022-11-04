import React, { PropsWithChildren } from "react";
import styles from "../../../../styles/button.module.scss";

interface IButtonProps {
  disabled?: boolean,
}

export default class ButtonBase extends React.Component<PropsWithChildren<IButtonProps>>{
  render(): React.ReactNode {
    const { disabled, children } = this.props;
    return (
      <div className={`${styles.button} ${disabled ? styles.disabled : ""}`}>
        {children}
      </div>
    )
  }
}