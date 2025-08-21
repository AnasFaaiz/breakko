import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-bold font-sans text-lg">Breakko</h3>
            <p className="text-sm text-muted-foreground">Simple. Clean. Effective.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              About
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Terms & Conditions
            </Link>
            <a
              href="https://buymeacoffee.com/breakko"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Support Us
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/20 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Breakko. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
