// Instantiate API
import { Provider } from "../../provider/Provider.js";
import HTMLGenerator from "../../services/HTMLGenerator.js";
import Utils from "../../services/Utils.js";

export default class Listing {
  async render() {
    let request = Utils.parseRequestURL();
    let recherche = request.id;

    let characters = await Provider.getCharacters();
    characters = characters.filter((character) => character.name.toLowerCase().includes(recherche.toLowerCase()));
    let html = HTMLGenerator.generateCards(characters, await Provider.getFavorites());

    return /*html*/ `   
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <img src="./imgs/logo_one_piece_grand.png" alt="One Piece" class="img-fluid" />
            <p class="lead text-body-secondary">Bienvenue dans l'univers de One Piece. Découvrez les personnages célèbres de ce manga captivant !</p>
          </div>
        </div>
      </section>

     
      <form class="form-inline" onsubmit="window.location.hash = '#/recherche/' + document.getElementById('floatingInput').value">
        <div class="mb-3 input-group">
          <input type="text" class="form-control" id="floatingInput" placeholder="Rechercher" name="recherche">
          <button type="submit" class="btn btn-outline-primary" id="button-addon2" onclick="window.location.hash = '#/recherche/' + document.getElementById('floatingInput').value">Rechercher</button>
        </div>
      </form>

      <h2>Liste de tous les personnages</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        ${html}
      </div>
    `;
  }
}
