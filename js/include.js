document.addEventListener("DOMContentLoaded", () => {
  const includeEls = Array.from(document.querySelectorAll("[data-include]"));

  // If there are no includes, still handle hash scroll.
  if (includeEls.length === 0) {
    scrollToHash();
    return;
  }

  let remaining = includeEls.length;

  includeEls.forEach(el => {
    const path = el.getAttribute("data-include");

    fetch(path)
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html;
      })
      .catch(() => {
        el.innerHTML = "";
      })
      .finally(() => {
        remaining -= 1;

        // When all includes are done, scroll to the hash.
        if (remaining === 0) {
          // Wait a tick so layout settles, then scroll.
          setTimeout(scrollToHash, 0);
        }
      });
  });

  function scrollToHash() {
    if (!location.hash) return;

    const target = document.querySelector(location.hash);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});


