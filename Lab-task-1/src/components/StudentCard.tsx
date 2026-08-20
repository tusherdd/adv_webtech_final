import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";
import PropTypes from "prop-types";

interface StudentCardProps {
  name: string;
  id: number;
  avatar: string;
  gpa: number;
  major: string;
  courses: string[];
}

function StudentCard({
  name,
  id,
  avatar,
  gpa,
  major,
  courses,
}: StudentCardProps) {
  return (
    <div className="student-card">

      <img
        src={avatar}
        alt={name}
        className="student-avatar"
      />

      <h2>{name}</h2>

      <p>ID: {id}</p>

      <p>Major: {major}</p>

      <StatBadge label="GPA" value={gpa} />

      <StatBadge label="Credits" value={90} />

      <div>
        {courses.map((course) => (
          <CourseTag
            key={course}
            courseName={course}
            color="lightblue"
          />
        ))}
      </div>

    </div>
  );
}

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StudentCard;