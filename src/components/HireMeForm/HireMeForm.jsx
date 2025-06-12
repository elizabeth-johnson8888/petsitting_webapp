import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

import ClientName from './ClientInfo/ClientName.jsx';
import PhoneNumber from './ClientInfo/PhoneNumber.jsx';
import Email from './ClientInfo/Email.jsx';
import Address from './ClientInfo/Address.jsx';
import ServicesSelector from './ServicesInfo/ServiceSelector.jsx';
import DropInDetails from './ServicesInfo/DropInDetails.jsx';
import HouseSitDetails from './ServicesInfo/HouseSitDetails.jsx';
import PetFormSection from './ServicesInfo/PetFormSection.jsx';

// Form
// Get persons name, phone number, address
// Get number of pets, pet types, and names, age
// add captcha to form
function HireMeForm() {
  const [formData, setFormData] = useState({
    owner_name: '',
    phone: '',
    email: '',
    address: '',
    pets_num: '1',
    services: [],
    dropInDetails: {
      dates: '',
      visitsPerDay: '',
      times: ['']
    },
    walkDetails: {
      dates: '',
      walksPerDay: '',
      times: ['']
    },
    houseSitDetails: {
      dates: '',
      startTime: '',
      endTime: ''
    },
    additionalInfo: '',
  });

  const [unavailableDates, setUnavailableDates] = useState([]);
  
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

  // Fetch busy dates from your backend
  useEffect(() => {
    fetch('https://petsitting-backend.onrender.com/busy-dates') // Replace with your actual backend URL
      .then((res) => res.json())
      .then((data) => {
        console.log("data" + data);
        const parsedDates = data.map(item => new Date(item.start));
        console.log("parsedDates" + parsedDates);
        setUnavailableDates(parsedDates);
      })
      .catch((error) => console.error('Error fetching busy dates:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const petList = pets.map((p, x=1) => ({
      num: x + 1,
      type: p.type === 'Other' ? p.other : p.type,
      name: p.name,
      age: p.age
    }));

    // alert(`Submitted: ${JSON.stringify(dataToSend, null, 2)}`);

    // create pet info string for email to me
    const formattedPets = petList.map(p => (
      `Pet ${p.num} is a ${p.age} year old ${p.type} named ${p.name}!`
    )).join('\n');

    let formattedDates = '';

    let formattedServices = "";
    for (const service of formData.services) {
      if (service === 'Drop-in') {
        formattedDates = formData.dropInDetails.dates?.map(date => date.toLocaleDateString('en-US')).join('-');
        formattedServices = formattedServices + "Drop-in Details\nDrop-in dates: " + formattedDates + "\nVisits per day: " + formData.dropInDetails.visitsPerDay + "\n";
        formattedServices = formattedServices + formData.dropInDetails.times.map((t, i=0) => `Time ${i + 1}: ${t}`).join('\n') + "\n\n";
      }
      else if (service === 'Walk') {
        formattedDates = formData.walkDetails.dates?.map(date => date.toLocaleDateString('en-US')).join('-');
        formattedServices = formattedServices + "Walk Details\nWalk Dates:" + formattedDates + "\nWalks per Day:" + formData.walkDetails.walksPerDay + "\n";
        formattedServices = formattedServices + formData.walkDetails.times.map((t, i) => `Time ${i + 1}: ${t}`).join('\n') + "\n\n";
      }
      else {
        formattedDates = formData.houseSitDetails.dates?.map(date => date.toLocaleDateString('en-US')).join('-');
        formattedServices = formattedServices + "House-sit Details\nHouse-sit Dates" + formattedDates + "\nApproximate Start: " + formData.houseSitDetails.startTime + "\nApproximate End: " + formData.houseSitDetails.endTime + "\n\n"
      }
    }

    // emailjs template params
    const templateParams = {
      owner_name: formData.owner_name,
      phone: formData.phone,
      email: formData.email,
      services: formData.services.join(', '),
      address: formData.address,
      pets_num: formData.pets_num,
      pets_info: formattedPets,
      services_info: formattedServices,
      additional_info: formData.additionalInfo
    };

    emailjs.send('service_jocqgz6', 'template_5y31myr', templateParams,{
        publicKey: '3QAqhQAL6l8kcJE-j',
      }).then(
      (response) => {
        console.log('Success!', response.status, response.text);
      },
      (error) => {
        console.log('FAILED...', error);
      },
    );
    // You can send `chosenPet` to Airtable or anywhere else here
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Want to hire me? Fill out my form!</h2>

      {/* // get client information */}
      <ClientName value={formData.owner_name} onChange={handleChange} />
      <PhoneNumber value={FormData.phone} onChange={handleChange} />
      <Email value={formData.email} onChange={handleChange} />
      <Address value={formData.address} onChange={handleChange} />

      {/* services serction */}
      <ServicesSelector selectedServices={formData.services} onChange={handleServiceCheckboxChange} />

      {formData.services.includes('Drop-in') && (
        <DropInDetails
            label="Drop-In"
            dateLabel="Drop-in Dates: "
            timeLabel="Drop-in Times: "
            data={formData.dropInDetails}
            setData={(update) => setFormData(prev => ({ ...prev, dropInDetails: update }))}
            unavailableDates={unavailableDates}
        />
      )}

      {formData.services.includes('Walk') && (
        <DropInDetails
            label="Walk"
            dateLabel="Walk Dates: "
            timeLabel="Walk Times: "
            data={formData.walkDetails}
            setData={(update) => setFormData(prev => ({ ...prev, walkDetails: update }))}
            unavailableDates={unavailableDates}
        />
      )}

      {formData.services.includes("House-sit") && (
        <HouseSitDetails
          label="House-Sit"
          dateLabel="Houses-sit Dates: "
          data={formData.houseSitDetails}
          setData={(update) => setFormData(prev => ({...prev, walkDetails: update}))}
          unavailableDates={unavailableDates}
        />
      )}

      <PetFormSection
        formData={formData}
        handleChange={handleChange}
        pets={pets}
        handlePetTypeChange={handlePetTypeChange}
        handleOtherTypeChange={handleOtherTypeChange}
        handlePetNameChange={handlePetNameChange}
        handlePetAgeChange={handlePetAgeChange}
      />
           
      <div>
        <label>Any additional notes I should know?</label>
        <textarea
          value={formData.additionalInfo}
          onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value}))}
          rows={5}
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}

export default HireMeForm;