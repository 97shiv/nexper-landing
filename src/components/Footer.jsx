import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Logo, Address */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Nexpert</h2>
          <p className="text-sm mb-4">
            123 Innovation Street,<br />
            Australia, 416001,<br />
          </p>
        
        </div>

        {/* Column 2: Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400">Web Development</a></li>
            <li><a href="#" className="hover:text-indigo-400">UI/UX Design</a></li>
            <li><a href="#" className="hover:text-indigo-400">Digital Marketing</a></li>
            <li><a href="#" className="hover:text-indigo-400">Fundraising</a></li>
          </ul>
        </div>

        {/* Column 3: Courses */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Courses</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-400">React for Beginners</a></li>
            <li><a href="#" className="hover:text-indigo-400">Advanced Node.js</a></li>
            <li><a href="#" className="hover:text-indigo-400">SEO Essentials</a></li>
            <li><a href="#" className="hover:text-indigo-400">Business Growth 101</a></li>
          </ul>
        </div>

        {/* Column 4: Subscribe + Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-2">Get updates and offers</p>
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-md text-black text-sm"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-r-md text-sm">
              Subscribe
            </button>
          </div>
          <h4 className="text-sm font-medium mb-2">Follow Us</h4>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-indigo-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-indigo-400"><FaTwitter /></a>
            <a href="#" className="hover:text-indigo-400"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-indigo-400"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-10">
        © {new Date().getFullYear()} Nexpert. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
