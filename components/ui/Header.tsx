"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "Inicio",       href: "#inicio" },
  { label: "Regiones",     href: "#regiones" },
  { label: "Tecnologías",  href: "#tecnologias" },
  { label: "Crecimiento",  href: "#crecimiento" },
  { label: "Net Billing",  href: "#net-billing" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <a href="#inicio" className={styles.brand} onClick={close}>
          <Logo size={26} />
          <span className={styles.wordmark}>Proyecto Matriz</span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.navLink}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={styles.burger}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`${styles.burgerLine} ${open ? styles.burgerOpen : ""}`} />
          <span className={`${styles.burgerLine} ${open ? styles.burgerOpen : ""}`} />
          <span className={`${styles.burgerLine} ${open ? styles.burgerOpen : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Navegación móvil">
          <ul className={styles.mobileNavList}>
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.mobileNavLink} onClick={close}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
