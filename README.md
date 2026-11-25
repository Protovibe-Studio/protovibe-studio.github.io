This repo has the landing page source code for Github project
[Protovibe Studio](https://protovibe-studio.github.io).

Desktop links can be shared through `https://protovibe-studio.github.io/open/?url=`
plus `encodeURIComponent(deepLink)`, where `deepLink` is a `protovibe://` URL.
The page attempts to open the app and keeps an **Open in Protovibe** link available
for browsers that require a click. Vite copies `public/open/` into the Pages build.

Run redirect checks with `node --test tests/open-link.test.mjs`.
