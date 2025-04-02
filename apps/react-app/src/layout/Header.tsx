import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="container">
        <ul className="flex py-4 gap-4">
          <li>
            <Link to="/" className="hover:text-indigo-500">
              Home Page
            </Link>
          </li>
          <li>
            <Link to="/components" className="hover:text-indigo-500">
              Components
            </Link>
          </li>
          <li>
            <Link to="/examples" className="hover:text-indigo-500">
              Examples
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
