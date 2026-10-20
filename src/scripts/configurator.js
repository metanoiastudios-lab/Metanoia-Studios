const config = {
  businessType: "restaurant",

  sections: {
    hero: true,
    about: true,
    services: true,
    products: false,
    menu: false,
    gallery: true,
    testimonials: false,
    reservations: true,
    contact: true,
    map: true,
  },

  theme: "dark",
};

const businessNames = {
  restaurant: "Restaurante",
  barbershop: "Barbería",
  store: "Tienda",
  gym: "Gimnasio",
  other: "Otro negocio",
};

const sectionNames = {
  hero: "Inicio",
  about: "Sobre nosotros",
  services: "Servicios",
  products: "Productos",
  menu: "Menú",
  gallery: "Galería",
  testimonials: "Testimonios",
  reservations: "Reservas",
  contact: "Contacto",
  map: "Mapa",
};

const themeNames = {
  dark: "Dark",
  light: "Light",
  violet: "Violet",
};

const businessOptions = document.querySelectorAll("[data-business]");

const sectionOptions = document.querySelectorAll("[data-section]");

const themeOptions = document.querySelectorAll("[data-theme]");

const previewSections = document.querySelectorAll("[data-preview-section]");

const summary = document.querySelector("#configurator-summary");

const preview = document.querySelector("#site-preview");

const contactButton = document.querySelector("#configurator-contact");

// --------------------------------
// BUSINESS TYPE
// --------------------------------

businessOptions.forEach((button) => {
  button.addEventListener("click", () => {
    config.businessType = button.dataset.business;

    updateBusinessButtons();

    updateContactLink();
  });
});

function updateBusinessButtons() {
  businessOptions.forEach((button) => {
    const active = button.dataset.business === config.businessType;

    button.classList.toggle("border-[#8B5CF6]", active);

    button.classList.toggle("bg-[#8B5CF6]/10", active);

    button.classList.toggle("border-white/10", !active);

    button.classList.toggle("bg-transparent", !active);
  });
}

// --------------------------------
// SECTIONS
// --------------------------------

sectionOptions.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const section = checkbox.dataset.section;

    config.sections[section] = checkbox.checked;

    updatePreview();

    updateSummary();

    updateContactLink();
  });
});

// --------------------------------
// THEMES
// --------------------------------

themeOptions.forEach((button) => {
  button.addEventListener("click", () => {
    config.theme = button.dataset.theme;

    updateThemeButtons();

    updateTheme();
  });
});

function updateThemeButtons() {
  themeOptions.forEach((button) => {
    const active = button.dataset.theme === config.theme;

    button.classList.toggle("border-[#8B5CF6]", active);

    button.classList.toggle("bg-[#8B5CF6]/10", active);

    button.classList.toggle("border-white/10", !active);
  });
}

// --------------------------------
// PREVIEW
// --------------------------------

function updatePreview() {
  previewSections.forEach((section) => {
    const sectionName = section.dataset.previewSection;

    const enabled = config.sections[sectionName];

    section.classList.toggle("hidden", !enabled);
  });
}

// --------------------------------
// THEME
// --------------------------------

function updateTheme() {
  if (!preview) return;

  preview.classList.remove("bg-[#17141F]", "bg-[#F5F3FF]", "bg-[#6D28D9]");

  if (config.theme === "dark") {
    preview.classList.add("bg-[#17141F]");

    preview.classList.remove("text-[#0D0B12]");
  }

  if (config.theme === "light") {
    preview.classList.add("bg-[#F5F3FF]");

    preview.classList.add("text-[#0D0B12]");
  }

  if (config.theme === "violet") {
    preview.classList.add("bg-[#6D28D9]");

    preview.classList.remove("text-[#0D0B12]");
  }
}

// --------------------------------
// SUMMARY
// --------------------------------

function updateSummary() {
  if (!summary) return;

  summary.innerHTML = "";

  const businessBadge = document.createElement("span");

  businessBadge.className =
    "rounded-full bg-[#8B5CF6]/10 px-4 py-2 font-[Inter] text-xs text-[#C4B5FD]";

  businessBadge.textContent = businessNames[config.businessType];

  summary.appendChild(businessBadge);

  Object.entries(config.sections)
    .filter(([, enabled]) => enabled)
    .forEach(([section]) => {
      const badge = document.createElement("span");

      badge.className =
        "rounded-full bg-white/5 px-4 py-2 font-[Inter] text-xs text-[#918CA3]";

      badge.textContent = sectionNames[section];

      summary.appendChild(badge);
    });

  const themeBadge = document.createElement("span");

  themeBadge.className =
    "rounded-full bg-white/5 px-4 py-2 font-[Inter] text-xs text-[#918CA3]";

  themeBadge.textContent = `Estilo: ${themeNames[config.theme]}`;

  summary.appendChild(themeBadge);
}

// --------------------------------
// CONTACT
// --------------------------------

function updateContactLink() {
  if (!contactButton) return;

  const selectedSections = Object.entries(config.sections)
    .filter(([, enabled]) => enabled)
    .map(([section]) => sectionNames[section])
    .join(", ");

  const subject = encodeURIComponent(
    `Proyecto web - ${businessNames[config.businessType]}`,
  );

  const body = encodeURIComponent(
    `Hola Metanoia,

Estoy interesado en crear una web para mi negocio.

Tipo de negocio:
${businessNames[config.businessType]}

Secciones:
${selectedSections}

Estilo:
${themeNames[config.theme]}

Me gustaría hablar sobre el proyecto.

Gracias.`,
  );

  contactButton.href = `mailto:hola@metanoia.studio?subject=${subject}&body=${body}`;
}

// --------------------------------
// INITIAL STATE
// --------------------------------

updateBusinessButtons();

updateThemeButtons();

updatePreview();

updateTheme();

updateSummary();

updateContactLink();
