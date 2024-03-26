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

  // ajoute le personnage dans un fichier json a part avec un chemin spécifique

  static addCharacterToJson = async (id) => {
    try {
      // Récupérer les données du personnage depuis l'API
      const character = await this.getCharacter(id);

      // Charger les données actuelles du stockage local
      let jsonData = JSON.parse(localStorage.getItem("favoris") || "[]");

      // Vérifier si le personnage existe déjà dans le stockage local
      const existingCharacter = jsonData.find(
        (char) => char.id === character.id
      );
      if (existingCharacter) {
        alert("Le personnage existe déjà dans le stockage local.");
        return false; // Personnage déjà présent, donc ne pas l'ajouter à nouveau
      }

      // Ajouter le nouveau personnage
      jsonData.push(character);

      // Mettre à jour le stockage local avec les nouvelles données
      localStorage.setItem("favoris", JSON.stringify(jsonData));

      alert("Personnage ajouté avec succès dans les favoris.");
      return true;
    } catch (error) {
      alert(
        "Une erreur est survenue lors de l'ajout du personnage dans les favoris.",
        error
      );

      return false;
    }
  };

  // récupère les personnages favoris
  static fetchFavorites = async () => {
    try {
      // Charger les données actuelles du stockage local
      const jsonData = JSON.parse(localStorage.getItem("favoris") || "[]");
      return jsonData;
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la récupération des personnages favoris:",
        error
      );
      return [];
    }
  };

  // supprime un personnage des favoris
  static removeCharacterFromFavorites = async (id) => {
    try {
      // Charger les données actuelles du stockage local
      let jsonData = JSON.parse(localStorage.getItem("favoris") || "[]");

      // Trouver l'index du personnage avec l'ID spécifié
      const index = jsonData.findIndex((char) => char.id === id);
      console.log("index", index);

      // Supprimer le personnage du tableau s'il est trouvé
      if (index == -1) {
        dataToRemove = jsonData.splice(index, 1);
        console.log("jsonData", jsonData);

        // Filtrer les données pour supprimer l'entrée spécifique
        jsonData = jsonData.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(dataToRemove)
        );

        // Réécrire les données mises à jour dans le stockage local
        localStorage.setItem("favoris", JSON.stringify(jsonData));

        console.log("Personnage retiré avec succès des favoris.");
        return true;
      } else {
        console.log("Personnage introuvable dans les favoris.");
        return false;
      }
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de la suppression du personnage des favoris:",
        error
      );
      return false;
    }
  };
}
