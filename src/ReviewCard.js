/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Image from "next/image";
// mui
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// -----------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    padding: 30,
    boxShadow: "0px 53px 60px 0 rgba(112, 109, 94, 0.1)",
    marginBottom: 24,

    [theme.breakpoints.up("sm")]: {
      padding: 40,
    },

    "&:last-of-type": {
      margin: 0,
    },

    "& .profile": {
      position: "relative",
      width: 60,
      height: 60,
      borderRadius: 30,
      overflow: "hidden",
      backgroundColor: theme.palette.primary.main,

      "& p": {
        fontSize: 25,
        fontWeight: 600,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      },
    },

    "& .info": {
      paddingLeft: 20,

      "& p": {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1,
      },

      "& span": {
        fontSize: 12,
        color: theme.palette.gray.main,
      },
    },

    "& .comment": {
      margin: theme.spacing(4, 0),

      "& p": {
        fontSize: 16,
      },
    },

    "& .footer": {
      "& .google": {
        maxHeight: 18,
      },
      "& .facebook": {
        maxHeight: 14,
      },
      "& .trustpilot": {
        maxHeight: 22,
      },

      "& p": {
        fontSize: 12,
        color: theme.palette.gray.main,
      },

      "& div > img": {
        width: 16,
        marginLeft: 2,
      },
    },
  },
}));

// -----------------------------------------------

export default function ReviewCard({ data }) {
  const classes = useStyles();

  const getStars = (x) => {
    const stars = [];
    for (let i = 0; i < x; i++) {
      stars.push(<img key={i} src="/images/icons/star-full.png" alt="Star" />);
    }

    return stars;
  };

  return (
    <Box className={classes.root}>
      <Stack direction="row" alignItems="center">
        <Box className="profile">
          {data.customer.image ? (
            <Image
              layout="fill"
              src={data.customer.image}
              alt={data.customer.name}
            />
          ) : (
            <Typography>
              {data.customer.name.split(" ").map((x) => x.charAt(0))}
            </Typography>
          )}
        </Box>
        <Box className="info">
          <Typography>{data.customer.name}</Typography>
          <Typography component="span">{data.customer.job}</Typography>
        </Box>
      </Stack>
      <Box className="comment">
        <Typography>{data.comment}</Typography>
      </Box>
      <Box className="footer">
        <img
          className={data.platform}
          src={`/images/icons/${data.platform}.png`}
          alt={data.platform}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{data.datetime}</Typography>
          <Stack direction="row" alignItems="center">
            {getStars(data.ratings)}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
