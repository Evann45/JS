export default class ItemPage {
  async render() {
    const items = [
      {
        image: "./../../static/image/Den_Den_Mushi.webp",
        name: "Telephone",
        description:
          "Les Escargophones[3] (電伝虫, Den Den Mushi), souvent appelés Den Den Mushi, sont des escargots qui sont habituellement vus avec des téléphones et/ou des fax attachés à leurs coquilles.",
      },
      {
        image: "./../../static/image/Vest_marine.jpg",
        name: "Veste militaire",
        description:
          "Cosplay de l’univers One Piece pour les vrais pirates, idéal pour incarné ton personnage préféré",
      },
      {
        image: "./../../static/image/chapeau.jpg",
        name: "Chapeau de paille",
        description:
          "Le chapeau de paille est le symbole de l'équipage de Luffy",
      },
      {
        image: "./../../static/image/epee.webp",
        name: "Epee",
        description: "Epee de Zoro, le sabreur de l'équipage de Luffy",
      },
    ];

    const itemBlocks = items.map((item) => this.createItemBlock(item));

    const container = document.createElement("div");
    container.classList.add("item-container");
    itemBlocks.forEach((block) => container.appendChild(block));

    return container;
  }

  createItemBlock(item) {
    const itemBlock = document.createElement("div");
    itemBlock.classList.add("col");

    itemBlock.addEventListener("click", () => {
      localStorage.setItem("selectedItem", item.image); // Enregistrer l'élément sélectionné
      window.location.hash = "#/"; // Rediriger vers la page d'accueil
    });

    const card = document.createElement("div");
    card.classList.add("card", "shadow-sm");

    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.name;
    imageElement.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const titleElement = document.createElement("h5");
    titleElement.classList.add("card-title");
    titleElement.textContent = item.name;

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("card-text");
    descriptionElement.textContent = item.description;

    cardBody.appendChild(titleElement);
    cardBody.appendChild(descriptionElement);

    card.appendChild(imageElement);
    card.appendChild(cardBody);

    itemBlock.appendChild(card);

    return itemBlock;
  }
}
