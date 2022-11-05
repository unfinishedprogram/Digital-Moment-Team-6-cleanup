import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

export interface IStrings extends LocalizedStringsMethods {
    username: string;
    email: string;
    password: string;
    repeat: string;
    age: string;
    location: string;
    register: string;
    requiredError: string;
    passwordError: string;
    repeatError: string;
    emailError: string;
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
    register: "Register",
    requiredError: "Required",
    passwordError: "Password must be at least 8 characters with 1 letter and 1 number",
    repeatError: "Password must match",
    emailError: "Must be a valid email",
  },
  fr:{
    username: "Nom d'utilisateur",
    email: "Adresse Électronique",
    password: "Mot de passe",
    repeat: "Répéter votre mot de passe",
    age: "Quel groupe d'âge fais-tu partie ?",
    location: "D'où viens-tu",
    register: "Enregistrer",
    requiredError: "Nom d'utilisateur obligatoire",
    passwordError: "Le mot de passe doit comporter au moins 8 caractèresd dont 1 lettre et 1 chiffre",
    repeatError: "Le mot de passe doit être le même",
    emailError: "L’adresse électronique doit être valide",
  }
});

export { strings };