import * as React from "react";
import Header from "../../src/header/AppBar";
// mui
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// components
import Footer from "../../src/footer";
import MoreStories from "../../src/components/more-stories";
// lib
import { getAllPostsForHome } from "../../lib/api";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: "#fefefe",
    position: "relative",

    [theme.breakpoints.up("md")]: {
      padding: "100px 0 60px",

      "& .imgHolderMain": {
        paddingRight: 20,
        width: "50%",
      },
    },

    [theme.breakpoints.up("lg")]: {
      padding: "100px 0 80px",

      "& .imgHolderMain": {
        paddingRight: 40,
      },
    },

    [theme.breakpoints.up("xl")]: {
      padding: "120px 0 80px",

      "& .imgHolderMain": {
        paddingRight: 55,
      },
    },
  },
  section: {
    textAlign: "left",
    marginBottom: 60,

    "& h2": {
      fontFamily: "LufgaBold",
      fontSize: 48,
      lineHeight: 1.2,
      marginBottom: theme.spacing(3),
    },

    "& > p": {
      color: theme.palette.gray.main,
      lineHeight: 1.6,

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
}));

export default function Blog({ allPosts }) {
  const classes = useStyles();
  const morePosts = allPosts;

  return (
    <React.Fragment>
      <Header />
      <Box component="main">
        <Box className={classes.root}>
          <Container maxWidth="xl">
            <Box sx={{ position: "relative" }}>
              <Box component="section" className={classes.section}>
                <Typography component="h2">Blog Posts</Typography>
                <Typography variant="body2">
                  Peek into the imaginative world of Jeremy Ellsworth, a
                  creative graphic designer with over 17+ years of experience in
                  the field of digital art. Gain valuable knowledge, practical
                  tips, and artistic inspiration for design. Embark on my
                  journey and uncover the magic of conveying stories visually
                  through graphic design.
                </Typography>
              </Box>
            </Box>
            <Grid container direction="row" spacing={6}>
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) || [];
  return {
    props: { allPosts },
    revalidate: 10,
  };
}
