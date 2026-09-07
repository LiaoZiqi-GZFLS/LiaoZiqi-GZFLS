import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contributions } from '@/components/Contributions';
import { Blog } from '@/components/Blog';

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Contributions />
      <Blog />
    </main>
  );
}
