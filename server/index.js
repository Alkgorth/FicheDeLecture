const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 4000;
const USERS_FILE = path.join(__dirname, "..", "src", "data", "users.json");

app.use(cors());
app.use(express.json());

// Sérialise les écritures pour éviter que deux requêtes n'écrasent le fichier en même temps
let writeQueue = Promise.resolve();

const readUsers = async () => {
  const raw = await fs.readFile(USERS_FILE, "utf-8");
  return JSON.parse(raw).users;
};

const writeUsers = (users) => {
  writeQueue = writeQueue.then(() =>
    fs.writeFile(USERS_FILE, `${JSON.stringify({ users }, null, 2)}\n`, "utf-8"),
  );
  return writeQueue;
};

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};
    const users = await readUsers();

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === String(email ?? "").trim().toLowerCase() &&
        u.password === password,
    );

    if (!found) {
      return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    }

    const { password: _password, ...sessionUser } = found;
    res.json(sessionUser);
  } catch (error) {
    next(error);
  }
});

app.post("/api/users", async (req, res, next) => {
  try {
    const { pseudo, email, password } = req.body ?? {};
    const users = await readUsers();

    const emailTaken = users.some(
      (u) => u.email.toLowerCase() === String(email ?? "").trim().toLowerCase(),
    );
    if (emailTaken) {
      return res.status(409).json({ error: "EMAIL_EXISTS" });
    }

    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      role: "user",
      pseudo: String(pseudo ?? "").trim(),
      email: String(email ?? "").trim().toLowerCase(),
      password,
    };

    await writeUsers([...users, newUser]);

    const { password: _password, ...createdUser } = newUser;
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/users/:id", async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const users = await readUsers();

    const userExists = users.some((u) => u.id === userId);
    if (!userExists) {
      return res.status(404).json({ error: "USER_NOT_FOUND" });
    }

    await writeUsers(users.filter((u) => u.id !== userId));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Scaffold pour une future écran "mettre à jour mes données" ; pas encore appelé par l'UI
app.patch("/api/users/:id", async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const users = await readUsers();

    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      return res.status(404).json({ error: "USER_NOT_FOUND" });
    }

    const updatedUser = { ...users[index], ...req.body, id: userId };
    const nextUsers = [...users];
    nextUsers[index] = updatedUser;
    await writeUsers(nextUsers);

    const { password: _password, ...sessionUser } = updatedUser;
    res.json(sessionUser);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API users en écoute sur http://0.0.0.0:${PORT}`);
});
