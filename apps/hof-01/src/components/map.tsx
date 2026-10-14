export function ClinicMap({ src, name }: { src: string; name: string }) {
  return (
    <div className="map-frame">
      <iframe
        title={`Mapa de ${name}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
