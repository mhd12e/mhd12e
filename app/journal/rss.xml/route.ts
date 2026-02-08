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
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    const lastBuildDate = posts.length > 0
        ? new Date(posts[0].createdAt).toUTCString()
        : new Date().toUTCString();

    const rssItems = posts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/journal/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/journal/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
    </item>`).join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mohamed Elsayed - Journal</title>
    <link>${SITE_URL}/journal</link>
    <description>Thoughts on development, design, and life. Technical articles, insights, and experiences from Mohamed Elsayed.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/journal/rss.xml" rel="self" type="application/rss+xml"/>
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
