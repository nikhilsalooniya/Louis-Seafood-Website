// import React from 'react';
// import { CheckCircle } from 'lucide-react';

// const strengths = [
//   {
//     title: "Extensive seafood network (local & international)",
//     description:
//       "We work with trusted suppliers from coastal regions and global markets to ensure consistent quality and supply.",
//   },
//   {
//     title: "Sourcing for all categories: meats, produce, dry goods & more",
//     description:
//       "Beyond seafood, we offer complete food sourcing solutions tailored to your specific needs.",
//   },
//   {
//     title: "Quick, transparent communication",
//     description:
//       "Our team ensures clear, timely updates from order to delivery, building long-term trust.",
//   },
//   {
//     title: "Commitment to food safety and compliance",
//     description:
//       "We follow strict food safety protocols and regulatory guidelines for every shipment.",
//   },
// ];

// const OurStrengths = () => {
//   return (
//    <div className="relative overflow-hidden bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#004080] text-white py-20 px-6 md:px-16 my-8">


//       <div className="flex flex-col md:flex-row items-center gap-10 z-10 relative">
//         {/* Left Content */}
//         {/* <div className="w-full md:w-1/2 space-y-6">
//           <h2 className="text-3xl font-bold text-cyan-100">Our Strengths</h2>
//           <ul className="space-y-6">
//             {strengths.map((item, idx) => (
//               <li key={idx} className="flex items-start space-x-3">
//                 <CheckCircle className="text-cyan-300 mt-1" size={22} />
//                 <div>
//                   <p className="text-lg font-semibold">{item.title}</p>
//                   <p className="text-sm text-gray-200">{item.description}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div> */}

//         {/* Right Overlapping Images */}
//         {/* <div className="relative w-full md:w-[500px] h-[300px] mx-auto mt-10">
         
//           <img
//             src="/images/louispack.jpeg"
//             alt="Seafood 1"
//             className="absolute left-0 bottom-0 w-64 h-72 object-cover rounded-2xl shadow-lg z-10"
//           />

          
//           <img
//             src="/images/louispack2.jpeg"
//             alt="Seafood 2"
//             className="absolute left-40 bottom-0 w-64 h-72 object-cover rounded-2xl shadow-xl transform rotate-[6deg] z-20 "
//           />
//         </div> */}


//       </div>

//       {/* Wave bottom */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
//         <svg viewBox="0 0 500 100" preserveAspectRatio="none" className="w-full h-16">
//           <path d="M0,0 C150,100 350,0 500,100 L500,100 L0,100 Z" fill="#001f3f" />
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default OurStrengths;





'use client';
import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

const OurStrengths = () => {
  const [strengths, setStrengths] = useState<any[]>([]);

  useEffect(() => {
    fetchStrengths();
  }, []);

  const fetchStrengths = async () => {
    try {
      const res = await fetch('/api/ourstrength');
      const data = await res.json();
      setStrengths(data);
    } catch (error) {
      console.error('Failed to fetch strengths:', error);
    }
  };

  return (
  <div className="relative overflow-hidden bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#004080] text-white py-20 px-6 md:px-16 my-8">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:items-center">

      
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-3xl font-bold text-cyan-100">Our Strengths</h2>

        {strengths.map((item, idx) => (
          <div key={idx} className="mb-8">
            {/* <h3 className="text-2xl font-semibold mb-2 text-white">{item.main_heading}</h3> */}

            <ul className="space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="flex items-start space-x-3">
                  <CheckCircle className="text-cyan-300 mt-1" size={22} />
                  <div>
                    <p className="text-lg font-semibold">
                      {item[`subheading${n}`]}
                    </p>
                    <p className="text-sm text-gray-200">
                      {item[`subdescription${n}`]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Right Overlapping Images */}
      <div className="relative md:w-1/2 h-[300px]">
        {strengths.length > 0 && (
          <>
            {strengths[0].image1_url && (
              <img
                src={strengths[0].image1_url}
                alt="Strength 1"
                className="absolute left-0 bottom-0 w-64 h-72 object-cover rounded-2xl shadow-lg z-10"
              />
            )}
            {strengths[0].image2_url && (
              <img
                src={strengths[0].image2_url}
                alt="Strength 2"
                className="absolute left-40 bottom-0 w-64 h-72 object-cover rounded-2xl shadow-xl transform rotate-[6deg] z-20"
              />
            )}
          </>
        )}
      </div>
    </div>
  </div>
);

};



export default OurStrengths;
