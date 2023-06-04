/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Image from "next/image";
// mui
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// components
import VideoPlayer from "../VideoPlayer";
import OrderButton from "../Button";
import CatalogCard from "../CatalogCard";
// data
import ReviewCard from "../ReviewCard";

// -----------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 60,
    paddingBottom: 80,
    backgroundColor: "#fefefe",
    position: "relative",

    [theme.breakpoints.up("lg")]: {
      padding: "80px 0 130px",
    },

    "&::after": {
      content: '""',
      backgroundImage: "url('/images/bg/work/bottom-pattern.png')",
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      paddingBottom: "30px",
    },
  },
  section: {
    textAlign: "center",
    maxWidth: 764,
    margin: "0 auto 60px",

    "& h2": {
      fontFamily: "LufgaBold",
      fontSize: 48,
      lineHeight: 1.2,
      marginBottom: theme.spacing(3),
    },

    "& > p": {
      color: theme.palette.gray.main,
      lineHeight: 1.8,

      [theme.breakpoints.up("md")]: {
        maxWidth: 570,
        margin: "0 auto",
      },

      [theme.breakpoints.up("lg")]: {
        maxWidth: "100%",
        margin: "0",
      },

      "& span": {
        fontWeight: 600,
        color: "initial",
      },
    },
  },
  extra: {
    position: "relative",
    paddingBottom: "100%",
    backgroundColor: "#f4f4f4",

    "& section": {
      position: "absolute",
      width: "75%",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",

      "& h4": {
        fontSize: 40,
        fontFamily: "LufgaBold",

        [theme.breakpoints.up("sm")]: {
          fontSize: 30,
        },

        [theme.breakpoints.up("lg")]: {
          fontSize: 40,
        },
      },

      "& p": {
        fontSize: 16,
        margin: theme.spacing(3, 0),

        [theme.breakpoints.up("sm")]: {
          fontSize: 14,
        },

        [theme.breakpoints.up("lg")]: {
          fontSize: 16,
        },
      },

      "& button": {
        width: "100%",
      },
    },
  },
  dialog: {
    "& .MuiPaper-root": {
      borderRadius: 0,
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },
}));

// -----------------------------------------------

const FilterButton = ({ trigger }) => {
  const classes = useStyles();

  return (
    <Stack
      direction={{ xs: "row", md: "column-reverse" }}
      alignItems="center"
      justifyContent="flex-end"
      mb={3}
      className={classes.filter}
    >
      <Typography variant="body2">Filter</Typography>
      <Box className="filterBtn" onClick={trigger(true)}>
        <span />
        <span />
        <span />
      </Box>
    </Stack>
  );
};

// -----------------------------------------------

export default function Work({ elemRef, data }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState(null);
  const [limit, setLimit] = React.useState(11);
  const [loadedMore, setLoadedMore] = React.useState(false);
  const [catalogs, setCatalogs] = React.useState([]);

  React.useEffect(() => {
    if (data && data.length) {
      const restructuredData = [];

      data.map((x) => {
        const y = x.attributes;
        const { review, logo } = y;
        const customer = review.data ? review.data.attributes.customer : null;
        const details = review.data ? review.data.attributes.details : null;

        restructuredData.push({
          title: y.title,
          logo:
            process.env.NEXT_PUBLIC_STRAPI_URL + logo.data[0].attributes.url,
          theme: y.theme,
          sizes: {
            mobile: y.breakpoint.mobile,
            desktop: y.breakpoint.desktop,
          },
          video: y.videoId,
          review: review.data
            ? {
                customer: {
                  image: customer.image.data
                    ? process.env.NEXT_PUBLIC_STRAPI_URL +
                      customer.image.data[0].attributes.url
                    : null,
                  name: customer.name,
                  job: customer.job,
                },
                comment: details.comment,
                platform: details.platform,
                datetime: details.datetime,
                ratings: details.retings,
              }
            : null,
        });
      });

      setCatalogs(restructuredData);
    } else {
      setCatalogs([]);
    }
  }, [data]);

  const handleClickOpen = (itemData) => {
    setContent(itemData);
    setOpen(true);
  };

  const handleClose = () => {
    setContent(null);
    setOpen(false);
  };

  const loadMore = () => {
    setLoadedMore(true);
    setLimit(catalogs.length);
  };

  return (
    <Box className={classes.root} ref={elemRef}>
      <Container maxWidth="xl">
        <Box sx={{ position: "relative" }}>
          <Box component="section" className={classes.section}>
            <Typography component="h2">Creative Work</Typography>
            <Typography variant="body2">
              Whether you’re a small start up company or a well established
              corporation,{" "}
              <span>I will assist you with all your creative needs!</span>
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={{ xs: 2, lg: 2.5 }}>
          {catalogs.slice(0, limit).map((item, i) => (
            <Grid item xs={12} sm={6} lg={4} key={i}>
              <CatalogCard data={item} onClick={handleClickOpen} withButton />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} lg={4}>
            <Box className={classes.extra}>
              <Box component="section">
                <Typography variant="h4">Like what you see?</Typography>
                <Typography>
                  Order now and remember, your logo is the heart of your brand
                  and the face of your business.
                </Typography>
                <OrderButton />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {!loadedMore && catalogs.length > limit ? (
          <Box textAlign="center" mt={{ xs: 6, md: 10 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={loadMore}
              sx={(theme) => ({
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              })}
            >
              Show More
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Container>
      {content?.video !== null ? (
        <VideoPlayer open={open} setOpen={setOpen} videoId={content?.video} />
      ) : (
        <Dialog
          className={classes.dialog}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {content.review && <ReviewCard data={content.review} />}
        </Dialog>
      )}
    </Box>
  );
}
