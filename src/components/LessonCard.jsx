import React from "react";

const LessonCard = ({ lesson, onVerMas }) => {
  return (
    <div
      style={{
        backgroundColor: "#e997e2ce",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(201, 45, 180, 0.15)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "180px",
        transition: "transform 0.2s, box-shadow 0.2s",
        textAlign: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 14px rgba(201, 45, 180, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(201, 45, 180, 0.15)";
      }}
    >
      <h3 style={{ color: "#5c18daff", marginBottom: "10px" }}>
        {lesson.titulo}
      </h3>

      <p style={{ fontStyle: "italic", color: "#450a6dff", marginBottom: "10px" }}>
        {lesson.categoria}
      </p>

      {/* Imagen debajo de la categoría */}
      {lesson.imagen && (
        <img
          src={lesson.imagen} 
          alt={lesson.titulo}
          style={{
            width: "90px",
            height: "100px",
            objectFit: "contain",
            margin: "10px auto"
          }}
        />
      )}

      <button
        onClick={() => onVerMas(lesson)}
        style={{
          padding: "8px 15px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#e45fd2ff",
          color: "#280555ff",
          cursor: "pointer",
          fontWeight: "bold",
          fontFamily: "'Arial', sans-serif",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#d14fc0")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#e45fd2ff")}
      >
        Ver más
      </button>
    </div>
  );
};

export default LessonCard;