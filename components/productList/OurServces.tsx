import { FaShippingFast, FaSearch, FaFileImport, FaHandshake } from "react-icons/fa";

export default function OurServices() {
  const services = [
    {
      icon: <FaHandshake size={60} className="text-cyan-600" />,
      title: "Sourcing & Procurement",
      description: "Expert sourcing and procurement solutions tailored to your needs.",
    },
    {
      icon: <FaSearch size={60} className="text-cyan-600" />,
      title: "Quality Inspection & Compliance",
      description: "Ensure product quality and regulatory compliance at every step.",
    },
    {
      icon: <FaFileImport size={60} className="text-cyan-600" />,
      title: "Import & Customs Support",
      description: "Seamless support through import regulations and customs clearance.",
    },
    {
      icon: <FaShippingFast size={60} className="text-cyan-600" />,
      title: "Logistics Coordination",
      description: "Efficient end-to-end logistics to get your products delivered on time.",
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl text-gray-900 font-bold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-md transition duration-300 text-center"
            >
              <div className="mt-8 mb-2 flex justify-center">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
