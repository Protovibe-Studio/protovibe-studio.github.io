This repo has the landing page source code for Github project
[Protovibe Studio](https://protovibe-studio.github.io).

Desktop links can be shared through `https://protovibe-studio.github.io/open/?url=`
plus `encodeURIComponent(deepLink)`, where `deepLink` is a `protovibe://` URL.
The page attempts to open the app and keeps an **Open in Protovibe** link available
for browsers that require a click. Launch attempts use a hidden frame so a browser
error cannot replace the fallback page. Vite copies `public/open/` into the Pages build.

Run redirect checks with `node --test tests/open-link.test.mjs`.
Run the browser regression with `node --test tests/open-link.browser.test.mjs`
after installing the plugin's Playwright browser, or set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chromium executable.
