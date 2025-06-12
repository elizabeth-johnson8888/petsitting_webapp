import './App.css';
import { useEffect, useState } from 'react';


import 'primereact/resources/themes/lara-light-indigo/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css'; // core styles
import 'primeicons/primeicons.css'; // for calendar icons

// refactoring code import
import UserProfile from './components/UserProfile/UserProfile.jsx';
import MyServicesSection from './components/Services/MyServicesSection.jsx';
import HowToBookMe from './components/HowToBookMe.jsx';
import HireMeForm from './components/HireMeForm/HireMeForm.jsx';
import RulesSection from './components/RulesSection.jsx';
import ImageCarousel from './components/ImageCarosel.jsx';
import AirtableReviews from './components/Reviews/AirtableReviews.jsx';

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