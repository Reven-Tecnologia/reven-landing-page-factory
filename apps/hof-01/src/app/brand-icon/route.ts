import { getContent } from "../../lib/content";
export async function GET() {
  const content = await getContent();
  const text = (content?.initials ?? "H").slice(0, 3).replace(/[<>&"']/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#4c2d40"/><text x="32" y="43" font-family="Georgia,serif" font-size="30" text-anchor="middle" fill="#efe5d8">${text}</text></svg>`;
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
