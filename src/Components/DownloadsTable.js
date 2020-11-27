import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import downloadsStore from "../stores/downloads";
import ActionTypes from "../Constants/ActionTypes";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Download from "../Models/Download";

import { IconButton } from "@material-ui/core";

import GetAppIcon from "@material-ui/icons/GetApp";

import { makeStyles } from "@material-ui/core";
import { getFilename, forceDownload } from "../helpers";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "age", label: "Generated", minWidth: 320 },
  { id: "description", label: "Description", minWidth: 320 },
  { id: "size", label: "Size", minWidth: 280 },
  { id: "url", label: "URL", minWidth: 480 },
  { id: "download", label: "Actions", minWidth: 100, align: "right" },
];

function startDownload(url) {
  var link = document.createElement("a");
  link.href = url;
  link.style.display = "none";
  link.download = getFilename(url);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  //window.open(url, link.download);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
}));

export default function DownloadsTable() {
  const [Downloads, setDownloads] = useState(downloadsStore.getTable());

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(Downloads);
  const updateRows = () => {
    setDownloads(downloadsStore.getTable());
  };

  const classes = useStyles();

  useEffect(() => {
    downloadsStore.addChangeListener(
      ActionTypes.FRONTEND_STATUS_RECEIVED,
      updateRows
    );

    downloadsStore.addChangeListener(
      ActionTypes.DOWNLOADS_SYNC_RECEIVED,
      updateRows
    );

    return () => {
      downloadsStore.removeChangeListener(
        ActionTypes.FRONTEND_STATUS_RECEIVED,
        updateRows
      );

      downloadsStore.removeChangeListener(
        ActionTypes.DOWNLOADS_SYNC_RECEIVED,
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
            {Downloads.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.code || row.id}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "download") {
                      return (
                        <TableCell
                          key={"download-" + row.id}
                          align={column.align}
                        >
                          <IconButton
                            color="primary"
                            aria-label="Download XML"
                            onClick={() => {
                              forceDownload(row.url, getFilename(row.url));
                            }}
                          >
                            <GetAppIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
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
        count={Downloads.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
