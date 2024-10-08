import { useState, useEffect, useRef } from 'react'
import { Menu, X, User2Icon } from 'lucide-react'
import UserSettingsDropdown from './UserDropdown'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-primary text-white shadow border-b border-purple-300 sm:rounded-b-lg rounded-b">
      <div className=" mx-auto px-8">
        <div className="flex justify-start">
          <div className="flex me-auto gap-6">
            <div>
              <a href="/" className="flex items-center bg-white px-10 py-1 my-3 rounded ">
                <span className="font-semibold text-lg"><img className="h-12" src="/logo.png" alt="Community Restoration Project" /></span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-6  *:border-b-2 *:border-primary hover:*:border-white hover:*:text-bold">
              <a
                href="/"
                className="py-4 px-2  font-semibold transition duration-300"
              >
                Home
              </a>
              <a
                href="/events"
                className="py-4 px-2  font-semibold transition duration-300"
              >
                Events
              </a>
              <a
                href="/community-hub"
                className="py-4 px-2  font-semibold transition duration-300"
              >
                Community Hub
              </a>
              {/* <a
                href="https://www.communityrestorationproject.org/housing-assistance"
                className="py-4 px-2  font-semibold transition duration-300"
              >
                Programs
              </a>
              <a
                href="https://www.communityrestorationproject.org/contact"
                className="py-4 px-2 font-semibold transition duration-300"
              >
                Contact
              </a> */}
            </div>
          </div>
          <div className='flex gap-6 '>
            <button className="md:block border border-orange-200 hidden bg-accent hover:bg-orange-300 transition duration-100 my-auto px-6 py-2 text-white rounded-full">Donate</button>
            <div className="md:flex my-auto hidden bg-white text-black rounded-full"><UserSettingsDropdown isLoggedIn={true} /></div>

          </div>
          <div className=" flex items-center">
            <button
              className=" outline-none mobile-menu-button"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className="text-2xl md:hidden">{isOpen ? <X size={24} /> : <Menu size={24} />}</span>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} hover:*:bg-purple-400 px-6 pb-8`}>
        <a href="/" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</a>
        <a href="/events" className="block py-2 px-4 text-sm hover:bg-gray-200">Events</a>
        <a href="/community-hub" className="block py-2 px-4 text-sm hover:bg-gray-200">Community Hub</a>
        <a href="/programs" className="block py-2 px-4 text-sm hover:bg-gray-200">Programs</a>
        <a href="/contact" className="block py-2 px-4 text-sm hover:bg-gray-200">Contact</a>
        <button href="/contact" className="block py-2 px-4 text-sm text-start w-full hover:bg-gray-200">Profile</button>
        <button href="/contact" className="block py-2 px-4 text-sm text-start w-full hover:bg-gray-200">Logout</button>
      </div>
    </nav>
  )
}
