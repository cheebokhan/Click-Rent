import { addLanguage, Create, Get } from "../actions";
import {
  Post_AddNewText_URL,
} from "../constants/apiUrls";

let dictionary = null;
export const getTranslation = (text, defaultFrench, defaultGerman) => {
  text = "CR-" + text;
  // if (localStorage.getItem("lang") == null || localStorage.getItem("lang") == "") {
  //   localStorage.setItem("lang", "fr")
  // }
  if (dictionary === null) {
    dictionary = JSON.parse(localStorage.getItem("dictionary"));
  }

  try {
    // If the word does not exist in the dictionary then hit
    //API and add that word to dictionary with default language as
    //english and update the local storage dictionary obj
    if (!dictionary[text]) {
      dictionary[text] = {
        "en": text,
        "fr": defaultFrench,
        "gr": defaultGerman
      }
      addLanguage(
        {
          text: text,
          english: text,
          french: defaultFrench,
          german: defaultGerman,
        },
        (resp) => {
          // return dictionary[text][localStorage.getItem("lang")];
        },
        (error) => {
          // return text;
        }
      );
    } else if (dictionary[text][localStorage.getItem("lang")] === undefined || dictionary[text][localStorage.getItem("lang")] == null) {
      return text
    }
    return dictionary[text][localStorage.getItem("lang")];
  } catch (error) {
    return text;
  }
};

