import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Breakko",
  description:
    "Privacy Policy for Breakko - Personal Digital Notice Board. Learn how we protect your data and privacy.",
  robots: "index, follow",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black font-sans tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Information We Collect</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>At Breakko, we collect minimal information necessary to provide our service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email address for account creation and authentication</li>
                  <li>Status messages you create (stored securely)</li>
                  <li>Usage analytics to improve our service</li>
                  <li>Payment information (processed securely through Stripe)</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">How We Use Your Information</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain the Breakko service</li>
                  <li>Process premium subscriptions and payments</li>
                  <li>Send important service updates</li>
                  <li>Improve our service through analytics</li>
                  <li>Provide customer support</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your data. All passwords are hashed using
                bcrypt, and sensitive data is encrypted in transit and at rest. We regularly review and update our
                security practices.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Third-Party Services</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We use the following third-party services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Stripe for payment processing</li>
                  <li>Vercel for hosting and analytics</li>
                  <li>MySQL for data storage</li>
                </ul>
                <p>These services have their own privacy policies and security measures.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Your Rights</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your account and data</li>
                  <li>Export your data</li>
                  <li>Opt out of non-essential communications</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at privacy@breakko.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
