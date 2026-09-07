import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contributions } from '@/components/Contributions';

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Contributions />
    </main>
  );
}
