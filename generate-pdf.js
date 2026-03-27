const path = require("path");
const puppeteer = require("puppeteer");

async function main() {
  const inputFile = process.argv[2] || "index.html";
  const outputFile = process.argv[3] || "report.pdf";

  const inputPath = path.resolve(process.cwd(), inputFile);
  const outputPath = path.resolve(process.cwd(), outputFile);
  const inputUrl = `file://${inputPath}`;

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(inputUrl, { waitUntil: "networkidle0" });

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: `
        <div style="width: 100%; font-size: 10px; color: #2f2f33; padding: 0 24px; text-align: center;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
      margin: {
        top: "0mm",
        bottom: "0mm",
        left: "0mm",
        right: "0mm"
      }
    });

    console.log(`PDF generated: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("Failed to generate PDF:", error);
  process.exit(1);
});
