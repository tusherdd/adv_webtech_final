import { useEffect, useState } from "react";
import "./App.css";

import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";

interface Student {
  name: string;
  id: number;
  avatar: string;
  gpa: number;
  major: string;
  courses: string[];
}

const studentData: Student[] = [
  {
    name: "Tusher",
    id: 101,
    avatar: "https://i.pravatar.cc/150?img=1",
    gpa: 3.8,
    major: "Computer Science",
    courses: ["React", "JavaScript", "Database"],
  },
  {
    name: "Rahim",
    id: 102,
    avatar: "https://i.pravatar.cc/150?img=2",
    gpa: 3.6,
    major: "EEE",
    courses: ["Circuit", "Physics"],
  },
  {
    name: "Karim",
    id: 103,
    avatar: "https://i.pravatar.cc/150?img=3",
    gpa: 3.9,
    major: "BBA",
    courses: ["Finance", "Marketing"],
  },
  {
    name: "Nadia",
    id: 104,
    avatar: "https://i.pravatar.cc/150?img=4",
    gpa: 3.7,
    major: "CSE",
    courses: ["React", "Python"],
  },
];

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(studentData);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.major
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const sortedStudents = [...filteredStudents];

  if (sortBy === "name") {
    sortedStudents.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortBy === "gpa") {
    sortedStudents.sort((a, b) => b.gpa - a.gpa);
  }

  useEffect(() => {
    document.title = `Dashboard — ${sortedStudents.length} Students`;
  }, [sortedStudents.length]);

  return (
    <div>
      <DashboardHeader
        title="Student Dashboard"
        tagline="Manage your students and courses"
        favoriteCount={favorites.length}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <SortControls
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <main className="student-container">
        {loading ? (
          <div className="loading">
            <p>Loading students...</p>
          </div>
        ) : sortedStudents.length > 0 ? (
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
            />
          ))
        ) : (
          <p>No students found.</p>
        )}
      </main>

      <footer>
        <p>© 2026 Student Dashboard</p>
      </footer>
    </div>
  );
}

export default App;