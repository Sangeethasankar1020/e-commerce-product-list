import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register, setError } from "../redux/authSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (email && password) {
      dispatch(register({ email, password }));
    } else {
      dispatch(setError("Please fill in all fields"));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleRegister}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
