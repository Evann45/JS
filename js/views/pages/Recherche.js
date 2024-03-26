// Instantiate API
import CharacterProvider from "../../services/models.js";
import Utils from "../../services/Utils.js";

export default class Listing {
  async render() {
    let request = Utils.parseRequestURL();
    console.log(request)
    let recherche = request.id;

    let characters = await CharacterProvider.rechercheCharacter(recherche) // Récupérer tous les personnages
    console.log(characters)
    let html = characters
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

    return /*html*/ `   
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">One Piece</h1>
            <p class="lead text-body-secondary">Bienvenue dans l'univers de One Piece. Découvrez les personnages célèbres de ce manga captivant !</p>
          </div>
        </div>
      </section>

     
      <div class="mb-3 input-group">
        <input type="text" class="form-control" id="floatingInput" placeholder="Rechercher" name="recherche">
        <button type="submit" class="btn btn-outline-primary" id="button-addon2" onclick="window.location.hash = '#/recherche/' + document.getElementById('floatingInput').value">Rechercher</button>
      </div>

      <h2>Liste de tous les personnages</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        ${html}
      </div>
    `;
  }
}
