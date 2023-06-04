import Link from "next/link";
// mui
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// components
import Date from "./date";
import CoverImage from "./cover-image";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "block",
    fontFamily: "LufgaBold",
    lineHeight: 1.2,

    "& > a": {
      color: theme.palette.secondary.main,
      textDecoration: "none",
    },
  },
  date: {
    color: "#cdcdcd",
    fontSize: "0.9rem",
  },
  excerpt: {
    fontSize: "0.9rem",
    marginTop: 10,
  },
}));

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <CoverImage
        slug={slug}
        title={title}
        responsiveImage={coverImage.formats.small}
      />
      <Box component="section" mt={2}>
        <Typography variant="h6" gutterBottom className={classes.title}>
          <Link as={`/blogs/${slug}`} href="/blogs/[slug]">
            <a>{title}</a>
          </Link>
        </Typography>
        <Typography component="a" variant="body2" className={classes.date}>
          <Date dateString={date} />
        </Typography>
        <Typography color="textSecondary" className={classes.excerpt}>
          {excerpt}
        </Typography>
      </Box>
    </Grid>
  );
}
