// src/components/Results.tsx
import React from "react";
import { Table, Spinner } from "react-bootstrap";
import type { Player } from "../types/player";
import { useNavigate } from "react-router-dom";

export interface ResultsProps {
    players: Player[];
    isLoading: boolean;
    hasNoMatches: boolean;
}

const Results: React.FC<ResultsProps> = ({ players, isLoading, hasNoMatches }) => {
    const nav = useNavigate();

    if (isLoading)
        return (
            <div className="content d-flex justify-content-center align-items-center m-4">
                <Spinner animation="border" />
            </div>
        );

    if (hasNoMatches) return <p className="text-center mt-4">No players match your criteria.</p>;

    return (
        <div className="content my-4">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Club</th>
                        <th>Position</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((p) => (
                        <tr key={p.player_id} onClick={() => nav(`/player/${p.player_id}`)} style={{ cursor: "pointer" }}>
                            <td>{p.name}</td>
                            <td>{p.club}</td>
                            <td>{p.position}</td>
                            <td>{p.age}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Results;
