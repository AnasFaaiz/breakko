import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions - Breakko",
  description: "Terms & Conditions for Breakko - Personal Digital Notice Board. Read our terms of service.",
  robots: "index, follow",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black font-sans tracking-tight">Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Breakko, you accept and agree to be bound by the terms and provision of this
                agreement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Service Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                Breakko is a personal digital notice board service that allows users to display and manage their current
                status. The service includes both free and premium features.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">User Accounts</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>When creating an account, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Premium Subscription</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>Premium subscriptions:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Are billed monthly at $2/month</li>
                  <li>Automatically renew unless cancelled</li>
                  <li>Can be cancelled at any time</li>
                  <li>Provide ad-free experience and additional features</li>
                  <li>Are processed securely through Stripe</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Acceptable Use</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>You agree not to use Breakko to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Post harmful, offensive, or inappropriate content</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with the service or other users</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the service for commercial purposes without permission</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Breakko is provided "as is" without warranties of any kind. We are not liable for any damages arising
                from the use or inability to use our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to terminate or suspend accounts that violate these terms. Users may delete their
                accounts at any time through their account settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update these terms from time to time. Users will be notified of significant changes via email or
                through the service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold font-sans">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms & Conditions, please contact us at legal@breakko.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
