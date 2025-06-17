// src/api/productService.test.ts
import { apiClient } from "./axiosConfig";
import { fetchProducts } from "./playerService";
import type { Player } from "../types/player";

jest.mock("./axiosConfig");
const mockedClient = apiClient as jest.Mocked<typeof apiClient>;

describe("fetchProducts (player data)", () => {
    it("returns the API’s data array of players", async () => {
        const mockPlayers: Player[] = [
            {
                player_id: "tammy-abraham-2024-25",
                name: "Tammy Abraham",
                position: "ST",
                season: "2024/25",
                metrics: {
                    attacking_creativity: {
                        goals_per_90: 0.56,
                        assists_per_90: 0.15,
                        xG: 0.48,
                        xA: 0.12,
                        key_passes_per_90: 0.9,
                        progressive_passes_per_90: 0.6,
                        dribbles_completed_per_90: 0.4,
                        progressive_carries_per_90: 1.2,
                    },
                    defensive_contribution: {
                        tackles_won_per_90: 0.3,
                        interceptions_per_90: 0.2,
                        pressures_per_90: 7.4,
                        clearances_per_90: 0.2,
                        aerial_duels_won_per_90: 1.1,
                    },
                    physical_efficiency: {
                        pass_completion_pct: 74.5,
                        turnovers_per_90: 2.1,
                        distance_covered_km_per_90: 9.8,
                        sprints_per_90: 18.5,
                        top_speed_kmh: 33.9,
                        heatmap_third_percentages: {
                            defensive_third: 5.0,
                            middle_third: 20.0,
                            attacking_third: 75.0,
                        },
                    },
                },
            },
        ];

        mockedClient.get.mockResolvedValue({
            data: { data: mockPlayers },
        });

        const result = await fetchProducts();
        expect(result).toEqual(mockPlayers);
        expect(mockedClient.get).toHaveBeenCalledWith("/players-data.json");
    });

    it("propagates errors", async () => {
        mockedClient.get.mockRejectedValue(new Error("Network error"));

        await expect(fetchProducts()).rejects.toThrow("Network error");
        expect(mockedClient.get).toHaveBeenCalledWith("/players-data.json");
    });
});
