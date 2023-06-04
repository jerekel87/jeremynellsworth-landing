import * as React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
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
import Header from "../../src/header/AppBar";
import Footer from "../../src/footer";
import PostBody from "../../src/components/post-body";
import PostHeader from "../../src/components/post-header";
import MoreStories from "../../src/components/more-stories";
// lib
import markdownToHtml from "../../lib/markdownToHtml";

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
    marginTop: 60,

    "& > h4": {
      fontFamily: "LufgaBold",
      marginBottom: 30,
    },

    [theme.breakpoints.up("md")]: {
      marginTop: 100,
    },

    [theme.breakpoints.up("xl")]: {
      marginTop: 120,
    },
  },
}));

export default function Post({ post, morePosts, preview }) {
  const classes = useStyles();
  const router = useRouter();

  const [readMore, setReadMore] = React.useState([]);

  React.useEffect(() => {
    if (morePosts.length) {
      let restructuredData = [];

      morePosts.map((x) => {
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

      setReadMore(restructuredData);
    }
  }, [morePosts]);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <React.Fragment>
      <Header />
      <Box component="main">
        <Box className={classes.root}>
          <Container maxWidth="xl">
            {router.isFallback ? (
              <Typography variant="h4">Loading…</Typography>
            ) : (
              <>
                <Box component="article">
                  <NextSeo
                    title={post.title}
                    canonical={post.slug}
                    description={post.excerpt}
                    openGraph={{
                      url: post.slug,
                      title: post.title,
                      description: post.excerpt,
                      site_name: "Jeremy Ellsworth Designs LLC",
                      images: [
                        {
                          url: post.coverImage?.url,
                          width: post.coverImage?.width,
                          height: post.coverImage?.height,
                          alt: post.coverImage?.alternativeText,
                        },
                      ],
                    }}
                  />
                  <PostHeader
                    title={post.title}
                    coverImage={post.image.data.attributes}
                    date={post.createdAt}
                    author={`${post.author.data.attributes.firstname} ${post.author.data.attributes.lastname}`}
                  />
                  <PostBody content={post.content} />
                </Box>
                <Box className={classes.section}>
                  <Typography variant="h4">Read More</Typography>
                  <Grid container direction="row" spacing={6}>
                    {readMore.length > 0 && <MoreStories posts={readMore} />}
                  </Grid>
                </Box>
              </>
            )}
          </Container>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const blogs = await fetchData(
    `blogs?filters[slug][$eq]=${params.slug}&populate=*`
  );
  const content = await markdownToHtml(
    blogs?.data[0]?.attributes?.content || ""
  );
  const morePosts = await fetchData(
    `blogs?filters[slug][$ne]=${params.slug}&sort[0]=createdAt%3Adesc&pagination[pageSize]=3&populate=*`
  );

  return {
    props: {
      post: {
        ...blogs?.data[0]?.attributes,
        content,
      },
      morePosts: morePosts?.data ?? [],
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await fetchData("blogs?fields[0]=slug");

  return {
    paths: paths?.data?.map((post) => `/blogs/${post.attributes.slug}`) || [],
    fallback: "blocking",
  };
}
