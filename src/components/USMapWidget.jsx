import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, DollarSign, AlertTriangle, Layers, Globe, Map as MapIcon, Filter } from 'lucide-react';

// Refined Grid Layout for optimal "Heatmap" feel
const STATE_LAYOUT = [
    { id: 'WA', x: 1, y: 1 }, { id: 'ID', x: 2, y: 2 }, { id: 'MT', x: 3, y: 1 }, { id: 'ND', x: 4, y: 1 }, { id: 'MN', x: 5, y: 1 }, { id: 'WI', x: 6, y: 2 }, { id: 'MI', x: 7, y: 2 }, { id: 'NY', x: 9, y: 2 }, { id: 'MA', x: 10, y: 2 },
    { id: 'OR', x: 1, y: 2 }, { id: 'NV', x: 2, y: 3 }, { id: 'WY', x: 3, y: 2 }, { id: 'SD', x: 4, y: 2 }, { id: 'IA', x: 5, y: 3 }, { id: 'IL', x: 6, y: 3 }, { id: 'IN', x: 7, y: 3 }, { id: 'OH', x: 8, y: 3 }, { id: 'PA', x: 9, y: 3 }, { id: 'NJ', x: 10, y: 3 }, { id: 'CT', x: 10, y: 2.5 },
    { id: 'CA', x: 1, y: 4 }, { id: 'UT', x: 2, y: 4 }, { id: 'CO', x: 3, y: 4 }, { id: 'NE', x: 4, y: 3 }, { id: 'MO', x: 5, y: 4 }, { id: 'KY', x: 7, y: 4 }, { id: 'WV', x: 8, y: 4 }, { id: 'VA', x: 9, y: 4 }, { id: 'MD', x: 9.5, y: 4 },
    { id: 'AZ', x: 2, y: 5 }, { id: 'NM', x: 3, y: 5 }, { id: 'KS', x: 4, y: 4 }, { id: 'AR', x: 5, y: 5 }, { id: 'TN', x: 7, y: 5 }, { id: 'NC', x: 9, y: 5 }, { id: 'SC', x: 8, y: 5 },
    { id: 'OK', x: 4, y: 5 }, { id: 'LA', x: 5, y: 6 }, { id: 'MS', x: 6, y: 6 }, { id: 'AL', x: 7, y: 6 }, { id: 'GA', x: 8, y: 6 },
    { id: 'TX', x: 4, y: 6 }, { id: 'FL', x: 8, y: 7 },
    { id: 'AK', x: 0, y: 0 }, { id: 'HI', x: 2, y: 7 },
    { id: 'ME', x: 11, y: 1 }, { id: 'VT', x: 10, y: 1.5 }, { id: 'NH', x: 11, y: 2 }, { id: 'RI', x: 11, y: 2.5 }, { id: 'DE', x: 10, y: 3.5 }, { id: 'DC', x: 9.5, y: 4.5 }
];

const generateStateData = (metric) => {
    return STATE_LAYOUT.reduce((acc, state) => {
        let value, intensity; // Intensity 0.0 - 1.0

        if (metric === 'revenue') {
            const raw = Math.floor(Math.random() * 500) + 100;
            value = raw;
            intensity = (raw - 100) / 500;
        } else if (metric === 'denials') {
            const raw = (Math.random() * 5 + 1);
            value = raw.toFixed(1);
            intensity = (raw - 1) / 5;
        } else {
            const raw = Math.floor(Math.random() * 2000) + 500;
            value = raw;
            intensity = (raw - 500) / 2000;
        }

        acc[state.id] = { value, intensity: Math.min(1, Math.max(0, intensity)) };
        return acc;
    }, {});
};

const VIEW_OPTIONS = [
    { id: 'revenue', label: 'Revenue', icon: DollarSign, color: 'text-cyan-400', theme: 'cyan' },
    { id: 'denials', label: 'Denials', icon: AlertTriangle, color: 'text-rose-400', theme: 'rose' },
    { id: 'volume', label: 'Volume', icon: Activity, color: 'text-violet-400', theme: 'violet' }
];

const USMapWidget = () => {
    const [currentView, setCurrentView] = useState('revenue');
    const [hoveredState, setHoveredState] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [viewMode, setViewMode] = useState('2d'); // Default to 2D for heatmap clarity

    // Derived Rotation
    const rotation = viewMode === '3d' ? { x: 50, z: 0 } : { x: 0, z: 0 };

    const mapData = useMemo(() => ({
        revenue: generateStateData('revenue'),
        denials: generateStateData('denials'),
        volume: generateStateData('volume')
    }), []);

    const activeData = mapData[currentView] || {};
    const theme = VIEW_OPTIONS.find(v => v.id === currentView)?.theme || 'cyan';

    // Heatmap Color Logic - Enhanced for "Glass" look
    const getHeatmapStyle = (intensity, theme) => {
        // Higher base opacity for glass effect, plus intensity
        const opacity = 0.2 + (intensity * 0.6);

        const colors = {
            cyan: `rgba(6, 182, 212, ${opacity})`,   // cyan-500
            rose: `rgba(244, 63, 94, ${opacity})`,    // rose-500
            violet: `rgba(139, 92, 246, ${opacity})`  // violet-500
        };

        const borderColors = {
            cyan: `rgba(34, 211, 238, ${0.4 + intensity})`,
            rose: `rgba(251, 113, 133, ${0.4 + intensity})`,
            violet: `rgba(167, 139, 250, ${0.4 + intensity})`
        };

        return {
            background: colors[theme],
            borderColor: borderColors[theme],
            boxShadow: intensity > 0.6 ? `0 0 ${intensity * 15}px ${colors[theme]}` : 'none',
            backdropFilter: 'blur(2px)' // Glass blur on the cell itself
        };
    };

    return (
        <div className="relative rounded-3xl overflow-hidden min-h-[650px] flex flex-col shadow-2xl group">

            {/* 1. REAL SATELLITE BACKGROUND LAYER */}
            {/* 1. REAL SATELLITE BACKGROUND LAYER */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105 group-hover:scale-110 brightness-125 saturate-110"
                style={{
                    backgroundImage: `url('https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57752/land_shallow_topo_2048.jpg')`,
                    // Approximating US view on the world map
                    backgroundPosition: '18% 30%',
                    backgroundSize: '400%'
                }}
            />

            {/* 2. GLASS OVERLAY LAYER (The "Glass" effect) - Lighter for visibility */}
            <div className="absolute inset-0 z-0 bg-slate-900/30 backdrop-blur-[2px] bg-gradient-to-t from-slate-950 via-slate-900/20 to-slate-900/60"></div>

            {/* 3. GRID OVERLAY (SUBTLE) */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Control Bar */}
            <div className="relative z-20 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8 bg-black/20 backdrop-blur-md p-4 m-6 rounded-2xl border border-white/10 shadow-lg">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight mb-2">
                        <Layers className={`w-5 h-5 text-${theme}-500`} />
                        Geo-Spatial Intelligence
                    </h3>
                    <div className="flex gap-2">
                        {VIEW_OPTIONS.map((view) => (
                            <button
                                key={view.id}
                                onClick={() => setCurrentView(view.id)}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative border
                                    ${currentView === view.id ? 'text-white bg-white/10 border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'text-slate-400 border-transparent hover:text-white'}
                                `}
                            >
                                <view.icon className={`w-3 h-3 ${currentView === view.id ? view.color : ''}`} />
                                {view.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
                        <button onClick={() => setViewMode('2d')} className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${viewMode === '2d' ? 'bg-white/20 text-white' : 'text-slate-400'}`}>2D Heatmap</button>
                        <button onClick={() => setViewMode('3d')} className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${viewMode === '3d' ? 'bg-white/20 text-white' : 'text-slate-400'}`}>3D City</button>
                    </div>
                </div>
            </div>

            {/* Map Stage */}
            <div className="flex-1 relative flex items-center justify-center perspective-[1200px] overflow-hidden z-10">
                <motion.div
                    className="relative w-[800px] h-[500px]"
                    animate={{ rotateX: rotation.x, rotateZ: rotation.z }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* US Outline Guide (Optional: Keeping it subtle for distinct boundaries) */}
                    <div
                        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_%28states_only%29.svg')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            filter: 'invert(1)',
                            transform: 'translateZ(-10px) scale(1.15)'
                        }}
                    />

                    {/* The Grid Heatmap */}
                    <div className="absolute inset-0 p-10">
                        {STATE_LAYOUT.map((state) => {
                            const data = activeData[state.id];
                            const style = getHeatmapStyle(data.intensity, theme);
                            const isHovered = hoveredState === state.id;

                            // Grid Positioning
                            const leftPct = (state.x / 13) * 100; // refined grid size
                            const topPct = (state.y / 9) * 100;

                            return (
                                <motion.div
                                    key={state.id}
                                    className="absolute"
                                    style={{
                                        left: `${leftPct}%`,
                                        top: `${topPct}%`,
                                        width: '4.5%', // Substantial size for heatmap effect
                                        height: '6.5%',
                                        transformStyle: 'preserve-3d'
                                    }}
                                    onMouseEnter={() => setHoveredState(state.id)}
                                    onMouseLeave={() => setHoveredState(null)}
                                >
                                    {/* The Heatmap Cell (Glassy Square) */}
                                    <motion.div
                                        className={`
                                            w-full h-full rounded-md border flex items-center justify-center transition-all cursor-pointer
                                            ${isHovered ? 'scale-125 z-50 ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' : ''}
                                        `}
                                        style={{
                                            backgroundColor: style.background,
                                            borderColor: style.borderColor,
                                            boxShadow: style.boxShadow,
                                            backdropFilter: style.backdropFilter
                                        }}
                                    >
                                        <span className="text-[9px] font-bold text-white drop-shadow-md select-none">{state.id}</span>
                                    </motion.div>

                                    {/* 3D Extrusion (Only visible in 3D Mode) */}
                                    {viewMode === '3d' && (
                                        <motion.div
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1, height: Math.max(10, data.intensity * 100) }}
                                            className="absolute bottom-0 left-0 right-0 bg-white/20 border-x border-white/10"
                                            style={{
                                                transform: 'rotateX(-90deg)',
                                                transformOrigin: 'bottom',
                                                backgroundColor: style.background,
                                                opacity: 0.6
                                            }}
                                        />
                                    )}

                                    {/* Glassy Tooltip */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                                animate={{ opacity: 1, y: viewMode === '3d' ? -50 : -30, scale: 1 }} // Higher in 3D
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="absolute left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap z-50 pointer-events-none shadow-xl"
                                                style={{ transform: viewMode === '3d' ? `rotateX(${-rotation.x}deg)` : 'none' }}
                                            >
                                                <span className="font-bold text-slate-200">{state.id}</span>: <span className="font-mono font-bold">{currentView === 'revenue' ? '$' + data.value + 'K' : data.value}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Gradient Legend */}
            <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1 z-20">
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Heatmap Intensity</span>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-500">Low</span>
                    <div className={`w-32 h-2 rounded-full bg-gradient-to-r ${theme === 'cyan' ? 'from-cyan-900 to-cyan-400' : theme === 'rose' ? 'from-rose-900 to-rose-400' : 'from-violet-900 to-violet-400'}`}></div>
                    <span className="text-[9px] text-white">High</span>
                </div>
            </div>
        </div>
    );
};

export default USMapWidget;
