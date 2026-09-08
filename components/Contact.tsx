import { profile } from '@/config/profile';
import { Github, BookOpen, Mail } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">联系方式</h2>

        <div className="flex flex-col items-center gap-4">
          <a
            href={`mailto:${profile.social.email}`}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>{profile.social.email}</span>
          </a>

          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <Github className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>GitHub</span>
          </a>

          <a
            href={profile.social.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>博客</span>
          </a>
        </div>
      </div>
    </section>
  );
}
