import { Provider } from "../../provider/Provider.js";
import HTMLGenerator from "../../services/HTMLGenerator.js";


export default class Favoris {
  async render() {
    console.log("Favoris");
    let characters = await Provider.getFavorites();
    let html = HTMLGenerator.generateCards(characters, characters);


    if (characters.length == 0) {
        html = `<h2>Vous n'avez pas de favoris</h2>`
    }

    return /*html*/ `
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Liste de vos personnages favoris</h1>
                    </div>
                </div>
            </section>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id="favorite-characters">
                ${html}
            </div>
        `;
  }
}
