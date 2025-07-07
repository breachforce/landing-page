// Standardized Accordion functionality for all pages
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content loaded, initializing accordion...");

  // Try to initialize immediately
  initAccordion();

  // Also initialize after a short delay to make sure all content is loaded
  setTimeout(initAccordion, 500);
});

function initAccordion() {
  console.log("Initializing accordion...");

  // Target all accordion containers across the site with more flexible selectors
  // This selector will find FAQ accordion buttons more reliably
  const accordionButtons = document.querySelectorAll(
    ".bg-white.shadow-lg button, .bg-white[class*='rounded'] button"
  );

  console.log("Found accordion buttons:", accordionButtons.length);

  if (accordionButtons.length > 0) {
    // Initialize standard accordions
    initStandardAccordions(accordionButtons);
  } else {
    console.log(
      "No standard accordion buttons found. Trying alternative selectors..."
    );

    // Try a more general approach - find any button inside a white background container
    const fallbackButtons = document.querySelectorAll(
      ".space-y-4 .bg-white button, .space-y-6 .bg-white button"
    );

    console.log("Found fallback accordion buttons:", fallbackButtons.length);

    if (fallbackButtons.length > 0) {
      initStandardAccordions(fallbackButtons);
    }
  }
}

function initStandardAccordions(accordionButtons) {
  // Preset FAQs and answers - used when dynamic content doesn't exist
  const faqAnswers = {
    "What is School Management Software?": `<p class="text-gray-600 text-sm sm:text-base leading-relaxed">School management software helps institutes manage and automate school activities for students, teachers, and administrators. It allows schools to handle daily operations, including attendance, exams, fees, timetables, and more, in a centralized system. This improves the efficiency and productivity of the school.</p><p class="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">The software assists in managing daily activities such as attendance, timetables, exams, fees, and other administrative tasks. It also supports communication, examination management, payroll, and online learning. Cloud ERP software typically offers 50+ features to help institutions handle various activities easily.</p>`,

    "How does Fedena improve communication?": `<p class="text-gray-600 text-sm sm:text-base leading-relaxed">Fedena offers multiple communication channels, including internal messaging, SMS, email integration, and a parent portal. This ensures seamless communication between teachers, students, parents, and administrators, keeping everyone informed about important updates, events, and academic progress.</p>`,

    "Is Fedena suitable for all types of educational institutions?": `<p class="text-gray-600 text-sm sm:text-base leading-relaxed">Yes, Fedena is designed to be flexible and scalable, making it suitable for various educational institutions, including K-12 schools, colleges, universities, training centers, and coaching institutes. Its modular design allows institutions to choose the features that best fit their specific needs.</p>`,

    "Can Fedena be accessed on mobile devices?": `<p class="text-gray-600 text-sm sm:text-base leading-relaxed">Absolutely! Fedena is a web-based application with a responsive design, ensuring it works seamlessly on desktops, laptops, tablets, and smartphones. Additionally, Fedena offers dedicated mobile apps for Android and iOS to provide an optimized mobile experience for users.</p>`,

    "How is Fedena different from other school management software?": `<p class="text-gray-600 text-sm leading-relaxed">Fedena stands out with its 100+ integrated modules, mobile apps, and 24/7 support system. Unlike other systems, it offers a user-friendly interface, is compatible with all education boards, and provides comprehensive features from student management to financial reporting.</p>`,

    "What kind of software programs do I require to run Fedena?": `<p class="text-gray-600 text-sm leading-relaxed">Fedena is a web-based application that only requires a modern web browser like Chrome, Firefox, or Edge. No additional software installation is needed as it runs entirely in the cloud.</p>`,

    "Can Fedena ERP software be customized for my Institute?": `<p class="text-gray-600 text-sm leading-relaxed">Yes, Fedena can be fully customized to meet the specific requirements of your institution. We offer tailored solutions for different educational boards and institute types.</p>`,

    "Does Fedena provide data backup facility?": `<p class="text-gray-600 text-sm leading-relaxed">Yes, Fedena provides automated daily backups with enterprise-grade security. Your data is safely stored with redundancy to prevent any loss.</p>`,

    "What measures do we take for data security?": `<p class="text-gray-600 text-sm leading-relaxed">Fedena implements bank-grade security measures including encryption, secure data centers, regular security audits, and GDPR compliance to ensure your institution's data remains protected.</p>`,

    // Add more FAQ answers as needed
  };

  accordionButtons.forEach((button) => {
    // Skip if button has already been initialized
    if (button.hasAttribute("data-initialized")) {
      return;
    }

    // Mark as initialized
    button.setAttribute("data-initialized", "true");

    // Find the corresponding content div
    const contentDiv = button.nextElementSibling;

    if (!contentDiv) {
      console.log("No content div found for button:", button);
      return;
    }

    // If the content is empty and we have a preset answer, populate it
    if (
      contentDiv &&
      (!contentDiv.querySelector(".p-4, .p-6") ||
        contentDiv.querySelector(".p-4, .p-6").innerHTML.trim() === "")
    ) {
      const question = button.querySelector("span").textContent.trim();
      if (faqAnswers[question]) {
        const innerContent = document.createElement("div");
        innerContent.className = "p-4 sm:p-6 border-t border-gray-200";
        innerContent.innerHTML = faqAnswers[question];

        // Clear existing content and add our new content
        contentDiv.innerHTML = "";
        contentDiv.appendChild(innerContent);
      }
    }

    button.addEventListener("click", () => {
      // Close other open accordions
      accordionButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          const otherContent = otherButton.nextElementSibling;
          if (otherContent) {
            // Reset height
            otherContent.style.maxHeight = "0px";

            // Reset styles on the button
            otherButton.classList.remove("text-red-600");
            const otherSpan = otherButton.querySelector("span");
            if (otherSpan) otherSpan.classList.remove("text-red-600");

            // Reset icon rotation
            const otherIcon = otherButton.querySelector("svg");
            if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
          }
        }
      });

      // Toggle current accordion
      if (contentDiv) {
        if (
          contentDiv.style.maxHeight &&
          contentDiv.style.maxHeight !== "0px"
        ) {
          // Collapse
          contentDiv.style.maxHeight = "0px";

          // Reset styles
          button.classList.remove("text-red-600");
          const span = button.querySelector("span");
          if (span) span.classList.remove("text-red-600");

          // Reset icon rotation
          const icon = button.querySelector("svg");
          if (icon) icon.style.transform = "rotate(0deg)";
        } else {
          // Expand
          contentDiv.style.maxHeight = contentDiv.scrollHeight + "px";

          // Apply active styles
          button.classList.add("text-red-600");
          const span = button.querySelector("span");
          if (span) span.classList.add("text-red-600");

          // Rotate icon
          const icon = button.querySelector("svg");
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      }
    });
  });
}

// Make sure to initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initAccordion);

// Export the function so it can be used in other files if needed
window.initAccordion = initAccordion;