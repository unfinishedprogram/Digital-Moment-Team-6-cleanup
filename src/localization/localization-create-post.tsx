import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

export interface IStrings extends LocalizedStringsMethods {
  title: string;
  postTitle: string;
  postBody: string;
  tags: string;
}

let strings: IStrings;
strings = new LocalizedStrings({
  en:{
    title: "New Post",
    postTitle: "Title",
    postBody: "Body Text",
    tags: "Tags"
  },
  fr:{
    title: "Nouveau Post",
    postTitle: "Titre",
    postBody: "Écriver ici",
    tags: "Étiquettes"
  }
})

export { strings };