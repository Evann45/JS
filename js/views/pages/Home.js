// Instantiate API
import CharacterProvider from "../../services/models.js";

export default class Home {
  async render() {
    let characters = await CharacterProvider.fetchCharacters(3); // Récupère les trois premiers personnages
    let html = characters
      .map(
        (character) => /*html*/ `
            <div class="col">
              <div class="card shadow-sm">
                <img src="${character.image}" class="bd-placeholder-img card-img-top" width="100%" height="225" role="img" aria-label="Placeholder: Thumbnail" focusable="false">
                <div class="card-body">
                  <h5 class="card-title">${character.name}</h5>
                  <p class="card-text">Age: ${character.age}</p>
                  <p class="card-text">Taille: ${character.size}</p>
                  <p class="card-text">Prime: ${character.bounty}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <a href="#/personnages/${character.id}" class="btn btn-sm btn-outline-secondary">+ Détail</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `
      )
      .join("\n ");

    return /*html*/ `
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Liste des personnages</h1>
                        <p class="lead text-body-secondary">Voici les trois premiers personnages</p>
                    </div>
                </div>
            </section>
            <h2>Les 3 premiers personnages</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${html}
            </div>
        `;
  }
}
