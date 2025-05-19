'use client';
import React, { useState, useEffect } from 'react';

const ShellfishPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState<any[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/shellfish');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!image || !title || !description) {
      alert('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch('/api/shellfish', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Shellfish product added successfully');
        const updatedProducts = await fetch('/api/shellfish');
        const data = await updatedProducts.json();
        setProducts(data);
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div className="space-y-6 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black">Add Shellfish Product</h2>

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

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800">Shellfish Products</h3>
        <ul className="space-y-4 mt-4">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <img 
                  src={product.image_url} 
                  alt={product.title} 
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="text-lg font-semibold text-black">{product.title}</h4>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </div>
              <button
                onClick={async () => {
                  await fetch(`/api/shellfish/${product.id}`, { method: 'DELETE' });
                  setProducts(products.filter((item) => item.id !== product.id));
                }}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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

export default ShellfishPage;