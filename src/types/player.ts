// /types/player.ts

export interface HeatmapThirdPercentages {
    defensive_third: number;
    middle_third: number;
    attacking_third: number;
}
export interface HeatmapPoint {
    x: number; // 0–100% across pitch
    y: number; // 0–100% down pitch
    value: number; // 0–1 intensity
}

export interface AttackingCreativityMetrics {
    goals_per_90: number;
    assists_per_90: number;
    xG: number;
    xA: number;
    key_passes_per_90: number;
    progressive_passes_per_90: number;
    dribbles_completed_per_90: number;
    progressive_carries_per_90: number;
}

export interface DefensiveContributionMetrics {
    tackles_won_per_90: number;
    interceptions_per_90: number;
    pressures_per_90: number;
    clearances_per_90: number;
    aerial_duels_won_per_90: number;
}

export interface PhysicalEfficiencyMetrics {
    pass_completion_pct: number;
    turnovers_per_90: number;
    distance_covered_km_per_90: number;
    sprints_per_90: number;
    top_speed_kmh: number;
    heatmap_third_percentages: HeatmapThirdPercentages;
}

export interface PlayerMetrics {
    attacking_creativity: AttackingCreativityMetrics;
    defensive_contribution: DefensiveContributionMetrics;
    physical_efficiency: PhysicalEfficiencyMetrics;
}

export interface Player {
    player_id: string;
    name: string;
    position: string;
    season: string;
    age: number;
    club: string;
    contract_length: number; // years remaining on contract
    salary: number; // annual salary in currency units
    totalgoals: number;
    totalcaps: number;
    scout_summary: string;
    metrics: PlayerMetrics;
    img: string;
    heatmap_points?: HeatmapPoint[];
}

export type Players = Player[];
