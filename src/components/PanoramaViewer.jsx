import { useEffect, useRef, useState } from 'react';
import { X, Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut, Info, ChevronLeft } from 'lucide-react';

export default function PanoramaViewer({ marker, onClose }) {
    const viewerRef = useRef(null);
    const pannellumRef = useRef(null);
    const [viewerReady, setViewerReady] = useState(false);
    const [showInfo, setShowInfo] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (!marker?.panorama || !viewerRef.current) return;

        const timer = setTimeout(() => {
            try {
                pannellumRef.current = window.pannellum.viewer(viewerRef.current, {
                    type: 'equirectangular',
                    panorama: marker.panorama,
                    autoLoad: true,
                    autoRotate: -2,
                    autoRotateInactivityDelay: 3000,
                    compass: false,
                    showControls: false,
                    hfov: 100,
                    minHfov: 50,
                    maxHfov: 120,
                    mouseZoom: true,
                    draggable: true,
                    friction: 0.15,
                    hotSpots: (marker.hotspots || []).map((hs, i) => ({
                        pitch: hs.pitch, yaw: hs.yaw, type: 'info', text: hs.text, id: `hs-${i}`,
                    })),
                });
                pannellumRef.current.on('load', () => setViewerReady(true));
            } catch {
                setViewerReady(true);
            }
        }, 300);

        return () => {
            clearTimeout(timer);
            try { pannellumRef.current?.destroy(); } catch { }
            pannellumRef.current = null;
            setViewerReady(false);
        };
    }, [marker]);

    const zoom = (dir) => {
        if (!pannellumRef.current) return;
        const hfov = pannellumRef.current.getHfov() + (dir === 'in' ? -15 : 15);
        pannellumRef.current.setHfov(Math.max(50, Math.min(120, hfov)));
    };

    const reset = () => {
        if (!pannellumRef.current) return;
        pannellumRef.current.setPitch(0);
        pannellumRef.current.setYaw(0);
        pannellumRef.current.setHfov(100);
    };

    const toggleFs = () => {
        if (!isFullscreen) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
        setIsFullscreen(!isFullscreen);
    };

    if (!marker) return null;

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ zIndex: 1060, background: 'var(--nl-bg)' }}
        >
            <div ref={viewerRef} className="w-100 h-100" />

            {/* Loading */}
            {!viewerReady && (
                <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ background: 'var(--nl-bg)', zIndex: 1070 }}
                >
                    <div className="text-center">
                        <div className="spinner-border text-secondary mb-3" role="status" />
                        <p className="small mb-1">Loading 360° View</p>
                        <p className="text-muted mb-0" style={{ fontSize: 12, fontFamily: 'monospace' }}>{marker.title}</p>
                    </div>
                </div>
            )}

            {/* Top bar */}
            <div
                className="position-absolute top-0 start-0 end-0 p-3 d-flex align-items-center justify-content-between"
                style={{ zIndex: 1080 }}
            >
                <button onClick={onClose} className="btn btn-sm pano-control d-flex align-items-center gap-2 px-3 py-2">
                    <ChevronLeft size={16} />
                    <span className="small">Exit to Map</span>
                </button>

                <div className="d-none d-sm-flex align-items-center gap-2 pano-control px-3 py-2">
                    <span className="dot" style={{ background: marker.color, width: 8, height: 8 }} />
                    <span className="small fw-medium">{marker.title}</span>
                    <span className="badge bg-secondary" style={{ fontSize: 10 }}>360°</span>
                </div>

                <div className="d-flex gap-1">
                    <button onClick={() => setShowInfo(!showInfo)} className={`btn btn-sm pano-control px-2 py-2 ${showInfo ? 'text-info' : ''}`}>
                        <Info size={16} />
                    </button>
                    <button onClick={toggleFs} className="btn btn-sm pano-control px-2 py-2">
                        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                </div>
            </div>

            {/* Side controls */}
            <div
                className="position-absolute end-0 top-50 translate-middle-y me-3 d-flex flex-column gap-1"
                style={{ zIndex: 1080 }}
            >
                <button onClick={() => zoom('in')} className="btn btn-sm pano-control px-2 py-2"><ZoomIn size={16} /></button>
                <button onClick={() => zoom('out')} className="btn btn-sm pano-control px-2 py-2"><ZoomOut size={16} /></button>
                <button onClick={reset} className="btn btn-sm pano-control px-2 py-2"><RotateCcw size={16} /></button>
            </div>

            {/* Info panel */}
            {showInfo && viewerReady && (
                <div className="position-absolute bottom-0 start-0 end-0 p-3" style={{ zIndex: 1080 }}>
                    <div className="mx-auto" style={{ maxWidth: 480 }}>
                        <div className="pano-control p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span className="dot" style={{ background: marker.color, width: 10, height: 10 }} />
                                        <h6 className="mb-0 fw-bold">{marker.title}</h6>
                                    </div>
                                    <p className="text-muted small mb-2">{marker.description}</p>
                                    {marker.hotspots?.length > 0 && (
                                        <div className="d-flex flex-wrap gap-1">
                                            {marker.hotspots.map((hs, i) => (
                                                <span key={i} className="badge bg-dark border border-secondary" style={{ fontSize: 10 }}>
                                                    {hs.text}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => setShowInfo(false)} className="btn btn-sm p-1 text-muted">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
