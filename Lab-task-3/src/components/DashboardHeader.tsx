import PropTypes from "prop-types";

interface DashboardHeaderProps {
  title: string;
  tagline: string;
  favoriteCount: number;
}

function DashboardHeader({
  title,
  tagline,
  favoriteCount,
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">

      <div>
        <h1>{title}</h1>
        <p>{tagline}</p>
      </div>

      <nav>
        <a href="/">Dashboard</a>
        <a href="/students">Students</a>
        <a href="/courses">Courses</a>

        <span>
          Favorites: {favoriteCount}
        </span>
      </nav>

    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  favoriteCount: PropTypes.number.isRequired,
};

export default DashboardHeader;