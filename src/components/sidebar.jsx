import React, { useState } from "react";
import { XMarkIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const RightSidebar = ({ isOpen, setIsOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const menuItems = [
    {
      title: "Accounts & Products",
      items: [
        {
          title: "Checking",
          items: [
            { title: "Personal Checking", href: "/checking/personal" },
            { title: "Business Checking", href: "/checking/business" },
          ],
        },
        {
          title: "Savings",
          items: [
            { title: "High Yield", href: "/savings/high-yield" },
            { title: "Regular Savings", href: "/savings/regular" },
          ],
        },
        {
          title: "Investing",
          items: [
            { title: "Stocks", href: "/investing/stocks" },
            { title: "ETFs", href: "/investing/etfs" },
          ],
        },
      ],
    },
    {
      title: "Advice",
      items: [
        {
          title: "Financial Planning",
          items: [
            { title: "Budgeting", href: "/advice/budgeting" },
            { title: "Saving", href: "/advice/saving" },
          ],
        },
        {
          title: "Retirement",
          items: [
            { title: "401k", href: "/advice/retirement/401k" },
            { title: "IRA", href: "/advice/retirement/ira" },
          ],
        },
        { title: "Wealth Management", href: "/advice/wealth-management" },
      ],
    },
    {
      title: "Pricing",
      items: [
        { title: "Fees", href: "/pricing/fees" },
        { title: "Commissions", href: "/pricing/commissions" },
      ],
    },
    {
      title: "Why Feenicks1",
      items: [
        { title: "About Us", href: "/about" },
        { title: "Careers", href: "/careers" },
        { title: "Testimonials", href: "/testimonials" },
      ],
    },
    {
      title: "Learn",
      items: [
        { title: "Articles", href: "/learn/articles" },
        { title: "Videos", href: "/learn/videos" },
        { title: "Webinars", href: "/learn/webinars" },
      ],
    },
  ];
  // Toggle dropdown state
  const toggleDropdown = (path) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };
  // Recursive menu renderer
  const renderMenu = (items, path = "") => {
    return (
      <ul className="pl-0">
        {items.map((item, index) => {
          const currentPath = path ? `${path}-${index}` : `${index}`;
          // If item has nested items
          if (item.items) {
            return (
              <li className="text-lg mb-4" key={currentPath}>
                <button
                  onClick={() => toggleDropdown(currentPath)}
                  className="w-full flex justify-between items-center p-2 hover:bg-gray-700 rounded text-left"
                >
                  {item.title}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openDropdowns[currentPath] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {openDropdowns[currentPath] && (
                  <div className="pl-4">
                    {renderMenu(item.items, currentPath)}
                  </div>
                )}
              </li>
            );
          }
          // Leaf item with href
          return (
            <li key={currentPath}>
              <a
                href={item.href || "#"}
                className="block p-2 hover:bg-gray-700 rounded"
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full bg-white text-[#121212] shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">FEENICKS1</h2>
          <button onClick={() => setIsOpen(false)}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        {/* Search */}
        <div className="p-4 border- border-gr-700 flex items-center bg-gra-700 rounded">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-800 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white text-black placeholder-gra-300 focus:outline-none"
          />
        </div>
        {/* Scrollable menu */}
        <nav className="flex-1 overflow-y-auto p-4">{renderMenu(menuItems)}</nav>
        {/* Footer buttons */}
        <div className="p-4 border-t border-gray-400 flex flex-col gap-5">
          {["Open Account", "Login", "Find a Branch", "Contact"].map((btn, idx) => (
            <a
              key={idx}
              href="#"
              className="bg-gradient-to-r from-blue-600 to-blue-900 flex justify-center items-center text-lg px-20 py-4 text-white rounded-sm"
            >
              {btn}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RightSidebar;