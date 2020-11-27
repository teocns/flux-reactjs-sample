import React, { useState } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Vendors, { EnabledVendors } from "../Constants/Vendors";
import {
  FormControlLabel,
  FormGroup,
  Paper,
  makeStyles,
  Typography,
  FormLabel,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  subtitle: {
    //color: theme.palette.text.disabled,
  },
}));

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

const PickVendors = ({ onUpdated }) => {
  const [SelectedVendors, setSelectedVendors] = useState(
    Object.values([Vendors.GLASSDOOR])
  );

  const theme = useTheme();
  const classes = useStyles();
  const onCheckChanged = (vendor) => {
    const includes = SelectedVendors.includes(vendor);
    // const onlyEnabledVendorsSelected = SelectedVendors.filter((v) =>
    //   Object.values(EnabledVendors).includes(v)
    // );
    let willChangeTo = undefined;
    if (includes && SelectedVendors.length > 1) {
      // Remove from arr
      willChangeTo = SelectedVendors.filter((v) => v !== vendor);
      setSelectedVendors();
    } else if (!includes) {
      willChangeTo = [vendor, ...SelectedVendors];
    }
    if (willChangeTo) {
      setSelectedVendors(willChangeTo);
      isFunction(onUpdated) && onUpdated(willChangeTo);
    }
  };

  const renderCheckboxes = () => {
    return Object.values(Vendors).map((vendor) => (
      <FormControlLabel
        label={vendor.charAt(0).toUpperCase() + vendor.slice(1)}
        key={vendor}
        control={
          <Checkbox
            size="small"
            checked={
              SelectedVendors.includes(vendor) &&
              Object.values(EnabledVendors).includes(vendor)
            }
            onChange={() => {
              onCheckChanged(vendor);
            }}
            inputProps={{ "aria-label": "primary checkbox" }}
            disabled={!Object.values(EnabledVendors).includes(vendor)}
          />
        }
      />
    ));
  };
  return (
    <Paper className={classes.root}>
      <FormLabel
        component="legend"
        style={{ textAlign: "left", fontSize: "small" }}
      >
        View data for
      </FormLabel>
      <FormGroup style={{ marginTop: theme.spacing(0.5) }} row>
        {renderCheckboxes()}
      </FormGroup>
    </Paper>
  );
};

export default React.memo(PickVendors);
