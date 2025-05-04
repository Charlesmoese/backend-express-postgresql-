import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsernameOrEmail, getAllUsers } from "../models/User.js";

const register = async (req, res) => {
  console.log("Registering user", req.body);
  const { username, email, password } = req.body;

  // Validação dos campos obrigatórios
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  // Validação do formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validação da senha: mínimo 8 caracteres, pelo menos uma letra e um número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long and include at least one letter and one number",
    });
  }

  try {
    // Verifica se o email ou username já existem
    const existingUser = await findUserByUsernameOrEmail(username, email);
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria o novo usuário
    const newUser = await createUser(username, email, hashedPassword);
    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: `Error registering user: ${error.message}` });
  }
};

const login = async (req, res) => {
  console.log("Logging in user", req.body);
  const { username, email, password } = req.body;

  // Validação dos campos
  if (!password || (!username && !email)) {
    return res.status(400).json({ message: "Username or email and password are required" });
  }

  try {
    // Busca o usuário por username ou email
    const user = await findUserByUsernameOrEmail(username, email);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Verifica se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("Login successful, token generated:", token);

    // Retorna o token e os dados do usuário
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: `Error logging in user: ${error.message}` });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    // Busca todos os usuários, excluindo o campo password
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({ message: `An error occurred while fetching users: ${error.message}` });
  }
};

export default { register, login, getAllUsers: getAllUsersController };