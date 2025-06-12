

function DailyTimeSelector ({ label, count, times, onCountChange, onTimeChange }) {
    const handleCountChange = (e) => {
        const visits = parseInt(e.target.value);
        onCountChange(visits || 0);
    };

    const handleTimeChange = (index, value) => {
        const updatedTimes = [...times];
        updatedTimes[index] = value;
        onTimeChange(updatedTimes);
    };

    return (
        <div>
            <label>{label || "How many times per day?"}</label>
            <input 
                type="number"
                min="1"
                value={count}
                onChange={handleCountChange}
            />
            {times.map((time, index) => (
                <div key={index}>
                    <label>Time #{index + 1}</label>
                    <input 
                        type="time"
                        value={time}
                        onChange={(e) => handleTimeChange(index, e.target.value)}
                    />
                </div>
            ))} 
        </div>
    );
}

export default DailyTimeSelector;