import ProfileImage from "../images/ProfileImage.jsx";
import AboutMeButtonSection from "./AboutMeButtonSection.jsx";
// About Me Section
// has profile pic, and more about me and expereince buttons
function AboutMeSection() {
  return (
    <div className="About-Me-Section">
      <ProfileImage />
      <AboutMeButtonSection />
    </div>
  );
}

export default AboutMeSection;