import { ENDPOINT } from "../config.js";

export default class models {
  static fetchCharacters = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`${ENDPOINT}`, options);
      const json = await response.json();
      return json.slice(0, 3); // Renvoie seulement les trois premiers personnages
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
}
