/* eslint-disable @next/next/no-img-element */
import * as React from "react";
// mui
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// components
import Link from "../Link";
import Newsletter from "./Newsletter";
// import OrderButton from "../Button";
import CalComButton from "../CalComButton";
// data
import contacts from "../../_mocks_/contacts";

// -----------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 50,
    position: "relative",
    backgroundImage: "url('/images/bg/footer/shape-7-copy-2.png')",
    backgroundRepeat: "repeat-x",
    backgroundPosition: "top center",
    backgroundSize: "130%",
    paddingTop: 60,
    marginTop: -50,

    [theme.breakpoints.up("lg")]: {
      marginTop: -60,
    },

    "& > div": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  section: {
    maxWidth: 740,
    margin: "0 auto",
    backgroundImage: "url('/images/map/vector-smart-object.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    textAlign: "center",
    marginBottom: 60,

    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(10, 0),
    },

    "& h2": {
      fontFamily: "LufgaBold",
      color: "#fff",
      fontSize: 30,

      [theme.breakpoints.up("md")]: {
        fontSize: 50,
      },

      "& span": {
        color: theme.palette.primary.main,
      },
    },

    "& p": {
      color: "#737373",
      fontSize: 17,
      lineHeight: 1.6,
      margin: theme.spacing(3, 0),
    },
  },
  contacts: {
    paddingBottom: 30,
    borderBottom: "1px solid #242214",

    [theme.breakpoints.up("lg")]: {
      "& .social:first-of-type": {
        paddingLeft: 0,
      },
    },

    "& a": {
      textDecoration: "none",
      color: "#fff",

      "& p": {
        paddingLeft: 10,
      },
    },

    "& img": {
      display: "block",
    },

    "& .icon .img:not(:first-of-type)": {
      marginLeft: 32,

      [theme.breakpoints.up("lg")]: {
        marginLeft: 7,
      },
    },
  },
  bottomBar: {
    padding: theme.spacing(5, 0),
    textAlign: "center",

    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(7, 0),
    },

    "& p": {
      color: "#fff",
      marginBottom: theme.spacing(2),
    },

    "& span": {
      color: "#737373",
    },
  },
}));

// -----------------------------------------------

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Newsletter />
      <Box className={classes.root}>
        <Container maxWidth="xl">
          <Box component="section" className={classes.section}>
            <Typography variant="h2">
              2,500<span>+</span> Clients and Counting
            </Typography>
            <Typography variant="body2">
              For over 15 years, I’ve dedicated my time to ensure every customer
              is taken care of and they receive exactly what they paid for, no
              excuses! I’m ready, are you?
            </Typography>
            <CalComButton fullWidth />
          </Box>
          <Box className={classes.contacts}>
            <Grid
              container
              spacing={4}
              justifyContent={{ xs: "center", lg: "space-around" }}
            >
              {contacts.map((list, i) => (
                <Grid key={i} item className="social">
                  <Stack direction="row" alignItems="center" className="icon">
                    {Array.isArray(list.icon) ? (
                      list.icon.map((x, y) => (
                        <Link key={y} href={list.url[y]} className="img">
                          <img src={x} alt={list.label} />
                        </Link>
                      ))
                    ) : (
                      <Link href={list.url}>
                        <img src={list.icon} alt={list.label} />
                      </Link>
                    )}
                    <Hidden lgDown>
                      <Link href={list.url[0] || list.url}>
                        <Typography variant="body2">{list.label}</Typography>
                      </Link>
                    </Hidden>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
        <Box className={classes.bottomBar}>
          <Container maxWidth="xl">
            <Typography variant="body2">
              Jeremy Ellsworth - Your Five Star Creative Specialist
            </Typography>
            <Typography variant="bobdy2" component="span">
              &copy; Jeremy Ellsworth Designs LLC. Trademarks and brands are the
              property of their respective owners.
            </Typography>
          </Container>
        </Box>
      </Box>
    </React.Fragment>
  );
}
