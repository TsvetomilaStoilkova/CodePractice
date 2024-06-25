import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="links-container">
        <Link to="/add" className="link">
          Add Book
        </Link>
        <Link to="/list" className="link">
          Book List
        </Link>
        <Link to="/history" className="link">
          Book History
        </Link>
        <Link to="/add-bookstore" className="link">
          Add Bookstore
        </Link>
      </div>
    </div>
  );
};

export default Home;
