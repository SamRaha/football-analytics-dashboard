// src/components/GradientHeatMap.tsx
import React from "react";
import { HeatmapThirdPercentages } from "../types/player";
import "./GradientHeatMap.scss";

interface Props {
    width?: number;
    height?: number;
    heatmapThirdPercentages: HeatmapThirdPercentages;
}

const GradientHeatMap: React.FC<Props> = ({ width = 600, height = 400, heatmapThirdPercentages: { defensive_third, middle_third, attacking_third } }) => {
    // convert to 0–1
    const def = defensive_third / 100;
    const mid = middle_third / 100;
    const att = attacking_third / 100;

    // exact thirds of the pitch
    const third = 100 / 3; // ~33.3333
    const stop1 = third; // end of defensive third
    const stop2 = third * 2; // end of middle third

    const gradient = `
    linear-gradient(
      to right,
      rgba(0,255,0,${def})   0%,
      rgba(0,255,0,${def})  ${stop1}%,
      rgba(0,255,0,${mid})  ${stop1}%,
      rgba(0,255,0,${mid})  ${stop2}%,
      rgba(0,255,0,${att})  ${stop2}%,
      rgba(0,255,0,${att}) 100%
    )
  `;

    return (
        <div className="heatmap-container" style={{ width, height }}>
            <div className="heatmap-overlay" style={{ background: gradient }} />
        </div>
    );
};

export default GradientHeatMap;
