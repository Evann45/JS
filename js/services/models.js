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
      if (from && to) {
        return json.slice(from, to);
      }
      if (from) {
        return json.slice(from);
      }
      if (to) {
        return json.slice(0, to);
      }
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

      let foundKey = null; // Initialisez la variable pour stocker la clé trouvée

      // Parcourir les éléments du localStorage
      for (let i = 0; i < jsonData.length; i++) {
        // Vérifier si l'ID du personnage stocké correspond à celui recherché
        console.log(
          "jsonData[i].id",
          jsonData[i].id,
          "id rechercher",
          id,
          "index",
          i
        );
        if (jsonData[i].id == id) {
          console.log("Personnage trouvé dans les favoris:", jsonData[i]);
          foundKey = i; // Stocker la clé correspondante dans la variable foundKey
          break; // Sortir de la boucle une fois que le personnage est trouvé
        }
      }

      // Supprimer le personnage du tableau s'il est trouvé
      try {
        jsonData.splice(foundKey, 1); // Supprimer l'élément du tableau
        console.log("jsonData", jsonData);

        // Filtrer les données pour supprimer l'entrée spécifique
        jsonData = jsonData.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(jsonData)
        );

        // Réécrire les données mises à jour dans le stockage local
        localStorage.setItem("favoris", JSON.stringify(jsonData));

        console.log("Personnage retiré avec succès des favoris.");
        return true;
      } catch (error) {
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
      const characters = json.filter((character) =>
        character.name
          .toLowerCase()
          .includes(name.replaceAll("%20", " ").toLowerCase())
      );
      console.log(characters);
      if (characters.length > 27) {
        return characters.slice(0, 27);
      }
      return characters;
    } catch (err) {
      console.log("Error getting character details", err);
    }
  };
}
