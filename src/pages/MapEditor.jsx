import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Save, Share2, Camera, Upload, Eye, Undo2, Redo2 } from 'lucide-react';
import MapContainer from '../components/MapContainer';
import EditorSidebar from '../components/EditorSidebar';
import PanoramaViewer from '../components/PanoramaViewer';
import { mapConfigs } from '../data/mockData';

export default function MapEditor() {
    const { mapId } = useParams();
    const config = mapConfigs[mapId] || mapConfigs.demo;

    const [markers, setMarkers] = useState(config.markers || []);
    const [layers, setLayers] = useState(config.layers || []);
    const [selectedMarkerId, setSelectedMarkerId] = useState(null);
    const [panoramaMarker, setPanoramaMarker] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showUpload, setShowUpload] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleMarkerClick = useCallback((m) => {
        setSelectedMarkerId(m.id);
        if (m.type === '360' && m.panorama) setPanoramaMarker(m);
    }, []);

    const handleSave = useCallback(() => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    }, []);

    return (
        <div className="d-flex flex-column vh-100" style={{ background: 'var(--nl-bg)' }}>
            {/* Toolbar */}
            <motion.div
                initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="d-flex align-items-center justify-content-between px-3 border-bottom flex-shrink-0"
                style={{ height: 56, borderColor: 'var(--nl-border) !important', background: 'rgba(20,23,32,0.9)', backdropFilter: 'blur(12px)', zIndex: 40 }}
            >
                {/* Left */}
                <div className="d-flex align-items-center gap-3">
                    <Link to="/dashboard" className="btn btn-sm text-muted p-1"><ChevronLeft size={18} /></Link>
                    <div className="vr" style={{ borderColor: 'var(--nl-border)' }} />
                    <div className="d-flex align-items-center gap-2">
                        <div
                            className="d-flex align-items-center justify-content-center rounded"
                            style={{ width: 24, height: 24, background: 'linear-gradient(135deg, var(--nl-accent), var(--nl-purple))' }}
                        >
                            <Eye size={12} color="#fff" />
                        </div>
                        <div>
                            <div className="fw-semibold small lh-1">{config.name}</div>
                            <div className="text-muted" style={{ fontSize: 10, fontFamily: 'monospace' }}>/{config.id} · {markers.length} markers</div>
                        </div>
                    </div>
                </div>

                {/* Center tools */}
                <div className="d-none d-sm-flex align-items-center gap-1 p-1 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--nl-border)' }}>
                    <button className="btn btn-sm text-muted p-1" title="Undo"><Undo2 size={14} /></button>
                    <button className="btn btn-sm text-muted p-1" title="Redo"><Redo2 size={14} /></button>
                    <div className="vr mx-1" style={{ height: 16 }} />
                    <button onClick={() => setShowUpload(true)} className="btn btn-sm text-muted d-flex align-items-center gap-1 px-2" style={{ fontSize: 12 }}>
                        <Camera size={14} /> 360° Media
                    </button>
                </div>

                {/* Right */}
                <div className="d-flex align-items-center gap-2">
                    <Link to={`/${config.id}`} className="btn btn-outline-secondary btn-sm d-none d-sm-flex align-items-center gap-1" style={{ fontSize: 12 }}>
                        <Eye size={13} /> Preview
                    </Link>
                    <button className="btn btn-sm text-muted p-1"><Share2 size={16} /></button>
                    <button onClick={handleSave} disabled={isSaving} className="btn btn-accent btn-sm d-flex align-items-center gap-1">
                        {isSaving
                            ? <span className="spinner-border spinner-border-sm" style={{ width: 14, height: 14 }} />
                            : <Save size={14} />
                        }
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </motion.div>

            {/* Body */}
            <div className="d-flex flex-grow-1 overflow-hidden position-relative">
                {/* Sidebar */}
                {sidebarOpen && (
                    <EditorSidebar
                        layers={layers}
                        markers={markers}
                        selectedMarkerId={selectedMarkerId}
                        onToggleLayer={(id) => setLayers((p) => p.map((l) => l.id === id ? { ...l, visible: !l.visible } : l))}
                        onMarkerSelect={(m) => setSelectedMarkerId(m.id)}
                        onDeleteMarker={(id) => { setMarkers((p) => p.filter((m) => m.id !== id)); if (selectedMarkerId === id) setSelectedMarkerId(null); }}
                    />
                )}

                {/* Toggle btn */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="btn btn-sm position-absolute text-muted px-1 py-2"
                    style={{ left: sidebarOpen ? 280 : 0, top: '50%', transform: 'translateY(-50%)', zIndex: 30, background: 'var(--nl-bg-sidebar)', borderRadius: '0 6px 6px 0', border: '1px solid var(--nl-border)', borderLeft: 'none' }}
                >
                    {sidebarOpen ? '‹' : '›'}
                </button>

                {/* Map */}
                <div className="flex-grow-1 position-relative">
                    <MapContainer config={config} markers={markers} onMarkerClick={handleMarkerClick} interactive />

                    <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 20 }}>
                        <div className="map-overlay d-flex align-items-center gap-2">
                            <span className="dot bg-success" style={{ width: 6, height: 6 }} />
                            <span style={{ fontSize: 12, fontFamily: 'monospace' }} className="text-muted">Editor Mode</span>
                            <span className="mx-1 text-muted">|</span>
                            <span style={{ fontSize: 10, fontFamily: 'monospace' }} className="text-muted">
                                Lat {config.center?.[1]?.toFixed(4)}, Lng {config.center?.[0]?.toFixed(4)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showUpload && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.6)', zIndex: 1050 }} onClick={() => setShowUpload(false)}>
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content border-0" style={{ background: 'var(--nl-bg-card)', borderRadius: 16 }}>
                            <div className="modal-body p-4">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div className="d-flex align-items-center justify-content-center rounded" style={{ width: 40, height: 40, background: 'rgba(13,202,240,0.12)' }}>
                                        <Camera size={20} className="text-accent" />
                                    </div>
                                    <div>
                                        <h6 className="fw-bold mb-0">Upload 360° Media</h6>
                                        <div className="text-muted" style={{ fontSize: 12 }}>Attach a panoramic image to a marker</div>
                                    </div>
                                </div>

                                <div className="upload-zone mb-4">
                                    <Upload size={32} className="text-muted mb-2" />
                                    <p className="small mb-1">Drop your 360° image here</p>
                                    <p className="text-muted mb-0" style={{ fontSize: 10, fontFamily: 'monospace' }}>Supports equirectangular JPEG, PNG · Max 50MB</p>
                                </div>

                                <div className="d-flex gap-2">
                                    <button onClick={() => setShowUpload(false)} className="btn btn-outline-secondary flex-fill">Cancel</button>
                                    <button onClick={() => setShowUpload(false)} className="btn btn-accent flex-fill">Upload & Attach</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Panorama */}
            {panoramaMarker && <PanoramaViewer marker={panoramaMarker} onClose={() => setPanoramaMarker(null)} />}
        </div>
    );
}
