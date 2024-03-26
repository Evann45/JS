import Home from "./views/pages/Home.js";
import Listing from "./views/pages/Listing.js";
import Details from "./views/pages/Details.js";
import Error404 from "./views/pages/Error404.js";
import Favoris from "./views/pages/Favoris.js";

import Utils from "./services/Utils.js";
import models from "./services/models.js";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  "/": Home,
  "/personnages": Listing,
  "/personnages/:id": Details,
  "/favoris": Favoris,
};

// Function to handle routing
const handleRouting = async () => {
  // Lazy load view element:
  const content = document.querySelector("#content");

  // Get the parsed URL from the addressbar
  let request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let PageComponent = routes[parsedURL] ? routes[parsedURL] : Error404;

  try {
    const page = new PageComponent(); // Instantiate the page component
    const renderedContent = await page.render(); // Render the page content
    content.innerHTML = renderedContent; // Update the content with the rendered page content
    if (typeof page.afterRender === "function") {
      await page.afterRender();
    }
  } catch (error) {
    console.error("Error rendering page: ", error);
    // Render an error page if rendering fails
    const errorPage = new Error404();
    content.innerHTML = await errorPage.render();
  }
};

// Function to handle routing on hash change or page load
const router = () => {
  handleRouting();
};

// Listen for hash changes and page load events
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
