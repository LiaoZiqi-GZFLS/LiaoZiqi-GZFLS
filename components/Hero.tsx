import { profile } from '@/config/profile';
import Image from 'next/image';
import { Github, BookOpen, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={150}
            height={150}
            className="rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-lg"
            priority
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {profile.name}
        </h1>
        
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
          {profile.title}
        </h2>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          {profile.bio}
        </p>
        
        <div className="flex justify-center gap-4">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
          
          <a
            href={profile.social.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            博客
          </a>
          
          <a
            href={`mailto:${profile.social.email}`}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Mail className="w-5 h-5" />
            联系我
          </a>
        </div>
      </div>
    </section>
  );
}
