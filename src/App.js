// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

const AIRTABLE_BASE_ID = "app3e7IISBXeBPcfy/tblyfB4NGIZxvi0dE/viwQNghfccfLigb4m?";
const AIRTABLE_TABLE_NAME = "DogSittingReviews";
const AIRTABLE_TOKEN = "pat95eOKscpWfQkYN.b5aecf4159f42492ef0dc840fac3c0558e90d7d41c8e7ec1e3ab7cb7aaa0b5cc";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pet Sitter</h1>
        <UserProfile />
        <MyServicesSection />
        <HowToBookMe />
        <RulesSection />
        <ImageCarousel />
        {/* <DogSittingReviews /> */}
      </header>
    </div>
  );
}

export default App;


// shows user profile image, name, age, about me
function UserProfile() {
  return (
    <div>
      <p>Hi! My name is Elizabeth Johnson. I am 23 and based in the Richmond area. I would love to take care of your animals while you're out of town or busy with life!</p>
      <AboutMeSection />
    </div>
  );
}


// About Me Section
// has profile pic, and more about me and expereince buttons
function AboutMeSection() {
  return (
    <div className="About-Me-Section">
      <ProfileImage />
      <AboutMeButtonSection />
    </div>
  )
}

// Shows my profile image
function ProfileImage() {
  return (
    <img
      src="EJ_Emily_Bartell_Photography-22.jpg"
      alt="Elizabeth Johnson"
      className="Profile-image"
    />
  );
}

// three buttons
// 1. Experience
// 3. more about me
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

// About me and Experience button holder
function AboutMeButtonSection() {
  return (
    <div>
      <MoreAboutMeButton />
      <ExperienceButton />
    </div>
  )
}

// My Services
function MyServicesSection() {
  return (
    <div>
      <h2>My Services:</h2>
      <div>
        <DropIns />
        <HouseSit />
        <AdditionalServices />
      </div>
    </div>
  );
}

// Drop Ins Button
function DropIns() {
  return (
    <div>
      <h3>Drop Ins</h3>
      <p>For a drop in, I would come to the house to feed, walk, pet, and play with your animal(s) for at least an hour, or longer if asked with a max of 3 hours. Prices for a general drop in start at $25 for one pet and an additional $10 per pet. I can do a drop in 3 times a day maximum.</p>
    </div>
  )
}

function HouseSit() {
  return (
    <div>
      <h3>House Sit</h3>
      <p>For House sitting, I'd stay at your house to ensure your pet(s) is loved the entire day. Additionally, I will take care of any plants and take in the mail if needed. House sitting with one animal is $85 daily and an extra $10 per pet.</p>
    </div>
  );
}

function AdditionalServices() {
  return (
    <div>
      <h3>Additional Services</h3>
      <p>1. Plants - If you've hired me to do a drop in, I can take care of your plants as well! Plant watering is an extra $5 per drop in.</p>
      <p>2. Mail - If you've hired me to do a drop in, I'd be happy to take your mail inside and leave it in a designated spot for you!</p>
    </div>
  )
}

// How this works section
function HowToBookMe() {
  return (
    <div>
      <h3>How to Book Me</h3>
      <ol>
        <li>Fill out my form below to tell me about your pets, what service you'd like, and any other information you'd like to share with me</li>
        <li>I will contact you to find out a time for a meeting, or to confirm the dates.</li>
        <li>If this is our first time working together or have something of importance you'd like to share with me, we will do a 15 minute Facetime/Zoom call or 15 min in-person meeting to meet your pets and further discuss my responsibilities a few days before your trip.</li>
        <li>For payment, I accept Venmo, Zelle, or check. To finish booking me, there is a $20 charge(from the final charge, not additional) to guarantee your pets spot after the meeting or confirmation, and the rest of the payment is due when you get back home to see your pet(s) safe and sound.</li>
      </ol>
    </div>
  )
}

// Form
// Get persons name, phone number, address
// Get number of pets, pet types, and names
// add captcha to form

// Rules
function RulesSection() {
  return (
    <div>
      <h3>Rules</h3>
      <ol>
        <li>If I have to cancel the pet sitting for any reason, I will refund the $20 booking charge.</li>
        <li>If you have to cancel the pet sitting for any reason, I will refund the $20 booking charge if I am told 7 days in advance, otherwise the $20 will not be refunded.</li>
        <li>The pet sitting will not be confirmed without the initial booking charge. </li>
        <li>I have the right to charge extra for any additional services not listed that I agree to and will show it in the receit.</li>
        <li>I am not liable for any injuries caused by the animals, and the owner will pay the medical cost.</li>
      </ol>
    </div>
  );
}

// Picture carolsel of me and some animals

const images = [
  ["${process.env.PUBLIC_URL}/logo192.png", "Me and Tina"],
  ["${process.env.PUBLIC_URL}/logo512.png", "Me and Cora"],
  ["${process.env.PUBLIC_URL}/EJ_Emily_Bartell_Photography-22.jpg", "me and other"],
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <h3>Animals and I</h3>
      <img
        src={images[currentIndex][0]}
        alt={`Slide ${currentIndex + 1}`}
        className="Image-Carosel"
      />
      <p>{images[currentIndex][1]}</p>

      <button onClick={goToPrevious}>◀</button>
      <button onClick={goToNext}>▶</button>
    </div>
  );
}



// // attempt of the reviews 
// const config = {
//   headers: {
//     Authorization: `Bearer ${AIRTABLE_TOKEN}`,
//     "Content-Type": "application/json",
//   },
// };

// function DogSittingReviews() {
//   const [formData, setFormData] = useState({ name: "", review: "" });
//   const [reviews, setReviews] = useState([]);

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(
//         `https://api.airtable.com/${AIRTABLE_BASE_ID}`,
//         config
//       );
//       const formatted = res.data.records.map((r) => ({
//         id: r.id,
//         name: r.fields.Name,
//         review: r.fields.Review,
//       }));
//       setReviews(formatted);
//     } catch (err) {
//       console.error("Error fetching reviews:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.review) return alert("Please fill out both fields");

//     try {
//       await axios.post(
//         `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
//         {
//           fields: {
//             Name: formData.name,
//             Review: formData.review,
//           },
//         },
//         config
//       );
//       setFormData({ name: "", review: "" });
//       fetchReviews(); // refresh
//     } catch (err) {
//       console.error("Error submitting review:", err);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold mb-4">Leave a Review for My Dog Sitting</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           name="name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           placeholder="Your name"
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="review"
//           value={formData.review}
//           onChange={(e) => setFormData({ ...formData, review: e.target.value })}
//           placeholder="Your review"
//           className="w-full border p-2 rounded"
//         />
//         <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
//           Submit Review
//         </button>
//       </form>

//       <div className="mt-6">
//         <h3 className="text-lg font-semibold">What Others Said</h3>
//         {reviews.length === 0 ? (
//           <p>No reviews yet.</p>
//         ) : (
//           <ul className="space-y-3 mt-2">
//             {reviews.map((r) => (
//               <li key={r.id} className="border p-2 rounded shadow">
//                 <strong>{r.name}</strong>: {r.review}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }