class JobsBatch {
  /**
   * @type {string}
   */
  snapshotUUID;
  /**
   * @type {number}
   */
  jobsAmount;

  /**
   * @type {number}
   */
  locationId;
  /**
   * @type {string}
   */
  json;

  /**
   * @type {number}
   */
  age;

  /**
   * @type {number}
   */
  page;

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

export default JobsBatch;
