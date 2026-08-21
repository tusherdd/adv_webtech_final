import { useState } from "react";
import useStudent from "../context/useStudent";

function AddStudentForm() {
  const { addStudent, students } = useStudent();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [major, setMajor] = useState("");
  const [gpa, setGpa] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !id || !major || !gpa) {
      setError("All fields are required.");
      return;
    }

    const studentId = Number(id);
    const studentGpa = Number(gpa);

    if (studentId <= 0) {
      setError("Student ID must be greater than 0.");
      return;
    }

    if (studentGpa < 0 || studentGpa > 4) {
      setError("GPA must be between 0 and 4.");
      return;
    }

    const idExists = students.some(
      (student) => student.id === studentId
    );

    if (idExists) {
      setError("Student ID already exists.");
      return;
    }

    addStudent({
      name,
      id: studentId,
      avatar: "https://i.pravatar.cc/150?img=10",
      gpa: studentGpa,
      major,
      courses: [],
    });

    setSuccess("Student added successfully!");

    setName("");
    setId("");
    setMajor("");
    setGpa("");
  };

  return (
    <div className="add-student-section">

      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label>Student ID</label>

          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter student ID"
          />
        </div>

        <div>
          <label>Major</label>

          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="Enter major"
          />
        </div>

        <div>
          <label>GPA</label>

          <input
            type="number"
            step="0.01"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            placeholder="Enter GPA"
          />
        </div>

        <button type="submit">
          Add Student
        </button>

      </form>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      {success && (
        <p className="form-success">
          {success}
        </p>
      )}

    </div>
  );
}

export default AddStudentForm;