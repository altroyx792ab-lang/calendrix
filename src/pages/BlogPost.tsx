import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug, BLOG_POSTS } from '../data/blog-data';
import { ArrowLeft, Share2, Facebook } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Helmet>
        <title>{post.title} | Calendrix</title>
        <meta name="description" content={post.seoDesc} />
        <meta name="keywords" content={post.keywords} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.seoDesc} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
        <link rel="canonical" href={`https://calendrix.com/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "datePublished": post.date,
            "image": post.imageUrl,
            "author": { "@type": "Organization", "name": "Calendrix" }
          })}
        </script>
      </Helmet>

      <div className="flex justify-between items-center mb-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-brand-accent)] transition-colors">
          <ArrowLeft size={16} /> Back to Insights
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Share:</span>
          <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-[var(--color-brand-accent)] transition-colors"><Share2 size={16}/></button>
          <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-[var(--color-brand-accent)] transition-colors"><Facebook size={16}/></button>
        </div>
      </div>

      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
          <span className="px-3 py-1 bg-[var(--color-brand-accent)]/20 text-[var(--color-brand-accent)] rounded-md font-medium">{post.category}</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">{post.title}</h1>
        <p className="text-xl text-gray-400">By The Calendrix Team</p>
      </header>

      <div 
        className="w-full h-64 md:h-96 rounded-2xl mb-12 shadow-2xl relative overflow-hidden bg-cover bg-center"
        style={{ 
          backgroundColor: post.imageColor,
          backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : undefined
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-bg)]/50 to-transparent" />
      </div>

      <div 
        className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-[var(--color-brand-accent)]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <hr className="border-t border-white/10 my-16" />

      <section>
        <h3 className="text-2xl font-bold font-display mb-8">You might also like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map(rp => (
            <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group block">
              <div className="rounded-xl overflow-hidden mb-4 shadow-sm border border-white/5 transition-all duration-300 group-hover:border-[var(--color-brand-accent)]/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                <div 
                  className="h-32 w-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{ 
                    backgroundColor: rp.imageColor,
                    backgroundImage: rp.imageUrl ? `url(${rp.imageUrl})` : undefined 
                  }}
                />
              </div>
              <h4 className="font-bold text-lg leading-snug group-hover:text-[var(--color-brand-accent)] transition-colors line-clamp-2">{rp.title}</h4>
              <p className="text-sm text-gray-400 mt-2">{rp.date}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
