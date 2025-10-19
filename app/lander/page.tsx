import React from "react";

export default function LanderPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-4">
      <header className="text-center mt-24 mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-900">Welcome to Kylife</h1>
        <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
          Discover a modern, clean, and professional experience. Your business, portfolio, and creative journey start here.
        </p>
        <a href="#features" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Learn More</a>
      </header>
      <section id="features" className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gray-50 rounded-xl shadow p-6 text-center">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Modern Design</h2>
          <p className="text-gray-600">Sleek, responsive layouts that look great on any device.</p>
        </div>
        <div className="bg-gray-50 rounded-xl shadow p-6 text-center">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Fast & Secure</h2>
          <p className="text-gray-600">Optimized for speed and security, powered by Next.js.</p>
        </div>
        <div className="bg-gray-50 rounded-xl shadow p-6 text-center">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Easy to Customize</h2>
          <p className="text-gray-600">Easily update content and styles to fit your brand.</p>
        </div>
      </section>
      <section className="w-full max-w-xl bg-gray-50 rounded-xl shadow p-8 mb-24">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="border rounded p-3" />
          <input type="email" placeholder="Your Email" className="border rounded p-3" />
          <textarea placeholder="Your Message" className="border rounded p-3" rows={4}></textarea>
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Send Message</button>
        </form>
      </section>
    </div>
  );
}
