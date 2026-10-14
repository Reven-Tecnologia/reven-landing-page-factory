export function Contact({
  href,
  children = "Consultar horários pelo WhatsApp",
  compact = false,
}: {
  href: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <a
      className={`button${compact ? " button-compact" : ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby="contact-note"
      data-contact
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
