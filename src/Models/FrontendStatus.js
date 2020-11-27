import Scraper from "./Scraper";
/**
 * Represents the situation as a whole
 */
class FrontendStatus {
  #jobsScraped;

  #backendConnected;

  #locations;

  #snapshotConfigs;

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

export default FrontendStatus;
