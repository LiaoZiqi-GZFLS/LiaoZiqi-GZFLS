import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contributions } from '@/components/Contributions';
import { Blog } from '@/components/Blog';
import { Contact } from '@/components/Contact';
import { Navigation } from '@/components/Navigation';
import { profile } from '@/config/profile';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contributions />
        <Blog />
        <Contact />
      </main>
      <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
        <p>© 2026 {profile.name}. 使用 Next.js 和 Tailwind CSS 构建</p>
      </footer>
    </>
  );
}
