import jwt from "jsonwebtoken";

const SECRET = "supersecret";

export function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("No token");
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

import bcrypt from "bcrypt";

export function registerAuthRoutes(app, pool) {
  app.post("/signup", async (req, res) => {
    try {
      const { username, password } = req.body;

      const hash = await bcrypt.hash(password, 10);

      await pool.query("INSERT INTO users (username,password) VALUES ($1,$2)", [
        username,
        hash,
      ]);

      return res.status(201).json({
        message: "User created",
      });
    } catch (err) {
      if (err.code === "23505") {
        return res.status(409).json({
          error: "Username already exists",
        });
      }
      console.log("Signup error:", err.message);
      res.status(400).send(err.message);
    }
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    const user = result.rows[0];

    if (!user) return res.status(401).send("invalid");

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) return res.status(401).send("invalid");

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET);

    res.send({ token });
  });
}
