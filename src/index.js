const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

//In-memory storage
let users = [];
let userIdCounter = 1;

const nextId = () => userIdCounter++;

//POST
app.post('/users', (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = { id: nextId(), name, email };
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
});

app.put('/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { name, email } = req.body;
        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }
        user.name = name;
        user.email = email;
        res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.delete('/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        users.splice(userIndex, 1);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
