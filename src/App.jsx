import "./index.css";
import React, { useEffect, useState } from "react";
import LessonCard from "./components/LessonCard";

function App() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Conceptos básicos");

  useEffect(() => {
    fetch("http://localhost:5000/lessons")
      .then((res) => res.json())
      .then((data) => setLessons(data))
      .catch((err) => console.log(err));
  }, []);

  const categories = [
    { name: "Conceptos básicos", color: "#FF1493" },
    { name: "Autocuidado", color: "#FF1493" },
    { name: "Salud", color: "#FF1493" }
  ];

  const filteredLessons = lessons.filter(
    (lesson) => lesson.categoria === activeCategory
  );

  const categoryColors = {
    "Conceptos básicos": "#FFC0CB",
    "Autocuidado": "#FFB6C1",
    "Salud": "#FF69B4",
  };

  return (
    <div className="app-container">
      {/* Cabecera con imagen */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <img
          src="/titulo.png"
          alt="EduMenstruación"
          style={{
            width: "100%",
            maxWidth: "800px",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Introducción */}
      <div style={{
        textAlign: "center",
        margin: "20px 0",
        color: "#7912eeff",
        fontSize: "1.5rem",
        maxWidth: "800px"
      }}>
        <p>
          ¡Bienvenida a 🌸<strong>ViveTuCiclo</strong>🌸!  Aquí aprenderás todo sobre la menstruación de manera sencilla y positiva. 
    Descubre conceptos básicos, consejos de autocuidado y tips de salud para vivir tu ciclo con confianza y bienestar. 
    Explora las categorías y encuentra lecciones que te ayudarán a entender mejor tu cuerpo y cuidarte cada día.
      </p>
      </div>

      {/* Cuadritos de categorías */}
      <div className="categories-container">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="category-box"
            style={{
              backgroundColor: activeCategory === cat.name ? cat.color : "#ffb6c1",
            }}
            onClick={() => setActiveCategory(cat.name)}
          >
            {cat.name}
          </div>
        ))}
      </div>

      {/* Grid de lecciones */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {filteredLessons.map((lesson) => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            onVerMas={setSelectedLesson}
            color={categoryColors[lesson.categoria]}
          />
        ))}
      </div>

      {/* Modal para ver más */}
      {selectedLesson && (
        <div className="modal-overlay" onClick={() => setSelectedLesson(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{selectedLesson.titulo}</h2>
            <p className="modal-category">{selectedLesson.categoria}</p>
            <p className="modal-text">{selectedLesson.contenido}</p>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedLesson(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      
      {/* Pie de página con tu nombre */}
      <footer style={{
        textAlign: "center",
        marginTop: "50px",
        padding: "20px",
        color: "#ce0eceff",
        fontSize: "1.2rem"
      }}>
        © 2025 Cristina Parrales Toledo
      </footer>
    </div>
  );
}
  

export default App;
