import { Link } from 'react-router-dom';
import {
    Compass, Map, Eye, Plus, Settings, Bell, Search, ChevronRight,
    Layers, MapPin, Camera, Users, Clock, Activity,
    ArrowUpRight, MoreHorizontal, Globe
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { mapConfigs, mockUsers } from '../data/mockData';

const user = mockUsers.admin;
const userMaps = user.maps.map((id) => mapConfigs[id]).filter(Boolean);

const recentActivity = [
    { action: 'Added 360° view to Main Lobby', time: '2 min ago', icon: Camera },
    { action: 'Updated floor plan for Office Floor', time: '15 min ago', icon: Layers },
    { action: 'Published LBX Suite map', time: '1 hour ago', icon: Globe },
    { action: 'Added 3 new markers to Tech Park', time: '3 hours ago', icon: MapPin },
    { action: 'Invited team member', time: '5 hours ago', icon: Users },
];

const dashStats = [
    { label: 'Total Maps', value: userMaps.length, icon: Map, change: '+2 this week' },
    { label: 'Total Markers', value: userMaps.reduce((a, c) => a + (c.markers?.length || 0), 0), icon: MapPin, change: '+5 today' },
    { label: '360° Views', value: userMaps.reduce((a, c) => a + (c.markers?.filter(m => m.type === '360').length || 0), 0), icon: Eye, change: '+3 this week' },
    { label: 'Total Layers', value: userMaps.reduce((a, c) => a + (c.layers?.length || 0), 0), icon: Layers, change: '2 active' },
];

export default function Dashboard() {
    return (
        <div style={{ background: 'var(--nl-bg)', minHeight: '100vh' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: 80 }}>
                {/* Welcome */}
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 mb-4">
                    <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <span className="dot bg-success" style={{ width: 6, height: 6 }} />
                            <span className="text-muted" style={{ fontSize: 11 }}>Mission Control Online</span>
                        </div>
                        <h3 className="fw-bold mb-1">Welcome back, {user.name}</h3>
                        <p className="text-muted small mb-0">Manage your spatial deployments from this command center.</p>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-outline-secondary btn-sm px-2"><Search size={15} /></button>
                        <button className="btn btn-outline-secondary btn-sm px-2 position-relative">
                            <Bell size={15} />
                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-info border border-dark rounded-circle" style={{ width: 8, height: 8 }}></span>
                        </button>
                        <Link to={`/lab/${userMaps[0]?.id || 'demo'}`} className="btn btn-info btn-sm d-flex align-items-center gap-1">
                            <Plus size={15} /> New Map
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="row g-3 mb-4">
                    {dashStats.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} className="col-6 col-lg-3">
                                <div className="stat-card">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <Icon size={18} className="text-info" />
                                        <span className="text-muted" style={{ fontSize: 10 }}>{s.change}</span>
                                    </div>
                                    <div className="h3 fw-bold mb-0">{s.value}</div>
                                    <div className="text-muted small">{s.label}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main grid */}
                <div className="row g-4">
                    {/* Deployments */}
                    <div className="col-lg-8">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 className="fw-semibold mb-0 d-flex align-items-center gap-2">
                                <Map size={15} className="text-info" /> Your Deployments
                            </h6>
                            <span className="text-muted small" style={{ cursor: 'pointer' }}>View all</span>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {userMaps.map((mc) => {
                                const mCount = mc.markers?.length || 0;
                                const pCount = mc.markers?.filter((m) => m.type === '360').length || 0;

                                return (
                                    <div key={mc.id} className="card border-0 p-4" style={{ borderRadius: 10 }}>
                                        <div className="d-flex align-items-start gap-3 mb-3">
                                            <Compass size={24} className="text-info flex-shrink-0 mt-1" />
                                            <div className="flex-grow-1 overflow-hidden">
                                                <h6 className="fw-semibold mb-0">{mc.name}</h6>
                                                <div className="text-muted" style={{ fontSize: 11, fontFamily: 'monospace' }}>navlab.com/{mc.id}</div>
                                                <p className="text-muted small mb-0 mt-1 text-truncate">{mc.description}</p>
                                            </div>
                                            <button className="btn btn-sm text-muted p-1"><MoreHorizontal size={16} /></button>
                                        </div>

                                        <hr className="my-2" style={{ borderColor: 'var(--nl-border)' }} />

                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex gap-3" style={{ fontSize: 11 }}>
                                                <span className="text-muted d-flex align-items-center gap-1"><MapPin size={11} /> {mCount} markers</span>
                                                <span className="text-muted d-flex align-items-center gap-1"><Camera size={11} /> {pCount} panoramas</span>
                                                <span className="text-muted d-flex align-items-center gap-1"><Layers size={11} /> {mc.layers?.length || 0} layers</span>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <Link to={`/${mc.id}`} className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" style={{ fontSize: 11 }}>
                                                    <Eye size={12} /> Preview
                                                </Link>
                                                <Link to={`/lab/${mc.id}`} className="btn btn-info btn-sm d-flex align-items-center gap-1" style={{ fontSize: 11 }}>
                                                    Edit <ArrowUpRight size={12} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Activity + Quick Actions */}
                    <div className="col-lg-4">
                        <div className="mb-4">
                            <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
                                <Activity size={15} className="text-muted" /> Recent Activity
                            </h6>

                            <div className="card border-0 p-3" style={{ borderRadius: 10 }}>
                                {recentActivity.map((a, i) => {
                                    const Icon = a.icon;
                                    return (
                                        <div key={i} className="activity-item d-flex align-items-start gap-3">
                                            <Icon size={14} className="text-muted mt-1 flex-shrink-0" />
                                            <div>
                                                <div className="small text-muted">{a.action}</div>
                                                <div className="text-muted" style={{ fontSize: 10 }}>
                                                    <Clock size={10} className="me-1" />{a.time}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h6 className="fw-semibold mb-3 text-muted small text-uppercase" style={{ letterSpacing: 0.8 }}>Quick Actions</h6>
                            <div className="card border-0 p-3" style={{ borderRadius: 10 }}>
                                <Link to={`/lab/${userMaps[0]?.id || 'demo'}`} className="activity-item d-flex align-items-center gap-3 text-decoration-none">
                                    <Plus size={16} className="text-info" />
                                    <div className="flex-grow-1">
                                        <div className="small fw-medium text-light">Create New Map</div>
                                        <div className="text-muted" style={{ fontSize: 10 }}>Start from scratch</div>
                                    </div>
                                    <ChevronRight size={14} className="text-muted" />
                                </Link>
                                <div className="activity-item d-flex align-items-center gap-3" style={{ cursor: 'pointer' }}>
                                    <Camera size={16} className="text-muted" />
                                    <div className="flex-grow-1">
                                        <div className="small fw-medium">Upload 360° Media</div>
                                        <div className="text-muted" style={{ fontSize: 10 }}>Add panoramic photos</div>
                                    </div>
                                    <ChevronRight size={14} className="text-muted" />
                                </div>
                                <div className="activity-item d-flex align-items-center gap-3" style={{ cursor: 'pointer' }}>
                                    <Settings size={16} className="text-muted" />
                                    <div className="flex-grow-1">
                                        <div className="small fw-medium">Account Settings</div>
                                        <div className="text-muted" style={{ fontSize: 10 }}>API keys & billing</div>
                                    </div>
                                    <ChevronRight size={14} className="text-muted" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ height: 48 }} />
            </div>
        </div>
    );
}
