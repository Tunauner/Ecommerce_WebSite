import React, { useState } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  // Function to fill demo credentials
  const fillDemoCredentials = () => {
  setEmail("admin@outlook.com");
  setPassword("123456");
};


  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* TITLE */}
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-10">
          Sign in
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* EMAIL */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                border-b border-gray-300
                py-2
                outline-none
                focus:border-black
                bg-transparent
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                border-b border-gray-300
                py-2
                outline-none
                focus:border-black
                bg-transparent
              "
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              w-full
              mt-10
              border border-black
              py-3
              text-sm
              flex items-center justify-center gap-2
              hover:bg-black hover:text-white
              transition
            "
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Loading
              </>
            ) : (
              <>
                Login <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/*Demo Credentials */}
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="text-sm text-gray-500 underline mt-2"
          >
            Fill demo credentials
          </button>

        </form>

        {/* FOOTER */}
        <p className="mt-8 text-xs text-gray-500">
          Not a member?{" "}
          <Link
            to="/signup"
            className="text-gray-900 hover:underline inline-flex items-center gap-1"
          >
            Sign up
            <ArrowRight className="w-3 h-3" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
