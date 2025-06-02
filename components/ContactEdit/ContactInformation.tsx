'use client';
import React, { useState } from 'react';

const ContactInformation = () => {
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');

    const [video, setVideo] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('address', address);
        formData.append('number', number);
        formData.append('email', email);

        const res = await fetch('/api/contactInformation', {
            method: 'PUT',
            body: formData,
        });

        if (res.ok) alert('Contact Page updated - Completely!');
        else alert('Something went wrong!');


    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded"
        >
            <h2 className="text-2xl text-gray-900 font-bold">Update &quot;Contact&quot; Information</h2>


            <div>
                <label className="block mb-1 text-gray-900 font-semibold">Address:</label>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border"
                    rows={5}
                    required
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-900 font-semibold">Let's Talk Number:</label>
                <input
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full p-2 border"
                  required
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-900 font-semibold">General Support Email:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border"
                  required
                />
            </div>

            {/*<div>*/}
            {/*    <label className="block mb-1 text-gray-900 font-semibold">Video File (MP4)</label>*/}
            {/*    <input className="text-gray-900 bg-gray-100 px-2 py-2" type="file" accept="video/mp4" onChange={(e) => setVideo(e.target.files?.[0] || null)} />*/}
            {/*</div>*/}

            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                Save
            </button>
        </form>
    );
};

export default ContactInformation;
