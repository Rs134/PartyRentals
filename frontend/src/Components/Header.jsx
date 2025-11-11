import { HashLink } from "react-router-hash-link";

function Header() {
  return (
    <header>
      <div className="nav-group">
        <div className="nav-top">
          <p>Great Service | Great Quality | Great Price</p>
        </div>
        <div className="nav-bottom">
          <HashLink smooth to="/">Home</HashLink>
          <HashLink smooth to="/#About">About</HashLink>
          <HashLink smooth to="/#Services">Services</HashLink>
          <HashLink smooth to="/#Catalog">Catalog</HashLink>
          <HashLink smooth to="/#Testimonials">Testimonials</HashLink>
          <HashLink smooth to="/#Contact">Contact</HashLink>
        </div>
      </div>
      <div className="nav-end">
        <div className="nav-contact">
          <p>Queens, NY | 646-996-1753</p>
        </div>
        <div className="nav-quoterequest">
          <HashLink smooth to="/catalog">
            <button>Browse Now </button>
          </HashLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
