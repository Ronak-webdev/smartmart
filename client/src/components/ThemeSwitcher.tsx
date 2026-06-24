import { useState, useEffect, useRef } from "react";
import { PaletteIcon, XIcon, RotateCcwIcon } from "lucide-react";

const presets = [
  {
    name: "Royal Purple",
    colors: {
      "--color-app-green": "#4c1d95",
      "--color-app-green-light": "#6d28d9",
      "--color-app-green-lighter": "#8b5cf6",
      "--color-app-orange": "#e11d48",
      "--color-app-orange-dark": "#be123c",
    },
  },
  {
    name: "Deep Teal",
    colors: {
      "--color-app-green": "#0f766e",
      "--color-app-green-light": "#0d9488",
      "--color-app-green-lighter": "#14b8a6",
      "--color-app-orange": "#f43f5e",
      "--color-app-orange-dark": "#e11d48",
    },
  },
  {
    name: "Emerald",
    colors: {
      "--color-app-green": "#059669",
      "--color-app-green-light": "#10b981",
      "--color-app-green-lighter": "#34d399",
      "--color-app-orange": "#ea580c",
      "--color-app-orange-dark": "#c2410c",
    },
  },
];

const colorSlots = [
  { key: "--color-app-green", label: "Primary" },
  { key: "--color-app-green-light", label: "Primary Light" },
  { key: "--color-app-green-lighter", label: "Accent Light" },
  { key: "--color-app-orange", label: "CTA / Deals" },
  { key: "--color-app-orange-dark", label: "CTA Hover" },
];

const DEFAULT_COLORS = presets[0].colors;

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState<Record<string, string>>(DEFAULT_COLORS);
  const [activePreset, setActivePreset] = useState("Royal Purple");
  const pickerRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const saved = localStorage.getItem("smartmart_theme_colors_v2");
    const savedPreset = localStorage.getItem("smartmart_theme_preset_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        applyColors(parsed, false);
        setColors(parsed);
        if (savedPreset) setActivePreset(savedPreset);
        else setActivePreset("");
      } catch {}
    } else {
      applyColors(DEFAULT_COLORS, false);
    }
  }, []);

  const applyColors = (newColors: Record<string, string>, save = true) => {
    Object.entries(newColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    if (save) {
      localStorage.setItem("smartmart_theme_colors_v2", JSON.stringify(newColors));
    }
  };

  const selectPreset = (preset: typeof presets[0]) => {
    setColors(preset.colors);
    setActivePreset(preset.name);
    applyColors(preset.colors);
    localStorage.setItem("smartmart_theme_preset_v2", preset.name);
  };

  const handleColorChange = (key: string, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    setActivePreset("");
    applyColors(newColors);
    localStorage.setItem("smartmart_theme_preset_v2", "");
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-app-border">
      <div className="flex items-center gap-2 mb-4">
        <PaletteIcon className="size-5 text-app-green" />
        <h2 className="text-lg font-semibold text-zinc-900">Theme Settings</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Presets */}
        <div>
          <h4 className="text-xs font-bold text-app-text-light uppercase tracking-widest mb-3">
            Presets
          </h4>
          <div className="space-y-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => selectPreset(preset)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activePreset === preset.name
                    ? "bg-app-green/10 text-app-green ring-1 ring-app-green"
                    : "hover:bg-slate-50 text-app-text-light border border-app-border"
                }`}
              >
                <div className="flex -space-x-1.5">
                  {Object.values(preset.colors).slice(0, 3).map((c, i) => (
                    <span key={i} className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
                  ))}
                </div>
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Individual Color Pickers */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-app-text-light uppercase tracking-widest">
              Custom Colors
            </h4>
            <button
              onClick={() => selectPreset(presets[0])}
              className="text-xs text-app-text-light hover:text-app-text flex items-center gap-1.5 font-medium"
              title="Reset"
            >
              <RotateCcwIcon className="size-3.5" /> Reset
            </button>
          </div>
          <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-app-border/50">
            {colorSlots.map((slot) => (
              <div key={slot.key} className="flex items-center justify-between">
                <span className="text-sm text-zinc-700 font-medium">{slot.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-400 uppercase">{colors[slot.key]}</span>
                  <button
                    onClick={() => pickerRefs.current[slot.key]?.click()}
                    className="w-8 h-8 rounded-lg border-2 border-white ring-1 ring-app-border shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: colors[slot.key] || "#000" }}
                  />
                </div>
                <input
                  ref={(el) => { pickerRefs.current[slot.key] = el; }}
                  type="color"
                  value={colors[slot.key] || "#000000"}
                  onChange={(e) => handleColorChange(slot.key, e.target.value)}
                  className="sr-only"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
