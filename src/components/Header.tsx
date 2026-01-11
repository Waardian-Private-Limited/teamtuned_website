"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/#features" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideLogoOnMobile, setHideLogoOnMobile] = useState(false);
  const [isOverDownloadSection, setIsOverDownloadSection] = useState(false);

  // Preload both logo images for smooth transitions
  useEffect(() => {
    const preloadImages = ["/LogoBlackText.png", "/LogoWhiteText.png"];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for footer visibility on mobile
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only hide logo on mobile (screens smaller than 640px)
          if (window.innerWidth < 640) {
            setHideLogoOnMobile(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(footer);

    // Also handle window resize
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setHideLogoOnMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Optimized Intersection Observer for download section
  useEffect(() => {
    const downloadSection = document.querySelector('section.bg-black');
    if (!downloadSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Change logo when section reaches the top
          setIsOverDownloadSection(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: '-1px 0px 0px 0px', // Trigger exactly when it touches the top
      }
    );

    observer.observe(downloadSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const ease = [0.16, 1, 0.3, 1] as const;

  const overlayVariants: Variants = {
    hidden: { y: "-100%" },
    visible: { y: "0%", transition: { duration: 1.3, ease } },
    exit: { y: "-100%", transition: { duration: 1.0, ease } },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.6, staggerChildren: 0.09 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
  };

  return (
    <>
      {/* HEADER */}
      <motion.header
        className={`fixed top-0 left-0 w-full py-4 sm:py-0 px-4 sm:px-4 z-[200] transition-all duration-500`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link
            href="/"
            className={`relative transition-all duration-500 ${hideLogoOnMobile ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            {/* Black Logo - Default */}
            <img
              src="/LogoBlackText.png"
              alt="TeamTuned by Waardian"
              className={`h-24 sm:h-26 w-auto object-contain transition-opacity duration-500 ${isOverDownloadSection ? 'opacity-0' : 'opacity-100'
                }`}
            />
            {/* White Logo - Over Dark Sections */}
            <img
              src="/LogoWhiteText.png"
              alt="TeamTuned by Waardian"
              className={`absolute top-0 left-0 h-24 sm:h-26 w-auto object-contain transition-opacity duration-500 ${isOverDownloadSection ? 'opacity-100' : 'opacity-0'
                }`}
            />
          </Link>

          {/* MENU BUTTON */}
          <motion.button
            onClick={() => setOpen(!open)}
            className={`relative h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full transition-all duration-300
            ${scrolled ? "bg-black/90 hover:bg-black/90" : "bg-black/50 backdrop-blur-md hover:bg-black/90"}
            `}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, ease }}
            aria-label="Toggle menu"
          >
            {/* HAMBURGER */}
            <motion.div
              animate={{ opacity: open ? 0 : 1, rotate: open ? -90 : 0 }}
              transition={{ duration: 0.5, ease }}
              className="absolute flex flex-col gap-1.5"
            >
              <span className="block w-8 sm:w-9 h-1 rounded-full bg-white"></span>
              <span className="block w-6 sm:w-7 h-1 rounded-full bg-white"></span>
              <span className="block w-7 sm:w-8 h-1 rounded-full bg-white"></span>
            </motion.div>

            {/* CROSS */}
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              animate={{ opacity: open ? 1 : 0, rotate: open ? 0 : 45 }}
              transition={{ duration: 0.5, ease }}
              className="absolute"
            >
              <path
                d="M6 6L22 22M22 6L6 22"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.button>
        </div>
      </motion.header>

      {/* FULLSCREEN MENU */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 z-[150]"
          >
            <div className="h-full flex flex-col justify-center px-6 sm:px-10 md:px-20">
              <motion.div
                variants={containerVariants}
                className="space-y-6 sm:space-y-10 max-w-4xl"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <Link
                      href={link.path}
                      onClick={() => setOpen(false)}
                      className="group block"
                    >
                      <span className="block text-white text-4xl sm:text-6xl md:text-7xl font-light tracking-tight 
                        transition-all duration-700 
                        group-hover:font-normal group-hover:translate-x-4 sm:group-hover:translate-x-10"
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.3, duration: 1.2 }}
                className="absolute bottom-8 sm:bottom-12 left-6 sm:left-10 md:left-20 text-white text-xs sm:text-sm uppercase tracking-widest"
              >
                business@teamtuned.com
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
