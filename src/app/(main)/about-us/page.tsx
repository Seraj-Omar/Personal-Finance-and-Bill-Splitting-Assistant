import IntroSection from "../../../shared/ui/about/IntroSection";
import AboutUsSection from "../../../shared/ui/about/AboutUsSection";
import HelpSolutionsSection from "../../../shared/ui/about/HelpSolutionsSection";
import MissionSection from "../../../shared/ui/about/MissionSection";
import CommitmentSection from "../../../shared/ui/about/CommitmentSection";

export default function AboutUsPage() {
  return (
    <main className="flex flex-col gap-20 pb-24">
      <IntroSection />
      <AboutUsSection />
      <HelpSolutionsSection />
      <MissionSection />
      <CommitmentSection />
    </main>
  );
}