import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import store from "../store";
import ActionTypes from "../Constants/ActionTypes";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "statusPretty", headerName: "Status", width: 320 },
  { field: "currentTask", headerName: "Current Task", width: 280 },
  { field: "session", headerName: "Session JSON", width: 480 },
];

export default function ScrapersTable() {
  const [Scrapers, setScrapers] = useState(store.getScrapersTable());

  const updateRows = () => {
    setScrapers(store.getScrapersTable());
  };
  console.log(Scrapers);
  useEffect(() => {
    store.addChangeListener(ActionTypes.SCRAPER_STATUS_CHANGED, updateRows);
    store.addChangeListener(ActionTypes.SCRAPER_SPAWNED, updateRows);
    store.addChangeListener(ActionTypes.FRONTEND_STATUS_RECEIVED, updateRows);

    return () => {
      store.removeChangeListener(
        ActionTypes.SCRAPER_STATUS_CHANGED,
        updateRows
      );
      store.removeChangeListener(ActionTypes.SCRAPER_SPAWNED, updateRows);
      store.removeChangeListener(
        ActionTypes.FRONTEND_STATUS_RECEIVED,
        updateRows
      );
    };
  });
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        disableExtendRowFullWidth={false}
        rows={Scrapers || []}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
}
