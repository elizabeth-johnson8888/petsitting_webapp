function ClientName ({ value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium">Name:</label>
            <input
            type="text"
            name="owner_name"
            value={value}
            onChange={onChange}
            required
            className="w-full border rounded p-2"
            />
        </div>
    );
}

export default ClientName;