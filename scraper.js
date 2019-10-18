const axios = require("axios");
const cheerio = require("cheerio");

function getContent($, selector) {
  return $(`meta[property="og:${selector}"]`).attr("content");
}

async function scraper(url) {
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  let title = getContent($, "title");
  !title ? (title = $("title").text()) : "No Title Found";
  let description = getContent($, "og:description");
  !description
    ? (description = $('meta[name="description"]').attr("content"))
    : "No Description Found";

  const keywords = $('meta[name="keywords"]').attr("content");
  const type = getContent($, "type");
  const image = getContent($, "image");

  !image ? $('link[rel="shortcut icon"]').attr("href") : "no image found";
  //   const ogUrl = getOGContent($, "og:url");
  return {
    title,
    type,
    image,
    url,
    description,
    keywords
  };
}

module.exports = scraper;
