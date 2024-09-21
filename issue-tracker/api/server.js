const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

let issues = []; // In-memory storage for issues

app.get('/', (req, res) => {
    res.send('Welcome to the Issue Tracker API');
});

app.post('/issues', (req, res) => {
    const issue = req.body;
    issues.push(issue);
    console.log('Issue Created:', issue);
    res.status(201).send({ message: 'Issue created successfully', issue });
});

app.get('/issues', (req, res) => {
    if (issues.length === 0) {
        res.json({ message: 'No issues found', issues: [] });
    } else {
        res.json(issues);
    }
});

app.put('/issues/:id', (req, res) => {
    const { id } = req.params;
    const updatedIssue = req.body;

    const index = issues.findIndex(issue => issue.id === parseInt(id));
    if (index !== -1) {
        issues[index] = updatedIssue;
        console.log(`Issue ${id} Updated:`, updatedIssue);
        res.send({ message: `Issue ${id} updated successfully`, updatedIssue });
    } else {
        res.status(404).send({ message: `Issue ${id} not found` });
    }
});

app.delete('/issues/:id', (req, res) => {
    const { id } = req.params;
    const index = issues.findIndex(issue => issue.id === parseInt(id));
    
    if (index !== -1) {
        const deletedIssue = issues.splice(index, 1);
        console.log(`Issue ${id} Deleted:`, deletedIssue);
        res.send({ message: `Issue ${id} deleted successfully` });
    } else {
        res.status(404).send({ message: `Issue ${id} not found` });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
