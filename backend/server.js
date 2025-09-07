const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conectar MongoDB local
mongoose.connect("mongodb://localhost:27017/edumenstruacion", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB local conectado"))
.catch((err) => console.log(err));

// Esquema de lección
const lessonSchema = new mongoose.Schema({
  titulo: String,
  categoria: String,
  resumen: String,
  contenido: String
});

const Lesson = mongoose.model("Lesson", lessonSchema);

// Rutas CRUD
app.get("/lessons", async (req, res) => {
  const lessons = await Lesson.find();
  res.json(lessons);
});

app.post("/lessons", async (req, res) => {
  const newLesson = new Lesson(req.body);
  await newLesson.save();
  res.json(newLesson);
});

app.put("/lessons/:id", async (req, res) => {
  const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedLesson);
});

app.delete("/lessons/:id", async (req, res) => {
  await Lesson.findByIdAndDelete(req.params.id);
  res.json({ message: "Lección eliminada" });
});

// Servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));