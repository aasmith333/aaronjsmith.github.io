document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(el => {
    const path = el.getAttribute("data-include");

    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error(`Fetch failed: ${path} (${res.status})`);
        return res.text();
      })
      .then(html => {
        el.innerHTML = html;
      })
      .catch(err => {
        console.error(err);
        el.innerHTML = `<p style="color:red;">Include failed: ${path}</p>`;
      });
  });
});
