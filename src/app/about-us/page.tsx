// import IntroSection from "./IntroSection";
// import AboutInfoSection from "./AboutInfoSection";

// export default function AboutUsPage() {
//   return (
//     <main className="flex flex-col gap-20">
//       <IntroSection />
//       <AboutInfoSection />
//     </main>
//   );
// }
import IntroSection from "../../shared/ui/about/IntroSection";
import AboutUsSection from "../../shared/ui/about/AboutUsSection";
import HelpSolutionsSection from "../../shared/ui/about/HelpSolutionsSection";
import MissionSection from "../../shared/ui/about/MissionSection";
import CommitmentSection from "../../shared/ui/about/CommitmentSection";

export default function AboutUsPage() {
  return (
    <main className="flex flex-col gap-20">
      <IntroSection />
      <AboutUsSection />
      <HelpSolutionsSection/>
            <MissionSection/>
                        <CommitmentSection/>



      <section>
        {/* <h2>About Info</h2> */}
      </section>
    </main>
  );
}
