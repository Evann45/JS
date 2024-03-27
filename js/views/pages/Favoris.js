import CharacterProvider from "../../services/models.js";

export default class Favoris {
  async render() {
    console.log("Favoris");
    let characters = await CharacterProvider.fetchFavorites();
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
                      <button class="btn btn-sm btn-outline-secondary remove-favorite-btn" data-id="${character.id}">- Retirer des favoris</button>
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
                        <h1 class="fw-light">Liste de vos personnages favoris</h1>
                    </div>
                </div>
            </section>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id="favorite-characters">
                ${html}
            </div>
        `;
  }

  async afterRender() {
    const removeFavoriteButtons = document.querySelectorAll(
      ".remove-favorite-btn"
    );
    removeFavoriteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const characterId = button.dataset.id;
        await this.removeFavorite(characterId);
      });
    });
  }

  async removeFavorite(id) {
    try {
      // Supprimer le personnage des favoris dans le stockage local
      await CharacterProvider.removeCharacterFromFavorites(id);

      // Supprimer le div correspondant du DOM
      const characterCard = document
        .querySelector(`[data-id="${id}"]`)
        .closest(".col");
      characterCard.remove();

      console.log("Personnage retiré avec succès des favoris.");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du personnage des favoris:",
        error
      );
    }
  }
}
