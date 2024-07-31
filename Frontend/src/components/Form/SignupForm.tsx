import React, { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data)
  };

  return (
    <form className="flex flex-col p-5" onSubmit={handleSubmit}>
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
