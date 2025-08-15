import { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
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
          text: "You have successfully subscribed to our updates.",
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
            <img src="https://i.ibb.co/PHnxxqt/b-cropped.webp" alt="Logo" className="w-6 h-6" />
            <span className="text-xl text-primary font-semibold"></span>
          </div>
          <p className="text-sm text-gray-600 mb-6">
           
          </p>
          <div className="flex gap-4">
            {["facebook", "twitter", "youtube", "linkedin"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition"
              >
                <img
                  src={`https://cdn.jsdelivr.net/npm/simple-icons/icons/${platform}.svg`}
                  alt={platform}
                  className="w-4 h-4 opacity-70"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <div className="flex flex-col gap-1.5 text-gray-600">
              <Link to={'/about'}>About Us</Link>
              <Link to={'/caseStudies'}>Case Studies</Link>
              <Link>Careers</Link>
              <Link to={'/blogs'}>Blog</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <div className="flex flex-col gap-1.5 text-gray-600">
              <Link to={'/contact'}>Contact</Link>
              <Link to={'/about'}>FAQs</Link>
              <Link>Privacy Policy</Link>
              <Link>Terms & Conditions</Link>
            </div>
          </div>
        </div>

        {/* Newsletter   */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Subscribe to Updates</h4>
          <p className="text-sm text-gray-600 mb-4">
            Get the latest digital marketing insights, growth tips, and exclusive offers straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex rounded-md overflow-hidden bg-white border border-primary">
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
              {subscribing ? "Subscribing..." : <><IoMailOutline /> Subscribe</>}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 pt-6 max-w-7xl mx-auto border-t text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <ul className="flex flex-wrap gap-6 text-gray-500 justify-center">
          <Link to={"/"}>Home</Link>
          <Link to={"/services"}>Services</Link>
          <Link to={"/pricing"}>Pricing</Link>
          <Link to={"/caseStudies"}>Case Studies</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/blogs"}>Blogs</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/admin/dashboard"}>Admin</Link>
          <a href="https://github.com/hsrokon" target="_blank" rel="noopener noreferrer">Developer</a>
        </ul>
        <div className="flex gap-4">
            <div className="w-14 h-6">     
                <img
                    src={'https://i.ibb.co/rGHzqh5y/BKash.png'}
                    alt={'Bkash'}
                    className="w-full h-full object-cover"
                    />
            </div>
            <div className="w-14 h-6">
                <img
                src={'https://i.ibb.co/zVxYkhn7/Nagad.png'}
                alt={'Nagad'}
                className="w-full h-full object-cover"
                />
            </div>
            <div className="w-14 h-6">
                <img
                src={'https://i.ibb.co/YFWybDMg/Rocket.png'}
                alt={'Nagad'}
                className="w-full h-full object-cover"
                />
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;