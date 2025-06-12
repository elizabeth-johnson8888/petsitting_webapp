function PetsCountInput({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium">Number of Pets:</label>
      <input
        type="text"
        name="pets_num"
        value={value}
        onChange={onChange}
        min="1"
        required
        className="w-full border rounded p-2"
      />
    </div>
  );
}

export default PetsCountInput;