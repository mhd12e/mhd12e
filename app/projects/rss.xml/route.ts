import { prisma } from "@/lib/prisma";

const SITE_URL = "https://mhd12.dev";

function escapeXml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET() {
    const projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    const lastBuildDate = projects.length > 0
        ? new Date(projects[0].createdAt).toUTCString()
        : new Date().toUTCString();

    const rssItems = projects.map((project) => {
        const projectLink = project.link || `${SITE_URL}/projects`;
        return `
    <item>
      <title>${escapeXml(project.title)}</title>
      <link>${projectLink}</link>
      <guid isPermaLink="false">${SITE_URL}/projects/${project.id}</guid>
      <description>${escapeXml(project.description)}</description>
      <pubDate>${new Date(project.createdAt).toUTCString()}</pubDate>
    </item>`;
    }).join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mohamed Elsayed - Projects</title>
    <link>${SITE_URL}/projects</link>
    <description>A collection of professional projects and technical experiments by Mohamed Elsayed.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/projects/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rss.trim(), {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
    });
}
