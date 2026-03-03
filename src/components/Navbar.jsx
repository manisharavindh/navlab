import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Map } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    const links = [
        { to: '/', label: 'Home' },
        { to: '/dashboard', label: 'Mission Control' },
        { to: '/demo', label: 'Live Demo' },
    ];

    return (
        <motion.nav
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="navbar navbar-expand-md fixed-top"
        >
            <div className="container">
                {/* Brand */}
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                    <div
                        className="d-flex align-items-center justify-content-center rounded"
                        style={{
                            width: 32, height: 32,
                            background: 'linear-gradient(135deg, var(--nl-accent), var(--nl-purple))',
                        }}
                    >
                        <Compass size={16} color="#fff" />
                    </div>
                    <span>Nav<span className="text-accent">Lab</span></span>
                </Link>

                {/* Toggle */}
                <button
                    className="navbar-toggler border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMain"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="navMain">
                    <ul className="navbar-nav mx-auto mb-2 mb-md-0">
                        {links.map((link) => (
                            <li className="nav-item" key={link.to}>
                                <Link
                                    to={link.to}
                                    className={`nav-link px-3 ${location.pathname === link.to ? 'active text-accent' : ''}`}
                                    style={{ fontSize: 14, fontWeight: 500 }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link to="/dashboard" className="btn btn-accent btn-sm d-flex align-items-center gap-2">
                        <Map size={14} />
                        Open Lab
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
