// mui
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// components
import Date from "./date";
import CoverImage from "./cover-image";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 30,

    "& > h1": {
      fontFamily: "LufgaBold",
    },

    "& > .banner": {
      margin: "24px 0",
    },

    "& > .date": {
      fontSize: "80%",
    },
  },
}));

export default function PostHeader({ title, coverImage, date, author }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Typography>{author}</Typography>
      <Box className="banner">
        <CoverImage title={title} responsiveImage={coverImage} />
      </Box>
      <Box className="date">
        <Date dateString={date} />
      </Box>
    </Box>
  );
}
