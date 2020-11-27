import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import locationsStore from "../stores/locations";
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
import LocationSearching from "@material-ui/icons/LocationSearching";

import { IconButton, TextField, Tooltip, Typography } from "@material-ui/core";

import GetAppIcon from "@material-ui/icons/GetApp";

import { makeStyles } from "@material-ui/core";

import { prettyTimelapse } from "../helpers";
import { MoreHoriz, Replay } from "@material-ui/icons";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "countryName", label: "Country", minWidth: 100 },
  { id: "locationType", label: "Type", minWidth: 180 },
  { id: "label", label: "Name", minWidth: 320 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  searchParent: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function LocationsTable() {
  const [Locations, setLocations] = useState([...locationsStore.getTable()]);
  const [Filter, setFilter] = useState("");
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
    const newCome = [...locationsStore.getTable()];

    if (Filter.length) {
      const filter = Filter.toLowerCase();
      const filtered = newCome.filter(
        (c) =>
          c.label.toString().toLowerCase().includes(filter) ||
          
          c.locationId.toString().toLowerCase().includes(filter) ||
          c.countryName.toString().toLowerCase().includes(filter) ||
          c.id.toString().toLowerCase().includes(filter)
      );

      return setLocations(filtered);
    }
    setLocations(newCome);
  };

  const classes = useStyles();

  useEffect(() => {
    locationsStore.addChangeListener(
      ActionTypes.FRONTEND_STATUS_RECEIVED,
      updateRows
    );

    locationsStore.addChangeListener(ActionTypes.LOCATION_UPDATED, updateRows);

    return () => {
      locationsStore.removeChangeListener(
        ActionTypes.FRONTEND_STATUS_RECEIVED,
        updateRows
      );
      locationsStore.removeChangeListener(
        ActionTypes.LOCATION_UPDATED,
        updateRows
      );
    };
  });

  const filter = (evt) => {
    const txt = evt.currentTarget.value;
    setFilter(txt);
    setTimeout(() => {
      updateRows();
    }, 100);
  };
  return (
    <div>
      <div className={classes.searchParent}>
        <Paper style={{ padding: 8, display: "flex", alignItems: "center" }}>
          <TextField placeholder="Search" onChange={filter}></TextField>
        </Paper>
      </div>

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
              {Locations.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row["locationId"]}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {(() => {
                            switch (column.id) {
                              case "locationType":
                                if (value === "N") {
                                  return "State";
                                } else if (value === "C") {
                                  return "City";
                                }
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

                              default:
                                return column.format &&
                                  typeof value === "number"
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
          count={Locations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
