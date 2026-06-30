"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from 'lucide-react';
import { navLinks, APP_NAME, CTA_LABEL, CTA_HREF } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-space font-bold text-lg tracking-tight text-zinc-100 hover:text-amber-400 transition-colors duration-200"
          >
            <span className="text-amber-400">A</span>
            {APP_NAME.slice(1)}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isHome = link.href === "/";
              const isActive =
                isHome
                  ? pathname === "/"
                  : false;
              return (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 group ${
                      isActive
                        ? "text-amber-400"
                        : "text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-3 right-3 h-px bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={CTA_HREF}
              download
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-amber-400 text-zinc-950 rounded-md hover:bg-amber-300 transition-all duration-200 hover:shadow-[0_0_16px_rgba(251,191,36,0.4)]"
            >
              <Download size={14} />
              {CTA_LABEL}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-zinc-950 flex flex-col pt-20 px-6 pb-8 md:hidden"
          >
            <ul className="flex flex-col gap-2 flex-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="block py-3 text-2xl font-space font-bold text-zinc-300 hover:text-amber-400 transition-colors border-b border-zinc-800"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a
              href={CTA_HREF}
              download
              className="flex items-center justify-center gap-2 w-full py-3 text-base font-semibold bg-amber-400 text-zinc-950 rounded-md hover:bg-amber-300 transition-colors mt-4"
            >
              <Download size={16} />
              {CTA_LABEL}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}