import React, { useEffect, useState } from "react";

import store from "../store";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import { makeStyles, Typography } from "@material-ui/core";
import ActionTypes from "../Constants/ActionTypes";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
  },
  icon: {
    fontSize: "1rem",
    margin: theme.spacing(0.5),
  },
  iconConnected: {
    color: "green",
  },
  iconDisconnected: {
    color: "red",
  },
}));

const BackendStatus = () => {
  const [BackendConnected, setBackendConnected] = useState(
    store.getBackendConnected()
  );

  const onBackendStatusChanged = () => {
    const nextStatus = store.getBackendConnected();
    if (nextStatus !== BackendConnected) {
      setBackendConnected(nextStatus);
    }
  };

  useEffect(() => {
    store.addChangeListener(
      ActionTypes.FRONTEND_STATUS_RECEIVED,
      onBackendStatusChanged
    );
    store.addChangeListener(
      ActionTypes.BACKEND_STATUS_CHANGED,
      onBackendStatusChanged
    );

    return () => {
      store.removeChangeListener(
        ActionTypes.FRONTEND_STATUS_RECEIVED,
        onBackendStatusChanged
      );
      store.removeChangeListener(
        ActionTypes.BACKEND_STATUS_CHANGED,
        onBackendStatusChanged
      );
    };
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FiberManualRecordIcon
        className={clsx({
          [classes.icon]: true,
          [classes.iconConnected]: BackendConnected,
          [classes.iconDisconnected]: !BackendConnected,
        })}
      />
      <Typography>
        {BackendConnected ? "Bots connected" : "Bots disconnected"}
      </Typography>
    </div>
  );
};

export default BackendStatus;
