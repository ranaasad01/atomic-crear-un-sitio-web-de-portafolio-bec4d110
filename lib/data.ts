export type NavLink = {
  label: string;
  href: string;
};

export const APP_NAME = "Alex Moreno";
export const APP_TAGLINE = "Desarrollador Full Stack";
export const APP_EMAIL = "hola@alexmoreno.dev";
export const APP_GITHUB = "https://github.com/alexmoreno";
export const APP_LINKEDIN = "https://linkedin.com/in/alexmoreno";
export const APP_TWITTER = "https://twitter.com/alexmoreno";

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Contacto", href: "#contacto" },
];

export const CTA_LABEL = "Descargar CV";
export const CTA_HREF = "/cv-alex-moreno.pdf";