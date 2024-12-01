const express = require("express")
const app = express();
const path = require("path");
const fs = require("fs").promises;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"))
});


app.post("/submit", async (req, res) => {
    await fs.writeFile("data.txt", JSON.stringify(req.body));
    res.send("Saved data")
});

app.get('/data', async (req, res) => {
    const data = await fs.readFile('data.txt', 'utf-8');
    res.send(data)
});

app.listen(3000, () => {
    console.log("http://localhost:3000")
});