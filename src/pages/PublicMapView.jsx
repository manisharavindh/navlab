import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ChevronLeft, MapPin, Eye, Camera, Layers, Share2, ExternalLink, X, Menu } from 'lucide-react';
import MapContainer from '../components/MapContainer';
import PanoramaViewer from '../components/PanoramaViewer';
import { getMapConfigBySlug } from '../data/mockData';

export default function PublicMapView() {
    const { slug } = useParams();
    const config = getMapConfigBySlug(slug);
    const [panoramaMarker, setPanoramaMarker] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [showList, setShowList] = useState(false);

    // 404
    if (!config) {
        return (
            <div className="not-found" style={{ background: 'var(--nl-bg)' }}>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center px-3">
                    <div
                        className="d-flex align-items-center justify-content-center rounded mx-auto mb-4"
                        style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--nl-border)' }}
                    >
                        <Compass size={32} className="text-muted" />
                    </div>
                    <h3 className="fw-bold mb-2">Map Not Found</h3>
                    <p className="text-muted mb-1">
                        No map configuration exists for <code className="text-accent">/{slug}</code>
                    </p>
                    <p className="text-muted small mb-4">Check the URL or explore one of our available maps.</p>
                    <Link to="/" className="btn btn-accent d-inline-flex align-items-center gap-2">
                        <ChevronLeft size={16} /> Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    const handleMarkerClick = (m) => {
        setSelectedMarker(m);
        if (m.type === '360' && m.panorama) setTimeout(() => setPanoramaMarker(m), 300);
    };

    const m360 = config.markers?.filter((m) => m.type === '360') || [];
    const mInfo = config.markers?.filter((m) => m.type === 'info') || [];

    return (
        <div className="d-flex flex-column vh-100" style={{ background: 'var(--nl-bg)' }}>
            {/* Top bar */}
            <motion.div
                initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="d-flex align-items-center justify-content-between px-3 border-bottom flex-shrink-0"
                style={{ height: 56, borderColor: 'var(--nl-border) !important', background: 'rgba(20,23,32,0.9)', backdropFilter: 'blur(12px)', zIndex: 40 }}
            >
                <div className="d-flex align-items-center gap-3">
                    <Link to="/" className="btn btn-sm text-muted p-1"><ChevronLeft size={18} /></Link>
                    <div className="vr" style={{ borderColor: 'var(--nl-border)' }} />
                    <div className="d-flex align-items-center gap-2">
                        <div
                            className="d-flex align-items-center justify-content-center rounded"
                            style={{ width: 28, height: 28, background: 'linear-gradient(135deg, var(--nl-accent), var(--nl-purple))' }}
                        >
                            <Compass size={14} color="#fff" />
                        </div>
                        <div>
                            <div className="fw-semibold small lh-1">{config.name}</div>
                            <div className="text-muted" style={{ fontSize: 10, fontFamily: 'monospace' }}>by {config.owner}</div>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <button onClick={() => setShowList(!showList)} className="btn btn-sm text-muted p-1 d-sm-none"><Menu size={18} /></button>
                    <div className="d-none d-sm-flex align-items-center gap-3" style={{ fontSize: 11, fontFamily: 'monospace' }}>
                        <span className="text-muted d-flex align-items-center gap-1"><MapPin size={11} /> {config.markers?.length || 0}</span>
                        <span className="text-muted d-flex align-items-center gap-1"><Camera size={11} /> {m360.length}</span>
                    </div>
                    <button className="btn btn-sm text-muted p-1"><Share2 size={16} /></button>
                </div>
            </motion.div>

            {/* Main */}
            <div className="d-flex flex-grow-1 overflow-hidden position-relative">
                {/* Map */}
                <div className="flex-grow-1 position-relative">
                    <MapContainer config={config} markers={config.markers || []} onMarkerClick={handleMarkerClick} interactive />

                    {/* Desktop POI panel */}
                    <div className="d-none d-sm-block position-absolute top-0 end-0 m-3" style={{ zIndex: 20, width: 260 }}>
                        <PoiPanel m360={m360} mInfo={mInfo} onMarkerClick={handleMarkerClick} selectedId={selectedMarker?.id} />
                    </div>

                    {/* Info card for non-360 markers */}
                    <AnimatePresence>
                        {selectedMarker && selectedMarker.type !== '360' && (
                            <motion.div
                                initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }}
                                className="position-absolute bottom-0 start-50 translate-middle-x mb-3 px-3"
                                style={{ zIndex: 20, maxWidth: 400, width: '100%' }}
                            >
                                <div className="map-overlay p-3">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <span className="dot" style={{ background: selectedMarker.color }} />
                                                <span className="fw-bold small">{selectedMarker.title}</span>
                                            </div>
                                            <p className="text-muted small mb-0">{selectedMarker.description}</p>
                                        </div>
                                        <button onClick={() => setSelectedMarker(null)} className="btn btn-sm text-muted p-1"><X size={14} /></button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile POI sidebar */}
                <AnimatePresence>
                    {showList && (
                        <motion.div
                            initial={{ x: 280 }} animate={{ x: 0 }} exit={{ x: 280 }}
                            className="position-absolute end-0 top-0 bottom-0 p-3 overflow-auto d-sm-none"
                            style={{ zIndex: 30, width: 280, background: 'var(--nl-bg-sidebar)', borderLeft: '1px solid var(--nl-border)' }}
                        >
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <span className="fw-semibold small">Points of Interest</span>
                                <button onClick={() => setShowList(false)} className="btn btn-sm text-muted p-1"><X size={14} /></button>
                            </div>
                            <PoiPanel m360={m360} mInfo={mInfo} onMarkerClick={(m) => { handleMarkerClick(m); setShowList(false); }} selectedId={selectedMarker?.id} compact />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Panorama */}
            {panoramaMarker && (
                <PanoramaViewer marker={panoramaMarker} onClose={() => { setPanoramaMarker(null); setSelectedMarker(null); }} />
            )}
        </div>
    );
}

function PoiPanel({ m360, mInfo, onMarkerClick, selectedId, compact = false }) {
    return (
        <div className={compact ? '' : 'map-overlay p-3'} style={compact ? {} : { maxHeight: '60vh', overflowY: 'auto' }}>
            {!compact && <div className="section-label mb-2">Points of Interest</div>}

            {m360.length > 0 && (
                <div className="mb-3">
                    <div className="d-flex align-items-center gap-1 mb-2 text-accent" style={{ fontSize: 10, fontFamily: 'monospace' }}>
                        <Eye size={10} /> 360° VIEWS
                    </div>
                    {m360.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => onMarkerClick(m)}
                            className={`btn btn-sm w-100 text-start d-flex align-items-center gap-2 p-2 mb-1 border-0 ${selectedId === m.id ? 'marker-item active' : 'marker-item'}`}
                        >
                            <span className="dot" style={{ background: m.color }} />
                            <div className="flex-grow-1 overflow-hidden">
                                <div className="small fw-medium text-truncate">{m.title}</div>
                                <div className="text-muted text-truncate" style={{ fontSize: 10 }}>{m.description}</div>
                            </div>
                            <ExternalLink size={11} className="text-muted flex-shrink-0" />
                        </button>
                    ))}
                </div>
            )}

            {mInfo.length > 0 && (
                <div>
                    <div className="d-flex align-items-center gap-1 mb-2 text-muted" style={{ fontSize: 10, fontFamily: 'monospace' }}>
                        <MapPin size={10} /> INFO POINTS
                    </div>
                    {mInfo.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => onMarkerClick(m)}
                            className={`btn btn-sm w-100 text-start d-flex align-items-center gap-2 p-2 mb-1 border-0 ${selectedId === m.id ? 'marker-item active' : 'marker-item'}`}
                        >
                            <span className="dot" style={{ background: m.color }} />
                            <div className="flex-grow-1 overflow-hidden">
                                <div className="small fw-medium text-truncate">{m.title}</div>
                                <div className="text-muted text-truncate" style={{ fontSize: 10 }}>{m.description}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
