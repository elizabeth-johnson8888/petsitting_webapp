import DateRangePicker from "./DateRangePicker.jsx"
import DailyTimeSelector from "./DailyTimeSelector.jsx";

function DropInDetails ({ data, setData, unavailableDates, dateLabel, timeLabel, label }) {
    return (
        <div>
            <h4>{label}</h4>
            <DateRangePicker 
                label={dateLabel}
                value={data.dates}
                onChange={(val) => setData(prev => ({ ...prev, dates: val }))}
                unavailableDates={unavailableDates}
            />
            <DailyTimeSelector
                label={timeLabel}
                count={data.visitsPerDay}
                times={data.times}
                onCountChange={(count) => setData(prev => ({ ...prev, visitsPerDay: count, times: Array(count).fill('') })) }
                onTimeChange={(newTimes) => setData(prev => ({ ...prev, times: newTimes })) }
            />
        </div>
    );
}

export default DropInDetails;