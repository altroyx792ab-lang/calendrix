import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "May 12, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <Helmet>
        <title>Privacy Policy | Calendrix</title>
        <meta name="description" content="Calendrix Privacy Policy - Learn how we collect, use, and protect your data." />
      </Helmet>

      <div className="mb-16 text-center">
        <div className="w-16 h-16 bg-brand-accent/10 text-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-400 font-medium tracking-wide">Last Updated: {lastUpdated}</p>
      </div>

      <div className="glass-card bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-12 text-gray-300">
        
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Eye className="text-brand-accent" />
            <h2 className="text-2xl font-bold text-white">Introduction</h2>
          </div>
          <p className="leading-relaxed mb-4">
            Welcome to <strong>Calendrix</strong>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>
          <p className="leading-relaxed">
            By using Calendrix, you agree to the terms outlined in this policy. If you have any questions or concerns, please contact us at <a href="mailto:altroyx792ab@gmail.com" className="text-brand-accent hover:underline">altroyx792ab@gmail.com</a>.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Data Collection</h2>
          </div>
          <div className="space-y-4">
            <p className="leading-relaxed">
              We may collect non-personal information about users whenever they interact with our site. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser name and version</li>
              <li>Type of computer or device used</li>
              <li>Technical information about your connection (OS, ISP)</li>
              <li>IP address (for security and analytics purposes)</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Google AdSense & Cookies</h2>
          </div>
          <div className="space-y-4">
            <p className="leading-relaxed">
              Calendrix uses <strong>Google AdSense</strong> to serve advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site based on your visits to this and other websites on the internet.
            </p>
            <p className="leading-relaxed italic">
              Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
            </p>
            <p className="leading-relaxed">
              Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">Google Ad Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">www.aboutads.info</a>.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Third Party Links</h2>
          </div>
          <p className="leading-relaxed">
            Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-white">User Rights</h2>
          </div>
          <p className="leading-relaxed mb-4">
            Under certain data protection laws, you have rights in relation to your personal data that include the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and where the lawful ground of processing is consent) to withdraw consent.
          </p>
          <p className="leading-relaxed">
            If you wish to exercise any of these rights, please reach out to us at our official contact email.
          </p>
        </section>

        <section className="pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
            <p className="mb-2">For any questions regarding this Privacy Policy, please contact us at:</p>
            <p className="text-xl font-bold text-brand-accent">altroyx792ab@gmail.com</p>
            <p className="mt-4 text-sm text-gray-500">Website: Calendrix (Owned by Yahya Mughal)</p>
          </div>
        </section>

      </div>
    </div>
  );
}
