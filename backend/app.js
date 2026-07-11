require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// GET All Employees
app.get("/employees", async (req, res) => {

    const result = await pool.query(
        "SELECT * FROM employees ORDER BY id"
    );

    res.json(result.rows);

});

// POST Employee
app.post("/employees", async (req, res) => {

    const { name, role } = req.body;

    const result = await pool.query(

        "INSERT INTO employees(name, role) VALUES($1,$2) RETURNING *",

        [name, role]

    );

    res.json(result.rows[0]);

});

// PUT Employee
app.put("/employees/:id", async (req, res) => {

    const id = req.params.id;

    const { name, role } = req.body;

    const result = await pool.query(

        "UPDATE employees SET name=$1, role=$2 WHERE id=$3 RETURNING *",

        [name, role, id]

    );

    res.json(result.rows[0]);

});

// DELETE Employee
app.delete("/employees/:id", async (req, res) => {

    const id = req.params.id;

    await pool.query(

        "DELETE FROM employees WHERE id=$1",

        [id]

    );

    res.json({
        message: "Employee Deleted"
    });

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});

