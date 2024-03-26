import Utils from "../../services/Utils.js";
import CharacterProvider from "../../services/models.js";

export default class CharacterDetails {
  async render() {
    let request = Utils.parseRequestURL();
    let character = await CharacterProvider.getCharacter(request.id);

    return /*html*/ `
      <section class="section">
        <h1>${character.name}</h1>
        <div>
          <img src="${character.image}" alt="${character.name}" style="max-width: 300px;">
        </div>
        <div>
          <p>Age: ${character.age}</p>
          <p>Taille: ${character.size}</p>
          <p>Prime: ${character.bounty}</p>
          <p>Métier: ${character.job}</p>
          <p>Statut: ${character.status}</p>
          <p>Équipage: ${character.crew.name}</p>
        </div>
      </section>
      <button id="addFavoriteBtn">Ajouter aux favoris</button>
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
