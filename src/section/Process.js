/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

// mui
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Hidden from "@mui/material/Hidden";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// components
// import OrderButton from "../Button";
import CalComButton from "../CalComButton";
// static
import step1 from "../../public/images/banners/sketch-concept.png";
import step3 from "../../public/images/banners/step-3-project-files.png";

// -----------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: "#fefefe",
    position: "relative",

    "&::before, &::after": {
      content: "''",
      display: "block",
      height: 1,
      width: "calc(100% - 40px)",
      backgroundColor: theme.palette.gray.main,
      opacity: 0.15,
      position: "absolute",

      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },

    "&::before": {
      top: 0,
      left: 20,
    },

    "&::after": {
      bottom: 0,
      left: 20,
    },

    [theme.breakpoints.up("md")]: {
      padding: "60px 0 100px",

      "& .imgHolder": {
        width: "50%",
        paddingRight: 20,

        "&.imgHolderReverse": {
          paddingLeft: 20,
          paddingRight: 0,
        },
      },
    },

    [theme.breakpoints.up("lg")]: {
      padding: "80px 0 120px",

      "& .imgHolder": {
        paddingRight: 40,

        "&.imgHolderReverse": {
          paddingLeft: 40,
        },
      },
    },
  },
  divider: {
    height: 80,
    position: "relative",

    "&::after": {
      content: "''",
      display: "block",
      height: 1,
      width: "100%",
      backgroundColor: theme.palette.gray.main,
      opacity: 0.15,
      position: "absolute",
      top: "50%",

      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },

    [theme.breakpoints.up("md")]: {
      height: 120,
    },

    [theme.breakpoints.up("xl")]: {
      height: 190,
    },
  },
  section: {
    [theme.breakpoints.up("md")]: {
      width: "50%",
      paddingLeft: 20,
    },

    [theme.breakpoints.up("lg")]: {
      paddingLeft: 40,
    },

    [theme.breakpoints.up("xl")]: {
      paddingRight: 55,
    },

    "& .step p": {
      fontFamily: "LufgaExtraBold",
      color: "#cdcdcd",
      fontSize: 16,
    },

    "& h2": {
      fontFamily: "LufgaBold",
      fontSize: 48,
      lineHeight: 1.2,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),

      [theme.breakpoints.up("lg")]: {
        fontSize: 60,
      },
    },

    "& > p": {
      color: theme.palette.gray.main,
      lineHeight: 1.8,

      [theme.breakpoints.up("lg")]: {
        fontSize: 16,
      },

      "& span": {
        fontWeight: 600,
        color: "initial",
      },
    },

    "& .imgHolder": {
      margin: theme.spacing(4, 0),
      textAlign: "center",
    },
  },
  reverse: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 0,
    },
  },
  ratings: {
    marginTop: theme.spacing(4),

    "& .stars img": {
      width: 16,
      padding: 1,
    },

    "& .info": {
      padding: theme.spacing(1, 0),

      "& p": {
        fontSize: 15,

        [theme.breakpoints.up("lg")]: {
          fontSize: 16,
        },

        "&:first-of-type, & span": {
          fontWeight: 600,
        },
      },

      "& .dash": {
        display: "block",
        width: 20,
        height: 2,
        margin: theme.spacing(0, 1),
        background: theme.palette.secondary.main,
      },

      "& .bg": {
        paddingBottom: 2,
        backgroundImage: "url('/images/icons/text-bg-gray.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
      },
    },

    "& > img": {
      display: "block",
    },
  },
  sketch: {
    position: "relative",
    padding: 14,

    "& .sketchHolder": {
      zIndex: 5,
    },

    "& .sketchHolder  > div > div": {
      padding: "20px 0",
      positioN: "relative",

      // "&::after": {
      //   content: "''",
      //   display: "block",
      //   position: "absolute",
      //   width: 150,
      //   height: 80,
      //   backgroundSize: "contain",
      //   top: -40,
      //   left: -75,
      //   backgroundImage: "url(/images/banners/sketch/knife.png)",
      // },
    },

    "& .__rcs-handle-root": {
      borderRadius: "4px !important",
      overflow: "hidden",
    },

    "& .__rcs-handle-button": {
      display: "none !important",
    },

    "& .__rcs-handle-line": {
      boxShadow: "none !important",
      width: "5px !important",
      backgroundColor: theme.palette.secondary.main + " !important",
    },

    "& .bgBehind": {
      backgroundImage: "url('/images/banners/sketch/slider-red-bg.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      transform: "scale(1.1)",
      position: "absolute",
      height: "100%",
      width: "100%",
      left: -15,
      top: 0,

      [theme.breakpoints.up("lg")]: {
        transform: "scale(1.15)",
        left: -40,
      },

      [theme.breakpoints.up("xl")]: {
        transform: "scale(1.20)",
        left: -50,
      },
    },
  },
}));

// -----------------------------------------------

export default function Process({ elemRef }) {
  const classes = useStyles();

  return (
    <Box className={classes.root} ref={elemRef}>
      <Container maxWidth="xl">
        <Stack direction={{ md: "row" }} alignItems={{ md: "center" }}>
          <Hidden mdDown>
            <Box className="imgHolder">
              <Image src={step1} alt="Sketch design" priority quality={100} />
            </Box>
          </Hidden>
          <Box component="section" className={classes.section}>
            <Box className="step">
              <Typography>STEP 1.0</Typography>
            </Box>
            <Typography component="h2">Sketch Concept</Typography>
            <Typography variant="body2" sx={{ maxWidth: 465 }}>
              The sketch phase is the first of three steps. Here is where I will
              come up with a unique concept based on the details provided to me
              after you&apos;ve placed your order online through my site.
            </Typography>
            <div className="imgHolder">
              <Hidden mdUp>
                <Image src={step1} alt="Sketch design" priority quality={100} />
              </Hidden>
            </div>
            <CalComButton fullWidth />
            <a
              href="https://www.facebook.com/jnellsworth/reviews"
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Box className={classes.ratings}>
                <Stack direction="row" className="stars">
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                </Stack>
                <Stack direction="row" alignItems="center" className="info">
                  <Typography>5.0</Typography>
                  <div className="dash" />
                  <Typography>
                    total <span className="bg">500</span>
                    <span>+</span> reviews
                  </Typography>
                </Stack>
                <img
                  src="/images/icons/facebook.png"
                  alt="Facebook"
                  height="15px"
                />
              </Box>
            </a>
          </Box>
        </Stack>
        <div className={classes.divider} />
        <Stack direction={{ md: "row-reverse" }} alignItems={{ md: "center" }}>
          <Hidden mdDown>
            <Box className="imgHolder imgHolderReverse">
              <Box className={classes.sketch}>
                <ReactCompareSlider
                  className="sketchHolder"
                  itemOne={
                    <ReactCompareSliderImage
                      src="/images/banners/sketch/sketch-slider.png"
                      alt="Image two"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src="/images/banners/sketch/full-color-slider.png"
                      alt="Image one"
                    />
                  }
                  changePositionOnHover={true}
                />
                <div className="bgBehind" />
              </Box>
            </Box>
          </Hidden>
          <Box
            component="section"
            className={clsx(classes.section, classes.reverse)}
          >
            <Box className="step">
              <Typography>STEP 2.0</Typography>
            </Box>
            <Typography component="h2">Sketch &gt; Vector</Typography>
            <Typography variant="body2" sx={{ maxWidth: 400 }}>
              Once the sketch has been approved, I will begin the process of
              converting your sketch into a full color high resolution vector
              logo design. Even during this phase, I will continue to work with
              you until you are 100% satisfied with the outcome of your logo.{" "}
              <span>I will never leave you unsatisfied, ever!</span>
            </Typography>
            <div className="imgHolder">
              <Hidden mdUp>
                <Box className={classes.sketch}>
                  <ReactCompareSlider
                    className="sketchHolder"
                    itemOne={
                      <ReactCompareSliderImage
                        src="/images/banners/sketch/sketch-slider.png"
                        alt="Image two"
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src="/images/banners/sketch/full-color-slider.png"
                        alt="Image one"
                      />
                    }
                    changePositionOnHover={true}
                  />
                  <div className="bgBehind" />
                </Box>
              </Hidden>
            </div>
            <CalComButton fullWidth />
            <a
              href="https://g.page/r/CW_iaebJZEiKEBA"
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Box className={classes.ratings}>
                <Stack direction="row" className="stars">
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                </Stack>
                <Stack direction="row" alignItems="center" className="info">
                  <Typography>5.0</Typography>
                  <div className="dash" />
                  <Typography>
                    total <span className="bg">525</span>
                    <span>+</span> reviews
                  </Typography>
                </Stack>
                <img
                  src="/images/icons/google.png"
                  alt="Google"
                  height="21px"
                />
              </Box>
            </a>
          </Box>
        </Stack>
        <div className={classes.divider} />
        <Stack direction={{ md: "row" }} alignItems={{ md: "center" }}>
          <Hidden mdDown>
            <Box className="imgHolder">
              <Image src={step3} alt="Project files" priority quality={100} />
            </Box>
          </Hidden>
          <Box component="section" className={classes.section}>
            <Box className="step">
              <Typography>STEP 3.0</Typography>
            </Box>
            <Typography component="h2">Project Files</Typography>
            <Typography variant="body2">
              Once you approve the full color vectorized version of your design,
              I will gather all the final designs needed for your business. This
              includes &quot;Print Ready&quot; files. business:{" "}
              <span>Files Include Ai, EPS, PDF, JPG & PNG</span>
            </Typography>
            <div className="imgHolder">
              <Hidden mdUp>
                <Image src={step3} alt="Project files" priority quality={100} />
              </Hidden>
            </div>
            <CalComButton fullWidth />
            <a
              href="https://www.trustpilot.com/review/jeremynellsworth.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Box className={classes.ratings}>
                <Stack direction="row" className="stars">
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-full.png" alt="Star" />
                  <img src="/images/icons/star-half.png" alt="Star" />
                </Stack>
                <Stack direction="row" alignItems="center" className="info">
                  <Typography>4.9</Typography>
                  <div className="dash" />
                  <Typography>
                    total <span className="bg">100</span>
                    <span>+</span> reviews
                  </Typography>
                </Stack>
                <img
                  src="/images/icons/trustpilot.png"
                  alt="TrustPilot"
                  height="25px"
                />
              </Box>
            </a>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
