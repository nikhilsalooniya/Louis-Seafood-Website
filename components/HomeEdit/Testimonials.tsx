'use client';
import { useState } from 'react';

const TestimonialForm = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!image) return setMessage('Please select an image');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('comment', comment);
    formData.append('image', image);

    const res = await fetch('/api/testimonial', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
      setName('');
      setComment('');
      setImage(null);
    } else {
      setMessage(data.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl text-gray-900 font-bold mb-2">Add Testimonial</h2>
      <input
        type="text"
        placeholder="Name"
        className="w-full  text-gray-900 p-2 border rounded"
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
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
      {message && <p className="text-center mt-2 text-green-600">{message}</p>}
    </form>
  );
};

export default TestimonialForm;
