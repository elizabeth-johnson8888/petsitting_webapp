function PetDetails({
  pet,
  index,
  onTypeChange,
  onOtherTypeChange,
  onNameChange,
  onAgeChange
}) {
  return (
    <div className="space-y-2">
      <label>
        Choose your pet:
        <select value={pet.type} onChange={(e) => onTypeChange(index, e.target.value)}>
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
              onChange={(e) => onOtherTypeChange(index, e.target.value)}
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
            onChange={(e) => onNameChange(index, e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          How old is your pet?
          <input
            type="text"
            value={pet.age}
            onChange={(e) => onAgeChange(index, e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default PetDetails;