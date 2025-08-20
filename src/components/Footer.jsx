import { Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Footer = () => {
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribing(true);

    try {
      const res = await fetch("https://brand-boostie-server.vercel.app/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscriberEmail }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      Swal.fire({
        icon: "success",
        title: "🎉 Subscribed!",
        text: "You’ll now get the latest halal shop & restaurant updates.",
        confirmButtonColor: "#3085d6",
      });

      setSubscriberEmail("");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to subscribe. Please try again later.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-base-300 text-gray-700 pt-16 pb-8 px-6 font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://i.ibb.co/tp2thjR1/tr-ffl.png" 
              alt="Logo"
              className="w-32"
            />
            {/* <span className="text-xl text-primary font-semibold">Halal Rated</span> */}
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Helping you discover and review halal shops & restaurants worldwide.
          </p>
          <div className="flex gap-4">
            {[
              { name: "facebook", url: "https://facebook.com" },
              { name: "twitter", url: "https://twitter.com" },
              { name: "youtube", url: "https://youtube.com" },
              { name: "linkedin", url: "https://linkedin.com" },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition"
              >
                <img
                  src={`https://cdn.jsdelivr.net/npm/simple-icons/icons/${platform.name}.svg`}
                  alt={platform.name}
                  className="w-4 h-4 opacity-70"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <div className="flex flex-col gap-1.5 text-gray-600">
              <Link to={"/shops"}>Shops</Link>
              <Link to={"/restaurants"}>Restaurants</Link>
              <Link to={"/add-review"}>Add Review</Link>
              <Link to={"/blogs"}>Shop Wishlist</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <div className="flex flex-col gap-1.5 text-gray-600">
              <Link to={"/contact"}>Contact</Link>
              <Link to={"/faqs"}>FAQs</Link>
              <Link to={"/privacy"}>Privacy Policy</Link>
              <Link to={"/terms"}>Terms & Conditions</Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Subscribe for Halal Updates</h4>
          <p className="text-sm text-gray-600 mb-4">
            Get the latest halal dining news, shop recommendations, and exclusive offers straight to your inbox.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex rounded-md overflow-hidden bg-white border border-primary"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={subscriberEmail}
              onChange={(e) => setSubscriberEmail(e.target.value)}
              required
              className="px-4 py-2 w-full text-sm focus:outline-none"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="px-4 text-sm lg:text-base text-primary hover:text-accent transition flex items-center gap-1.5 cursor-pointer"
              title="Subscribe"
            >
              {subscribing ? "Subscribing..." : <><Mail /> Subscribe</>}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 pt-6 max-w-7xl mx-auto border-t text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <ul className="flex flex-wrap gap-6 text-gray-500 justify-center">
          <Link to={"/"}>Home</Link>
          <Link to={"/shops"}>Shops</Link>
          <Link to={"/restaurants"}>Restaurants</Link>
          <Link to={"/reviews"}>Reviews</Link>
          <Link to={"/addReview"}>Add Reviews</Link>
          <Link to={"/shopWishlist"}>Shop Wishlist</Link>
          <Link to={"/about"}>About</Link>
        </ul>
        <p className="text-gray-500">© {new Date().getFullYear()} Halal Rated. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
