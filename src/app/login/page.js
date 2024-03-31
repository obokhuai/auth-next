"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";
//import { toast } from "react-hot-toast";

const userData = {
  email: "",
  password: "",
};
function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState(userData);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("24,login successful", response.data);
      //toast.success("Login success");
      router.push("/profile");
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center min-h-screen items-center ">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="username">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        placeholder="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />

      <label htmlFor="username">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4"
        id="username"
        type="text"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 "
      >
        {buttonDisabled ? " no login here" : " login"}
      </button>
      <Link href="/signup">Visit signup page</Link>
    </div>
  );
}

export default LoginPage;
