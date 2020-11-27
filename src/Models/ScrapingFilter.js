class ScrapingFilter {
  #keyWords;
  #city;
  #state;
  #withinDays;

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

export default ScrapingFilter;
