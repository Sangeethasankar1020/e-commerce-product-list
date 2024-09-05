import React from "react";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Account</h2>
      <div>
        <Link to="/register" className="block mb-2 text-blue-500">
          Register
        </Link>
        <Link to="/login" className="block text-blue-500">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Account;
