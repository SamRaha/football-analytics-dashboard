// src/components/TouchHeatMapRecharts.tsx
import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, Tooltip } from "recharts";
import "./TouchHeatMapRecharts.scss";
import pitch from "../assets/football-pitch.svg";
import { Player } from "../types/player";

interface Props {
    width?: number;
    height?: number;
    player: Player;
}

const TouchHeatMapRecharts: React.FC<Props> = ({ width = 800, height = 500, player }) => {
    // now top-level, not buried in metrics
    const heatmapData = player.heatmap_points || [];

    return (
        <div className="recharts-heatmap" style={{ width, height }}>
            <img src={pitch} className="pitch-bg" alt="pitch outline" />
            <ScatterChart width={width} height={height} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
                <YAxis type="number" dataKey="y" domain={[0, 100]} hide reversed />
                <Tooltip cursor={{ stroke: "rgba(0,0,0,0.1)" }} formatter={(_, __, props) => [`${(props.payload.value * 100).toFixed(1)}%`, "Intensity"]} />
                <Scatter data={heatmapData}>
                    {heatmapData.map((pt, i) => (
                        <Cell key={i} fill={`rgba(0,200,0,${pt.value})`} />
                    ))}
                </Scatter>
            </ScatterChart>
        </div>
    );
};

export default TouchHeatMapRecharts;
