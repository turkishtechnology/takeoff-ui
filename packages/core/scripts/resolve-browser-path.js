/**
 * Resolves the browser Stencil's e2e runner should launch and hands it over through
 * PUPPETEER_EXECUTABLE_PATH, before `stencil test` starts.
 *
 * Stencil passes puppeteer.executablePath() straight into the launcher without awaiting it
 * (@stencil/core 4.44.0, testing/index.js). That method returns a Promise as of
 * puppeteer-core 25.5.0, so the launcher receives one, stringifies it, and every e2e run
 * dies with "Browser was not found at the configured executablePath ([object Promise])".
 *
 * Stencil reads PUPPETEER_EXECUTABLE_PATH before falling back to that call, so filling it in
 * sidesteps the bug without patching Stencil - and stays harmless once Stencil awaits it.
 * Loaded with `node --import`, whose top-level await settles before the entry point runs.
 */
if (!process.env.PUPPETEER_EXECUTABLE_PATH && !process.env.CHROME_PATH) {
  try {
    const { default: puppeteer } = await import('puppeteer');
    process.env.PUPPETEER_EXECUTABLE_PATH = await puppeteer.executablePath();
  } catch (error) {
    // A --spec-only run needs no browser, so don't fail here; an e2e run will still report
    // the missing browser itself, with Stencil's own message.
    console.warn(`[resolve-browser-path] could not resolve a browser executable: ${error.message}`);
  }
}
