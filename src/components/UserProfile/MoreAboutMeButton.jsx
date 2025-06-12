import { useState } from 'react';

function MoreAboutMeButton() {
  // sets a state to my button
  const [showText, setShowText] = useState(false);

  return (
    <div>
      <button onClick={() => setShowText(!showText)}>
        More About Me
      </button>
      {showText && <p>I am a recent graduate from James Madison Unviersity with a BS in Computer Science. My family pet is a little dog named Athena, or Tina for short. She is absolutely adorable and I love taking care of her. In my free time I love listening to music, doing arts and crafts, and hanging out with my friends.</p>}
    </div>
  );
}

export default MoreAboutMeButton;