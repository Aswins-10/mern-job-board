import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4" data-testid="footer-contact-heading">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center" data-testid="contact-email">
                <Mail className="h-5 w-5 mr-2" />
                <span>contact@jobboard.com</span>
              </div>
              <div className="flex items-center" data-testid="contact-phone">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center" data-testid="contact-address">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Business St, Suite 100<br />San Francisco, CA 94107</span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4" data-testid="footer-links-heading">Useful Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-about">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-jobs">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-employers">For Employers</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-privacy">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-terms">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4" data-testid="footer-social-heading">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook" data-testid="social-facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter" data-testid="social-twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn" data-testid="social-linkedin">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram" data-testid="social-instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm" data-testid="footer-copyright">
            &copy; {new Date().getFullYear()} Job Board. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;