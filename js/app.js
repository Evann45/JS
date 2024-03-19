import Home from "./views/pages/Home.js";
import Listing from "./views/pages/Listing.js";
import Details from "./views/pages/Details.js";
import Error404 from "./views/pages/Error404.js";

import Utils from "./services/Utils.js";
import { ENDPOINT } from "./config.js";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  "/": Home,
  "/personnages": Listing,
  "/personnages/:id": Details,
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

  // If the URL is /personnages, fetch data from API
  if (parsedURL === "/personnages") {
    try {
      const response = await fetch(`${ENDPOINT}`);
      const data = await response.json();
      // Pass the data to the Listing page
      content.innerHTML = await new Listing(data).render();
    } catch (error) {
      console.error("Error fetching data: ", error);
      // Render an error page if fetching data fails
      content.innerHTML = await new Error404().render();
    }
  } else {
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? new routes[parsedURL]() : Error404;

    content.innerHTML = await page.render();
  }
};

// Function to handle routing on hash change or page load
const router = () => {
  handleRouting();
};

// Listen for hash changes and page load events
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
