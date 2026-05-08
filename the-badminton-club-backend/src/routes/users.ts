import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword},
    });

    res.status(201).json({id: user.id, name: user.name, email: user.email });
  } catch (err: any) {
    
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Login
userRouter.post("/login", async (req, res) => {
  const {email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({ error: "Missing email or password"});
  }

  try{
    const user = await prisma.user.findUnique({where: {email} });
    if (!user) return res.status(401).json({error: "Invalid credentials"});

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({error: "Invalid credentials"});

    const token = jwt.sign(
      {id: user.id, email: user.email},
      process.env.JWT_SECRET as string,
      {expiresIn: "1h"}
    );

    res.json({token});
  } catch(err){
    res.status(500).json({error: "Login failed"});
  }
});

export default userRouter;