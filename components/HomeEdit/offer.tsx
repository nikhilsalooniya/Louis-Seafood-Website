'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Offer {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

const OfferPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch offers on mount
  const fetchOffers = async () => {
    const res = await fetch('/api/offer');
    const data = await res.json();
    setOffers(data);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Title and Description are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);

    const url = isEditing ? `/api/offer/${editingId}` : '/api/offer';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      body: formData,
    });

    if (res.ok) {
      await fetchOffers();
      setTitle('');
      setDescription('');
      setImage(null);
      setIsEditing(false);
      setEditingId(null);
    } else {
      alert('Failed to save offer');
    }
  };

  const handleEdit = (offer: Offer) => {
    setTitle(offer.title);
    setDescription(offer.description);
    setImage(null);
    setIsEditing(true);
    setEditingId(offer.id);
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this offer?');
    if (!confirmed) return;

    const res = await fetch(`/api/offer/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setOffers(offers.filter((o) => o.id !== id));
    } else {
      alert('Failed to delete offer');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isEditing ? 'Edit Offer' : 'Add Offer'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded text-black"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded text-black"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEditing ? 'Update' : 'Submit'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditingId(null);
              setTitle('');
              setDescription('');
              setImage(null);
            }}
            className="ml-4 text-gray-600 underline"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Render list below form */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Offer List</h3>
        <ul className="space-y-4">
      {offers.map((offer) => (
        <li key={offer.id} className="flex justify-between items-start border p-4 rounded">
          <div>
            <Image
              src={offer.image_url}
              alt={offer.title}
              width={80}
              height={80}
              className="rounded object-cover"
            />
            <h4 className="text-lg font-bold text-black">{offer.title}</h4>
            <p className="text-black">{offer.description}</p>
          </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => handleEdit(offer)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OfferPage;
