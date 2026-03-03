import { Link, useLocation } from 'react-router-dom';
import { Compass, Map } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    const links = [
        { to: '/', label: 'Home' },
        { to: '/dashboard', label: 'Mission Control' },
        { to: '/demo', label: 'Live Demo' },
    ];

    return (
        <nav className="navbar navbar-expand-md fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                    <Compass size={20} className="text-info" />
                    <span>Nav<span className="text-accent">Lab</span></span>
                </Link>

                <button
                    className="navbar-toggler border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMain"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navMain">
                    <ul className="navbar-nav mx-auto mb-2 mb-md-0">
                        {links.map((link) => (
                            <li className="nav-item" key={link.to}>
                                <Link
                                    to={link.to}
                                    className={`nav-link px-3 ${location.pathname === link.to ? 'active text-info' : ''}`}
                                    style={{ fontSize: 14 }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link to="/dashboard" className="btn btn-info btn-sm d-flex align-items-center gap-2">
                        <Map size={14} />
                        Open Lab
                    </Link>
                </div>
            </div>
        </nav>
    );
}
