import * as React from "react";
import Header from "../src/header/AppBar";
// mui
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// component
import Footer from "../src/footer";

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
      marginBottom: theme.spacing(1),
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
  miniSection: {
    marginTop: theme.spacing(3),

    "& h5": {
      fontFamily: "LufgaBold",
      lineHeight: 1.2,
      marginBottom: theme.spacing(1),
    },

    "& p": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function PrivacyPolicy() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      <Box component="main">
        <Box className={classes.root}>
          <Container maxWidth="xl">
            <Box sx={{ position: "relative" }}>
              <Box component="section" className={classes.section}>
                <Typography component="h2">Privacy Policy</Typography>
                <Typography variant="body2">
                  Last Updated: May 5, 2023
                </Typography>
              </Box>
              <Box>
                <Typography>
                  At Jeremy Ellsworth Designs LLC (&quot;we,&quot;
                  &quot;us,&quot; or &quot;our&quot;), we respect your privacy
                  and are committed to protecting your personal information.
                  This Privacy Policy outlines the types of information we
                  collect, how we use and protect it, and your rights regarding
                  your data.
                </Typography>
                <Box className={classes.miniSection}>
                  <Typography variant="h5">Information We Collect</Typography>
                  <Typography>
                    We collect personal information you provide when using our
                    services or contacting us, such as your name, email address,
                    phone number, and company details. We also collect
                    non-personal data, like website usage, device information,
                    and location data to improve our services.
                  </Typography>
                </Box>
                <Box className={classes.miniSection}>
                  <Typography variant="h5">
                    How We Use Your Information
                  </Typography>
                  <Typography>
                    We use your personal information to respond to inquiries,
                    provide our services, process transactions, send marketing
                    communications, and improve our website&apos;s
                    functionality. We do not sell or share your data with third
                    parties for their marketing purposes without your consent.
                  </Typography>
                </Box>
                <Box className={classes.miniSection}>
                  <Typography variant="h5">
                    Cookies and Tracking Technologies
                  </Typography>
                  <Typography>
                    Our website uses cookies and other tracking technologies to
                    enhance user experience, analyze website performance, and
                    customize content. You can manage your cookie preferences
                    through your browser settings.
                  </Typography>
                </Box>
                <Box className={classes.miniSection}>
                  <Typography variant="h5">Data Protection</Typography>
                  <Typography>
                    We implement security measures to protect your personal
                    information from unauthorized access, disclosure, or loss.
                    However, no data transmission over the internet is 100%
                    secure; we cannot guarantee its absolute security.
                  </Typography>
                </Box>
                <Box className={classes.miniSection}>
                  <Typography variant="h5">Third-Party Links</Typography>
                  <Typography>
                    Our website may contain links to external sites. We are not
                    responsible for the privacy practices of those sites. We
                    encourage you to review their privacy policies before
                    providing personal information.
                  </Typography>
                </Box>
                <Box className={classes.miniSection}>
                  <Typography variant="h5">Your Rights and Choices</Typography>
                  <Typography>
                    You have the right to access, update, or delete your
                    personal information. To exercise these rights, contact us
                    at{" "}
                    <a href="mailto:concerns@jeremynellsworth.com">
                      concerns@jeremynellsworth.com
                    </a>
                    . We may require verification of your identity before
                    processing requests.
                  </Typography>
                </Box>
                <Box className={classes.miniSection}>
                  <Typography variant="h5">
                    Changes to This Privacy Policy
                  </Typography>
                  <Typography>
                    We reserve the right to modify this Privacy Policy at any
                    time. Any changes will be posted on this page with the
                    updated date. Your continued use of our services constitutes
                    acceptance of the revised policy.
                  </Typography>
                </Box>
                <Box className={classes.miniSection}>
                  <Typography variant="h5">Contact Us</Typography>
                  <Typography>
                    If you have any questions or concerns about this Privacy
                    Policy, please contact us at{" "}
                    <a href="mailto:concerns@jeremynellsworth.com">
                      concerns@jeremynellsworth.com
                    </a>{" "}
                    or 25 Cherry street, Belmont, New Hampshire 03220.
                  </Typography>
                  <Typography>
                    By using our services, you consent to the collection, use,
                    and disclosure of your information as described in this
                    Privacy Policy.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  );
}
