import { useState } from "react";

export default function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div className="input">
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
