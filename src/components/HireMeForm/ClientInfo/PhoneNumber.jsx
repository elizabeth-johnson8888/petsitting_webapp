function PhoneNumber({ value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium">Phone Number:</label>
            <input
            type="text"
            name="phone"
            value={value}
            onChange={onChange}
            required
            className="w-full border rounded p-2"
            />
        </div>
    );
}

export default PhoneNumber;