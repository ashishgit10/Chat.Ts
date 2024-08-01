import User from "../Models/User.js";
import generateToken from "../Utils/GenerateToken.js";

const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  /*   console.log(name, email, password) */

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Exists" });
    }

    const CreateUser = await User.create({
      email: email,
      password: password,
      name: name,
    });

    if (CreateUser) {
      return res.status(201).json({
        message: "User Created Successfully",
        _id: CreateUser._id,
        name: CreateUser.name,
        email: CreateUser.email,
        token: generateToken(CreateUser._id)
      });
    } else {
      return res.status(500).json({ message: "Error Creating user" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error during User Creation", error: err.message });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: "enter name or password" })
  }
  try {
    const checkuser = await User.findOne({ email });
    if (!checkuser) {
      return res.status(401).json({ message: "User not found" })
    }
    const user = await checkuser.MatchPassword(password)
    console.log("usercontroller", user)

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user) {
      return res.status(200).json({ message: "Login Successful" })
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error during login" })

  }
}
export { Login, Signup };
