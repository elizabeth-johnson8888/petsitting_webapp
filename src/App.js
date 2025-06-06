// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

const AIRTABLE_BASE_ID = "app3e7IISBXeBPcfy";
const AIRTABLE_TABLE_NAME = "tblyfB4NGIZxvi0dE";
const AIRTABLE_TOKEN = "pat95eOKscpWfQkYN.b5aecf4159f42492ef0dc840fac3c0558e90d7d41c8e7ec1e3ab7cb7aaa0b5cc";

const CODE_BASE_ID = "appxXImFya1XBVcUc"
const CODE_TABLE_NAME = "tblacJYfneAgHgvXk";
const CODE_API_TOKEN = "patX59ml1dWHnVocg.2410f671bcb0d313fd49ca1fe7fc64b68c847649607639c2689d22f158ee2e4d";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pet Sitter</h1>
        <UserProfile />
        <MyServicesSection />
        <HowToBookMe />
        <HireMeForm />
        <RulesSection />
        <ImageCarousel />
        <AirtableReviews />
        <ReviewForm />
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
// Get number of pets, pet types, and names, age
// add captcha to form
function HireMeForm() {
  const [formData, setFormData] = useState({
    owner_name: '',
    phone: '',
    address: '',
    pets_num: '1',
    services: []
  });

  
  const [pets, setPets] = useState([
    { type: '', other: '', name:'', age:''}
  ]);
  
  const handleServiceCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormData(prev => {
      const services = new Set(prev.services);
      if (checked) {
        services.add(value);
      } else {
        services.delete(value);
      }
      return { ...prev, services: Array.from(services) };
    });
  };

  const handlePetTypeChange = (index, value) => {
    const updated = [...pets];
    updated[index].type = value;
    if (value !== 'Other') {
      updated[index].other = '';
    }
    setPets(updated);
  };

  const handleOtherTypeChange = (index, value) => {
    const updated = [...pets];
    updated[index].other = value;
    setPets(updated);
  };

  const handlePetAgeChange = (index, value) => {
    const updated = [...pets];
    updated[index].age = value;
    setPets(updated);
  };

  const handlePetNameChange = (index, value) => {
    const updated = [...pets];
    updated[index].name = value;
    setPets(updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // If number of pets changes, adjust the pets array
    if (name === 'pets_num') {
      const num = parseInt(value);
      if (!isNaN(num) && num > 0) {
        const updatedPets = Array.from({ length: num }, (_, i) => pets[i] || { type: '', other: '' , name:'' , age:''});
        setPets(updatedPets);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const petList = pets.map((p) => ({
      type: p.type === 'Other' ? p.other : p.type,
      name: p.name,
      age: p.age
    }));

    const dataToSend = {
      ...formData,
      pets: petList,
    };

    alert(`Submitted: ${JSON.stringify(dataToSend, null, 2)}`);
    // You can send `chosenPet` to Airtable or anywhere else here
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Want to hire me? Fill out my form!</h2>

      <div>
        <label className="block text-sm font-medium">Name:</label>
        <input
          type="text"
          name="owner_name"
          value={formData.owner_name}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>What service(s) would you like me to provide?</label>
        <div>
          {['Drop-in', 'Walk', 'House-sit'].map(service => (
            <label key={service}>
              <input
                type="checkbox"
                value={service}
                checked={formData.services.includes(service)}
                onChange={handleServiceCheckboxChange}
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Number of Pets:</label>
        <input
          type="text"
          name="pets_num"
          value={formData.pets_num}
          onChange={handleChange}
          min="1"
          required
          className="w-full border rounded p-2"
        />
      </div>

      {pets.map((pet, index) => (
        <div key={index} className="space-y-2">
          <label>
            Choose your pet:
            <select value={pet.type} onChange={(e) => handlePetTypeChange(index, e.target.value)}>
              <option value="">-- Select --</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Fish">Fish</option>
              <option value="Other">Other</option>
            </select>
          </label>

          {pet.type === 'Other' && (
            <div>
              <label>
                Enter other type:
                <input
                  type="text"
                  value={pet.other}
                  onChange={(e) => handleOtherTypeChange(index, e.target.value)}
                />
              </label>
            </div>
          )}

          <div>
            <label>
              What is your pet's name?
              <input
                type="text"
                value={pet.name}
                onChange={(e) => handlePetNameChange(index, e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              How old is your pet?
              <input
                type="text"
                value={pet.age}
                onChange={(e) => handlePetAgeChange(index, e.target.value)}
              />
            </label>
          </div>
        </div>
      ))}


      {/* <div>
        <label className="block text-sm font-medium">Any other information you'd like me to know:</label>
        <textarea
          name="additional_info"
          value={formData.additional_info}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div> */}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}

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
  ["logo192.png", "Me and Tina"],
  ["logo512.png", "Me and Cora"],
  ["EJ_Emily_Bartell_Photography-22.jpg", "me and other"],
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


// gets the reviews from the airtable and puts them on the page
const AirtableReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            },
          }
        );

        const records = response.data.records;
        const formatted = records.map(record => ({
          name: record.fields.Name,
          review: record.fields.Review,
        }));

        setReviews(formatted);
      } catch (error) {
        console.error('Error fetching data from Airtable:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Reviews:</h2>
      <ul>
        {reviews.map((entry, index) => (
          <li key={index}>
            <em>{entry.name}</em> said <em>{entry.review}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};


// function to check whether the code is listed in the list of valid codes for reviews
const isCodeValid = async (codeToCheck) => {

  const url = `https://api.airtable.com/v0/${CODE_BASE_ID}/${CODE_TABLE_NAME}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CODE_API_TOKEN}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Airtable fetch error:', data);
      return false;
    }

    // Find matching record
    const recordToDelete = data.records.find( record => {
      const codeInRecord = record.fields.Code?.trim();
      return codeInRecord === codeToCheck.trim();
    });

    if (!recordToDelete) {
      return false;
    }

    // Delete the record
    const deleteResponse = await fetch(`${url}/${recordToDelete.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${CODE_API_TOKEN}`
      }
    });

    if (!deleteResponse.ok) {
      console.error('Error deleting record:', await deleteResponse.json());
      return false;
    }

    return true;
    // const validCodes = data.records.map(record => record.fields.Code?.trim());
    // return validCodes.includes(codeToCheck.trim());
  } catch (error) {
    console.error('Error checking code:', error);
    return false;
  }
};


// button that lets the user add a review
// user must paste a generated code to write a review to ensure they are an actual client
function ReviewForm() {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    review: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    // prevents browser from refreshing page
    e.preventDefault();

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

    const isReviewValid = isCodeValid(formData.code);
    if (!isReviewValid) {
      console.error("the code was not correct")
      alert('Your code was not valid.');
    } else {

      // get review from form data
      const record = {
      fields: {
        Name: formData.name,
        Review: formData.review
        }
      };

      // post review to airtable, will be visible to user the next time the page is reloaded
      try {
        fetch (url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(record)
        });

        alert(`Thanks for your review, ${formData.name}!`);
        setFormData({ code: '', name: '', review: '' });

      } catch (error) {
        console.error('Error sending to Airtable:', error);
        alert('There was a problem submitting your review.');
      }

      // Reset the form
      setFormData({ code: '', name: '', review: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Submit a Review</h2>

      <div>
        <label className="block text-sm font-medium">Code:</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Review:</label>
        <textarea
          name="review"
          value={formData.review}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}