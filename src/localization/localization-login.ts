import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

export interface IStrings extends LocalizedStringsMethods {
  login: string;
  loginMessage: string;
  username: string;
  password: string;
  noAccount: string;
  register: string;
  forgotPassword: string;
}

let strings: IStrings;
strings = new LocalizedStrings({
  en:{
    login :"Login",
    loginMessage: "Please Login",
    username: "Username",
    password: "Password",
    noAccount: "Haven’t signed up yet?",
    register: "Create an account",
    forgotPassword: "Forgot password?",
  },
  fr:{
    login :"Connexion",
    loginMessage: "Connectez-vous",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    noAccount: "Pas encore de compte ?",
    register: "S'inscrire",
    forgotPassword: "Réinitialiser mon mot de passe",
  }
})

export { strings };