import * as React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
// mui
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// components
import HeaderBlog from "../../src/header/AppBarBlog";
import PostBody from "../../src/components/post-body";
import PostHeader from "../../src/components/post-header";
import MoreStories from "../../src/components/more-stories";
// lib
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
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

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <React.Fragment>
      <HeaderBlog />
      <Box component="main">
        <Box className={classes.root}>
          <Container maxWidth="xl">
            {router.isFallback ? (
              <Typography variant="h4">Loading…</Typography>
            ) : (
              <>
                <Box component="article">
                  <Head>
                    <title>{post.title} | Jeremy Ellsworth Designs LLC</title>
                    <meta property="og:image" content={post.ogImage.url} />
                  </Head>
                  <PostHeader
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    author={post.author}
                  />
                  <PostBody content={post.content} />
                </Box>
                <Box className={classes.section}>
                  <Typography variant="h4">Read More</Typography>
                  <Grid container direction="row" spacing={6}>
                    {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                  </Grid>
                </Box>
              </>
            )}
          </Container>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);
  const content = await markdownToHtml(data?.post?.content || "");

  return {
    props: {
      preview,
      post: {
        ...data?.post,
        content,
      },
      morePosts: data?.morePosts ?? [],
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
}
