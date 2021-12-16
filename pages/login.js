import { useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { data: session } = useSession();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          username: credentials.username,
          password: credentials.password,
        });

        console.log(result);

        if (result.ok) router.replace("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push("/");
    }
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
