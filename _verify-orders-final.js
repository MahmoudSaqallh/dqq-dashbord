const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });

  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto("http://localhost:3000/orders", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await page.locator("button", { hasText: "Filters" }).first().click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: "C:/Users/MSICRO~1/AppData/Local/Temp/claude/orders-final.png" });

  console.log("console/page errors:", JSON.stringify(errors));
  await browser.close();
})();
