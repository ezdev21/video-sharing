import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {registerForm, loading, success, error } = useAuthStore((state) => state);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(success){
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={registerForm.name}
              onChange={(e) => useAuthStore.setState({registerForm: {...registerForm, name: e.target.value}})}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={registerForm.email}
              onChange={(e) => useAuthStore.setState({registerForm: {...registerForm, email: e.target.value}})}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={registerForm.password}
              onChange={(e) => useAuthStore.setState({registerForm: {...registerForm, password: e.target.value}})}
              placeholder="Create a password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) => useAuthStore.setState({registerForm: {...registerForm, confirmPassword: e.target.value}})}
              placeholder="Confirm your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Success */}
          {success && (
            <p className="text-sm text-green-600 text-center">{success}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg  transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
