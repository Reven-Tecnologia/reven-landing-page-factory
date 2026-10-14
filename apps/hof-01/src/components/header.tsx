"use client";
import { useRef, useState } from "react";
export function Header({
  name,
  initials,
  profession,
  contact,
}: {
  name: string;
  initials: string;
  profession: string;
  contact: string;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="header"
      id="inicio"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <div className="container header-inner">
        <a className="header-brand" href="#inicio">
          <span className="monogram" aria-hidden="true">
            {initials}
          </span>
          <span className="brand">
            <span>{name}</span>
            <small>{profession} · Harmonização facial e corporal</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          ref={trigger}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Fechar" : "Menu"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-navigation"
          aria-label="Navegação principal"
          className={open ? "navigation open" : "navigation"}
          onClick={() => setOpen(false)}
        >
          <a href="#cuidados">Atendimento</a>
          <a href="#caso">O caso</a>
          <a href="#profissional">A profissional</a>
          <a href="#localizacao">Como chegar</a>
          <a
            href={contact}
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="contact-note"
            className="nav-contact"
            data-contact
          >
            Consultar horários <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
