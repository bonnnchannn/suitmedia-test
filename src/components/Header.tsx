"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Pastikan diimpor

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeHash, setActiveHash] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      setActiveHash(window.location.hash);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-80px 0px -80px 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "Work", path: "#work" },
    { name: "About", path: "#about" },
    { name: "Services", path: "#services" },
    { name: "Ideas", path: "#ideas" },
    { name: "Careers", path: "#careers" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        !isVisible ? "transform translate-y-[-100%]" : "bg-orange-500 bg-opacity-90"
      }`}
    >
      {/* Logo and Hamburger Menu */}
      <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
        {/* Ganti dengan logo gambar */}
        <Link href="#home" className="block my-auto">
          <Image
            src="/favicon1.png"
            alt="Suitmedia Logo"
            width={140}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Hamburger Menu for mobile */}
        <div
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <button className="text-white text-3xl">☰</button>
        </div>

        {/* Navigation Links for large screens */}
        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setActiveHash(link.path)}
              className={`text-white text-sm font-medium transition-all duration-300 hover:opacity-80 relative ${
                activeHash === link.path
                  ? "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
          <div className="flex justify-end p-4">
            <button
              className="text-white text-3xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4 mt-20">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => {
                  setActiveHash(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-white text-lg font-medium ${
                  activeHash === link.path ? "bg-gray-700" : ""
                } px-4 py-2 rounded`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;