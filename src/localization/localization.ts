import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

export interface IStrings extends LocalizedStringsMethods {
    username: string;
    email: string;
    password: string;
    repeat: string;
    age: string;
    location: string;
}

let strings: IStrings;
strings = new LocalizedStrings({
  en:{
    username: "Username",
    email: "Email",
    password: "Password",
    repeat: "Repeat Password",
    age: "What age group are you in?",
    location: "Where are you from ?",
  },
  fr:{
    username: "Nom d'utilisateur",
    email: "Adresse Électronique",
    password: "Mot de passe",
    repeat: "Répéter votre mot de passe",
    age: "Quel groupe d'âge fais-tu partie ?",
    location: "D'où viens-tu",

  }
});

export { strings };