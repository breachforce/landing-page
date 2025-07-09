// Mobile menu functionality
// Make the function globally available through the window object
window.initMobileMenu = function () {
  console.log("Initializing mobile menu...");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    console.log("Mobile menu elements found, attaching event listener");
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");

      // Toggle button icon
      const icon = mobileMenuButton.querySelector("svg");
      if (mobileMenu.classList.contains("hidden")) {
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        mobileMenuButton.setAttribute("aria-label", "Open menu");
      } else {
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        mobileMenuButton.setAttribute("aria-label", "Close menu");
      }
    });
  } else {
    console.warn("Mobile menu elements not found in the DOM");
  }

  // Handle mobile dropdown toggles
  const mobileDropdownButtons = document.querySelectorAll(
    "#mobile-menu button"
  );
  mobileDropdownButtons.forEach((button) => {
    if (button.id !== "mobile-menu-button") {
      button.addEventListener("click", function () {
        const dropdown = this.nextElementSibling;
        if (dropdown) {
          dropdown.classList.toggle("hidden");

          // Rotate arrow icon
          const arrow = this.querySelector("svg");
          if (dropdown.classList.contains("hidden")) {
            arrow.style.transform = "rotate(0deg)";
            this.classList.remove("bg-red-50", "text-red-600");
          } else {
            arrow.style.transform = "rotate(180deg)";
            this.classList.add("bg-red-50", "text-red-600");
          }
        }
      });
    }
  });
};