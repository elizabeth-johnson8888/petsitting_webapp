function SingleTimeInput ({ label, value, onChange }) {
    return (
        <div>
            <label>{label}</label>
            <input 
                type="time"
                value="value"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default SingleTimeInput;