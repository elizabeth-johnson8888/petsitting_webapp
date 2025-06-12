function Address ({ value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium">Address:</label>
            <input
            type="text"
            name="address"
            value={value}
            onChange={onChange}
            required
            className="w-full border rounded p-2"
            />
        </div>
    );
}

export default Address;