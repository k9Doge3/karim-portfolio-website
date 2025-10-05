export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing this personal portfolio website, you agree to these terms of service 
              and privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Website Purpose</h2>
            <p className="text-gray-300">
              This website serves as a personal portfolio showcasing professional work, 
              social media activity, and business information. All content is for 
              informational and portfolio purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Third-Party Integrations</h2>
            <p className="text-gray-300">
              This website integrates with TikTok, Spotify, Steam, and other third-party 
              services to display public profile information. Use of these integrations 
              is subject to the respective platforms' terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Content Usage</h2>
            <p className="text-gray-300">
              All content displayed from social media platforms is public information 
              used for portfolio demonstration purposes. Original website content is 
              the property of the site owner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
            <p className="text-gray-300">
              This website is provided "as is" for portfolio purposes. Social media 
              integrations may display mock data for demonstration when live APIs 
              are unavailable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-gray-300">
              For questions about these terms, please contact us through the website 
              contact form.
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