/* eslint-disable @next/next/no-img-element */
import * as React from "react";
// mui
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// components
import OrderButton from "../Button";
import ReviewCard from "../ReviewCard";

// -----------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 60,
    paddingBottom: 80,
    backgroundColor: "#faf7e6",
    position: "relative",
    zIndex: 1,

    [theme.breakpoints.up("md")]: {
      padding: "80px 0",
    },

    [theme.breakpoints.up("xl")]: {
      padding: "110px 0",
    },

    "&::before": {
      content: "''",
      background: "#fefefe",
      height: 300,
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      zIndex: -1,
    },

    "&::after": {
      content: '""',
      backgroundImage: "url('/images/bg/reviews/bottom-pattern.png')",
      display: "block",
      position: "absolute",
      bottom: 300,
      left: 0,
      width: "100%",
      zIndex: -1,
      paddingBottom: "30px",
    },
  },
  section: {
    textAlign: "center",
    maxWidth: 764,
    margin: "0 auto 30px",

    [theme.breakpoints.up("xl")]: {
      textAlign: "left",
      margin: "200px 0 0 0",
    },

    "& h6": {
      fontSize: 16,
      fontWeight: 600,
      color: theme.palette.gray.main,
    },
    "& h2": {
      fontFamily: "LufgaBold",
      fontSize: 50,
      lineHeight: 1.4,
      margin: theme.spacing(1, 0),

      "& .bg": {
        paddingBottom: 6,
        backgroundImage: "url('/images/icons/text-bg-primary.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
      },
    },
    "& .stars": {
      "& img": {
        width: 16,
        height: 16,
        margin: 1,
      },
      "& p": {
        fontSize: 16,
        lineHeight: 1.5,
        marginTop: 2,
        marginLeft: 5,
      },
    },
    "& > p": {
      color: theme.palette.gray.main,
      fontSize: 14,
      margin: theme.spacing(3, 0),

      [theme.breakpoints.up("xl")]: {
        maxWidth: 315,
      },
    },
    "& .platforms": {
      marginBottom: theme.spacing(5),

      "& img": {
        marginRight: 15,

        "&.google": {
          maxHeight: 18,
        },
        "&.facebook": {
          maxHeight: 14,
        },
        "&.trustpilot": {
          maxHeight: 22,
        },
      },
    },
  },
}));

// -----------------------------------------------

const ReviewGrid = ({ arr, classes, spacing }) => {
  return (
    <Grid item xs={12} md={6} xl={4} mt={spacing && { md: 8 }}>
      {arr.map((item, i) => (
        <ReviewCard data={item} key={i} />
      ))}
    </Grid>
  );
};

// -----------------------------------------------

export default function Reviews({ elemRef, data }) {
  const classes = useStyles();

  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    if (data.length) {
      const restructuredData = [];

      data.map((x) => {
        const y = x.attributes;
        const { customer, details } = y;

        restructuredData.push({
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
        });
      });

      setReviews(restructuredData);
    } else {
      setReviews([]);
    }
  }, [data]);

  const firstGrid = [];
  const secondGrid = [];

  reviews.map((x, i) => {
    if (i + 1 <= reviews.length / 2) {
      firstGrid.push(x);
    } else {
      secondGrid.push(x);
    }
  });

  return (
    <Box className={classes.root} ref={elemRef}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, lg: 2.5 }}>
          <Grid item xs={12} xl={4}>
            <Box component="section" className={classes.section}>
              <Typography variant="h6">Customer Satisfaction</Typography>
              <Typography variant="h2">
                <span className="bg">980</span>+ 5 Star Reviews
              </Typography>
              <Stack
                direction="row"
                className="stars"
                alignItems="center"
                justifyContent={{ xs: "center", xl: "start" }}
              >
                <img src="/images/icons/star-full.png" alt="Star" />
                <img src="/images/icons/star-full.png" alt="Star" />
                <img src="/images/icons/star-full.png" alt="Star" />
                <img src="/images/icons/star-full.png" alt="Star" />
                <img src="/images/icons/star-full.png" alt="Star" />
                <Typography>5.0</Typography>
              </Stack>
              <Typography>
                All reviews can be cross checked and verified through the
                following platforms
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                className="platforms"
                justifyContent={{ xs: "center", xl: "start" }}
              >
                <img
                  src="/images/icons/google-dark.png"
                  alt="Google"
                  className="google"
                />
                <img
                  src="/images/icons/facebook-dark.png"
                  alt="Facebook"
                  className="facebook"
                />
                <img
                  src="/images/icons/trustpilot-dark.png"
                  alt="Trust Pilot"
                  className="trustpilot"
                />
              </Stack>
              <OrderButton fullWidth />
            </Box>
          </Grid>
          <ReviewGrid arr={firstGrid} classes={classes} />
          <ReviewGrid arr={secondGrid} classes={classes} spacing={true} />
        </Grid>
      </Container>
    </Box>
  );
}
