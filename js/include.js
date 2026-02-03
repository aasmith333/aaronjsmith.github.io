document.addEventListener("DOMContentLoaded", () => {
  const includeEls = Array.from(document.querySelectorAll("[data-include]"));

  // Run all includes, then scroll to hash once layout is stable.
  Promise.all(
    includeEls.map(el => {
      const path = el.getAttribute("data-include");
      return fetch(path)
        .then(res => res.text())
        .then(html => {
          el.innerHTML = html;
        })
        .catch(() => {
          el.innerHTML = "";
        });
    })
  ).finally(() => {
    // Let the browser recalc layout, then scroll.
    requestAnimationFrame(() => {
      if (!location.hash) return;
      const target = document.querySelector(location.hash);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
