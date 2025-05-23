import React, { useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Appcontent } from '../contextapi/Appcontext';
import ProfileButton from './ProfileButton';
import {
  Home,
  Info,
  Phone,
  ShoppingCart,
  MessageSquare,
  MapPin,
  HandCoins,
  LayoutDashboard,
  Users,
  FileText,
  Store,
  LogIn
} from 'lucide-react';

export default function NavBar() {
  const { isloggedin, userdata } = useContext(Appcontent);
  const navigate = useNavigate();

  const navLinkClass =
    'flex items-center gap-1 text-green-800 hover:text-green-900 hover:underline font-semibold transition-colors';

  return (
    <nav className="bg-[#fff7e6] border-b border-green-300 shadow-md px-6 py-4 sticky top-0 z-50">
      {(isloggedin && !userdata?.user?.isVarified && !userdata?.user?.isNgo) && (
        <p className="text-center text-green-700 font-semibold mb-2 text-sm">
          Account is not verified. <Link to="/otp" className="underline hover:text-green-900">Verify now</Link>
        </p>
      )}
      {(isloggedin && userdata?.user?.isNgo && !userdata?.user?.isVarified) && (
        <p className="text-center text-green-700 font-semibold mb-2 text-sm">
          Your account is under verification. <Link to="/msg" className="underline hover:text-green-900">See more</Link>
        </p>
      )}

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="w-12 h-12 rounded-full shadow-md border border-green-700"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-green-800 drop-shadow-sm">
            খাদ্য বাঁচাও
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-green-800">
          {isloggedin && userdata?.user?.isAdmin && (
            <>
              <NavLink to="/admin" className={navLinkClass}><LayoutDashboard size={18} /> Admin</NavLink>
              <NavLink to="/allfoodData" className={navLinkClass}><FileText size={18} /> Food Data</NavLink>
            </>
          )}

          {(!isloggedin || userdata?.user?.isUser || userdata?.user?.isDonor || (userdata?.user?.isNgo && !userdata?.user?.isVarified)) && (
            <>
              <NavLink to="/" className={navLinkClass}><Home size={18} /> Home</NavLink>
              <NavLink to="/about" className={navLinkClass}><Info size={18} /> About</NavLink>
              <NavLink to="/contact" className={navLinkClass}><Phone size={18} /> Contact</NavLink>
            </>
          )}

          {isloggedin && userdata?.user?.isUser && userdata?.user?.isVarified && (
            <>
              <NavLink to="/sell" className={navLinkClass}><Store size={18} /> Sell Food</NavLink>
              <NavLink to="/chat" className={navLinkClass}><MessageSquare size={18} /> Chat</NavLink>
            </>
          )}

          {userdata?.user?.isNgo && userdata?.user?.isVarified && (
            <>
              <NavLink to="/alldonatedfoods" className={navLinkClass}><Users size={18} /> Collect Requests</NavLink>
              <NavLink to="/allcollection" className={navLinkClass}><HandCoins size={18} /> Collect Food</NavLink>
              <NavLink to="/map" className={navLinkClass}><MapPin size={18} /> Map</NavLink>
              <NavLink to="/allposts" className={navLinkClass}><FileText size={18} /> Posts</NavLink>
              <NavLink to="/chat" className={navLinkClass}><MessageSquare size={18} /> Chat</NavLink>
            </>
          )}

          {isloggedin && userdata?.user?.isDonor && userdata?.user?.isVarified && (
            <NavLink to="/donation" className={navLinkClass}><HandCoins size={18} /> Donations</NavLink>
          )}
        </div>

        <div>
          {isloggedin ? (
            <ProfileButton />
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="group flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            >
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
              <span className="font-semibold">Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
