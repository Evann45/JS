// Instantiate API
import models from "../../services/models.js";

export default class Listing {
  async render() {
    let characters = await models.fetchCharacters(); // Récupérer tous les personnages
    let html = characters
      .map(
        (character) => /*html*/ `
            <div class="col">
              <div class="card shadow-sm">
                <img src="${character.image}" class="bd-placeholder-img card-img-top" width="100%" height="225" role="img" aria-label="Placeholder: Thumbnail" focusable="false" alt="${character.name}">
                <div class="card-body">
                  <h5 class="card-title">${character.name}</h5>
                  <p class="card-text">Age: ${character.age}</p>
                  <p class="card-text">Taille: ${character.size}</p>
                  <p class="card-text">Prime: ${character.bounty}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <a href="#/personnages/${character.id}" class="btn btn-sm btn-outline-secondary">+ Détails</a>
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
            <h1 class="fw-light">One Piece</h1>
            <p class="lead text-body-secondary">Bienvenue dans l'univers de One Piece. Découvrez les personnages célèbres de ce manga captivant !</p>
          </div>
        </div>
      </section>
      <h2>Liste de tous les personnages</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        ${html}
      </div>
    `;
  }
}
