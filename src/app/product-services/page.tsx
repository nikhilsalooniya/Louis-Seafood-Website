'use client';
import React, { useState } from 'react';
import ProductList from '../../../components/productList/ProductList';
import OurServices from '../../../components/productList/OurServces';
import SeafoodProduct from '../../../components/producttype/seafoodproduct';
import FoodProducts from '../../../components/producttype/FoodProducts';
import SectionHeading from '../../../components/SectionHeading';

const categories = [
  { label: 'All', key: 'all' },
  { label: 'Wild-Caught & Farm-Raised Fish', key: 'fish' },
  { label: 'Shellfish & Crustaceans', key: 'shellfish' },
  { label: 'Premium Seafood', key: 'special-seafood' },
  { label: 'Sushi-Grade Seafood', key: 'mollusks' },
  { label: 'Frozen Vegetables & Fruits', key: 'frozen-vegetables' },
  { label: 'Meats & Poultry', key: 'meat' },
  { label: 'Dry & Canned Goods', key: 'dry-canned-goods' },
];

const ProductServicePage = () => {
  const [selected, setSelected] = useState('all');

  return (
    <div className="pt-0  md: overflow-x-hidden">

      
      {/* ✅ Header with Filter */}
      {/* <div className="w-full bg-white shadow-md px-4 py-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-[#014f86] mb-2 sm:mb-0">Explore Our Products</h2>
        <div className="w-full sm:w-64">
          <label className="block text-sm font-semibold mb-1 text-[#014f86]">
            Filter by Category:
          </label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full px-2 py-2 rounded-md bg-gray-100 text-black text-sm focus:outline-none focus:ring-2 focus:ring-gray-[#014f86]"
          >
            {categories.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      {/* ✅ Sections Based on Filter */}
      <div className="space-y-8">
        {(selected === 'all' || selected === 'seafood-overview') && <SeafoodProduct />}

        {(selected === 'all' || selected === 'fish') && (
          <>
            <SectionHeading title="Wild-Caught & Farm-Raised Fish" />
            <ProductList category="fish" />
          </>
        )}

        {(selected === 'all' || selected === 'shellfish') && (
          <>
            <SectionHeading title="Shellfish & Crustaceans (Shrimp, Lobster, Crab)" />
            <ProductList category="shellfish" />
          </>
        )}

        {(selected === 'all' || selected === 'special-seafood') && (
          <>
            <SectionHeading title="Premium Seafood (Scallops, Sea Cucumber)" />
            <ProductList category="special-seafood" />
          </>
        )}

        {(selected === 'all' || selected === 'mollusks') && (
          <>
            <SectionHeading title="Sushi-Grade Seafood" />
            <ProductList category="mollusks" />
          </>
        )}

        {(selected === 'all' || selected === 'food-overview') && <FoodProducts />}

        {(selected === 'all' || selected === 'frozen-vegetables') && (
          <>
            <SectionHeading title="Frozen Vegetables & Fruits" />
            <ProductList category="frozen-vegetables" />
          </>
        )}

        {(selected === 'all' || selected === 'meat') && (
          <>
            <SectionHeading title="Meats & Poultry" />
            <ProductList category="meat" />
          </>
        )}

        {(selected === 'all' || selected === 'dry-canned-goods') && (
          <>
            <SectionHeading title="Dry & Canned Goods" />
            <ProductList category="dry-canned-goods" />
          </>
        )}

        {(selected === 'all' || selected === 'services') && <OurServices />}
      </div>
    </div>
  );
};

export default ProductServicePage;
