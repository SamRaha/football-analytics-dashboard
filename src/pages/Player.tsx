// src/pages/Player.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { Player } from "../types/player";
import "./Player.scss";
import StatsTables from "../components/StatTables";
import GradientHeatMap from "../components/GradientHeatMap";
import TouchHeatMapRecharts from "../components/TouchHeatMapRecharts";
import { getPlayersWithHeat } from "../utils/augmentPlayersWithHeat";
import StatsBarChart from "../components/StatsBarChart";

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
}

const Player: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const qc = useQueryClient();

    // 1. fetch raw players
    const raw = qc.getQueryData<Player[]>(["players"]) ?? [];
    // 2. augment with heatmap_points
    const all = getPlayersWithHeat(raw, 80);
    // 3. find the one we want
    const player = all.find((p) => p.player_id === id);

    useEffect(() => {
        if (!player) navigate("/", { replace: true });
    }, [player, navigate]);

    // responsive sizing
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < 768;
    const baseWidth = 400;
    const mapWidth = isMobile ? windowWidth - 48 : baseWidth;
    const mapHeight = mapWidth / 1.6;

    if (!player) return null;

    return (
        <div className="player-page">
            <Link to="/" className="header">
                <div className="back-link">← Back to search</div>
            </Link>

            <div>
                <div className="player-info-background">
                    <div className="player-info">
                        <div className="col-image">
                            <img className="player-image" src={player.img} alt={`${player.name} profile`} onError={(e) => (e.currentTarget.src = "/images/placeholder.png")} />
                            <h5 className="player-name text-nowrap">{player.name}</h5>
                            <p className="m-0 pt-2 ">{player.position}</p>
                        </div>

                        <div className="col-stats">
                            <p>
                                <strong>Age:</strong> {player.age}
                            </p>
                            <p>
                                <strong>Goals:</strong> {player.totalgoals}
                            </p>
                            <p>
                                <strong>Caps:</strong> {player.totalcaps}
                            </p>
                        </div>

                        <div className="col-contract">
                            <p>
                                <strong>Contracted to</strong> {player.club}
                            </p>
                            <p>
                                <strong>Salary:</strong> £{player.salary.toLocaleString()} Annually
                            </p>
                        </div>
                        <div className="col-scout">
                            <div className="player-summary">
                                <strong>Scout Summary</strong>
                                <div className="mb-1" />
                                <p>{player.scout_summary}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-container">
                <div className="stats">
                    <StatsTables metrics={player.metrics} />
                    <div className="graphs d-flex flex-wrap">
                        <div className="heatmaps">
                            <div className="gradient-container">
                                <h5>Pitch Thirds Occupancy (Gradient)</h5>
                                <GradientHeatMap width={mapWidth} height={mapHeight} heatmapThirdPercentages={player.metrics.physical_efficiency.heatmap_third_percentages} />
                            </div>

                            <div className="touch-container">
                                <h5>Touch Intensity Heat Map</h5>
                                <TouchHeatMapRecharts width={mapWidth} height={mapHeight} player={player} />
                            </div>
                        </div>
                        <div className="barchart-container">
                            <StatsBarChart player={player} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
