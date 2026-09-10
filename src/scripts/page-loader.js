/* Shared first-screen loader for the invitation themes. */
(function () {
  "use strict";

  const loader = document.getElementById("pageLoader");
  const criticalImages = (loader?.dataset.critical || "")
    .split(",")
    .map((src) => src.trim())
    .filter(Boolean);

  const waitForImage = (src) =>
    new Promise((resolve) => {
      const image = new Image();
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };

      image.onload = finish;
      image.onerror = finish;
      image.decoding = "async";
      image.src = new URL(src, document.baseURI).href;

      if (image.complete) finish();
    });

  const waitForFonts = document.fonts?.ready
    ? document.fonts.ready.catch(() => undefined)
    : Promise.resolve();

  const minimumDisplayTime = new Promise((resolve) => {
    window.setTimeout(resolve, 120);
  });

  const hardTimeout = new Promise((resolve) => {
    window.setTimeout(resolve, 1500);
  });

  const ready = Promise.race([
    Promise.all([
      minimumDisplayTime,
      waitForFonts,
      ...criticalImages.map(waitForImage),
    ]),
    hardTimeout,
  ]);

  // Theme opening animations wait for the same readiness signal.
  window.__pageReady = ready;

  ready.then(() => {
    document.documentElement.classList.add("page-assets-ready");
    if (!loader) return;

    loader.classList.add("is-hidden");
    window.setTimeout(() => loader.remove(), 320);
  });
})();
