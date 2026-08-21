import { useEffect, useState } from "react";
import "./App.css";

import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import ThemeToggle from "./components/ThemeToggle";
import AddStudentForm from "./components/AddStudentForm";

import ThemeProvider from "./context/ThemeProvider";
import useTheme from "./context/useTheme";

import StudentProvider from "./context/StudentProvider";
import useStudent from "./context/useStudent";

function Dashboard() {
  const { darkMode } = useTheme();

  const {
    students,
    removeStudent,
  } = useStudent();

  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("default");

  // Favorite Toggle
  const handleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(
          (favoriteId) => favoriteId !== id
        );
      }

      return [...prevFavorites, id];
    });
  };

  // Search
  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.major
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // Sorting
  const sortedStudents = [...filteredStudents];

  if (sortBy === "name") {
    sortedStudents.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortBy === "gpa") {
    sortedStudents.sort((a, b) => b.gpa - a.gpa);
  }

  // Dynamic document title
  useEffect(() => {
    document.title = `Dashboard — ${sortedStudents.length} Students`;
  }, [sortedStudents.length]);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* Header */}
      <DashboardHeader
        title="Student Dashboard"
        tagline="Manage your students and courses"
        favoriteCount={favorites.length}
      />

      {/* Controls */}
      <div className="top-controls">

        <ThemeToggle />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <SortControls
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

      </div>

      {/* Add Student Form */}
      <AddStudentForm />

      {/* Student List */}
      <main className="student-container">

        {sortedStudents.length > 0 ? (

          sortedStudents.map((student) => (
            <StudentCard
              key={student.id}

              name={student.name}
              id={student.id}
              avatar={student.avatar}
              gpa={student.gpa}
              major={student.major}
              courses={student.courses}

              isFavorite={favorites.includes(student.id)}

              onFavorite={handleFavorite}

              onRemove={removeStudent}
            />
          ))

        ) : (

          <p>No students found.</p>

        )}

      </main>

      {/* Footer */}
      <footer>
        <p>© 2026 Student Dashboard</p>
      </footer>

    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <Dashboard />
      </StudentProvider>
    </ThemeProvider>
  );
}

export default App;