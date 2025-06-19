// src/pages/Player.tsx
import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { Player } from "../types/player";
import "./Player.scss";
import StatsTables from "../components/StatTables";
import GradientHeatMap from "../components/GradientHeatMap";
import FootballHeatMapRecharts from "../components/FootballHeatMapRecharts";
import { getPlayersWithHeat } from "../utils/augmentPlayersWithHeat";

const Player: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const qc = useQueryClient();

    // 1. fetch raw players
    const raw = qc.getQueryData<Player[]>(["players"]) ?? [];

    // 2. augment with heatmap_points
    const all = getPlayersWithHeat(raw, /*pointCount=*/ 200);

    // 3. find the one we want
    const player = all.find((p) => p.player_id === id);
    console.log("player: ", player);

    useEffect(() => {
        if (!player) navigate("/", { replace: true });
    }, [player, navigate]);

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

                    <GradientHeatMap width={800} height={500} heatmapThirdPercentages={player.metrics.physical_efficiency.heatmap_third_percentages} />

                    {/* now pass the player */}
                    <FootballHeatMapRecharts width={800} height={500} player={player} />
                </div>
            </div>
        </div>
    );
};

export default Player;
