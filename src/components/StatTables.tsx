// src/components/StatsTables.tsx
import React from "react";
import { PlayerMetrics } from "../types/player";

interface StatsTablesProps {
    metrics: PlayerMetrics;
}

// Convert snake_case keys to Title Case labels
const formatLabel = (key: string): string => key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// Randomly returns 'red', 'white', or 'green'
const getRandomColor = (): string => {
    const colors = ["red", "white", "#02ae33 "];
    return colors[Math.floor(Math.random() * colors.length)];
};

const StatsTables: React.FC<StatsTablesProps> = ({ metrics }) => {
    const { attacking_creativity, defensive_contribution, physical_efficiency } = metrics;

    // Exclude heatmap data from physical metrics
    const physicalEntries = Object.entries(physical_efficiency).filter(([key]) => key !== "heatmap_third_percentages");

    return (
        <div className="row mt-4">
            {/* Attacking */}
            <div className="col-12 col-md-4 mb-3">
                <div className="table-responsive">
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Attacking</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(attacking_creativity).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{formatLabel(key)}</td>
                                    <td style={{ color: getRandomColor() }}>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Defensive */}
            <div className="col-12 col-md-4 mb-3">
                <div className="table-responsive">
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Defensive</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(defensive_contribution).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{formatLabel(key)}</td>
                                    <td style={{ color: getRandomColor() }}>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Physical */}
            <div className="col-12 col-md-4 mb-3">
                <div className="table-responsive">
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Physical</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {physicalEntries.map(([key, value]) => (
                                <tr key={key}>
                                    <td>{formatLabel(key)}</td>
                                    <td style={{ color: getRandomColor() }}>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StatsTables;
