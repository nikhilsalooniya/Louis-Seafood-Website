'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

interface ProductListProps {
  category: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });


  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white shadow-md overflow-hidden h-[500px] w-full"
    >

      <img
        src={product.image_url}
        alt={product.title}
        className="w-full h-[60%] object-cover"
      />
      <div className="p-4 h-[40%] flex flex-col justify-start">
        <h4 className="text-xl font-bold text-gray-900">{product.title}</h4>
        <p className="text-gray-700 text-sm mt-1">{product.description}</p>
      </div>
    </motion.div>
  );
};

const ProductList: React.FC<ProductListProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/${category}`);
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchProducts();
  }, [category]);

  return (
   <div className="relative bg-white p-6 rounded-lg shadow-lg">
  {/* Folded Corner */}
  <div
    className="absolute top-0 right-0 w-14 h-14 bg-gray-200"
    style={{
      clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
      boxShadow: '-3px 3px 6px rgba(0, 0, 0, 0.1)',
    }}
  />

  {error ? (
    <p className="text-red-500">{error}</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )}
</div>

  );
};

export default ProductList;
