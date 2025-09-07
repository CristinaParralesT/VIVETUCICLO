const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs"); // Para leer el archivo JSON
const path = require("path");

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

// Conectar MongoDB Atlas
mongoose.connect(
  "mongodb+srv://parralescristina3_db_user:3iartxI98kD2Rrng@vivecicluster.mongodb.net/viveTuCiclo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => {
  console.log("MongoDB Atlas conectado");

  // Leer JSON y subir lecciones automáticamente
  const lessonsPath = path.join(__dirname, "edumenstruacion.lessons.json");
  const lessonsData = JSON.parse(fs.readFileSync(lessonsPath, "utf-8"));

  // Verificar si la colección está vacía para no duplicar
  Lesson.countDocuments({}, (err, count) => {
    if (err) {
      console.log(err);
    } else if (count === 0) {
      Lesson.insertMany(lessonsData)
        .then(() => console.log("Todas las lecciones se subieron a MongoDB Atlas"))
        .catch(err => console.log(err));
    } else {
      console.log("La colección ya tiene lecciones, no se insertaron duplicados");
    }
  });

})
.catch((err) => console.log(err));

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
