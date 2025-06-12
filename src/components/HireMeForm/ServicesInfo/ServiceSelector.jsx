function ServicesSelector ({ selectedServices, onChange }) {
    const services = ['Drop-in', 'Walk', 'House-sit'];

    return (
        <div>
            <label>What service(s) would you like me to provide?</label>
            <div>
            {services.map(service => (
                <label key={service}>
                <input
                    type="checkbox"
                    value={service}
                    checked={selectedServices.includes(service)}
                    onChange={onChange}
                />
                <span>{service}</span>
                </label>
            ))}
            </div>
        </div>
    );

}

export default ServicesSelector;