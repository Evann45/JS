import Utils from "../../services/Utils.js";
import CharacterProvider from "../../services/models.js";

export default class CharacterDetails {
  async render() {
    let request = Utils.parseRequestURL();
    let character = await CharacterProvider.getCharacter(request.id);

    if (character == undefined) {
      return /*html*/ `
        <section class="section">
          <h1>Personnage introuvable</h1>
          <p>Le personnage que vous cherchez n'existe pas.</p>
        </section>
      `;
    }

    let detailFruit = '';

    if (character.fruit) {
      detailFruit = fruitDetails(character.fruit);
    }

    let detailCrew = '';

    if (character.crew) {
      detailCrew = equipageDetails(character.crew);
    }

    return /*html*/ `
      <section class="section">
        <h1>${character.name}</h1>
        <div>
          <p>Age: ${character.age}</p>
          <p>Taille: ${character.size}</p>
          <p>Prime: ${character.bounty}<img src="Symbole_Berry.webp" alt="Berry"></p>
          <p>Rôle: ${character.job}</p>
          <p>Statut: ${character.status}</p>
        </div>
      </section>
      <button id="addFavoriteBtn">Ajouter aux favoris</button>
      ${detailFruit}
      ${detailCrew}
    `;
  }

  async afterRender() {
    document
      .getElementById("addFavoriteBtn")
      .addEventListener("click", async () => {
        let request = Utils.parseRequestURL();
        await CharacterProvider.addCharacterToJson(request.id);
      });
  }
}

const fruitDetails = (fruit) => {
  return /*html*/ `
    <section class="section">
      <h2>Fruit du démon</h2>
      <div>
        <p>Nom: ${fruit.name} (${fruit.roman_name})</p>
        <p>Type: ${fruit.type}</p>
        <p>Descritpion: ${fruit.description}</p>
      </div>
      <img src="${fruit.filename}" alt="${fruit.name}">
    </section>
  `;
}

const equipageDetails = (crew) => {
  return /*html*/ `
    <section class="section">
      <h2>Équipage</h2>
      <div>
        <p>Nom: ${crew.name} (${crew.roman_name})</p>
        <p>Nombre de membre: ${crew.number}</p>
        <p>Prime totale: ${crew.total_prime}<img src="Symbole_Berry.webp" alt="Berry"></p>
        ${crew.is_yonko ? '<p>Est un équipage de Yonko (Empereur des mers)</p>' : ''}
        <p>Status: ${crew.status}</p>
      </div>
    </section>
  `;
}
