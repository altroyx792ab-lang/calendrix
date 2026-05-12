import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blog-data';
import { ArrowRight, Search } from 'lucide-react';

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Helmet>
        <title>Blog & Insights | Calendrix</title>
        <meta name="description" content="Read articles about global cultural events, calendar history, timekeeping, and moon phases." />
      </Helmet>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Calendrix Insights</h1>
        <p className="text-lg text-gray-400">Events, Cultures & Timekeeping.</p>
      </div>

      <div className="flex justify-between items-center mb-12">
        <h2 className="text-2xl font-semibold">Latest Articles</h2>
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search articles..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--color-brand-accent)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="group h-full flex flex-col">
            <div className="glass-card rounded-2xl overflow-hidden flex-1 border border-white/5 hover:border-white/20 transition-all duration-300">
              <div 
                className="h-48 w-full relative transition-transform duration-500 group-hover:scale-105 bg-cover bg-center"
                style={{ 
                  backgroundColor: post.imageColor,
                  backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : undefined
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-bg)]/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 bg-[var(--color-brand-bg)]">
                <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                  <span>The Calendrix Team</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-brand-accent)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm mt-auto border-t border-white/10 pt-4">
                  <span className="text-gray-500">{post.date}</span>
                  <span className="flex items-center gap-1 font-medium text-white group-hover:text-[var(--color-brand-accent)] transition-colors">
                    Read Article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
