'use client';

import React, { useState } from 'react';
import { signOut } from "next-auth/react";
import FishPage from '../../../components/productitems/FishPage';
import ShellfishPage from '../../../components/productitems/ShellfishPage';
import MollusksPage from '../../../components/productitems/MollusksPage';
import SpecialtySeafoodPage from '../../../components/productitems/SpecialtySeafoodPage';
import MeatPage from '../../../components/productitems/MeatPoultryPage';
import FrozenVegPage from '../../../components/productitems/FrozenVegetablesPage';
import DryGoodsPage from '../../../components/productitems/DryCannedGoodsPage';
import IntlIngredientsPage from '../../../components/productitems/IntlIngredientsPage';
import HeroSectionForm from '../../../components/HomeEdit/HeroSectionForm';
import HeroSectionForm2 from '../../../components/HomeEdit/HeroSectionForm2';
import TestimonialForm from '../../../components/HomeEdit/Testimonials';
import WhoWeAre from '../../../components/AboutEdit/whosection';
import OurStrengthForm from '../../../components/AboutEdit/OurStrength';
import WhyChooseLouis from '../../../components/AboutEdit/WhyChooseLouis';
import OfferForm from '../../../components/HomeEdit/offer';
import ContactInformation from '../../../components/ContactEdit/ContactInformation';

const componentMap: Record<string, React.ReactNode> = {
  fish: <FishPage />,
  shellfish: <ShellfishPage />,
  mollusks: <MollusksPage />,
  specialtySeafood: <SpecialtySeafoodPage />,
  meat: <MeatPage />,
  frozenVeg: <FrozenVegPage />,
  dryGoods: <DryGoodsPage />,
  intlIngredients: <IntlIngredientsPage />,
  heroSection: <HeroSectionForm />,
  heroSection2: <HeroSectionForm2 />,
  testimonials: <TestimonialForm />,
  offer: <OfferForm />,
  WhoAreWe: <WhoWeAre />,
  OurStrength: <OurStrengthForm />,
  WhyChooseLouis: <WhyChooseLouis />,
  ContactInformation: <ContactInformation />
};

const AdminClient = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [seafoodOpen, setSeafoodOpen] = useState<boolean>(false);
  const [foodOpen, setFoodOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [homeOpen, setHomeOpen] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);


  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen min-h-screen">

      {/* Mobile Hamburger */}
      <div className="flex justify-between items-center bg-gray-900 p-4 md:hidden">
        <div className="text-white font-bold text-xl">Admin</div>
        <button
          className="text-white focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white w-64 p-6 space-y-4 absolute md:static top-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="text-2xl font-bold mb-8 text-gray-900 bg-white p-2 rounded flex items-center">
          <img src="/images/logo2.png" className="w-10 h-10 mr-2 bg-white" />
          Admin
        </div>
        {/* Home Page Dropdown */}
        <div>
          <div
            onClick={() => setSelectedSection('homePage')}
            className="cursor-pointer font-semibold p-2 rounded bg-gray-800 hover:bg-blue-800"
          >
            <div onClick={() => setHomeOpen((prev) => !prev)}>Home Page ▾</div>
          </div>
          {homeOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <div
                onClick={() => setSelectedSection('heroSection')}
                className="cursor-pointer p-1 hover:bg-blue-700 rounded"
              >
                Hero Section
              </div>
              <div
                onClick={() => setSelectedSection('heroSection2')}
                className="cursor-pointer p-1 hover:bg-blue-700 rounded"
              >
                Hero Section 2
              </div>
              <div
                onClick={() => setSelectedSection('offer')}
                className="cursor-pointer p-1 hover:bg-blue-700 rounded"
              >
                Offer
              </div>
              <div
                onClick={() => setSelectedSection('testimonials')}
                className="cursor-pointer p-1 hover:bg-blue-700 rounded"
              >
                Testimonials
              </div>
            </div>
          )}
        </div>

        {/* Seafood Dropdown */}
        <div>
          <div
            onClick={() => setSeafoodOpen(!seafoodOpen)}
            className="cursor-pointer font-semibold p-2 rounded bg-gray-800 hover:bg-blue-800"
          >
            Seafood ▾
          </div>
          {seafoodOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <div onClick={() => setSelectedSection('fish')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Fish</div>
              <div onClick={() => setSelectedSection('shellfish')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Shellfish</div>
              <div onClick={() => setSelectedSection('specialtySeafood')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Specialty Seafood</div>
              <div onClick={() => setSelectedSection('mollusks')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Sushi-Grade Seafood</div>
            </div>
          )}
        </div>

        {/* Food Dropdown */}
        <div>
          <div
            onClick={() => setFoodOpen(!foodOpen)}
            className="cursor-pointer font-semibold p-2 rounded bg-gray-800 hover:bg-blue-800"
          >
            Food ▾
          </div>
          {foodOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <div onClick={() => setSelectedSection('meat')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Meat</div>
              <div onClick={() => setSelectedSection('frozenVeg')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Frozen Vegetables</div>
              <div onClick={() => setSelectedSection('dryGoods')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Dry & Canned Goods</div>
{/*               <div onClick={() => setSelectedSection('intlIngredients')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Specialty Ethnic Ingredients</div> */}
            </div>
          )}
        </div>

        {/* About Us Dropdown */}
        <div>
          <div
            onClick={() => setSelectedSection('aboutUs')}
            className="cursor-pointer font-semibold p-2 rounded bg-gray-800 hover:bg-blue-800"
          >
            About Us ▾
          </div>
          {selectedSection === 'aboutUs' && (
            <div className="ml-4 mt-2 space-y-1">
              <div onClick={() => setSelectedSection('WhoAreWe')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Who We Are</div>
              <div onClick={() => setSelectedSection('OurStrength')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Our Strength</div>
              <div onClick={() => setSelectedSection('WhyChooseLouis')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Why Choose Louis</div>
            </div>
          )}
        </div>

        {/* Contact Us Dropdown */}
        <div>
          <div
            onClick={() => setSelectedSection('contactUs')}
            className="cursor-pointer font-semibold p-2 rounded bg-gray-800 hover:bg-blue-800"
          >
            Contact Us ▾
          </div>
          {selectedSection === 'contactUs' && (
            <div className="ml-4 mt-2 space-y-1">
              <div onClick={() => setSelectedSection('ContactInformation')} className="cursor-pointer p-1 hover:bg-blue-700 rounded">Contact Information</div>
            </div>
          )}
        </div>




        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full p-2 text-black bg-white hover:bg-gray-100 rounded border border-gray-300 cursor-pointer"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        {selectedSection ? componentMap[selectedSection] : (
          <h1 className="text-2xl font-bold text-gray-800">Welcome to the Admin Dashboard</h1>
        )}
      </main>
    </div>
  );
};

export default AdminClient;
