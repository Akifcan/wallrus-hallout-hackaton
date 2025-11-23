import * as cheerio from "cheerio";

export default async function search(keyword: string) {
  const searchUrl = `https://yandex.com.tr/search/?text=${encodeURIComponent(keyword)}`;

  const response = await fetch(searchUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    },
  });

  const html = await response.text();
  const $ = cheerio.load(html);

  const searchResults: Array<{
    title: string;
    link: string;
    snippet: string;
  }> = [];

  // Get all result cards
  $(".serp-item_card").each((_, element) => {
    // Get link
    const link = $(element).find("a").attr("href") || "";

    // Get title
    const title = $(element).find(".OrganicTitle-Link").text().trim();

    // Get description
    const snippet = $(element).find(".OrganicTextContentSpan").text().trim();

    if (link && title) {
      searchResults.push({
        title,
        link,
        snippet,
      });
    }
  });

  return {
    results: searchResults,
    count: searchResults.length,
  };
}
