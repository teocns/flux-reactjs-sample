import ScrapingFilter from "./ScrapingFilter";
class Scraper {
  #status;

  /**
   * @type {ScrapingFilter}
   */
  #scrapingFilter;

  constructor(obj) {
    if (typeof obj === "object") {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          this[key] = obj[key];
        }
      }
    }
  }
}

export default Scraper;
