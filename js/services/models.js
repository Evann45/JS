import { ENDPOINT } from "../config.js";

export default class models {
  static fetchCharacters = async (from = null, to = null) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`${ENDPOINT}`, options);
      const json = await response.json();
      if (from && to) { return json.slice(from, to); }
      if (from) { return json.slice(from); }
      if (to) { return json.slice(0, to); }
      return json;
    } catch (err) {
      console.log("Error getting characters", err);
      return []; // Retourne un tableau vide en cas d'erreur
    }
  };

  static getCharacter = async (id) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`${ENDPOINT}/${id}`, options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log("Error getting character details", err);
    }
  };

  static rechercheCharacter = async (name) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`${ENDPOINT}`, options);
      const json = await response.json();
      console.log(json);
      const characters = json.filter((character) => character.name.toLowerCase().includes(name.replaceAll('%20', ' ').toLowerCase()));
      console.log(characters);
      if (characters.length > 27) {
        return characters.slice(0, 27);
      }
      return characters;
    } catch (err) {
      console.log("Error getting character details", err);
    }
  }
}
