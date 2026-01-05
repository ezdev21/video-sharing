import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const {loginForm, loading, error, login } = useAuthStore((state) => state);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login();
    if (ok) {
      navigate("/", { replace: true });
      const id = toast.success("Logged successfully", {
        position: "bottom-right",
        richColors: true,
        dismissible: true,
        duration: 5000,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(id),
        },
      });
    }
    else{
      const id = toast.error("Login error. please try again", {
        position: "bottom-right",
        richColors: true,
        dismissible: true,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(id),
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={(e) => handleLogin(e)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={(e) => useAuthStore.setState({loginForm: {...loginForm, email: e.target.value}})}
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
              value={loginForm.password}
              onChange={(e) => useAuthStore.setState({loginForm: {...loginForm, password: e.target.value}})}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg  transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign up */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
