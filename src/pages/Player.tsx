import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { Player } from "../types/player";
import "./Player.scss";
import StatsTables from "../components/StatTables";

const Player: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const qc = useQueryClient();
    const all = qc.getQueryData<Player[]>(["players"]) ?? [];
    const player = all.find((p) => p.player_id === id);

    useEffect(() => {
        if (!player) navigate("/", { replace: true });
    }, [player, navigate]);

    if (!player) return null;

    return (
        <div className="player-page">
            <div className="content">
                <Link to="/" className="back-link">
                    ← Back to search
                </Link>
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
                <StatsTables metrics={player.metrics} />
            </div>
        </div>
    );
};

export default Player;
