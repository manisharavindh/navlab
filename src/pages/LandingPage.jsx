import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Compass, Map, Eye, ArrowRight, Zap, Shield, Globe,
    Layers, Navigation, Sparkles, ChevronRight, Github,
    MapPin, Camera
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { getAllSlugs, mapConfigs } from '../data/mockData';

const features = [
    { icon: Map, title: 'Interactive Maps', desc: 'Build rich, interactive maps with Mapbox GL. Add custom markers, layers, and floor plans.', color: '#0dcaf0' },
    { icon: Eye, title: '360° Virtual Tours', desc: 'Embed immersive panoramic views. Click a marker and step into a full 360° experience.', color: '#7c3aed' },
    { icon: Layers, title: 'Layer Management', desc: 'Toggle floor plans, overlay custom data, and manage complex spatial hierarchies.', color: '#198754' },
    { icon: Globe, title: 'Shareable Links', desc: 'Publish your maps with a unique URL. Anyone can explore your spaces from anywhere.', color: '#ffc107' },
    { icon: Zap, title: 'Real-time Editor', desc: 'Drag-and-drop markers, upload 360° media, and see changes instantly on the canvas.', color: '#dc3545' },
    { icon: Shield, title: 'Enterprise Ready', desc: 'Role-based access, audit logs, and data encryption at rest for your deployments.', color: '#6f42c1' },
];

const stats = [
    { value: '10K+', label: 'Maps Created' },
    { value: '50K+', label: '360° Views' },
    { value: '99.9%', label: 'Uptime' },
    { value: '<50ms', label: 'Avg Latency' },
];

export default function LandingPage() {
    const slugs = getAllSlugs();

    return (
        <div style={{ background: 'var(--nl-bg)', minHeight: '100vh' }}>
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="hero-section">
                <div className="container position-relative" style={{ zIndex: 1 }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-4"
                            >
                                <span className="badge border border-secondary px-3 py-2 d-inline-flex align-items-center gap-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                    <Sparkles size={13} className="text-accent" />
                                    <span className="text-muted small">Spatial Intelligence Platform</span>
                                    <span className="badge badge-accent" style={{ fontSize: 10 }}>v1.0</span>
                                </span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="display-4 fw-bold mb-3"
                                style={{ letterSpacing: '-1px', lineHeight: 1.1 }}
                            >
                                Navigate spaces.<br />
                                <span className="gradient-text">Immerse in 360°.</span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="lead text-muted mb-5 mx-auto"
                                style={{ maxWidth: 540 }}
                            >
                                Create interactive maps with embedded 360° virtual tours.
                                Build, share, and explore spatial experiences — from floor plans to entire cities.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 mb-5"
                            >
                                <Link to="/dashboard" className="btn btn-accent btn-lg d-flex align-items-center gap-2 px-4">
                                    <Navigation size={18} />
                                    Mission Control
                                    <ArrowRight size={16} />
                                </Link>
                                <Link to="/demo" className="btn btn-outline-secondary btn-lg d-flex align-items-center gap-2 px-4">
                                    <Eye size={18} />
                                    Live Demo
                                    <ChevronRight size={16} />
                                </Link>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <div className="row g-3 justify-content-center" style={{ maxWidth: 500, margin: '0 auto' }}>
                                    {stats.map((s, i) => (
                                        <div key={i} className="col-6 col-sm-3 text-center">
                                            <div className="h4 fw-bold gradient-text mb-0">{s.value}</div>
                                            <div className="text-muted" style={{ fontSize: 11, fontFamily: 'monospace' }}>{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section className="py-5">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <p className="text-accent small fw-semibold text-uppercase mb-2" style={{ letterSpacing: 1, fontFamily: 'monospace' }}>
                            Platform Capabilities
                        </p>
                        <h2 className="fw-bold mb-3">
                            Everything you need for <span className="gradient-text">spatial intelligence</span>
                        </h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: 480 }}>
                            Built for teams who need to map, navigate, and share physical spaces digitally.
                        </p>
                    </div>

                    <div className="row g-3">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div key={i} className="col-sm-6 col-lg-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        className="feature-card h-100"
                                    >
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded mb-3"
                                            style={{ width: 40, height: 40, background: `${f.color}18` }}
                                        >
                                            <Icon size={20} style={{ color: f.color }} />
                                        </div>
                                        <h6 className="fw-semibold mb-2">{f.title}</h6>
                                        <p className="text-muted small mb-0">{f.desc}</p>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== LIVE MAPS ===== */}
            <section className="py-5 border-top" style={{ borderColor: 'var(--nl-border) !important' }}>
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <p className="text-purple small fw-semibold text-uppercase mb-2" style={{ letterSpacing: 1, fontFamily: 'monospace' }}>
                            Explore Deployments
                        </p>
                        <h2 className="fw-bold mb-3">Live map instances</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: 480 }}>
                            Explore these deployed NavLab maps. Each link loads a unique configuration with custom markers and views.
                        </p>
                    </div>

                    <div className="row g-3">
                        {slugs.map((slug) => {
                            const c = mapConfigs[slug];
                            const mc = c.markers?.length || 0;
                            const pc = c.markers?.filter((m) => m.type === '360').length || 0;

                            return (
                                <div key={slug} className="col-sm-6 col-lg-4">
                                    <Link to={`/${slug}`} className="deploy-card h-100">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div
                                                    className="d-flex align-items-center justify-content-center rounded"
                                                    style={{ width: 40, height: 40, background: 'rgba(13,202,240,0.08)' }}
                                                >
                                                    <Compass size={20} className="text-accent" />
                                                </div>
                                                <div>
                                                    <div className="fw-semibold small">{c.name}</div>
                                                    <div className="text-muted" style={{ fontSize: 11, fontFamily: 'monospace' }}>/{slug}</div>
                                                </div>
                                            </div>
                                            <ArrowRight size={16} className="text-muted" />
                                        </div>
                                        <p className="text-muted small mb-3">{c.description}</p>
                                        <div className="d-flex gap-3" style={{ fontSize: 11, fontFamily: 'monospace' }}>
                                            <span className="text-muted d-flex align-items-center gap-1"><MapPin size={11} /> {mc} markers</span>
                                            <span className="text-muted d-flex align-items-center gap-1"><Camera size={11} /> {pc} panoramas</span>
                                            <span className="text-muted d-flex align-items-center gap-1"><Layers size={11} /> {c.layers?.length || 0} layers</span>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="border-top py-4" style={{ borderColor: 'var(--nl-border) !important' }}>
                <div className="container d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <div
                            className="d-flex align-items-center justify-content-center rounded"
                            style={{ width: 28, height: 28, background: 'linear-gradient(135deg, var(--nl-accent), var(--nl-purple))' }}
                        >
                            <Compass size={14} color="#fff" />
                        </div>
                        <span className="fw-bold small">Nav<span className="text-accent">Lab</span></span>
                    </div>
                    <span className="text-muted" style={{ fontSize: 12, fontFamily: 'monospace' }}>
                        © 2026 NavLab. Built for spatial intelligence.
                    </span>
                    <a href="#" className="text-muted"><Github size={16} /></a>
                </div>
            </footer>
        </div>
    );
}
