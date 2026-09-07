'use client';

import { useBlogPosts } from '@/lib/blog';
import { profile } from '@/config/profile';
import { Calendar, Clock, Tag } from 'lucide-react';

export function Blog() {
  const { posts, isLoading, isError } = useBlogPosts(profile.social.blog);

  if (isLoading) {
    return (
      <section id="blog" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">最新文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || posts.length === 0) {
    return (
      <section id="blog" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">最新文章</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            无法加载博客文章，请稍后再试。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">最新文章</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {post.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.pubDate).toLocaleDateString('zh-CN')}</span>
                </div>
                
                {post.categories.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>{post.categories.slice(0, 2).join(', ')}</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a
            href={profile.social.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            访问博客
          </a>
        </div>
      </div>
    </section>
  );
}