import LocationSnapshot from "./LocationSnapshot";

class Location {
  locationId;
  locationType;
  compoundId;
  countryName;
  label;
  realId;

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

export default Location;
