import express, { Request, Response, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dbPromise from "./database";
import {
  UserResponse,
  InvestmentRequest,
  InvestmentResponse,
} from "./Types/types";

const app = express();
const port = 3000;
const router = Router();

app.use(bodyParser.json());
app.use(cors());

// Login with creds
router.post("/login", async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const db = await dbPromise;

    const user = await db.get<UserResponse>(
      "SELECT id, email, name FROM users WHERE email = ?",
      [email]
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create new user
router.post("/create-user", async (req: Request, res: Response) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  try {
    const db = await dbPromise;

    const result = await db.run(
      "INSERT INTO users (email, name) VALUES (?, ?)",
      [email, name]
    );

    const newUser = await db.get<UserResponse>(
      "SELECT id, email, name FROM users WHERE id = ?",
      [result.lastID]
    );

    res.status(201).json(newUser);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all investments
router.post("/investments", async (req: Request, res: Response) => {
  const { user_id, fund, amount } = req.body as InvestmentRequest;

  if (!user_id || !fund || amount === undefined || amount <= 0) {
    return res.status(400).json({
      message: "Missing or invalid fields",
      error: "User ID, fund, and a positive amount are required",
    });
  }

  try {
    const db = await dbPromise;

    const result = await db.run(
      `INSERT INTO investments (user_id, fund, amount) VALUES (?, ?, ?)`,
      [user_id, fund, amount]
    );

    const newInvestment = await db.get<InvestmentResponse>(
      "SELECT * FROM investments WHERE id = ?",
      [result.lastID]
    );

    res.status(201).json(newInvestment);
  } catch (error) {
    console.error("Error creating investment:", error);
    res.status(500).json({ message: "Failed to create investment" });
  }
});

router.get("/investments", async (req: Request, res: Response) => {
  try {
    const db = await dbPromise;
    const investments = await db.all<InvestmentResponse[]>(
      "SELECT * FROM investments"
    );
    res.status(200).json(investments);
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Failed to fetch investments" });
  }
});

// Get all users investments
router.get("/investments/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const db = await dbPromise;
    const investments = await db.all<InvestmentResponse[]>(
      "SELECT * FROM investments WHERE user_id = ?",
      [user_id]
    );
    res.status(200).json(investments);
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Failed to fetch investments" });
  }
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
