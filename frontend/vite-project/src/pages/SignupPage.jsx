import React, { useState } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const SignupPage = () => {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formdata);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* TITLE */}
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-10">
          Create account
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* NAME */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Full name
            </label>
            <input
              type="text"
              required
              value={formdata.name}
              onChange={(e) =>
                setFormData({ ...formdata, name: e.target.value })
              }
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

          {/* EMAIL */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formdata.email}
              onChange={(e) =>
                setFormData({ ...formdata, email: e.target.value })
              }
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
              value={formdata.password}
              onChange={(e) =>
                setFormData({ ...formdata, password: e.target.value })
              }
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

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              required
              value={formdata.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  confirmPassword: e.target.value,
                })
              }
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
                Creating...
              </>
            ) : (
              <>
                Sign up <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-8 text-xs text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-900 hover:underline inline-flex items-center gap-1"
          >
            Sign in
            <ArrowRight className="w-3 h-3" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
