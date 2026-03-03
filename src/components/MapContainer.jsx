import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Navigation } from 'lucide-react';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

export default function MapContainer({
    config,
    markers = [],
    onMarkerClick,
    onMapClick,
    interactive = true,
    className = '',
}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markersRef = useRef([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [hoveredMarker, setHoveredMarker] = useState(null);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: config?.style || 'mapbox://styles/mapbox/dark-v11',
            center: config?.center || [0, 0],
            zoom: config?.zoom || 12,
            pitch: config?.pitch || 0,
            bearing: config?.bearing || 0,
            interactive,
            antialias: true,
        });

        map.current.on('load', () => {
            setMapLoaded(true);

            const layers = map.current.getStyle().layers;
            const labelLayerId = layers?.find(
                (l) => l.type === 'symbol' && l.layout?.['text-field']
            )?.id;

            if (labelLayerId) {
                map.current.addLayer(
                    {
                        id: '3d-buildings',
                        source: 'composite',
                        'source-layer': 'building',
                        filter: ['==', 'extrude', 'true'],
                        type: 'fill-extrusion',
                        minzoom: 14,
                        paint: {
                            'fill-extrusion-color': '#1a1a2e',
                            'fill-extrusion-height': ['get', 'height'],
                            'fill-extrusion-base': ['get', 'min_height'],
                            'fill-extrusion-opacity': 0.7,
                        },
                    },
                    labelLayerId
                );
            }

            map.current.setFog({
                color: 'rgba(10, 10, 15, 0.8)',
                'high-color': 'rgba(13, 202, 240, 0.05)',
                'space-color': '#0f1117',
                'horizon-blend': 0.1,
                'star-intensity': 0.2,
            });
        });

        map.current.on('click', (e) => {
            if (onMapClick) onMapClick({ lng: e.lngLat.lng, lat: e.lngLat.lat });
        });

        if (interactive) {
            map.current.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right');
        }

        return () => {
            if (map.current) { map.current.remove(); map.current = null; }
        };
    }, []);

    useEffect(() => {
        if (!map.current || !mapLoaded) return;

        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];

        markers.forEach((md) => {
            const el = document.createElement('div');
            el.style.cssText = 'width:36px;height:36px;cursor:pointer;position:relative;display:flex;align-items:center;justify-content:center;';

            const dot = document.createElement('div');
            dot.style.cssText = `width:14px;height:14px;border-radius:50%;background:${md.color || '#0dcaf0'};border:2.5px solid #fff;box-shadow:0 0 10px ${md.color || '#0dcaf0'}80;transition:transform .2s;z-index:2;`;

            const pulse = document.createElement('div');
            pulse.className = 'marker-pulse-ring';
            pulse.style.cssText = `position:absolute;width:36px;height:36px;border-radius:50%;border:2px solid ${md.color || '#0dcaf0'}40;z-index:1;`;

            if (md.type === '360') {
                const badge = document.createElement('div');
                badge.style.cssText = `position:absolute;top:-6px;right:-6px;width:16px;height:16px;border-radius:50%;background:${md.color || '#0dcaf0'};display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:700;color:#fff;z-index:3;`;
                badge.textContent = '360';
                el.appendChild(badge);
            }

            el.appendChild(pulse);
            el.appendChild(dot);

            el.addEventListener('mouseenter', () => {
                dot.style.transform = 'scale(1.3)';
                setHoveredMarker(md);
            });
            el.addEventListener('mouseleave', () => {
                dot.style.transform = 'scale(1)';
                setHoveredMarker(null);
            });
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                onMarkerClick?.(md);
            });

            const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
                .setLngLat(md.coordinates)
                .addTo(map.current);

            markersRef.current.push(marker);
        });
    }, [markers, mapLoaded, onMarkerClick]);

    return (
        <div className={`position-relative w-100 h-100 ${className}`}>
            <div ref={mapContainer} className="position-absolute top-0 start-0 w-100 h-100" />

            {/* Loading */}
            <AnimatePresence>
                {!mapLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ background: 'var(--nl-bg)', zIndex: 10 }}
                    >
                        <div className="text-center">
                            <div className="spinner-border text-info spinner-border-sm mb-2" role="status" />
                            <p className="text-muted small mb-0" style={{ fontFamily: 'monospace' }}>
                                Initializing map engine...
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hover tooltip */}
            <AnimatePresence>
                {hoveredMarker && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="position-absolute bottom-0 start-50 translate-middle-x mb-3"
                        style={{ zIndex: 20, pointerEvents: 'none' }}
                    >
                        <div className="map-overlay d-flex align-items-center gap-2 px-3 py-2">
                            <span className="dot" style={{ background: hoveredMarker.color, width: 10, height: 10 }} />
                            <div>
                                <div className="fw-semibold small">{hoveredMarker.title}</div>
                                <div className="text-muted" style={{ fontSize: 11 }}>{hoveredMarker.description?.slice(0, 50)}</div>
                            </div>
                            {hoveredMarker.type === '360' && (
                                <span className="badge badge-accent ms-2" style={{ fontSize: 10 }}>
                                    <Eye size={10} className="me-1" />360°
                                </span>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Coords */}
            {interactive && mapLoaded && (
                <div className="position-absolute bottom-0 end-0 m-3" style={{ zIndex: 10 }}>
                    <div className="map-overlay d-flex align-items-center gap-1" style={{ fontSize: 10, fontFamily: 'monospace' }}>
                        <Navigation size={10} className="text-muted" />
                        <span className="text-muted">
                            {config?.center?.[1]?.toFixed(4)}°N, {config?.center?.[0]?.toFixed(4)}°E
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
