'use client';

import React, { useState } from 'react';
// import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);




  return (
    <main className="bg-[#0f0f0f] text-white min-h-screen font-sans">

      <div className="bg-[#0f0f0f] relative">
        {/* BACKDROP */}
        {isMenuOpen && (
          <div
        onClick={() => setIsMenuOpen(false)}
        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}

        {/* HEADER */}
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
          className="h-8 w-auto"
          src="/logo.png"
          alt="this is a logo"
            />
            </a>
        </div>

        {/* HAMBURGER MENU */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm font-semibold text-gray-200 hover:text-white">Product</a>
          <a href="#" className="text-sm font-semibold text-gray-200 hover:text-white">Features</a>
          <a href="#" className="text-sm font-semibold text-gray-200 hover:text-white">Marketplace</a>
          <a href="#" className="text-sm font-semibold text-gray-200 hover:text-white">Company</a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/auth/login" className="text-sm font-semibold text-gray-200 hover:text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
          </nav>

          {/* MOBILE MENU DRAWER */}
          <div
        className={`fixed top-0 right-0 z-50 w-72 h-full bg-[#111] p-6 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden`}
          >
        <button
          className="text-gray-300 mb-6"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕ Close
        </button>
        <nav className="flex flex-col gap-4">
          <a href="#" className="text-sm font-semibold text-gray-200 hover:text-white">Product</a>
          <a href="#" className="text-sm font-semibold text-gray-200 hover:text-white">Features</a>
          <a href="#" className="text-sm font-semibold text-gray-200 hover:text-white">Marketplace</a>
          <a href="#" className="text-sm font-semibold text-gray-200 hover:text-white">Company</a>
          <a href="#" className="text-sm font-semibold text-gray-200 hover:text-white">Log in</a>
        </nav>
          </div>
        </header>

        {/* HERO SECTION */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
          </div>

          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl text-white">
            Smarter Connections Start Here.
          </h1>
          <p className="mt-8 text-lg font-medium text-gray-400 sm:text-xl">
            Tap to share your world — profile, contact, and links, all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
          href="/auth/sineup"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500"
            >
          Get started
            </a>
            <a href="#" className="text-sm font-semibold text-gray-300 hover:text-white">
          Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
          </div>

          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
          </div>
        </div>


        {/*feture section   */}
        <section id="Features" className="bg-[#0f0f0f] min-h-screen text-white">
          <div className="gap-16 items-center py-16 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-24 lg:px-8">

        {/* TEXT CONTENT */}
        <div className="font-light text-gray-300 sm:text-lg md:text-xl lg:text-2xl">
          <h2 className="mb-10 text-4xl md:text-5xl lg:text-5xl tracking-tight font-extrabold text-white">
            Smarter Networking with NXTCard
          </h2>
          <p className="mb-6 text-gray-400">
            Traditional business cards are outdated. <span className="text-white font-medium">NXTCard</span> is your smart, NFC-powered digital card — tap to instantly share your contact, links, or portfolio.
          </p>
          <p className="mb-10 text-gray-400">
            Sleek. Fast. No app required. Whether you’re at a conference, meeting, or event — NXTCard helps you stand out and connect effortlessly.
          </p>
        </div>

        {/* IMAGES */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg border border-gray-700 shadow-lg"
            src="https://chhapai.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/03/27162753/mockup2-scaled-e1647933397995.jpg"
            alt="NXTCard mockup"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg border border-gray-700 shadow-lg"
            src="https://tapmo.in/cdn/shop/products/NFCmetalbusinesscardswithsilverengraved.gif?v=1679307612"
            alt="NXTCard in use"
          />
        </div>

          </div>
        </section>


        <section id="pricing">
  <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
    <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
      <div className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
    </div>
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400">NFC Card Plans</h2>
      <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl">Choose the best NFC card plan for your business</p>
    </div>
    <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-600 dark:text-gray-300 sm:text-xl">
      Choose a plan tailored to your needs for NFC card integration, enhanced functionality, and customer engagement.
    </p>
    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
      {/* Hobby Plan */}
      <div className="rounded-3xl rounded-t-3xl bg-white/60 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl dark:bg-gray-800 dark:ring-gray-700">
        <h3 id="tier-hobby" className="text-base font-semibold text-indigo-600 dark:text-indigo-400">Basic NFC</h3>
        <p className="mt-4 flex items-baseline gap-x-2">
          <span className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">$29</span>
          <span className="text-base text-gray-500 dark:text-gray-400">/month</span>
        </p>
        <p className="mt-6 text-base text-gray-600 dark:text-gray-300">Ideal for small businesses looking to get started with NFC card solutions.</p>
        <ul role="list" className="mt-8 space-y-3 text-sm text-gray-600 dark:text-gray-300 sm:mt-10">
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
            50 NFC card scans
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
            Up to 5,000 card users
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
            Basic analytics
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
            48-hour support response time
          </li>
        </ul>
        <a href="#" aria-describedby="tier-hobby" className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10">
          Get started today
        </a>
      </div>

      {/* Enterprise Plan */}
      <div className="relative rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-900/10 sm:p-10">
        <h3 id="tier-enterprise" className="text-base font-semibold text-indigo-400">Premium NFC</h3>
        <p className="mt-4 flex items-baseline gap-x-2">
          <span className="text-5xl font-semibold tracking-tight text-white">$99</span>
          <span className="text-base text-gray-400">/month</span>
        </p>
        <p className="mt-6 text-base text-gray-300">Designed for large enterprises requiring extensive NFC card support and advanced analytics.</p>
        <ul role="list" className="mt-8 space-y-3 text-sm text-gray-300 sm:mt-10">
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
            Unlimited NFC card scans
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
            Up to 500,000 card users
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
            Advanced NFC analytics
          </li>
          <li className="flex gap-x-3">
            <svg className="h-6 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
            24/7 dedicated support
          </li>
        </ul>
        <a href="#" aria-describedby="tier-enterprise" className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-400 ring-1 ring-indigo-500 ring-inset hover:ring-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10">
          Get started today
        </a>
      </div>
    </div>
  </div>
</section>





        {/* <!-- Footer section --> */}
        <footer className="bg-gray-900 dark:bg-gray-800 text-gray-300">
          <div className="px-6 py-12 lg:px-8">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Logo + Email + Socials */}
        <div>
          <a href="#" className="block mb-6">
            <span className="sr-only">Your Company</span>
            <img className="h-14 w-auto filter invert(100%)" src="./images/logo.png" alt="logo" />
          </a>
          <p className="text-sm/6 text-gray-400 mb-4">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
          </p>
        
        
          {/* Social Icons */}
          <div className="flex space-x-4 mt-2">
            <a href="https://github.com/riocoder7/" target="_blank" className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white">
              <img width="48" height="48" src="https://img.icons8.com/sf-regular-filled/48/github.png" alt="github" />
            </a>
            <a href="www.linkedin.com/in/riocoder" target="_blank" className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              <img width="48" height="48" src="https://img.icons8.com/color/48/linkedin.png" alt="linkedin" />
            </a>
            <a href="https://x.com/RioCoder" target="_blank" className="text-gray-500 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-300">
              <img width="48" height="48" src="https://img.icons8.com/color/48/twitterx--v1.png" alt="twitterx--v1" />
            </a>
            <a href="https://www.instagram.com/rio.coder/" target="_blank" className="text-gray-500 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-300">
              <img width="48" height="48" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new" />
            </a>
          </div>

          {/* Email */}
          <p className="text-sm text-gray-400 mb-3">
            <i className="fas fa-envelope mr-2 text-indigo-500"></i>
            <a href="mailto:sarfaraztech07@gmail.com" className="hover:underline">sarfaraztech07@gmail.com</a>
          </p>

        </div>
        
        {/* Product */}
        <div>
          <h2 className="text-sm/6 font-semibold text-gray-300">Product</h2>
          <ul className="mt-6 space-y-2">
            <li><a href="#" className="text-sm/6 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">Features</a></li>
            <li><a href="#" className="text-sm/6 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">Marketplace</a></li>
            <li><a href="#" className="text-sm/6 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">Company</a></li>
          </ul>
        </div>
        
        {/* Company */}
        <div>
          <h2 className="text-sm/6 font-semibold text-gray-300">Company</h2>
          <ul className="mt-6 space-y-2">
            <li><a href="#" className="text-sm/6 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">About us</a></li>
            <li><a href="#" className="text-sm/6 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">Careers</a></li>
            <li><a href="#" className="text-sm/6 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">Press</a></li>
          </ul>
        </div>
        
        {/* Resources */}
        <div>
          <h2 className="text-sm/6 font-semibold text-gray-300">Resources</h2>
          <ul className="mt-6 space-y-2">
            <li><a href="#" className="text-sm/6 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">Documentation</a></li>
            <li><a href="#" className="text-sm/6 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">Community</a></li>
            <li><a href="#" className="text-sm/6 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">Guides</a></li>
          </ul>
        </div>
            </div>
          </div>
        
          <div className="border-t border-gray-800 dark:border-gray-700">
            <div className="px-6 py-6 lg:px-8">
        <p className="text-sm/6 text-gray-400">© 2025-2026 CodeSpack. All rights reserved.</p>
            </div>
          </div>
        </footer>



      </div>
    </main>
  );
}