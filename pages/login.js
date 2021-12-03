import { useState } from "react";
import { signIn } from "next-auth/react";

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

    const status = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    console.log(status);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" onChange={handleChange} />
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
