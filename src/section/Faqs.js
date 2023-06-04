/* eslint-disable @next/next/no-img-element */
import * as React from "react";
// mui
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// -----------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 60,
    paddingBottom: 80,
    backgroundColor: "#fefefe",
    position: "relative",
  },
  section: {
    textAlign: "center",
    marginBottom: 60,

    "& h2": {
      fontFamily: "LufgaBold",
      fontSize: 48,
      lineHeight: 1.2,
      margin: theme.spacing(3, 0),
    },

    "& > p": {
      color: theme.palette.gray.main,
      lineHeight: 1.8,
      maxWidth: 575,
      margin: "0 auto",

      "& span": {
        fontWeight: 600,
        color: "initial",
      },
    },
  },
  item: {
    cursor: "pointer",
    border: "1px solid #cdcdcd",
    padding: 30,

    "&:not(:last-of-type)": {
      marginBottom: 20,
    },

    "& .qqq": {
      fontFamily: "LufgaBold",
      color: "#cdcdcd",
      fontSize: 16,
    },

    "& section": {
      position: "relative",
      padding: "0 16px",

      "& h5": {
        position: "relative",
        fontSize: 20,
        fontFamily: "LufgaBold",
        paddingBottom: 8,
        marginBottom: 16,

        "&::after": {
          content: "''",
          position: "absolute",
          display: "block",
          width: 30,
          height: 2,
          bottom: 0,
          backgroundColor: theme.palette.primary.main,
        },
      },

      "& p": {
        fontSize: 16,
        lineHeight: 1.8,

        [theme.breakpoints.up("lg")]: {
          fontSize: 16,
          lineHeight: 1.8,
        },
      },

      "& img": {
        position: "absolute",
        right: -14,
        width: 14,
        top: 4,
      },
    },
  },
  ellipsis: {
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// -----------------------------------------------

export default function Faqs({ elemRef, data }) {
  const classes = useStyles();

  const [loadedMore, setLoadedMore] = React.useState(false);
  const [faqs, setFaqs] = React.useState([]);
  const [limit, setLimit] = React.useState(4);

  React.useEffect(() => {
    if (data && data.length) {
      const restructuredData = [];

      data.map((x) => {
        const y = x.attributes;

        restructuredData.push({
          id: x.id,
          truncate: true,
          question: y.question,
          answer: y.answer,
        });
      });

      setFaqs(restructuredData);
    } else {
      setFaqs([]);
    }
  }, [data]);

  const handleTruncate = (selected) => {
    const updatedData = faqs.map((faq) => {
      if (faq.id === selected.id) {
        return { ...faq, truncate: !faq.truncate };
      } else return faq;
    });
    setFaqs(updatedData);
  };

  const loadMore = () => {
    setLoadedMore(true);
    setLimit(faqs.length);
  };

  const firstGrid = [];
  const secondGrid = [];

  faqs.slice(0, limit).map((x, i) => {
    if (i + 1 <= limit / 2) {
      firstGrid.push(x);
    } else {
      secondGrid.push(x);
    }
  });

  const FaqsGrid = ({ arr }) => (
    <Grid item xs={12} md={6}>
      {arr.map((item, i) => (
        <Box
          key={i}
          className={classes.item}
          onClick={() => handleTruncate(item)}
        >
          <Stack direction="row" alignItems="start">
            <Typography className="qqq">Q.</Typography>
            <Box component="section">
              <Typography variant="h5">{item.question}</Typography>
              <Typography
                variant="body2"
                className={item.truncate ? classes.ellipsis : ""}
              >
                {item.answer}
              </Typography>
              <img src="/images/icons/plus.png" alt="Plus" />
            </Box>
          </Stack>
        </Box>
      ))}
    </Grid>
  );

  return (
    <Box className={classes.root} ref={elemRef}>
      <Container maxWidth="xl">
        <Box component="section" className={classes.section}>
          <Typography component="h2">Facts</Typography>
          <Typography variant="body2">
            Here are some of the most frequently asked questions I get in
            regards to my business and the services I offer.
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, lg: 2.5 }}>
          <FaqsGrid
            arr={firstGrid}
            classes={classes}
            trigger={handleTruncate}
          />
          <FaqsGrid
            arr={secondGrid}
            classes={classes}
            trigger={handleTruncate}
          />
        </Grid>
        {!loadedMore && faqs.length > limit ? (
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
    </Box>
  );
}
