import { useState } from "react";

function ExperienceButton() {
  const [showText, setShowText] = useState(false);

  return (
    <div>
      <button onClick={() => setShowText(!showText)}>
        Experience
      </button>
      {showText && <p>I am just starting out with my business, but I have pet sat for some friends these past couple months! I realized I love pet sitting and hope to do it some more! I love dogs and cats, which I have experience watching, but I also dont mind learning how to take care of another type of animal to fill your needs! All animals deserve love and care!</p>}
    </div>
  );
}

export default ExperienceButton;