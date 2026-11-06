import { AppBand } from '@/components/AppBand';
import { CommandCentre } from '@/components/CommandCentre';
import { Compare } from '@/components/Compare';
import { Demo } from '@/components/Demo';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { Layers } from '@/components/Layers';
import { ModuleMarquee } from '@/components/ModuleMarquee';
import { Modules } from '@/components/Modules';
import { Playground } from '@/components/Playground';
import { Problems } from '@/components/Problems';
import { Security } from '@/components/Security';
import { Swarm } from '@/components/Swarm';
import { TheDay } from '@/components/TheDay';
import { Tuner } from '@/components/Tuner';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({ title: site.title, description: site.description, path: '/', ogTitle: site.shortTitle });

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main">
        <Hero />
        <ModuleMarquee />
        <Problems />
        <Swarm />
        <Layers />
        <TheDay />
        <CommandCentre />
        <Playground />
        <Modules />
        <Tuner />
        <Compare />
        <AppBand />
        <Security />
        <Faq />
        <Demo />
      </main>
      <Footer />
    </>
  );
}
