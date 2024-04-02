import FavoriteManager from "./FavoriteManager.js";
import LazyLoad from "./lazyLoad.js";

const Utils = { 
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL : () => {

        let url = location.hash.slice(1) || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    }

    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    , afterRender: async () => {
      LazyLoad.initLazyLoad('box-card')
      const removeFavoriteButtons = document.querySelectorAll(
        ".remove-favorite-btn"
      );
      removeFavoriteButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          const characterId = button.dataset.id;
          await FavoriteManager.removeCharacterFromFavorites(characterId);
          window.location.reload();
        });
      });
    
      const addFavoriteButtons = document.querySelectorAll(".add-favorite-btn");
      addFavoriteButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          const characterId = button.dataset.id;
          await FavoriteManager.addCharacterToJson(characterId);
          window.location.reload();
        });
      });
    }
}

export default Utils;