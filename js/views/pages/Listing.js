// Instantiate API
import CharacterProvider from "../../services/models.js";
import Utils from "../../services/Utils.js";

export default class Listing {
  async render() {
    let request = Utils.parseRequestURL();
    let page = request.id ? request.id : 1;
    try {
      page = parseInt(page);
    } catch (error) {}
    let characters = await CharacterProvider.fetchCharacters() // Récupérer tous les personnages
    let lastPage = Math.ceil(characters.length / 27);

    let charactersToRender = await CharacterProvider.fetchCharacters(0 + (page - 1) * 27, 27 * page);
    let html = charactersToRender
      .map(
        (character) => /*html*/ `
            <div class="col">
              <div class="card shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">${character.name}</h5>
                  <p class="card-text">Age: ${character.age}</p>
                  <p class="card-text">Taille: ${character.size}</p>
                  <p class="card-text">Prime: ${character.bounty}<img src="Symbole_Berry.webp" alt="Berry"></p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <a href="#/personnage/${character.id}" class="btn btn-sm btn-outline-secondary">+ Détails</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `
      )
      .join("\n ");

    let numPageContent = Array.from({ length: 4 }, (_, i) => {
      let num = i + 1 + (page - 1);
      if (num > lastPage) {
        return '';
      }
      return /*html*/ `
        <li class="page-item ${num === page ? 'active' : ''}">
          <a class="page-link" href="#/personnages/${num}">${num}</a>
        </li>
      `;
    }).join("\n ");

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
      <div class="container mt-5">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item ${page === 1 ? 'disabled' : ''}">
              <a class="page-link" href="#/personnages/${page - 1}">Previous</a>
            </li>
            ${page > 3 ? '<li class="page-item"><a class="page-link" href="#/personnages/1">1</a></li>' : ''}
            ${numPageContent}
            ${page < lastPage - 2 ? '<li class="page-item"><a class="page-link" href="#/personnages/' + lastPage + '">' + lastPage + '</a></li>' : ''}
            <li class="page-item ${page === lastPage ? 'disabled' : ''}">
              <a class="page-link" href="#/personnages/${page + 1}">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    `;
  }
}
