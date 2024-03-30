import { Provider } from "../../provider/Provider.js";
import HTMLGenerator from "../../services/HTMLGenerator.js";

export default class Home {
  async render() {
    let characters = await Provider.getCharacters();
    characters = characters.slice(0, 6);

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
            <h2>Les 6 premiers personnages</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${html}
            </div>
        `;
  }
}
