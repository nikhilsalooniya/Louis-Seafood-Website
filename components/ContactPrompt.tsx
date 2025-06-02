'use client';

import React, { useState, useEffect } from 'react';

interface ContactInfoData {
  address: string;
  number: string;
  email: string;
}

export default function ContactForm() {
  // contact information get data
  const [data, setData] = useState<ContactInfoData>({
    address: '',
    number: '',
    email: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/contactInformation');
        const json = await res.json();
        if (res.ok) {
          setData(json);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  // form functions

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('Message sent successfully!');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch {
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">

      {/* Left Side – Contact Info with background image */}
      <div
        className="md:w-xl bg-cover bg-center relative text-white p-8 flex flex-col justify-center"
        style={{ backgroundImage: `url('/images/worldmap.jpeg')` }} // Replace with actual path
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-1">📍 Address</h3>
            <p className={"whitespace-pre-wrap"}>
              { data.address || `447 Broadway, 2nd floor #1179\nNew York, NY 10013` }
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">📞 Let&apos;s Talk</h3>

            <a href="tel:0787878787" className="text-cyan-400 hover:underline">{ data.number || `0787878787` }</a>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">📧 General Support</h3>
            <a href="info@louisseafood.com" className="text-cyan-400 hover:underline">{ data.email || `info@louisseafood.com` }</a>
          </div>
        </div>
      </div>

      {/* Right Side – Contact Form */}
      <div className="md:w-xl bg-white p-10 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">CONTACT US</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-400 p-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-400 p-3"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone *"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-400 p-3"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full text-black border border-gray-400 p-3"
          />
          <textarea
            name="message"
            placeholder="Message *"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full text-black border border-gray-400 p-3"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition"
          >
            SEND
          </button>
        </form>
        {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
      </div>
    </div>
  );
}
