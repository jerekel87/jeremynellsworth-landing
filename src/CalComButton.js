import * as React from "react";
import Image from "next/image";
import { getCalApi } from "@calcom/embed-react";
// mui
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
// static
import arrow from "../public/images/icons/arrow-single.svg";

// -----------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButton-endIcon": {
      marginLeft: 15,
      width: 18,
    },
  },
}));

// -----------------------------------------------

export default function CalComButton({ fullWidth, href }) {
  const classes = useStyles();

  React.useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <Button
      data-cal-link="jeremy-ellsworth-uwa6in/design-consultation"
      data-cal-config='{"layout":"month_view"}'
      className={classes.root}
      variant="contained"
      color="primary"
      endIcon={<Image src={arrow} alt="Arrow" />}
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          width: fullWidth ? "100%" : "auto",
        },
      })}
    >
      Order Now
    </Button>
  );
}
