import Scraper from "./Scraper";
/**
 * Represents the situation as a whole
 */
class BackendStatus {
  /**
   * @type {Scraper[]}
   */
  #scrapers;

  #jobsScraped;

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

export default BackendStatus;
