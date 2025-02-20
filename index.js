import express from "express";
import "dotenv/config";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json()); //Parse the JSON

let Teas = [];
let teaId = 1;

//Overview
app.get("/", (req, res) => {
  res.send("Hello Teas!");
});
//get all Teas
app.get("/teas", (req, res) => {
  res.status(200).send(Teas);
});
//add new tea
app.post("/tea", (req, res) => {
  let { name, price } = req.body;
  let newTea = { name, price, teaId };
  teaId++;
  Teas.push(newTea);
  res.status(200).send(newTea);
});

//get a Tea by id
app.get("/teas/:id", (req, res) => {
  const teaId = parseInt(req.params.id); // Convert ID to number
  const tea = Teas.find((tea) => tea.teaId === teaId);

  if (tea) {
    res.status(200).json(tea); // Send JSON response
  } else {
    res.status(404).json({ message: "Tea not found" }); // Send structured JSON error
  }
});

//Update Tea
app.put("/teas/:id", (req, res) => {
  let tea = Teas.find((tea) => tea.teaId === parseInt(req.params.id));
  tea.name = req.body.name;
  tea.price = req.body.price;
  res.status(200).send(tea);
});
//Delete Tea
app.delete("/teas/:id", (req, res) => {
  console.log(req);
  const teaId = parseInt(req.params.id); // Convert ID to number
  const index = Teas.findIndex((tea) => tea.teaId === teaId);

  // Debugging: Check if the index is found

  if (index === -1) {
    return res.status(404).json({ message: "Tea not found" });
  }

  const deletedTea = Teas.splice(index, 1)[0]; // Remove and store deleted tea

  res.status(200).json({ message: "Tea deleted successfully", deletedTea });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
