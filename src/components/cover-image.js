import Link from "next/link";
import Image from "next/image";

export default function CoverImage({ title, responsiveImage, slug }) {
  const image = (
    <Image
      src={process.env.NEXT_PUBLIC_STRAPI_URL + responsiveImage.url}
      alt={responsiveImage.alternativeText || title}
      quality={100}
      width={responsiveImage.width}
      height={responsiveImage.height}
    />
  );
  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link href={`/blogs/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
