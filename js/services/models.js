import { ENDPOINT } from "../config.js";

export default class models {
  static fetchCharacters = async (limit = 3) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`${ENDPOINT}/?_limit=${limit}`, options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log("Error getting characters", err);
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