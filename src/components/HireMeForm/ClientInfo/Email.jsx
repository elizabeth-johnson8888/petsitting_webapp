function Email ({ value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium">Email:</label>
            <input
            type="text"
            name="email"
            value={value}
            onChange={onChange}
            required
            className="w-full border rounded p-2"
            />
        </div>
    );
}

export default Email;