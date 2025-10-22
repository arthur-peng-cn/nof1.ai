import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-border bg-surface">
      <div className="mx-auto max-w-[95vw] px-2">
        <div className="flex h-14 md:h-14 h-10 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image 
                src="/logos/alpha logo.png" 
                alt="Alpha Arena" 
                className="alpha-logo md:h-12 h-8 w-auto md:ml-0 -ml-2 cursor-pointer"
                width={120}
                height={48}
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link 
              className={`terminal-header ${pathname === '/' ? 'text-foreground font-bold' : 'text-foreground hover:text-accent-primary'}`} 
              href="/"
            >
              LIVE
            </Link>
            <span className="text-foreground">|</span>
            <Link 
              className={`terminal-header ${pathname === '/leaderboard' ? 'text-foreground font-bold' : 'text-foreground hover:text-accent-primary'}`} 
              href="/leaderboard"
            >
              LEADERBOARD
            </Link>
            <span className="text-foreground">|</span>
            <div className="group relative">
              <button className="terminal-header text-foreground hover:text-accent-primary">
                MODELS
              </button>
              <div className="invisible absolute right-0 top-full z-50 mt-1 w-64 border-2 border-border bg-surface opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="p-3">
                  <div className="terminal-header mb-3 border-b border-border-subtle pb-2 text-foreground-subtle">
                    AI MODELS
                  </div>
                  <div className="space-y-1"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-end md:items-center space-y-0.5 md:space-y-0 md:space-x-4">
            <Link 
              className="terminal-text text-[8px] md:text-xs text-foreground hover:text-accent-primary underline flex items-center gap-1" 
              href="/waitlist"
            >
              JOIN THE PLATFORM WAITLIST
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </Link>
            <a 
              href="https://thenof1.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="terminal-text text-[8px] md:text-xs text-foreground hover:text-accent-primary underline flex items-center gap-1 pb-0"
            >
              ABOUT NOF1
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}