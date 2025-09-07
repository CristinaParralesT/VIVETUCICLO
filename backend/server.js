// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs"); // Para leer el archivo JSON
const path = require("path");
require("dotenv").config(); // Para usar variables de entorno

const app = express();
app.use(cors());
app.use(express.json());

// Esquema de lección
const lessonSchema = new mongoose.Schema({
  titulo: String,
  categoria: String,
  resumen: String,
  contenido: String,
  imagen: String
});

const Lesson = mongoose.model("Lesson", lessonSchema);

// Conectar MongoDB Atlas usando variable de entorno
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(async () => {
  console.log("MongoDB Atlas conectado");

  // Leer JSON y subir lecciones automáticamente
  const lessonsPath = path.join(__dirname, "edumenstruacion.lessons.json");

  if (fs.existsSync(lessonsPath)) {
    const lessonsData = JSON.parse(fs.readFileSync(lessonsPath, "utf-8"));

    try {
      const count = await Lesson.countDocuments({});
      if (count === 0) {
        await Lesson.insertMany(lessonsData);
        console.log("Todas las lecciones se subieron a MongoDB Atlas");
      } else {
        console.log("La colección ya tiene lecciones, no se insertaron duplicados");
      }
    } catch (err) {
      console.log("Error al contar o insertar lecciones:", err);
    }
  } else {
    console.log("No se encontró el archivo edumenstruacion.lessons.json");
  }

})
.catch(err => console.log("Error conectando a MongoDB Atlas:", err));

// Rutas CRUD
app.get("/lessons", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/lessons", async (req, res) => {
  try {
    const newLesson = new Lesson(req.body);
    await newLesson.save();
    res.json(newLesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/lessons/:id", async (req, res) => {
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/lessons/:id", async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: "Lección eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
