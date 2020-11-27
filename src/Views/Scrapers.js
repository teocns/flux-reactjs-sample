import React from "react";
import PickVendors from "../Components/PickVendors";
import ScrapersTable from "../Components/ScrapersTable";
import actions from "../actions";
import {
  FormGroup,
  IconButton,
  Tooltip,
  Button,
  makeStyles,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  actionsRow: {
    marginBottom: theme.spacing(1),
  },
}));

const spawnScraper = () => {
  if (
    window.confirm(
      "Warning: this may increase scraping effeciency but performance might be severally affected. Are you sure to continue?"
    )
  ) {
    actions.spawnScraper();
  }
};

const ScrapersView = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormGroup row={true} className={classes.actionsRow}>
        <Button variant="contained" color="secondary" startIcon={<AddCircle />}>
          Spawn scraper
        </Button>
      </FormGroup>
      <ScrapersTable />
    </div>
  );
};

export default ScrapersView;
