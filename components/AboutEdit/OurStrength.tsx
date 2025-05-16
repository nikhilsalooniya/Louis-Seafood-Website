'use client';
import React, { useState, useEffect } from 'react';

const OurStrengthForm = () => {
  const [mainHeading, setMainHeading] = useState('');
  const [images, setImages] = useState<(File | null)[]>([null, null]);

  const [subSections, setSubSections] = useState([
    { heading: '', description: '' },
    { heading: '', description: '' },
    { heading: '', description: '' },
    { heading: '', description: '' },
  ]);

  const [strengths, setStrengths] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch strengths from API
  useEffect(() => {
    fetchStrengths();
  }, []);

  const fetchStrengths = async () => {
    try {
      const res = await fetch('/api/ourstrength');
      const data = await res.json();
      setStrengths(data);
    } catch (error) {
      console.error('Failed to fetch strengths:', error);
    }
  };

  const handleImageChange = (index: number, file: File | null) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubSectionChange = (
    index: number,
    field: 'heading' | 'description',
    value: string
  ) => {
    const newSubSections = [...subSections];
    newSubSections[index][field] = value;
    setSubSections(newSubSections);
  };

  const resetForm = () => {
    setMainHeading('');
    setImages([null, null]);
    setSubSections([
      { heading: '', description: '' },
      { heading: '', description: '' },
      { heading: '', description: '' },
      { heading: '', description: '' },
    ]);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (item: any) => {
    setMainHeading(item.main_heading);
    setImages([null, null]); // Optional: cannot set File directly
    setSubSections([
      { heading: item.subheading1, description: item.subdescription1 },
      { heading: item.subheading2, description: item.subdescription2 },
      { heading: item.subheading3, description: item.subdescription3 },
      { heading: item.subheading4, description: item.subdescription4 },
    ]);
    setIsEditing(true);
    setEditId(item.id);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/ourstrength/${id}`, { //const res = await fetch(`/api/offer/${id}`, { method: 'DELETE' });
      method: 'DELETE',
    });
    if (res.ok) {
      alert('Deleted successfully!');
      fetchStrengths();
    } else {
      alert('Failed to delete!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('mainHeading', mainHeading);

    images.forEach((img, i) => {
      if (img) formData.append(`image${i + 1}`, img);
    });

    subSections.forEach((section, i) => {
      formData.append(`subHeading${i + 1}`, section.heading);
      formData.append(`subDescription${i + 1}`, section.description);
    });

    if (isEditing && editId !== null) {
      formData.append('id', String(editId));
    }

    const url = isEditing && editId !== null ? `/api/ourstrength/${editId}` : '/api/ourstrength';
const res = await fetch(url, {
  method: isEditing ? 'PUT' : 'POST',
  body: formData,
});


    if (res.ok) {
      alert(isEditing ? 'Updated successfully!' : 'Submitted successfully!');
      resetForm();
      fetchStrengths();
    } else {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isEditing ? 'Edit Strength' : 'Add Strength'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Main Heading"
          value={mainHeading}
          onChange={(e) => setMainHeading(e.target.value)}
          required
          className="w-full p-2 border rounded text-black"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(0, e.target.files?.[0] || null)}
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(1, e.target.files?.[0] || null)}
          className="w-full p-2 border rounded text-black"
        />

        {subSections.map((section, i) => (
          <div key={i}>
            <input
              type="text"
              placeholder={`Subheading ${i + 1}`}
              value={section.heading}
              onChange={(e) =>
                handleSubSectionChange(i, 'heading', e.target.value)
              }
              required
              className="w-full p-2 border rounded text-black mt-2"
            />
            <textarea
              placeholder={`Description ${i + 1}`}
              value={section.description}
              onChange={(e) =>
                handleSubSectionChange(i, 'description', e.target.value)
              }
              required
              className="w-full p-2 border rounded text-black mt-1"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'Update' : 'Submit'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-4 text-gray-600 underline"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Strength List */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Our Strength</h3>
        <ul className="space-y-6">
          {strengths.map((item) => (
            <li key={item.id} className="border p-4 rounded text-black">
              <h4 className="text-xl font-bold">{item.main_heading}</h4>
              <div className="flex gap-4 my-2">
                {item.image1_url && (
                  <img
                    src={item.image1_url}
                    alt="Image 1"
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                {item.image2_url && (
                  <img
                    src={item.image2_url}
                    alt="Image 2"
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
              </div>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="mb-2">
                  <h5 className="font-semibold">{item[`subheading${n}`]}</h5>
                  <p>{item[`subdescription${n}`]}</p>
                </div>
              ))}
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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

export default OurStrengthForm;
