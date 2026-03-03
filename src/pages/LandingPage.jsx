import { Link } from 'react-router-dom';
import {
    Compass, Map, Eye, ArrowRight, Zap, Shield, Globe,
    Layers, Navigation, ChevronRight, Github, MapPin, Camera
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { getAllSlugs, mapConfigs } from '../data/mockData';

const features = [
    { icon: Map, title: 'Interactive Maps', desc: 'Build rich, interactive maps with Mapbox GL. Add custom markers, layers, and floor plans.' },
    { icon: Eye, title: '360° Virtual Tours', desc: 'Embed immersive panoramic views. Click a marker and step into a full 360° experience.' },
    { icon: Layers, title: 'Layer Management', desc: 'Toggle floor plans, overlay custom data, and manage complex spatial hierarchies.' },
    { icon: Globe, title: 'Shareable Links', desc: 'Publish your maps with a unique URL. Anyone can explore your spaces from anywhere.' },
    { icon: Zap, title: 'Real-time Editor', desc: 'Drag-and-drop markers, upload 360° media, and see changes instantly on the canvas.' },
    { icon: Shield, title: 'Enterprise Ready', desc: 'Role-based access, audit logs, and data encryption at rest for your deployments.' },
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

            {/* Hero */}
            <section className="d-flex align-items-center" style={{ minHeight: '100vh', paddingTop: 80 }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="mb-3">
                                <span className="badge border border-secondary px-3 py-2 text-muted">
                                    Spatial Intelligence Platform · v1.0
                                </span>
                            </div>

                            <h1 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-1px', lineHeight: 1.1 }}>
                                Navigate spaces.<br />
                                <span className="text-info">Immerse in 360°.</span>
                            </h1>

                            <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: 540 }}>
                                Create interactive maps with embedded 360° virtual tours.
                                Build, share, and explore spatial experiences — from floor plans to entire cities.
                            </p>

                            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 mb-5">
                                <Link to="/dashboard" className="btn btn-info btn-lg d-flex align-items-center gap-2 px-4">
                                    <Navigation size={18} />
                                    Mission Control
                                    <ArrowRight size={16} />
                                </Link>
                                <Link to="/demo" className="btn btn-outline-secondary btn-lg d-flex align-items-center gap-2 px-4">
                                    <Eye size={18} />
                                    Live Demo
                                    <ChevronRight size={16} />
                                </Link>
                            </div>

                            <div className="row g-3 justify-content-center" style={{ maxWidth: 500, margin: '0 auto' }}>
                                {stats.map((s, i) => (
                                    <div key={i} className="col-6 col-sm-3 text-center">
                                        <div className="h4 fw-bold text-info mb-0">{s.value}</div>
                                        <div className="text-muted" style={{ fontSize: 11 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-5">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <p className="text-info small fw-semibold text-uppercase mb-2" style={{ letterSpacing: 1 }}>
                            Platform Capabilities
                        </p>
                        <h2 className="fw-bold mb-3">Everything you need for spatial intelligence</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: 480 }}>
                            Built for teams who need to map, navigate, and share physical spaces digitally.
                        </p>
                    </div>

                    <div className="row g-3">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div key={i} className="col-sm-6 col-lg-4">
                                    <div className="feature-card h-100">
                                        <Icon size={20} className="text-info mb-3" />
                                        <h6 className="fw-semibold mb-2">{f.title}</h6>
                                        <p className="text-muted small mb-0">{f.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Live Maps */}
            <section className="py-5 border-top" style={{ borderColor: 'var(--nl-border) !important' }}>
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <p className="text-muted small fw-semibold text-uppercase mb-2" style={{ letterSpacing: 1 }}>
                            Explore Deployments
                        </p>
                        <h2 className="fw-bold mb-3">Live map instances</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: 480 }}>
                            Explore these deployed NavLab maps. Each link loads a unique configuration.
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
                                                <Compass size={20} className="text-info" />
                                                <div>
                                                    <div className="fw-semibold small">{c.name}</div>
                                                    <div className="text-muted" style={{ fontSize: 11, fontFamily: 'monospace' }}>/{slug}</div>
                                                </div>
                                            </div>
                                            <ArrowRight size={16} className="text-muted" />
                                        </div>
                                        <p className="text-muted small mb-3">{c.description}</p>
                                        <div className="d-flex gap-3" style={{ fontSize: 11 }}>
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

            {/* Footer */}
            <footer className="border-top py-4" style={{ borderColor: 'var(--nl-border) !important' }}>
                <div className="container d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <Compass size={18} className="text-info" />
                        <span className="fw-bold small">Nav<span className="text-accent">Lab</span></span>
                    </div>
                    <span className="text-muted" style={{ fontSize: 12 }}>
                        © 2026 NavLab. Built for spatial intelligence.
                    </span>
                    <a href="#" className="text-muted"><Github size={16} /></a>
                </div>
            </footer>
        </div>
    );
}
