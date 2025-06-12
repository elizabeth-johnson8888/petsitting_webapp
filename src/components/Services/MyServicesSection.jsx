import DropIns from "./DropIns.jsx";
import HouseSit from "./HouseSit.jsx";
import AdditionalServices from "./AdditionalServices.jsx";

// My Services
function MyServicesSection() {
  return (
    <div>
      <h2>My Services:</h2>
      <div>
        <DropIns />
        <HouseSit />
        <AdditionalServices />
      </div>
    </div>
  );
}

export default MyServicesSection;