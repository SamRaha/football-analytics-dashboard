// src/components/StatsBarChart.tsx
import React, { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Player, AttackingCreativityMetrics, DefensiveContributionMetrics, PhysicalEfficiencyMetrics } from "../types/player";
import "./StatsBarChart.scss";

interface Option {
    label: string;
    category: "attacking_creativity" | "defensive_contribution" | "physical_efficiency";
    key: string;
}

interface Props {
    player: Player;
}

const generateMockSeries = (base: number, length = 5) =>
    Array.from({ length }, (_, i) => ({
        week: `G${i + 1}`,
        value: parseFloat((base * (0.8 + Math.random() * 0.4)).toFixed(2)),
    }));

const StatsBarChart: React.FC<Props> = ({ player }) => {
    const options: Option[] = useMemo(() => {
        const atk = Object.keys(player.metrics.attacking_creativity) as Array<keyof AttackingCreativityMetrics>;
        const def = Object.keys(player.metrics.defensive_contribution) as Array<keyof DefensiveContributionMetrics>;
        const phys = Object.keys(player.metrics.physical_efficiency).filter((k) => k !== "heatmap_third_percentages") as Array<keyof PhysicalEfficiencyMetrics>;

        return [
            ...atk.map((k) => ({ label: `Attacking ${k.replace(/_/g, " ")}`, category: "attacking_creativity", key: k })),
            ...def.map((k) => ({ label: `Defensive ${k.replace(/_/g, " ")}`, category: "defensive_contribution", key: k })),
            ...phys.map((k) => ({ label: `Physical ${k.replace(/_/g, " ")}`, category: "physical_efficiency", key: k })),
        ];
    }, [player]);

    const [selected, setSelected] = useState<Option>(options[0]);

    const data = useMemo(() => {
        const base = (player.metrics as any)[selected.category][selected.key] as number;
        return generateMockSeries(base);
    }, [player, selected]);

    return (
        <div className="stats-barchart">
            <h5 className="bar-chart-label">5-Game Trend: {selected.label}</h5>
            <select
                className="chart-select"
                value={selected.key}
                onChange={(e) => {
                    const opt = options.find((o) => o.key === e.target.value);
                    if (opt) setSelected(opt);
                }}
            >
                {options.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="week" label={{ value: "Match", position: "insideBottom", offset: -20 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--blue)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatsBarChart;
