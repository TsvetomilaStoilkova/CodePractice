import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-link">
          <h1 className="header-title">Books Inventory Manager</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
