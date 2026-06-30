"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowUp } from 'lucide-react';
import { navLinks, APP_NAME, APP_TAGLINE, APP_EMAIL, APP_GITHUB, APP_LINKEDIN, APP_TWITTER } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const pathname = usePathname();

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <Link
              href="/"
              className="font-space font-bold text-2xl tracking-tight text-zinc-100 hover:text-amber-400 transition-colors"
            >
              <span className="text-amber-400">A</span>
              {APP_NAME.slice(1)}
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              {APP_TAGLINE}. Construyendo interfaces que importan, un proyecto a la vez.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={APP_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 hover:text-amber-400 hover:bg-zinc-800 rounded-md transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={APP_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 hover:text-amber-400 hover:bg-zinc-800 rounded-md transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={APP_TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 hover:text-amber-400 hover:bg-zinc-800 rounded-md transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href={`mailto:${APP_EMAIL}`}
                className="p-2 text-zinc-500 hover:text-amber-400 hover:bg-zinc-800 rounded-md transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Navegación
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-zinc-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Contacto
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              ¿Tienes un proyecto en mente? Hablemos.
            </p>
            <a
              href={`mailto:${APP_EMAIL}`}
              className="inline-block text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4"
            >
              {APP_EMAIL}
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-amber-400 transition-colors duration-200 group"
            aria-label="Volver arriba"
          >
            Volver arriba
            <span className="p-1 border border-zinc-700 rounded group-hover:border-amber-400 transition-colors">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}