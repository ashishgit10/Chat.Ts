import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const SignupForm: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(
      {
        ...data,
        [name]: value
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8001/api/v1/signup", data, {
        headers: {
          "Content-Type": "application/json"
        }, withCredentials: true
      })
      if (response.status === 201) {
        toast.success("Signup Successful");
        console.log("Response Data:", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {

        toast.error(error.response?.data?.message || "Signup failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }

  }


  return (
    <form className="flex flex-col p-5" onSubmit={handleSubmit}>
      <Toaster />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={handleData}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleData}
      />
      <label htmlFor="password">Password</label>
      <div className="relative">
        <input
          className="w-full"
          type={show ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleData}
        />
        <button
          type="button"
          className="absolute right-4"
          onClick={() => setShow(!show)}
        >
          {show ? "hide" : "show"}
        </button>
      </div>
      <label htmlFor="confirmPassword">Confirm Password</label>
      <div className="relative">
        <input
          className="w-full"
          type={show ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <button
          type="button"
          className="absolute right-4"
          onClick={() => setShow(!show)}
        >
          {show ? "hide" : "show"}
        </button>
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
