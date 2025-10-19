import React from "react";

export default function KylifeLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-8">
      <section className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-lg">Welcome to Kylife</h1>
        <p className="text-lg text-gray-700 mb-8">A beautiful, modern site for your lifestyle, business, and creative journey. Built with Next.js & Tailwind CSS.</p>
        <a href="#contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Get in Touch</a>
      </section>
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Modern Design</h2>
          <p className="text-gray-600">Sleek, responsive layouts that look great on any device.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Fast & Secure</h2>
          <p className="text-gray-600">Optimized for speed and security, powered by Next.js.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Easy to Customize</h2>
          <p className="text-gray-600">Easily update content and styles to fit your brand.</p>
        </div>
      </section>
      <section id="contact" className="mt-20 bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Contact Us</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="border rounded p-3" />
          <input type="email" placeholder="Your Email" className="border rounded p-3" />
          <textarea placeholder="Your Message" className="border rounded p-3" rows={4}></textarea>
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Send Message</button>
        </form>
      </section>
    </main>
  );
}
