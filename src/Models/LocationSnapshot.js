/**
 * Scraped by the daily task. It will break down into micro-tasks assigned to scrapers for deep page per page scraping.
 */
class LocationSnapshot {
  /**
   * @type {number}
   */
  age;

  /**
   * @type {number}
   */
  locationId;

  /**
   * @type {number}
   */
  totalJobsCount;

  /**
   * @type {number}
   */
  totalNumberOfPages;

  /**
   * When scraping is completed, means all jobs have been fetched for the current preview.
   * @type {boolean}
   */
  finished;

  /**
   * @type {number}
   */
  scrapedPages;
  /**
   * @type {number}
   */
  scrapedJobs;
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

export default LocationSnapshot;
