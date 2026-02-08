const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://mhd12.dev';
const README_PATH = path.join(__dirname, '..', 'README.md');

// Fetch and parse RSS feed
function fetchRSS(feedUrl) {
    return new Promise((resolve, reject) => {
        https.get(feedUrl, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
            res.on('error', reject);
        }).on('error', reject);
    });
}

// Simple XML parser for RSS items
function parseRSSItems(xml, maxItems = 5) {
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < maxItems) {
        const itemXml = match[1];
        const title = itemXml.match(/<title>([^<]*)<\/title>/)?.[1] || '';
        const link = itemXml.match(/<link>([^<]*)<\/link>/)?.[1] || '';
        const pubDate = itemXml.match(/<pubDate>([^<]*)<\/pubDate>/)?.[1] || '';

        if (title && link) {
            items.push({
                title: decodeXmlEntities(title),
                link,
                date: pubDate ? formatDate(pubDate) : ''
            });
        }
    }
    return items;
}

function decodeXmlEntities(text) {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Generate markdown list from items
function generateMarkdownList(items, emoji = '📝') {
    if (items.length === 0) {
        return '_No items yet. Check back soon!_\n';
    }
    return items.map(item => {
        const dateStr = item.date ? ` - ${item.date}` : '';
        return `- ${emoji} [${item.title}](${item.link})${dateStr}`;
    }).join('\n') + '\n';
}

// Update README between markers
function updateSection(content, startMarker, endMarker, newContent) {
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);

    if (startIdx === -1 || endIdx === -1) {
        console.log(`Markers not found: ${startMarker}`);
        return content;
    }

    return content.slice(0, startIdx + startMarker.length) +
        '\n' + newContent +
        content.slice(endIdx);
}

async function main() {
    try {
        // Fetch both RSS feeds
        console.log('Fetching RSS feeds...');
        const [articlesXml, projectsXml] = await Promise.all([
            fetchRSS(`${SITE_URL}/journal/rss.xml`),
            fetchRSS(`${SITE_URL}/projects/rss.xml`)
        ]);

        // Parse items
        const articles = parseRSSItems(articlesXml, 5);
        const projects = parseRSSItems(projectsXml, 5);

        console.log(`Found ${articles.length} articles and ${projects.length} projects`);

        // Generate markdown
        const articlesMd = generateMarkdownList(articles, '📝');
        const projectsMd = generateMarkdownList(projects, '🚀');

        // Read README
        let readme = fs.readFileSync(README_PATH, 'utf-8');

        // Update sections
        readme = updateSection(readme, '<!-- ARTICLE-LIST:START -->', '<!-- ARTICLE-LIST:END -->', articlesMd);
        readme = updateSection(readme, '<!-- PROJECT-LIST:START -->', '<!-- PROJECT-LIST:END -->', projectsMd);

        // Write README
        fs.writeFileSync(README_PATH, readme);
        console.log('README.md updated successfully!');
    } catch (error) {
        console.error('Error updating README:', error);
        process.exit(1);
    }
}

main();
