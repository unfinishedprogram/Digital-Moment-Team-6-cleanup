import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

export interface IStrings extends LocalizedStringsMethods {
    username: string;
    email: string;
    password: string;
    repeat: string;
    age: string;
    location: string;
    register: string;
    preferences: string,
    languages: string,
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
    preferences: "Pick some tags you're interested in",
    languages:"What languages do you speak ?",
    requiredError: "Required",
    passwordError: "Password must be at least 10 characters with 1 letter, 1 number and special character",
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
    preferences: "Choisi quelques étiquettes qui t'intéresses",
    languages:"Quelles langues parles-tu ?",
    requiredError: "Nom d'utilisateur obligatoire",
    passwordError: "Le mot de passe doit comporter au moins 10 caractères dont 1 lettre, 1 chiffre et 1 caractères",
    repeatError: "Le mot de passe doit être le même",
    emailError: "L’adresse électronique doit être valide",
  }
});

export { strings };