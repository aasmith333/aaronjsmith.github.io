document.addEventListener("DOMContentLoaded", () => {
  console.log("include.js running on:", window.location.pathname);

  document.querySelectorAll("[data-include]").forEach(el => {
    const path = el.getAttribute("data-include");
    console.log("including:", path);

    fetch(path)
      .then(res => {
        console.log("fetched:", path, res.status);
        return res.text();
      })
      .then(html => {
        el.innerHTML = html;
      })
      .catch(err => {
        console.error("include failed:", path, err);
      });
  });
});
;
