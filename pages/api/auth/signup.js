import connectDB from "@/lib/dbConnect";
import Users from "@/models/Users";

import bcrypt from "bcrypt";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    const { username, password } = req.body;

    //Connect with database
    await connectDB();

    //Check existing
    const checkExisting = await Users.findOne({ username });
    //Send error response if duplicate user is found
    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      return;
    }
    //create user
    const user = await Users.create({
      name: "Allen",
      username,
      password: await bcrypt.hash(password, 12),
    });
    //Send success response
    if (user) res.status(201).json({ message: "User created" });
    //Close DB connection
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default handler;
