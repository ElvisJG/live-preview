const API_URL = "/scrape?url=";

async function formSubmitted(e) {
  e.preventDefault();
  error.textContent = "";
  const response = await fetch(API_URL + url.value);
  if (response.ok) {
    const json = await response.json();
    const html = `
    <div style='outline: 1px solid grey; padding: 1rem; text-align: center'>
        <p>${json.title}</p>
        <img style='max-width: 100%;' src="${json.image}" />
        <p style="text-align: left;">${json.description}</p>
        <a style="display: block; text-align: left; margin-bottom: 1rem;" href="${
          json.url
        }">${json.url}</a>
        ${json.keywords &&
          `<small style="text-align: left; font-style: italic; max-width: 100%;">${json.keywords}</small>`}
    </div>
    `;
    preview.innerHTML = "<h2>Preview:</h2>" + html;
    embed.innerHTML = `<h2>Copy the HTML below:</h2>
    <textarea id="source" rows="10">${html}</textarea>`;
  } else {
    error.textContent = "Unable to get preview";
    preview.innerHTML = "";
    embed.innerHTML = "";
  }
}

form.addEventListener("submit", formSubmitted);
