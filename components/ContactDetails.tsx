import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';

const ContactDetails = () => {
  return (
    <div className="w-1/2 mx-auto bg-gradient-to-br from-blue-100 via-white to-blue-200 p-8 rounded-3xl shadow-xl border border-blue-100 transition-all duration-300 hover:shadow-blue-400 text-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">📬 Contact Us</h2>

      <div className="mb-4">
        <p className="text-gray-800 font-semibold text-lg">Louis Seafood, LLC</p>
        <p className="text-gray-600 text-sm leading-relaxed">
          447 Broadway, 2nd Floor #1179<br />
          New York, NY 10013
        </p>
      </div>

      <div className="space-y-4 text-gray-700">
        <div className="flex items-center justify-center gap-3 hover:text-blue-700 transition-colors">
          <Phone size={20} />
          <span className="font-medium">+1 (123) 456-7890</span>
        </div>
        <div className="flex items-center justify-center gap-3 hover:text-blue-700 transition-colors">
          <Mail size={20} />
          <a href="mailto:info@louisseafood.com" className="font-medium hover:underline">
            info@louisseafood.com
          </a>
        </div>
        <div className="flex items-center justify-center gap-3 hover:text-blue-700 transition-colors">
          <Globe size={20} />
          <a href="https://www.louisseafood.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
            www.louisseafood.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
