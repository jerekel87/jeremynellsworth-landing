import * as React from "react";
import Script from "next/script";
import { NextSeo } from "next-seo";
// utils
import { fetchData } from "../util/api";
// mui
import Box from "@mui/material/Box";
// components
import Header from "../src/header/AppBar";
import TopContent from "../src/section/TopContent";
import Services from "../src/section/Services";
import Process from "../src/section/Process";
import Work from "../src/section/Work";
import Reviews from "../src/section/Reviews";
import Faqs from "../src/section/Faqs";
import Footer from "../src/footer";

export default function Index({ services, catalogs, reviews, faqs, seo }) {
  const servicesRef = React.useRef();
  const processRef = React.useRef();
  const workRef = React.useRef();
  const reviewsRef = React.useRef();
  const faqRef = React.useRef();
  const headerRef = React.useRef();

  const [meta, setMeta] = React.useState({});

  React.useEffect(() => {
    if (seo) {
      const data = seo.attributes.seo;
      setMeta({
        title: data.metaTitle,
        description: data.metaDescription,
        image: {
          url:
            process.env.NEXT_PUBLIC_STRAPI_URL +
            data.sharedImage.data.attributes.url,
          width: data.sharedImage.data.attributes.width,
          height: data.sharedImage.data.attributes.height,
          alt: data.metaTitle,
        },
      });
    }
  }, [seo]);

  const handleNavigate = (ref) => {
    const headerHeight = headerRef.current.offsetHeight;
    switch (ref) {
      case "services":
        window.scroll({
          top: servicesRef.current.offsetTop - headerHeight,
          behavior: "smooth",
        });
        break;
      case "process":
        window.scroll({
          top: processRef.current.offsetTop - headerHeight,
          behavior: "smooth",
        });
        break;
      case "work":
        window.scroll({
          top: workRef.current.offsetTop - headerHeight,
          behavior: "smooth",
        });
        break;
      case "reviews":
        window.scroll({
          top: reviewsRef.current.offsetTop - headerHeight,
          behavior: "smooth",
        });
        break;
      case "faq":
        window.scroll({
          top: faqRef.current.offsetTop - headerHeight,
          behavior: "smooth",
        });
        break;
    }
  };

  if (!meta) return null;

  return (
    <React.Fragment>
      <NextSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          title: meta.title,
          description: meta.description,
          site_name: meta.title,
          images: [
            {
              url: meta.image?.url,
              width: meta.image?.width,
              height: meta.image?.height,
              alt: meta.image?.alt,
            },
          ],
        }}
      />
      <Header elemRef={headerRef} navigate={handleNavigate} />
      <Script id="gtag" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M82FF5P');`}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-M82FF5P"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        ></iframe>
      </noscript>
      <Box component="main">
        <TopContent />
        <Services elemRef={servicesRef} data={services} />
        <Process elemRef={processRef} />
        <Work elemRef={workRef} data={catalogs} />
        <Reviews elemRef={reviewsRef} data={reviews} />
        <Faqs elemRef={faqRef} data={faqs} />
      </Box>
      <Footer />
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const services = await fetchData("services?populate=deep");
  const catalogs = await fetchData(
    "catalogs?filters[featured][$eq]=true&populate=deep"
  );
  const reviews = await fetchData(
    "reviews?filters[featured][$eq]=true&populate=deep"
  );
  const faqs = await fetchData("faqs");
  const seo = await fetchData("homepage?populate=deep");

  return {
    props: {
      services: services?.data || null,
      catalogs: catalogs?.data || null,
      reviews: reviews?.data || null,
      faqs: faqs?.data || null,
      seo: seo?.data || null,
    },
    revalidate: 60,
  };
}
