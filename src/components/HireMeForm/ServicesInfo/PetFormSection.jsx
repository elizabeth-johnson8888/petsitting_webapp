import PetsCountInput from './PetInfo.jsx';
import PetDetails from './PetDetails.jsx';

function PetFormSection({ formData, handleChange, pets, handlePetTypeChange, handleOtherTypeChange, handlePetNameChange, handlePetAgeChange }) {
  return (
    <>
      <PetsCountInput value={formData.pets_num} onChange={handleChange} />

      {pets.map((pet, index) => (
        <PetDetails
          key={index}
          pet={pet}
          index={index}
          onTypeChange={handlePetTypeChange}
          onOtherTypeChange={handleOtherTypeChange}
          onNameChange={handlePetNameChange}
          onAgeChange={handlePetAgeChange}
        />
      ))}
    </>
  );
}

export default PetFormSection;