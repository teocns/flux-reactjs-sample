import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

import snapshotConfigStore from "../stores/snapshotConfig";
import locationStore from "../stores/locations";
import ActionTypes from "../Constants/ActionTypes";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { IconButton, Typography } from "@material-ui/core";

import GetAppIcon from "@material-ui/icons/GetApp";

import { makeStyles } from "@material-ui/core";

import { prettyTimelapse } from "../helpers";
import { MoreHoriz, Replay } from "@material-ui/icons";

const columns = [
  { id: "locationId", label: "Location", minWidth: 180 },
  { id: "keywords", label: "Keywords", minWidth: 320 },
  { id: "scrapeInterval", label: "Scrape once every", minWidth: 320 },
  { id: "snapshot", label: "Latest scrape job", minWidth: 320 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
}));

export default function SnapshotConfigTable() {
  const [SnapshotConfigs, setSnapshotConfigs] = useState([
    ...snapshotConfigStore.getTable(),
  ]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    const act = event.currentTarget.getAttribute("data-action");
    if (act) {
    }
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateRows = () => {
    setSnapshotConfigs([...snapshotConfigStore.getTable()]);
  };

  const classes = useStyles();

  useEffect(() => {
    snapshotConfigStore.addChangeListener(
      ActionTypes.FRONTEND_STATUS_RECEIVED,
      updateRows
    );

    snapshotConfigStore.addChangeListener(
      ActionTypes.SNAPSHOT_CONFIG_UPDATED,
      updateRows
    );

    return () => {
      snapshotConfigStore.removeChangeListener(
        ActionTypes.FRONTEND_STATUS_RECEIVED,
        updateRows
      );
      snapshotConfigStore.removeChangeListener(
        ActionTypes.SNAPSHOT_CONFIG_UPDATED,
        updateRows
      );
    };
  });
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {SnapshotConfigs.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {(() => {
                          switch (column.id) {
                            case "scrapeInterval":
                              return (
                                <div>
                                  <code>{value} </code>
                                  <Typography variant="caption">
                                    seconds
                                  </Typography>
                                </div>
                              );
                              break;
                            case "snapshot":
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Typography variant="overline">
                                    {prettyTimelapse(value.age)}
                                  </Typography>

                                  <Typography variant="caption">
                                    Jobs scraped:{" "}
                                    <code>
                                      {value.scrapedJobs}/{value.totalJobsCount}
                                    </code>
                                  </Typography>
                                  <Typography variant="caption">
                                    Pages scraped: {value.scrapedPages}/
                                    <code>{value.totalNumberOfPages}</code>
                                  </Typography>
                                </div>
                              );
                              break;
                            case "isActiveForScrape":
                              return (
                                <div>
                                  <IconButton
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                  >
                                    <MoreHoriz />
                                  </IconButton>
                                  <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                  >
                                    <MenuItem
                                      onClick={handleClose}
                                      data-action="scrapeNow"
                                      disabled={!value.finished}
                                    >
                                      <Replay
                                        style={{
                                          marginRight: 8,
                                        }}
                                      />
                                      Scrape now
                                    </MenuItem>
                                    <MenuItem
                                      onClick={handleClose}
                                      style={{ paddingLeft: 8 }}
                                    >
                                      <Switch
                                        style={{ marginRight: 2 }}
                                        checked={true}
                                        name="checkedB"
                                        disabled
                                        size="small"
                                        color="primary"
                                      />
                                      Active
                                    </MenuItem>
                                  </Menu>
                                </div>
                              );
                              break;
                            case "latestSnapshot":
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Typography variant="overline">
                                    {prettyTimelapse(value.age)}
                                  </Typography>
                                  <Typography variant="caption">
                                    Filter: <code>LAST DAY</code>
                                  </Typography>
                                  <Typography variant="caption">
                                    Jobs scraped:{" "}
                                    <code>
                                      {value.scrapedJobs}/{value.totalJobsCount}
                                    </code>
                                  </Typography>
                                  <Typography variant="caption">
                                    Pages scraped: {value.scrapedPages}/
                                    <code>{value.totalNumberOfPages}</code>
                                  </Typography>
                                </div>
                              );
                              break;
                            default:
                              return column.format && typeof value === "number"
                                ? column.format(value)
                                : value;
                          }
                        })()}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={SnapshotConfigs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
