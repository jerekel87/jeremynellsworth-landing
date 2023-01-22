import PostPreview from "./post-preview";

export default function MoreStories({ posts }) {
  return posts.map((post) => (
    <PostPreview
      key={post.slug}
      title={post.title}
      coverImage={post.coverImage}
      date={post.date}
      author={post.author}
      slug={post.slug}
      excerpt={post.excerpt}
    />
  ));
}
