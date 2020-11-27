import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import BackendStatus from "../Components/BackendStatus";
import ActionTypes from "../Constants/ActionTypes";
import store from "../store";

const OverviewView = () => {
  const [JobsPerMinute, setJobsPerMinute] = useState(
    store.getScrapingSpeedData()
  );

  const onUpdated = () => [
    setJobsPerMinute(store.getScrapingSpeedData().toString()),
  ];
  useEffect(() => {
    store.addChangeListener(ActionTypes.SCRAPING_SPEED_DATA_UPDATED, onUpdated);
    return () => {
      store.removeChangeListener(
        ActionTypes.SCRAPING_SPEED_DATA_UPDATED,
        onUpdated
      );
    };
  });

  return (
    <Typography variant="h6">
      Scrapes per minute: <code>{JobsPerMinute}</code>
    </Typography>
  );
};

export default OverviewView;
