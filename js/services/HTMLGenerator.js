export default class HTMLGenerator {
    static generateCard = (character, isFavorite) => {
        return /*html*/ `
            <div class="col box-card">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${character.image}" class="card-img-top" alt="${character.fullName}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${character.fullName}</h5>
                                ${character.nicknames.length > 0 ? `<p class="card-text">Surnoms: ${character.nicknamesList}</p>` : ""}
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <a href="#/personnage/${character.id}" class="btn btn-sm btn-outline-secondary">+ Détails</a>
                                        ${isFavorite ? `<button class="btn btn-sm btn-outline-secondary remove-favorite-btn" data-id="${character.id}">- Retirer des favoris</button>` : "<button class='btn btn-sm btn-outline-secondary add-favorite-btn' data-id='" + character.id + "'>+ Ajouter aux favoris</button>"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static generateCards = (characters, favorites) => {
        let cards = [];
        characters.forEach((character) => {
            let isFavorite = favorites.find((char) => char.id === character.id);
            cards.push(HTMLGenerator.generateCard(character, isFavorite));
        });
        return cards.join("");
    }

    static generateCharacterDetails = (character, isFavorite) => {
        return /*html*/ `
            <div class="row mt-5">
                <div class="col">
                    <div class="col-md-4 mb-5">
                        <img src="${character.image}" class="img-fluid" alt="${character.fullName}">
                    </div>
                    <div class="col-md-4">
                        ${isFavorite ? `<button class="btn btn-sm btn-outline-secondary remove-favorite-btn" data-id="${character.id}">- Retirer des favoris</button>` : "<button class='btn btn-sm btn-outline-secondary add-favorite-btn' data-id='" + character.id + "'>+ Ajouter aux favoris</button>"}
                    </div>
                </div>
                <div class="col-md-8">
                    <h2>${character.fullName}</h2>
                    <p class="text-muted">${character.name_kanji}</p>
                    <p>${character.aboutText}</p>
                </div>
            </div>
        `;
    }
}