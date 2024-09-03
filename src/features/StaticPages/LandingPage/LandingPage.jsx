import { CTASection } from './sections/CTASection';
import { DemoSlider } from './sections/DemoSlider';
import { Features } from './sections/Features';
import { HeroSection } from './sections/HeroSection';
import { Integrations } from './sections/Integrations';
import { SlackDigest } from './sections/SlackDigest';

export const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <DemoSlider />
      <Features />
      <Integrations />
      <SlackDigest />
      <CTASection />
    </div>
  );
};
