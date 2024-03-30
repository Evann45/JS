import { ENDPOINT } from "../config.js";
import Character from "../model/Chararcter.js";

export class Provider {

    static getCharacters = async () => {
        const response = await fetch(ENDPOINT);
        const json = await response.json();
        return json.map(item => Character.fromJson(item));
    }

    static getCharacter = async (id) =>{
        const response = await fetch(`${ENDPOINT}/${id}`);
        const json = await response.json();
        return Character.fromJson(json);
    }

    static getFavorites = async () => {
        const jsonData = JSON.parse(localStorage.getItem("favoris") || "[]");
        return jsonData.map(item => Character.fromJson(item));
    }
}