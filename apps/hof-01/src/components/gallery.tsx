"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import type { CaseView } from "../lib/content";
export function Gallery({ views }: { views: CaseView[] }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const view = views[index];
  function select(next: number) {
    setIndex((next + views.length) % views.length);
    setFailed(false);
  }
  return (
    <div className="case-layout">
      <figure className="case-featured">
        <button
          className="case-open"
          aria-label={`Ampliar registro: ${view.title}`}
          onClick={(event) => {
            if (swiped.current && event.detail > 0) {
              swiped.current = false;
              return;
            }
            swiped.current = false;
            dialog.current?.showModal();
          }}
          onPointerDown={(event) => {
            swiped.current = false;
            if (event.pointerType === "touch")
              touch.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerCancel={() => {
            touch.current = null;
          }}
          onPointerUp={(event) => {
            if (!touch.current) return;
            const dx = event.clientX - touch.current.x;
            const dy = event.clientY - touch.current.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
              select(index + (dx < 0 ? 1 : -1));
              swiped.current = true;
            }
            touch.current = null;
          }}
        >
          <Image
            key={`${index}-${attempt}`}
            className="case-photo"
            src={view.src}
            alt={view.alt}
            width={view.width}
            height={view.height}
            sizes="(max-width: 720px) calc(100vw - 40px), 620px"
            onError={() => setFailed(true)}
          />
          <span className="image-action">
            Ampliar <span aria-hidden="true">+</span>
          </span>
        </button>
        <figcaption>
          <span>{view.title}</span>
          <span>Mesmo caso · {String(index + 1).padStart(2, "0")}/06</span>
        </figcaption>
        {failed && (
          <p role="status" className="image-error">
            Não foi possível carregar esta vista.{" "}
            <button
              onClick={() => {
                setFailed(false);
                setAttempt(attempt + 1);
              }}
            >
              Tentar novamente
            </button>
          </p>
        )}
      </figure>
      <div className="case-selection">
        <p className="eyebrow">Estudo de caso</p>
        <h3>
          Cada ângulo conta
          <br />
          <em>parte da história.</em>
        </h3>
        <p>
          Selecione uma vista para examinar os registros. A comparação já faz
          parte das imagens fornecidas.
        </p>
        <div
          className="case-thumbnails"
          role="group"
          aria-label="Ângulos do mesmo caso"
        >
          {views.map((item, i) => (
            <button
              className="case-thumb"
              key={item.src}
              ref={(element) => {
                buttons.current[i] = element;
              }}
              aria-pressed={i === index}
              aria-label={`Mostrar ${item.title.toLocaleLowerCase("pt-BR")}`}
              onClick={() => select(i)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  const next =
                    (i + (event.key === "ArrowRight" ? 1 : -1) + views.length) %
                    views.length;
                  select(next);
                  buttons.current[next]?.focus();
                }
              }}
            >
              <Image
                src={item.src}
                alt=""
                width={item.width}
                height={item.height}
                sizes="(max-width: 720px) 28vw, 145px"
              />
              <span>{item.short}</span>
            </button>
          ))}
        </div>
        <div className="gallery-controls">
          <button
            className="round-button"
            aria-label="Vista anterior"
            onClick={() => select(index - 1)}
          >
            ←
          </button>
          <span aria-live="polite">
            {String(index + 1).padStart(2, "0")} / 06 · {view.short}
          </span>
          <button
            className="round-button"
            aria-label="Próxima vista"
            onClick={() => select(index + 1)}
          >
            →
          </button>
        </div>
        <p className="case-note">
          Registros de um único caso, com diferenças de iluminação e
          enquadramento. Resultados e indicações variam de pessoa para pessoa.
        </p>
      </div>
      <dialog
        ref={dialog}
        className="case-dialog"
        aria-labelledby="dialog-title"
        onClick={(event) => {
          if (event.target !== dialog.current) return;
          const box = dialog.current.getBoundingClientRect();
          if (
            event.clientX < box.left ||
            event.clientX > box.right ||
            event.clientY < box.top ||
            event.clientY > box.bottom
          )
            dialog.current.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(index + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
      >
        <div className="dialog-heading">
          <h3 id="dialog-title">{view.title}</h3>
          <button
            className="round-button"
            aria-label="Fechar imagem ampliada"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </div>
        <Image
          src={view.src}
          alt={view.alt}
          width={view.width}
          height={view.height}
          sizes="min(90vw, 800px)"
        />
        <div className="dialog-controls">
          <button
            className="round-button"
            aria-label="Registro anterior"
            onClick={() => select(index - 1)}
          >
            ←
          </button>
          <p>Um mesmo caso · {index + 1}/06</p>
          <button
            className="round-button"
            aria-label="Próximo registro"
            onClick={() => select(index + 1)}
          >
            →
          </button>
        </div>
      </dialog>
    </div>
  );
}
