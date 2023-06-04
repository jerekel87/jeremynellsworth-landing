import * as React from "react";
import Header from "../../src/header/AppBar";
import { NextSeo } from "next-seo";
// utils
import { fetchData } from "../../util/api";
// mui
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// components
import Footer from "../../src/footer";
import MoreStories from "../../src/components/more-stories";

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

export default function Blog({ blogs, meta }) {
  const classes = useStyles();

  const [metaData, setMetaData] = React.useState(null);
  const [blogList, setBlogList] = React.useState([]);

  React.useEffect(() => {
    if (meta) {
      const data = meta.attributes;
      setMetaData({
        title: data.title,
        description: data.description,
        seo: {
          title: data.seo.metaTitle,
          description: data.seo.metaDescription,
          image: {
            url:
              process.env.NEXT_PUBLIC_STRAPI_URL +
              data.seo.sharedImage.data.attributes.url,
            width: data.seo.sharedImage.data.attributes.width,
            height: data.seo.sharedImage.data.attributes.height,
            alt: data.seo.metaTitle,
          },
        },
      });
    }
  }, [meta]);

  React.useEffect(() => {
    if (blogs.length) {
      let restructuredData = [];

      blogs.map((x) => {
        const y = x.attributes;
        const image = y.image.data.attributes;
        const author = y.author.data.attributes;

        restructuredData.push({
          title: y.title,
          coverImage: image,
          date: y.createdAt,
          author: `${author.firstname} ${author.lastname}`,
          slug: y.slug,
          excerpt: y.excerpt,
        });
      });

      setBlogList(restructuredData);
    }
  }, [blogs]);

  if (!metaData) return null;

  return (
    <React.Fragment>
      <NextSeo
        title={metaData.title || metaData.seo.title}
        description={metaData.description}
        openGraph={{
          title: metaData.seo.title,
          description: metaData.seo.description,
          site_name: metaData.seo.title,
          images: [
            {
              url: metaData.seo.image?.url,
              width: metaData.seo.image?.width,
              height: metaData.seo.image?.height,
              alt: metaData.seo.image?.alt,
            },
          ],
        }}
      />
      <Header />
      <Box component="main">
        <Box className={classes.root}>
          <Container maxWidth="xl">
            <Box sx={{ position: "relative" }}>
              <Box component="section" className={classes.section}>
                <Typography component="h2">{metaData.title}</Typography>
                <Typography variant="body2">{metaData.description}</Typography>
              </Box>
            </Box>
            <Grid container direction="row" spacing={6}>
              {blogList.length > 0 && <MoreStories posts={blogList} />}
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  );
}

export async function getStaticProps({ preview = false }) {
  const meta = await fetchData("blog-page?populate=deep");
  const blogs = await fetchData("blogs?populate=*");

  return {
    props: {
      blogs: blogs?.data || null,
      meta: meta?.data || null,
    },
    revalidate: 60,
  };
}
