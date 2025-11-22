import puppeteer from "puppeteer";

export default async function search(keyword: string) {
  const searchUrl = `https://yandex.com.tr/search/?text=${keyword}`;

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--window-size=1920,1080",
    ],
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  });

  await page.goto(searchUrl, {
    waitUntil: "networkidle2",
    timeout: 30000,
  });

  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000)
  );

  const results = await page.evaluate(() => {
    const searchResults: Array<{
      title: string;
      link: string;
      snippet: string;
    }> = [];

    // Get all result cards
    const resultElements = document.querySelectorAll(".serp-item_card");

    resultElements.forEach((element) => {
      // Get link
      const linkElement = element.querySelector("a");
      const link = linkElement?.getAttribute("href") || "";

      // Get title
      const titleElement = element.querySelector(".OrganicTitle-Link");
      const title = titleElement?.textContent?.trim() || "";

      // Get description
      const snippetElement = element.querySelector(".OrganicTextContentSpan");
      const snippet = snippetElement?.textContent?.trim() || "";

      if (link && title) {
        searchResults.push({
          title,
          link,
          snippet,
        });
      }
    });

    return searchResults;
  });

  await browser.close();

  return {
    results: results,
    count: results.length,
  };
}
