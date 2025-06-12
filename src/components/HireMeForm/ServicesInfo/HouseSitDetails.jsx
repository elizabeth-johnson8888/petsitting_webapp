// houseSitDetails: {
//       dates: '',
//       startTime: '',
//       endTime: ''
//     }

import DateRangePicker from "./DateRangePicker.jsx";
import SingleTimeInput from "./TimeInput.jsx";

function HouseSitDetails ({ data, setData, unavailableDates, dateLabel, label }) {
    return (
        <div>
            <h4>{label}</h4>
            <DateRangePicker
                label={dateLabel}
                value={data.dates}
                onChange={(val) => setData(prev => ({ ...prev, dates: val }))}
                unavailableDates={unavailableDates}
            />

            <SingleTimeInput
                label="Start time: "
                value={data.startTime}
                onChange={(newTime) => setData(prev => ({ ...prev, startTime: newTime }))}
            />
        </div>
    );
}

export default HouseSitDetails;