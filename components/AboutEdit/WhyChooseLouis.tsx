'use client';
import { useState, useEffect } from 'react';

interface Card {
  id: number;
  title: string;
  description: string;
}

const WhyChooseLouis = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState<Card[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch offers on mount
  const fetchCards = async () => {
    const res = await fetch('/api/WhyChooseLouis');
    const data = await res.json();
    setCards(data);
  };

  useEffect(() => {
    fetchCards();
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

    const url = isEditing ? `/api/WhyChooseLouis/${editingId}` : '/api/WhyChooseLouis';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      body: formData,
    });

    if (res.ok) {
      await fetchCards();
      setTitle('');
      setDescription('');
      setIsEditing(false);
      setEditingId(null);
    } else {
      alert('Failed to save card');
    }
  };

  const handleEdit = (card: Card) => {
    setTitle(card.title);
    setDescription(card.description);
    setIsEditing(true);
    setEditingId(card.id);
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this card?');
    if (!confirmed) return;

    const res = await fetch(`/api/WhyChooseLouis/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setCards(cards.filter((o) => o.id !== id));
    } else {
      alert('Failed to delete card');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isEditing ? 'Edit Card' : 'Add Card'}
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
            }}
            className="ml-4 text-gray-600 underline"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Render list below form */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Card List</h3>
        <ul className="space-y-4">
          {cards.map((card) => (
            <li key={card.id} className="flex justify-between items-start border p-4 rounded">
              <div>
                <h4 className="text-lg font-bold text-black">{card.title}</h4>
                <p className="text-black">{card.description}</p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => handleEdit(card)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
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

export default WhyChooseLouis;
