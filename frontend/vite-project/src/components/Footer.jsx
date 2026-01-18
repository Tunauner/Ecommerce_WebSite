import { Instagram, Facebook, X } from "lucide-react";

const FooterLight = () => {
  return (
    <footer className="w-full bg-white text-gray-800 mt-32 border-t border-gray-600">
      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* BRAND */}
        <div>
          <h2 className="text-black text-xl tracking-widest uppercase mb-4">
             T U N A&nbsp;E D I T I O N
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 max-w-sm">
            Timeless essentials inspired by European street style. Designed with
            a quiet luxury mindset.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-black text-sm uppercase tracking-widest mb-6">
            Explore
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-black transition cursor-pointer">
              Woman
            </li>
            <li className="hover:text-black transition cursor-pointer">Man</li>
            <li className="hover:text-black transition cursor-pointer">
              New Arrivals
            </li>
            <li className="hover:text-black transition cursor-pointer">
              Collections
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-black text-sm uppercase tracking-widest mb-6">
            Follow
          </h3>
          <div className="flex items-center gap-6 text-gray-600">
            <a className="hover:text-black transition cursor-pointer">
              <Instagram size={20} />
            </a>
            <a className="hover:text-black transition cursor-pointer">
              <Facebook size={20} />
            </a>
            <a className="hover:text-black transition cursor-pointer">
              <X size={25} />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} Your Brand. All rights reserved.
          </span>

          <div className="flex gap-6">
            <span className="hover:text-black transition cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-black transition cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLight;
