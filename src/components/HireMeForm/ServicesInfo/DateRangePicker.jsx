import { Calendar } from "primereact/calendar";

function DateRangePicker ({ label, value, onChange, unavailableDates = [] }) {
    return (
        <div>
            <label>{label || "What date(s)"}</label>
            <Calendar
                value={value}
                onChange={(e) => onChange(e.value)}
                selectionMode="range"
                dateFormat="mm/dd/yy"
                readOnlyInput
                disabledDates={unavailableDates}
            />
        </div>
    );
}

export default DateRangePicker;