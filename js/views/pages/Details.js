import Utils from "../../services/Utils.js";
import HTMLGenerator from "../../services/HTMLGenerator.js";
import { Provider } from "../../provider/Provider.js";

export default class CharacterDetails {
  async render() {
    let request = Utils.parseRequestURL();
    let character = await Provider.getCharacter(request.id);

    if (character == undefined) {
      return /*html*/ `
        <section class="section">
          <h1>Personnage introuvable</h1>
          <p>Le personnage que vous cherchez n'existe pas.</p>
        </section>
      `;
    }

    const favoris = await Provider.getFavorites();
    return HTMLGenerator.generateCharacterDetails(character, favoris.find((char) => char.id === character.id) !== undefined);
  }
}
