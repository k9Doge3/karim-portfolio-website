export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="text-gray-300">
              This personal portfolio website may collect basic analytics data to understand 
              website usage and improve user experience. We integrate with third-party services 
              including TikTok, Spotify, and Steam to display public profile information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">TikTok Integration</h2>
            <p className="text-gray-300">
              We use TikTok's Display API to show public profile information and video content 
              for portfolio purposes only. No personal data beyond public profile information 
              is accessed or stored.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Data Usage</h2>
            <p className="text-gray-300">
              All displayed social media content is public information used solely for 
              professional portfolio presentation. We do not store, sell, or share personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-gray-300">
              For privacy concerns, please contact us through the contact form on this website.
            </p>
          </section>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Last updated: October 4, 2025
        </div>
      </div>
    </div>
  );
}