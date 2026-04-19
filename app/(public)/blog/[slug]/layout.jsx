import { blogPosts } from '../../../../src/data/blogPosts'

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogSlugLayout({ children }) {
  return children
}
