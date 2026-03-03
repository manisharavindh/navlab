import { useState } from 'react';
import {
    Layers, Eye, EyeOff, MapPin, Camera, Info, DoorOpen, Car,
    Utensils, ArrowUpDown, ChevronDown, ChevronRight, Plus,
    Trash2, Settings, Search, X
} from 'lucide-react';
import { markerLibrary } from '../data/mockData';

const iconMap = {
    camera: Camera, info: Info, 'door-open': DoorOpen, car: Car,
    utensils: Utensils, 'arrow-up-down': ArrowUpDown, stairs: ArrowUpDown, bath: Info,
};

export default function EditorSidebar({
    layers = [], markers = [], onToggleLayer, onMarkerSelect,
    onMarkerDragStart, selectedMarkerId, onDeleteMarker,
}) {
    const [activeTab, setActiveTab] = useState('layers');
    const [searchQuery, setSearchQuery] = useState('');
    const [sections, setSections] = useState({ layers: true, markers: true, library: true });

    const toggle = (s) => setSections((p) => ({ ...p, [s]: !p[s] }));

    const filtered = markers.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="editor-sidebar d-flex flex-column h-100">
            {/* Header */}
            <div className="p-3 border-bottom" style={{ borderColor: 'var(--nl-border) !important' }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                    <Settings size={14} className="text-muted" />
                    <span className="fw-bold small">Editor Panel</span>
                </div>

                <div className="d-flex gap-1 p-1 rounded" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <button
                        className={`sidebar-tab flex-fill d-flex align-items-center justify-content-center gap-1 ${activeTab === 'layers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('layers')}
                    >
                        <Layers size={13} /> Layers
                    </button>
                    <button
                        className={`sidebar-tab flex-fill d-flex align-items-center justify-content-center gap-1 ${activeTab === 'markers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('markers')}
                    >
                        <MapPin size={13} /> Markers
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow-1 overflow-auto p-3">
                {activeTab === 'layers' ? (
                    <div>
                        <button
                            onClick={() => toggle('layers')}
                            className="btn btn-sm w-100 d-flex align-items-center justify-content-between p-2 text-start border-0"
                        >
                            <span className="section-label">Floor Plans</span>
                            {sections.layers ? <ChevronDown size={14} className="text-muted" /> : <ChevronRight size={14} className="text-muted" />}
                        </button>

                        {sections.layers && (
                            <div className="mt-1">
                                {layers.map((layer) => (
                                    <div
                                        key={layer.id}
                                        className="layer-item d-flex align-items-center gap-2"
                                        onClick={() => onToggleLayer?.(layer.id)}
                                    >
                                        <Layers size={14} className="text-info" />
                                        <span className="flex-grow-1 small">{layer.name}</span>
                                        {layer.visible
                                            ? <Eye size={14} className="text-info" />
                                            : <EyeOff size={14} className="text-muted" />
                                        }
                                    </div>
                                ))}
                                <button className="btn btn-sm w-100 d-flex align-items-center gap-2 p-2 text-muted mt-1 border-0">
                                    <Plus size={14} /> <span className="small">Add layer</span>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {/* Search */}
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text bg-transparent border-secondary">
                                <Search size={13} className="text-muted" />
                            </span>
                            <input
                                type="text"
                                className="form-control bg-transparent border-secondary text-light"
                                placeholder="Search markers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="btn btn-outline-secondary border-secondary" onClick={() => setSearchQuery('')}>
                                    <X size={13} />
                                </button>
                            )}
                        </div>

                        {/* Active markers */}
                        <button
                            onClick={() => toggle('markers')}
                            className="btn btn-sm w-100 d-flex align-items-center justify-content-between p-2 text-start border-0"
                        >
                            <span className="section-label">Active Markers ({filtered.length})</span>
                            {sections.markers ? <ChevronDown size={14} className="text-muted" /> : <ChevronRight size={14} className="text-muted" />}
                        </button>

                        {sections.markers && (
                            <div className="mt-1">
                                {filtered.map((m) => (
                                    <div
                                        key={m.id}
                                        className={`marker-item d-flex align-items-center gap-2 ${selectedMarkerId === m.id ? 'active' : ''}`}
                                        onClick={() => onMarkerSelect?.(m)}
                                    >
                                        <span className="dot" style={{ background: m.color }} />
                                        <div className="flex-grow-1 overflow-hidden">
                                            <div className="small fw-medium text-truncate">{m.title}</div>
                                            <div className="text-muted" style={{ fontSize: 10 }}>
                                                {m.type === '360' ? '360° View' : 'Info Point'}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDeleteMarker?.(m.id); }}
                                            className="btn btn-sm p-1 text-muted"
                                            style={{ opacity: 0.5 }}
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Marker library */}
                        <button
                            onClick={() => toggle('library')}
                            className="btn btn-sm w-100 d-flex align-items-center justify-content-between p-2 text-start border-0 mt-3"
                        >
                            <span className="section-label">Marker Library</span>
                            {sections.library ? <ChevronDown size={14} className="text-muted" /> : <ChevronRight size={14} className="text-muted" />}
                        </button>

                        {sections.library && (
                            <>
                                <div className="row g-2 mt-1">
                                    {markerLibrary.map((lib) => {
                                        const Icon = iconMap[lib.icon] || MapPin;
                                        return (
                                            <div key={lib.id} className="col-6">
                                                <div
                                                    className="marker-lib-item"
                                                    draggable
                                                    onDragStart={(e) => {
                                                        e.dataTransfer.setData('marker-type', JSON.stringify(lib));
                                                        onMarkerDragStart?.(lib);
                                                    }}
                                                >
                                                    <Icon size={16} style={{ color: lib.color }} className="mb-1" />
                                                    <div className="text-muted" style={{ fontSize: 10 }}>{lib.name}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-muted text-center mt-2" style={{ fontSize: 10 }}>
                                    Drag markers onto the map
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-3 py-2 border-top" style={{ borderColor: 'var(--nl-border) !important' }}>
                <div className="d-flex align-items-center gap-2" style={{ fontSize: 10, fontFamily: 'monospace' }}>
                    <span className="dot bg-success" style={{ width: 6, height: 6 }} />
                    <span className="text-muted">Editor Active</span>
                </div>
            </div>
        </div>
    );
}
