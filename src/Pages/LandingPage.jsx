import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiUser, FiShoppingCart } from 'react-icons/fi';

export default function ProductsPage() {
  const [quantity, setQuantity] = useState(1);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const product = {
    title: 'Split Zip Jacket Black',
    price: '$129',
    description:
      'A hoodie is a casual, comfortable sweatshirt with a hood, typically made from soft, warm materials like cotton or fleece.',
    images: [
      '/images/hoodie-1.jpg',
      '/images/hoodie-2.jpg',
      '/images/hoodie-3.jpg',
    ],
  };

  const categories = [
    { title: "Men's Collection", image: '/images/category-men.jpg' },
    { title: "Women's Collection", image: '/images/category-women.jpg' },
    { title: 'Accessories', image: '/images/category-accessories.jpg' },
  ];

  const similarProducts = [
    { title: 'Minimalist Streetwear Hoodie', price: '$79.00', image: '/images/similar-1.jpg', label: 'New' },
    { title: 'Minimalist Streetwear Hoodie', price: '$79.00', image: '/images/similar-2.jpg' },
    { title: 'Minimalist Streetwear Hoodie', price: '$79.00', image: '/images/similar-3.jpg' },
  ];

  const newArrivals = [
    { image: '/images/new-1.jpg' },
    { image: '/images/new-2.jpg' },
    { image: '/images/new-3.jpg' },
    { image: '/images/new-4.jpg' },
  ];

  return (
    <div className="min-h-screen bg-beige-50 flex flex-col">
      {/* Header */}
      <header className="bg-transparent py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">ACTE <span className="text-green-500">by Greene</span></div>
        <nav className="space-x-6">
          {['Home', 'Shop', 'About', 'Contact'].map((link) => (
            <a key={link} href="#" className="hover:text-gray-800">
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center relative">
          <button
            onClick={() => setUserMenuOpen((o) => !o)}
            className="flex items-center space-x-1 hover:text-gray-800"
          >
            <FiUser />
            <span>Hi, User</span>
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden">
              <ul className="text-sm">
                {[
                  'My Dashboard',
                  'Orders',
                  'Inbox',
                  'Wishlist',
                  'Voucher',
                ].map((item) => (
                  <li key={item} className="px-4 py-2 hover:bg-gray-100">
                    <a href="#">{item}</a>
                  </li>
                ))}
                <li className="px-4 py-2 bg-red-500 text-white hover:bg-red-600">
                  <button>Logout</button>
                </li>
              </ul>
            </div>
          )}
          <button className="ml-4 hover:text-gray-800">
            <FiShoppingCart size={20} />
          </button>
        </div>
      </header>

      {/* Main Product Section */}
      <main className="flex-1 px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4 capitalize">
              split zip jacket {product.price} black
            </h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center space-x-4 mb-6">
              <button className="p-2 border rounded hover:bg-gray-100">
                <FiChevronLeft />
              </button>
              <button className="p-2 border rounded hover:bg-gray-100">
                <FiChevronRight />
              </button>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <button
                className="px-3 py-1 border rounded hover:bg-gray-100"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="px-3 py-1 border rounded hover:bg-gray-100"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Add To Cart
            </button>
          </div>
          <div>
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full rounded-lg shadow"
            />
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {product.images.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Shop By Category */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-6 text-center">Shop By Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.title} className="relative group">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-white text-lg font-medium">{cat.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Similar Products */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-6 text-center">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarProducts.map((item) => (
              <div key={item.image} className="border rounded-lg p-4 hover:shadow-lg">
                {item.label && (
                  <span className="inline-block bg-yellow-300 text-yellow-800 text-xs uppercase px-2 py-1 rounded">
                    {item.label}
                  </span>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mt-2"
                />
                <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
                <p className="mt-1 text-gray-600">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              See More →
            </button>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((item, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden hover:shadow-lg">
                <img
                  src={item.image}
                  alt={`New arrival ${idx + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-beige-100 py-12 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-2">Connect With Us</h4>
            <p>@actebygreene</p>
            <div className="flex space-x-4 mt-2">
              <a href="#">FB</a>
              <a href="#">IG</a>
              <a href="#">X</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Shop</h4>
            <ul className="space-y-1">
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Sale</a></li>
              <li><a href="#">Collections</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <ul className="space-y-1">
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Help</h4>
            <ul className="space-y-1">
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-500">
          © 2025 Acte by Greene. Small brands. Big impact.
        </div>
      </footer>
    </div>
  );
}
