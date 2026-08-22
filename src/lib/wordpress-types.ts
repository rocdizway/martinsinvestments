export type BlogPostSummary = Readonly<{
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  modifiedAt: string;
  category: string;
  author: string;
  featuredImage: Readonly<{
    url: string;
    alt: string;
    width?: number;
    height?: number;
  }> | null;
}>;

export type BlogPost = Readonly<
  BlogPostSummary & {
    contentHtml: string;
  }
>;

export type PaginatedPosts = Readonly<{
  posts: BlogPostSummary[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}>;
