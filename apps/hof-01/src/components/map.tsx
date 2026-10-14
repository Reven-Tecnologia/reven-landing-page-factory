"use client";
import { useState } from "react";
export function ClinicMap({ src, name }: { src: string; name: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="map-frame">
      {loaded ? (
        <iframe
          title={`Mapa de ${name}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map-entry">
          <p className="eyebrow">Localização do consultório</p>
          <h3>{name}</h3>
          <p>Abra o mapa para localizar o endereço e planejar a visita.</p>
          <button className="button" onClick={() => setLoaded(true)}>
            Carregar mapa <span aria-hidden="true">↗</span>
          </button>
          <small>O mapa é fornecido pelo Google Maps.</small>
        </div>
      )}
    </div>
  );
}
