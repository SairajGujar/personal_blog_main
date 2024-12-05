import e from "express";
import fs from "node:fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
const router = e.Router();
dotenv.config();
async function readDB() {
  let data = fs.readFileSync("./db.json", "utf-8");
  if (!data) {
    data = "[]";
    fs.writeFileSync("./db.json", data, "utf8");
  }
  const blogs = await JSON.parse(data);
  return blogs;
}

router.post("/create", async (req, res) => {
  try {
    let blogs = await readDB();
    const newBlog = {
      id: blogs.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: req.body.title,
      content: req.body.content,
    };
    blogs.push(newBlog);
    let updatedBlogs = JSON.stringify(blogs, null, 2);
    fs.writeFileSync("./db.json", updatedBlogs);
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await readDB();
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    let blogs = await readDB();
    if (req.params.id > blogs.length) {
      res.status(500).json("invalid id");
    } else {
      let idx = blogs.findIndex((blog) => blog.id == req.params.id);
      console.log(idx);
      const updated = {
        id: idx + 1,
        createdAt: blogs[idx].createdAt,
        updatedAt: new Date(),
        title: req.body.title,
        content: req.body.content,
      };
      blogs[idx] = updated;
      const updatedBlogs = JSON.stringify(blogs, null, 2);
      fs.writeFileSync("./db.json", updatedBlogs);
      res.status(200).json(blogs);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogs = await readDB();
    if (req.params.id > blogs.length) {
      res.status(500).json("invalid id");
    } else {
      const blog = blogs.find((blog) => blog.id == req.params.id);
      res.status(200).json(blog);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
});

router.delete("/blog/:id", async (req, res) => {
  try {
    const blogs = await readDB();
    if (req.params.id > blogs.length) {
      res.status(500).json("invalid id");
    } else {
      let updatedBlogs = blogs.filter((blog) => blog.id != req.params.id);

      updatedBlogs = JSON.stringify(updatedBlogs, null, 2);

      fs.writeFileSync("./db.json", updatedBlogs);
      res.status(200).json(updatedBlogs);
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let data = fs.readFileSync("./users.json", "utf-8");
    if (!data) {
      data = "[]";
      fs.writeFileSync("./db.json", data, "utf8");
    }
    const users = await JSON.parse(data);
    const user = users.find((user) => user.username === username);
    if (user == null) return res.status(404).json("invalid username");
    if (await bcrypt.compare(password, user.password)) {
      const jwtUser = {
        username: user.username,
        password: user.password,
      };
      const accessToken = jwt.sign(jwtUser, process.env.JWT_SECRET_KEY);
      return res.status(200).json({ accessToken: accessToken });
    }

    return res.status(404).json("invalid password");
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    let data = fs.readFileSync("./users.json", "utf-8");
    if (!data) {
      data = "[]";
      fs.writeFileSync("./users.json", data, "utf8");
    }
    let users = await JSON.parse(data);
    if (users.find((user) => user.username === username)) {
      return res.status(500).json("username not available");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(username)
    const newUser = {
      username:username,
      password: hashedPassword,
    };
    users.push(newUser);
    console.log(users)
    users = JSON.stringify(users, null, 2);
    fs.writeFileSync("./users.json", users);
    return res.status(201).json("registered successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

export default router;
