// Load navbar and footer dynamically
window.addEventListener("DOMContentLoaded", () => {
  // For GitHub Pages, all HTML files are at the same directory level
  // So we'll always use relative paths from the current location
  console.log("Loading components - DOM Content Loaded");

  const getBasePath = () => {
    // For GitHub Pages, we always want to reference files at the root level
    // This works because all pages are in the same directory
    return "./";
  };

  const basePath = getBasePath();

  // Log the path we're trying to load
  console.log(`Attempting to load navbar from: ${basePath}navbar.html`);

  // Load navbar with proper path
  fetch(`${basePath}navbar.html`)
    .then((res) => {
      console.log(`Navbar fetch response:`, res.status, res.statusText);
      if (!res.ok) {
        throw new Error(
          `Failed to load navbar: ${res.status} ${res.statusText}`
        );
      }
      return res.text();
    })
    .then((data) => {
      const navbarElement = document.getElementById("navbar");
      if (navbarElement) {
        console.log("Navbar element found, inserting content");
        navbarElement.innerHTML = data;

        // Initialize mobile menu after navbar is loaded
        // This function is defined in mobileMenu.js
        if (typeof window.initMobileMenu === "function") {
          window.initMobileMenu();
          console.log("Mobile menu initialized");
        } else {
          console.warn("Mobile menu initialization function not found");
        }
      } else {
        console.error("Navbar element not found in the DOM");
      }
    })
    .catch((err) => {
      console.error("Error loading navbar:", err);
      // Fallback for navbar - show an error message
      const navbarElement = document.getElementById("navbar");
      if (navbarElement) {
        navbarElement.innerHTML = `
          <div class="bg-white shadow-md p-4">
            <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
              <div>
                <h1 class="text-xl font-bold text-red-600">Fedena</h1>
              </div>
              <div>
                <a href="index.html" class="text-gray-700 hover:text-red-600 px-3">Home</a>
                <a href="FAQ.html" class="text-gray-700 hover:text-red-600 px-3">FAQ</a>
              </div>
            </div>
          </div>
        `;
      }
    });

  // Log the path we're trying to load
  console.log(`Attempting to load footer from: ${basePath}footer.html`);

  // Load footer with proper path
  fetch(`${basePath}footer.html`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Failed to load footer: ${res.status} ${res.statusText}`
        );
      }
      return res.text();
    })
    .then((data) => {
      const footerElement = document.getElementById("footer");
      if (footerElement) {
        footerElement.innerHTML = data;
      } else {
        console.error("Footer element not found in the DOM");
      }
    })
    .catch((err) => console.error("Error loading footer:", err));
});