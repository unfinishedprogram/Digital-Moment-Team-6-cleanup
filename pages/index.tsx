import input_styles from '../styles/input.module.scss'
import ButtonBase from '../src/components/general/button/button-base';
import ButtonConfirm from '../src/components/general/button/button-confirm';
import ButtonDanger from '../src/components/general/button/button-danger';

export default function Home() {

  return (<>
    <h1>Home</h1>
    <input type="username" placeholder='username' className={input_styles["text-input"]}></input>
    <input type="email" placeholder='email' className={input_styles["text-input"]}></input>
    <input type="checkbox" className={input_styles["checkbox-input"]}></input>

    <div>
      <ButtonBase>Click Me</ButtonBase>
      <ButtonConfirm>Confirm</ButtonConfirm>
      <ButtonDanger>Cancel</ButtonDanger>
    </div>
  </>)
}
