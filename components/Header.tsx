'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, FileText, Code, Github, BookOpen } from 'lucide-react';
import Logo from './Logo';
import GitHubBadge from './GitHubBadge';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 py-2">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Logo size={173} />
            </Link>

            {/* Desktop Navigation - Left Aligned */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/playground" className="text-gray-300 hover:text-white transition-colors">
                Playground
              </Link>
              <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
                Docs
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Enterprise
              </Link>
              
              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
                  <span>Resources</span>
                  <ChevronDown size={16} className={resourcesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                </button>
                
                {resourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Resources</h3>
                        <div className="space-y-3">
                          <Link 
                            href="/docs" 
                            className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-800 transition-colors group"
                            onClick={() => setResourcesOpen(false)}
                          >
                            <FileText size={20} className="text-gray-400 group-hover:text-white mt-0.5" />
                            <div>
                              <div className="text-white font-medium text-sm">Documentation</div>
                              <div className="text-gray-400 text-xs mt-1">Integrate OpenRedaction into your product</div>
                            </div>
                          </Link>
                          <a 
                            href="https://github.com/sam247/openredaction" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-800 transition-colors group"
                            onClick={() => setResourcesOpen(false)}
                          >
                            <Github size={20} className="text-gray-400 group-hover:text-white mt-0.5" />
                            <div>
                              <div className="text-white font-medium text-sm">GitHub</div>
                              <div className="text-gray-400 text-xs mt-1">Explore OpenRedaction&apos;s open-source codebase</div>
                            </div>
                          </a>
                          <Link 
                            href="/blog" 
                            className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-800 transition-colors group"
                            onClick={() => setResourcesOpen(false)}
                          >
                            <BookOpen size={20} className="text-gray-400 group-hover:text-white mt-0.5" />
                            <div>
                              <div className="text-white font-medium text-sm">Blog</div>
                              <div className="text-gray-400 text-xs mt-1">Guides and updates on PII detection</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - GitHub Badge and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <GitHubBadge repo="sam247/openredaction" />
            <Link
              href="/contact"
              className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link
              href="/playground"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Playground
            </Link>
            <Link
              href="/docs"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Enterprise
            </Link>
            <Link
              href="/blog"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <a
              href="https://github.com/sam247/openredaction"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              GitHub
            </a>
            <div className="pt-2">
              <GitHubBadge repo="sam247/openredaction" />
            </div>
            <Link
              href="/contact"
              className="block bg-white text-black px-4 py-2 rounded-md font-medium text-center hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

