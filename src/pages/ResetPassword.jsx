import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Context from "../providers/Context";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = Context();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);
      await Swal.fire({
                title: "Password Reset Link Sent!",
                text: "Please check your email inbox to reset your password.",
                icon: "success",
              });
    } catch (err) {
      console.error(err.message);
      await Swal.fire({
              title: "Password reset failed!",
              icon: "error",
            });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-accent text-white font-semibold py-2 rounded-md transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {status === "success" && (
            <p className="text-green-600 text-sm mt-2 text-center">
              ✅ Reset email sent. Check your inbox.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm mt-2 text-center">
              ❌ Failed to send. Please check the email.
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}