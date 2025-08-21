"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Zap, Shield, Coffee } from "lucide-react"

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-black font-sans tracking-tight">About Breakko</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The simple, clean, and effective personal digital notice board for displaying your current status.
            </p>
          </div>

          {/* Mission Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold font-sans text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
              We believe in simplicity. Breakko was created to provide a clean, distraction-free way to communicate your
              current status to others. Whether you're on a break, in a meeting, or focusing on work, Breakko makes it
              effortless to keep everyone informed.
            </p>
          </section>

          {/* Features Grid */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold font-sans text-center">Why Choose Breakko?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/50 hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary" />
                    Lightning Fast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Set your status in seconds with preset options or create custom messages. No complex setup or
                    unnecessary features.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-primary" />
                    Clean Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Minimalist interface that focuses on what matters. Beautiful animations and smooth transitions
                    enhance the user experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    Privacy First
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your data is secure and private. We collect only what's necessary and never share your information
                    with third parties.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Coffee className="h-5 w-5 text-primary" />
                    Made with Love
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Built by developers who understand the need for simple, effective tools. Continuously improved based
                    on user feedback.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Story Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold font-sans text-center">The Story</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Breakko was born from a simple need: a clean, distraction-free way to communicate your current status.
                In a world full of complex communication tools, we wanted to create something beautifully simple.
              </p>
              <p>
                The idea came from observing how people naturally communicate their availability - a quick note on the
                door, a status message, or a simple sign. We translated this natural behavior into a digital experience
                that's both elegant and functional.
              </p>
              <p>
                Today, Breakko serves users who value simplicity, clean design, and effective communication. We're
                committed to keeping it simple while continuously improving the experience.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-6 pt-8 border-t border-border/30">
            <h2 className="text-2xl font-bold font-sans">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Join thousands of users who trust Breakko for their status communication needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => (window.location.href = "/")}
              >
                Try Breakko Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("https://buymeacoffee.com/breakko", "_blank")}
              >
                <Coffee className="h-4 w-4 mr-2" />
                Support Development
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
