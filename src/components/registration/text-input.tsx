import { strings } from "../../localization/localization-login";

export type UsernameProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  input_style: string;
}

export default function TextInput(props: UsernameProps) {
  return (
    <input 
      placeholder={strings.username} 
      className={props.input_style} 
      type="text" 
      id="username"
      name="username" 
      onChange={props.handleChange} 
      value={props.value} 
      required 
    />
  )
}

