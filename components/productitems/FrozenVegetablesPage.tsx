'use client';
import React, { useState, useEffect } from 'react';

const FrozenVegPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState<any[]>([]); // To store fetched products

  // Handle image upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  // Fetch the product list from the API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/frozen-vegetables');
      const data = await response.json();
      setProducts(data); // Store the fetched products
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!image || !title || !description) {
      alert('All fields are required');
      return;
    }

    // Form data to send to the server
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);

    try {
      // Sending the data to the server
      const response = await fetch('/api/frozen-vegetables', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Frozen vegetable product added successfully');
        // After successful product addition, fetch products again
        const updatedProducts = await fetch('/api/frozen-vegetables');
        const data = await updatedProducts.json();
        setProducts(data); // Update the product list
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div className="space-y-6 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black">Add Frozen Vegetable Product</h2>

      {/* Form to upload image, title, and description */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-black">Product Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-black">Product Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-black">Product Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Render the list of products */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800">Product List</h3>
        <ul className="space-y-4 mt-4">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between items-center">
              <div>
                <img src={product.image_url} alt={product.title} className="w-20 h-20 object-cover" />
                <h4 className="text-lg text-black font-semibold">{product.title}</h4>
                <p className="text-lg text-black font-semibold">{product.description}</p>
              </div>
              <button
                onClick={async () => {
                  await fetch(`/api/frozen-vegetables/${product.id}`, { method: 'DELETE' });
                  setProducts(products.filter((item) => item.id !== product.id)); // Update list after delete
                }}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FrozenVegPage;
