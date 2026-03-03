// NavLab Mock Data — Simulates a "username" database for dynamic slugs

// Sample panoramic images (public domain / creative commons)
const PANO_IMAGES = {
    lobby: 'https://pannellum.org/images/alma.jpg',
    office: 'https://pannellum.org/images/bma-1.jpg',
    rooftop: 'https://pannellum.org/images/cerro-toco-0.jpg',
    gallery: 'https://pannellum.org/images/jfk.jpg',
};

/**
 * Map Configuration Database
 * Each entry represents a user's published map with markers, layers, and settings.
 */
export const mapConfigs = {
    lbxsuite: {
        id: 'lbxsuite',
        name: 'LBX Suite HQ',
        owner: 'LBX Suite',
        avatar: null,
        description: 'Explore the LBX Suite headquarters with interactive 360° views of every floor.',
        theme: 'dark',
        center: [78.9629, 20.5937], // India
        zoom: 16,
        pitch: 45,
        bearing: -17.6,
        style: 'mapbox://styles/mapbox/dark-v11',
        markers: [
            {
                id: 'lbx-lobby',
                type: '360',
                title: 'Main Lobby',
                description: 'The grand entrance of LBX Suite with 24/7 security and modern reception.',
                coordinates: [78.9620, 20.5940],
                color: '#00d4ff',
                panorama: PANO_IMAGES.lobby,
                hotspots: [
                    { pitch: -5, yaw: 120, text: 'Reception Desk' },
                    { pitch: 10, yaw: -60, text: 'Elevator Bay' },
                ],
            },
            {
                id: 'lbx-office',
                type: '360',
                title: 'Executive Office',
                description: 'Corner office on the 15th floor with panoramic city views.',
                coordinates: [78.9635, 20.5935],
                color: '#8b5cf6',
                panorama: PANO_IMAGES.office,
                hotspots: [
                    { pitch: -2, yaw: 80, text: 'Conference Table' },
                    { pitch: 15, yaw: 200, text: 'City Skyline View' },
                ],
            },
            {
                id: 'lbx-rooftop',
                type: '360',
                title: 'Rooftop Terrace',
                description: 'The rooftop garden with a 360° view of the skyline.',
                coordinates: [78.9625, 20.5945],
                color: '#22c55e',
                panorama: PANO_IMAGES.rooftop,
                hotspots: [
                    { pitch: 20, yaw: 0, text: 'Mountain View' },
                    { pitch: -10, yaw: 180, text: 'Solar Panels' },
                ],
            },
            {
                id: 'lbx-parking',
                type: 'info',
                title: 'Parking Garage',
                description: 'Underground parking with 200+ spaces. EV charging available.',
                coordinates: [78.9615, 20.5930],
                color: '#f59e0b',
            },
        ],
        layers: [
            { id: 'floor-1', name: 'Ground Floor', visible: true, type: 'floor-plan' },
            { id: 'floor-2', name: 'Office Floor', visible: false, type: 'floor-plan' },
            { id: 'floor-3', name: 'Rooftop', visible: false, type: 'floor-plan' },
        ],
    },

    techpark: {
        id: 'techpark',
        name: 'Silicon Tech Park',
        owner: 'TechPark Inc.',
        avatar: null,
        description: 'Navigate through the sprawling Silicon Tech Park campus.',
        theme: 'dark',
        center: [77.5946, 12.9716], // Bangalore
        zoom: 15,
        pitch: 50,
        bearing: 30,
        style: 'mapbox://styles/mapbox/dark-v11',
        markers: [
            {
                id: 'tp-entrance',
                type: '360',
                title: 'Main Gate',
                description: 'The iconic tech park entrance with biometric access control.',
                coordinates: [77.5940, 12.9720],
                color: '#00d4ff',
                panorama: PANO_IMAGES.gallery,
                hotspots: [
                    { pitch: 0, yaw: 90, text: 'Security Checkpoint' },
                    { pitch: -5, yaw: 270, text: 'Visitor Parking' },
                ],
            },
            {
                id: 'tp-cafeteria',
                type: '360',
                title: 'Food Court',
                description: 'Multi-cuisine food court with seating for 500+.',
                coordinates: [77.5950, 12.9710],
                color: '#f59e0b',
                panorama: PANO_IMAGES.lobby,
                hotspots: [
                    { pitch: -3, yaw: 45, text: 'Italian Corner' },
                    { pitch: 0, yaw: 180, text: 'Juice Bar' },
                ],
            },
            {
                id: 'tp-tower-a',
                type: 'info',
                title: 'Tower A — Engineering',
                description: '12-story building housing AI and ML teams.',
                coordinates: [77.5955, 12.9718],
                color: '#8b5cf6',
            },
            {
                id: 'tp-gym',
                type: 'info',
                title: 'Wellness Center',
                description: 'State-of-the-art gym with Olympic pool.',
                coordinates: [77.5945, 12.9705],
                color: '#22c55e',
            },
        ],
        layers: [
            { id: 'campus', name: 'Campus Overview', visible: true, type: 'floor-plan' },
            { id: 'underground', name: 'Underground', visible: false, type: 'floor-plan' },
        ],
    },

    demo: {
        id: 'demo',
        name: 'NavLab Demo Tour',
        owner: 'NavLab Team',
        avatar: null,
        description: 'A sample tour demonstrating all NavLab features.',
        theme: 'dark',
        center: [-73.9857, 40.7484], // NYC
        zoom: 16,
        pitch: 60,
        bearing: -20,
        style: 'mapbox://styles/mapbox/dark-v11',
        markers: [
            {
                id: 'demo-esb',
                type: '360',
                title: 'Empire State Building',
                description: 'The iconic NYC landmark — explore the observation deck in 360°.',
                coordinates: [-73.9857, 40.7484],
                color: '#00d4ff',
                panorama: PANO_IMAGES.rooftop,
                hotspots: [
                    { pitch: 30, yaw: 0, text: 'Antenna Spire' },
                    { pitch: -15, yaw: 120, text: 'Manhattan Skyline' },
                ],
            },
            {
                id: 'demo-park',
                type: '360',
                title: 'Bryant Park',
                description: 'A green oasis in the heart of Midtown Manhattan.',
                coordinates: [-73.9832, 40.7536],
                color: '#22c55e',
                panorama: PANO_IMAGES.lobby,
                hotspots: [
                    { pitch: 0, yaw: 90, text: 'Reading Room' },
                    { pitch: -10, yaw: 0, text: 'Fountain' },
                ],
            },
            {
                id: 'demo-station',
                type: 'info',
                title: 'Penn Station',
                description: 'Major transit hub serving Long Island Rail Road, NJ Transit, and Amtrak.',
                coordinates: [-73.9937, 40.7505],
                color: '#f59e0b',
            },
        ],
        layers: [
            { id: 'streets', name: 'Street Level', visible: true, type: 'floor-plan' },
            { id: 'subway', name: 'Subway Map', visible: false, type: 'floor-plan' },
        ],
    },
};

/**
 * Get a map configuration by slug
 */
export function getMapConfigBySlug(slug) {
    return mapConfigs[slug] || null;
}

/**
 * Get all available slugs
 */
export function getAllSlugs() {
    return Object.keys(mapConfigs);
}

/**
 * Mock user database
 */
export const mockUsers = {
    admin: {
        id: 'admin',
        name: 'Mission Control',
        email: 'admin@navlab.io',
        role: 'cto',
        avatar: null,
        maps: ['lbxsuite', 'techpark', 'demo'],
    },
};

/**
 * Marker Library — predefined marker types
 */
export const markerLibrary = [
    { id: 'panorama', name: '360° View', icon: 'camera', color: '#00d4ff', type: '360' },
    { id: 'info', name: 'Info Point', icon: 'info', color: '#8b5cf6', type: 'info' },
    { id: 'entrance', name: 'Entrance', icon: 'door-open', color: '#22c55e', type: 'info' },
    { id: 'parking', name: 'Parking', icon: 'car', color: '#f59e0b', type: 'info' },
    { id: 'food', name: 'Restaurant', icon: 'utensils', color: '#ef4444', type: 'info' },
    { id: 'elevator', name: 'Elevator', icon: 'arrow-up-down', color: '#6366f1', type: 'info' },
    { id: 'stairs', name: 'Stairs', icon: 'stairs', color: '#ec4899', type: 'info' },
    { id: 'restroom', name: 'Restroom', icon: 'bath', color: '#14b8a6', type: 'info' },
];
