'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  comment: string;
  image_url: string;
}

const TestimonialForm = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonial');
    if (res.ok) {
      const data = await res.json();
      setTestimonials(data);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !isEditing) {
      setMessage('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('comment', comment);
    if (image) formData.append('image', image);

    const url = isEditing ? `/api/testimonial/${editingId}` : '/api/testimonial';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message || 'Success!');
      setName('');
      setComment('');
      setImage(null);
      setIsEditing(false);
      setEditingId(null);
      fetchTestimonials();
    } else {
      setMessage(data.error || 'Something went wrong');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setName(testimonial.name);
    setComment(testimonial.comment);
    setImage(null);
    setIsEditing(true);
    setEditingId(testimonial.id);
    setMessage('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    const res = await fetch(`/api/testimonial/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      setMessage('Deleted successfully');
    } else {
      setMessage('Failed to delete testimonial');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl text-gray-900 font-bold mb-2">
          {isEditing ? 'Edit Testimonial' : 'Add Testimonial'}
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full text-gray-900 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Comment"
          className="w-full text-gray-900 p-2 border rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full text-gray-900 p-2 border rounded"
          required={!isEditing}
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
              setName('');
              setComment('');
              setImage(null);
              setMessage('');
            }}
            className="ml-4 text-gray-600 underline"
          >
            Cancel
          </button>
        )}
        {message && <p className="text-center mt-2 text-green-600">{message}</p>}
      </form>

      {/* Testimonials List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Testimonials</h3>
        {testimonials.length === 0 && <p>No testimonials yet.</p>}
        <ul className="space-y-4">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="flex justify-between items-start border p-4 rounded"
            >
              <div>
                <Image
                  src={testimonial.image_url}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="object-cover rounded"
                />
                <h4 className="text-lg font-bold text-black">{testimonial.name}</h4>
                <p className="text-black">{testimonial.comment}</p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
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

export default TestimonialForm;
