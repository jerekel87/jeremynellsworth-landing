import * as React from "react";
import Image from "next/image";
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

export default function OrderButton({ fullWidth, href }) {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      variant="contained"
      color="primary"
      href={href ? href : process.env.NEXT_PUBLIC_ORDER_NOW_URL}
      target="_blank"
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
