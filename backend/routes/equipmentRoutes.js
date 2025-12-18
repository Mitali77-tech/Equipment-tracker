const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all equipment
router.get("/", (req, res) => {
    db.query("SELECT * FROM equipment", (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// ADD equipment
router.post("/", (req, res) => {
    const { name, type, status, last_cleaned } = req.body;

    const sql = "INSERT INTO equipment (name, type, status, last_cleaned) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, type, status, last_cleaned], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send("Equipment added");
        }
    });
});

// UPDATE equipment
router.put("/:id", (req, res) => {
    const { name, type, status, last_cleaned } = req.body;
    const id = req.params.id;

    const sql = "UPDATE equipment SET name=?, type=?, status=?, last_cleaned=? WHERE id=?";
    db.query(sql, [name, type, status, last_cleaned, id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send("Equipment updated");
        }
    });
});

// DELETE equipment
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM equipment WHERE id=?", [id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send("Equipment deleted");
        }
    });
});

module.exports = router;
