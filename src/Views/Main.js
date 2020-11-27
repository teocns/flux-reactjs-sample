import React, { Fragment } from "react";

import {
  Typography,
  AppBar,
  Tabs,
  Tab,
  makeStyles,
  Box,
  useTheme,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

import Button from "@material-ui/core/Button";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import ScrapersTable from "../Components/ScrapersTable";
import ScrapersView from "./Scrapers";
import SnapshotConfigView from "./SnapshotConfig";
import DownloadsView from "./Downloads";
import OverviewView from "./Overview";
import LocationsView from "./Locations";
import PickVendors from "../Components/PickVendors";
import BackendStatus from "../Components/BackendStatus";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem",
  },
  tabsHeader: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    display: "flex",
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
  },
  backendStatus: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  tab: {
    height: "3.5rem",
  },
  subtitle: {
    color: theme.palette.text.disabled,
  },
}));

const MainView = () => {
  const classes = useStyles();
  const allTabs = ["/", "/jobs", "/locations", "/downloads"];
  const theme = useTheme();
  return (
    <BrowserRouter>
      <div className="App">
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <Tabs value={location.pathname} className={classes.tabsHeader}>
                <Box>
                  <Tab
                    className={classes.tab}
                    label="Overview"
                    value="/"
                    component={Link}
                    to={allTabs[0]}
                  />
                  <Tab
                    className={classes.tab}
                    label="Scraping"
                    value="/config"
                    component={Link}
                    to={allTabs[1]}
                  />
                  {/* <Tab
                    className={classes.tab}
                    value="/scrapers"
                    label="Scrapers"
                    component={Link}
                    to={allTabs[2]}
                  /> */}
                  <Tab
                    className={classes.tab}
                    value="/locations"
                    label="Locations"
                    component={Link}
                    to={allTabs[2]}
                  />
                  <Tab
                    className={classes.tab}
                    value="/downloads"
                    label="Downloads"
                    component={Link}
                    to={allTabs[3]}
                  />
                </Box>
                <div className={classes.backendStatus}>
                  <BackendStatus />
                </div>
              </Tabs>
              <div className={classes.root}>
                {/* <Box flex="column" alignItems="start">
                  <Typography
                    variant="subtitle2"
                    align="left"
                    className={classes.subtitle}
                  >
                    View data for
                  </Typography>
                </Box> */}
                <Box
                  justifyContent="start"
                  display="flex"
                  marginBottom={theme.spacing(0.5)}
                >
                  <PickVendors />
                </Box>
                <Switch>
                  <Route
                    path={allTabs[1]}
                    render={() => <SnapshotConfigView />}
                  />
                  <Route path={allTabs[2]} render={() => <LocationsView />} />
                  <Route path={allTabs[3]} render={() => <DownloadsView />} />
                  <Route path={allTabs[0]} render={() => <OverviewView />} />
                </Switch>
              </div>
            </Fragment>
          )}
        />
      </div>
    </BrowserRouter>
  );
};

export default MainView;
