export default class ItemPage {
  async render() {
    const items = [
      {
        image: "chemin/vers/image1.jpg",
        name: "Item 1",
        description: "Description de l'item 1",
      },
      {
        image: "chemin/vers/image2.jpg",
        name: "Item 2",
        description: "Description de l'item 2",
      },
      {
        image: "chemin/vers/image3.jpg",
        name: "Item 3",
        description: "Description de l'item 3",
      },
      {
        image: "chemin/vers/image4.jpg",
        name: "Item 4",
        description: "Description de l'item 4",
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
    itemBlock.classList.add("item-block");

    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.name;

    const nameElement = document.createElement("h3");
    nameElement.textContent = item.name;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = item.description;

    itemBlock.appendChild(imageElement);
    itemBlock.appendChild(nameElement);
    itemBlock.appendChild(descriptionElement);

    return itemBlock;
  }
}

// Utilisation :
// const page = new ItemPage();
// const container = page.render();
// document.body.appendChild(container);
