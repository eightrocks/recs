'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [players, setPlayers] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [heightMin, setHeightMin] = useState(60);
  const [heightMax, setHeightMax] = useState(84);
  const [seasonMin, setSeasonMin] = useState(2000);
  const [seasonMax, setSeasonMax] = useState(2023);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [verticalMin, setVerticalMin] = useState(20);
  const [verticalMax, setVerticalMax] = useState(50);
  const [standingVerticalMin, setStandingVerticalMin] = useState(15);
  const [standingVerticalMax, setStandingVerticalMax] = useState(40);
  const [threeQuarterSprintMin, setThreeQuarterSprintMin] = useState(2.5);
  const [threeQuarterSprintMax, setThreeQuarterSprintMax] = useState(4.5);
  const [standingReachMin, setStandingReachMin] = useState(7);
  const [standingReachMax, setStandingReachMax] = useState(10);
  const [wingspanMin, setWingspanMin] = useState(6);
  const [wingspanMax, setWingspanMax] = useState(9);
  const [weightMin, setWeightMin] = useState(150);
  const [weightMax, setWeightMax] = useState(350);
  const [handWidthMin, setHandWidthMin] = useState(8);
  const [handWidthMax, setHandWidthMax] = useState(12);
  const [handLengthMin, setHandLengthMin] = useState(7);
  const [handLengthMax, setHandLengthMax] = useState(10);
  const [laneAgilityMin, setLaneAgilityMin] = useState(10);
  const [laneAgilityMax, setLaneAgilityMax] = useState(15);
  const [activeSeason, setActiveSeason] = useState(false);
  const [activeHeight, setActiveHeight] = useState(false);
  const [activePosition, setActivePosition] = useState(false);
  const [activeVertical, setActiveVertical] = useState(false);
  const [activeStandingVertical, setActiveStandingVertical] = useState(false);
  const [activeThreeQuarterSprint, setActiveThreeQuarterSprint] = useState(false);
  const [activeStandingReach, setActiveStandingReach] = useState(false);
  const [activeWingspan, setActiveWingspan] = useState(false);
  const [activeWeight, setActiveWeight] = useState(false);
  const [activeHandWidth, setActiveHandWidth] = useState(false);
  const [activeHandLength, setActiveHandLength] = useState(false);
  const [activeLaneAgility, setActiveLaneAgility] = useState(false);
  const [sortBy, setSortBy] = useState('player_name');
  const [sortDir, setSortDir] = useState('asc'); // 'asc' | 'desc'
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const fetchPlayers = async () => {
    const params = new URLSearchParams({
      name,
      page,
      pageSize,
    });
    if (activeSeason) {
      params.append('seasonMin', seasonMin);
      params.append('seasonMax', seasonMax);
    }
    if (activeHeight) {
      params.append('heightMin', heightMin);
      params.append('heightMax', heightMax);
    }
    if (activePosition && selectedPositions.length > 0) {
      params.append('positions', selectedPositions.join(','));
    }
    if (activeVertical) {
      params.append('verticalMin', verticalMin);
      params.append('verticalMax', verticalMax);
    }
    if (activeStandingVertical) {
      params.append('standingVerticalMin', standingVerticalMin);
      params.append('standingVerticalMax', standingVerticalMax);
    }
    if (activeThreeQuarterSprint) {
      params.append('threeQuarterSprintMin', threeQuarterSprintMin);
      params.append('threeQuarterSprintMax', threeQuarterSprintMax);
    }
    if (activeStandingReach) {
      params.append('standingReachMin', standingReachMin);
      params.append('standingReachMax', standingReachMax);
    }
    if (activeWingspan) {
      params.append('wingspanMin', wingspanMin);
      params.append('wingspanMax', wingspanMax);
    }
    if (activeWeight) {
      params.append('weightMin', weightMin);
      params.append('weightMax', weightMax);
    }
    if (activeHandWidth) {
      params.append('handWidthMin', handWidthMin);
      params.append('handWidthMax', handWidthMax);
    }
    if (activeHandLength) {
      params.append('handLengthMin', handLengthMin);
      params.append('handLengthMax', handLengthMax);
    }
    if (activeLaneAgility) {
      params.append('laneAgilityMin', laneAgilityMin);
      params.append('laneAgilityMax', laneAgilityMax);
    }
    const res = await fetch(`/api/players?${params}`);
    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      console.error('Failed to fetch players', data);
      setPlayers([]);
      setTotal(0);
      return;
    }

    setPlayers(Array.isArray(data?.items) ? data.items : []);
    setTotal(typeof data?.total === 'number' ? data.total : Number(data?.total ?? 0) || 0);
  };

  useEffect(() => {
    fetchPlayers();
  }, [name, activeSeason, seasonMin, seasonMax, activeHeight, heightMin, heightMax, activePosition, selectedPositions, activeVertical, verticalMin, verticalMax, activeStandingVertical, standingVerticalMin, standingVerticalMax, activeThreeQuarterSprint, threeQuarterSprintMin, threeQuarterSprintMax, activeStandingReach, standingReachMin, standingReachMax, activeWingspan, wingspanMin, wingspanMax, activeWeight, weightMin, weightMax, activeHandWidth, handWidthMin, handWidthMax, activeHandLength, handLengthMin, handLengthMax, activeLaneAgility, laneAgilityMin, laneAgilityMax, page]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [name, activeSeason, seasonMin, seasonMax, activeHeight, heightMin, heightMax, activePosition, selectedPositions, activeVertical, verticalMin, verticalMax, activeStandingVertical, standingVerticalMin, standingVerticalMax, activeThreeQuarterSprint, threeQuarterSprintMin, threeQuarterSprintMax, activeStandingReach, standingReachMin, standingReachMax, activeWingspan, wingspanMin, wingspanMax, activeWeight, weightMin, weightMax, activeHandWidth, handWidthMin, handWidthMax, activeHandLength, handLengthMin, handLengthMax, activeLaneAgility, laneAgilityMin, laneAgilityMax]);


  const sortOptions = [
    { key: 'player_name', label: 'Name' },
    { key: 'position', label: 'Position' },
    { key: 'season', label: 'Season' },
    { key: 'lane_agility_time', label: 'Lane Agility' },
    { key: 'max_vertical_leap', label: 'Max Vertical' },
    { key: 'standing_vertical_leap', label: 'Standing Vertical' },
    { key: 'three_quarter_sprint', label: '3/4 Sprint' },
    { key: 'standing_reach_ft_in', label: 'Standing Reach' },
    { key: 'wingspan_ft_in', label: 'Wingspan' },
    { key: 'weight', label: 'Weight' },
    { key: 'height_wo_shoes_ft_in', label: 'Height (no shoes)' },
    { key: 'hand_width', label: 'Hand Width' },
    { key: 'hand_length', label: 'Hand Length' },
  ];

  const sortedPlayers = (Array.isArray(players) ? players : []).slice().sort((a, b) => {
    const av = a?.[sortBy];
    const bv = b?.[sortBy];

    // Put null/undefined last
    const aMissing = av === null || av === undefined;
    const bMissing = bv === null || bv === undefined;
    if (aMissing && bMissing) return 0;
    if (aMissing) return 1;
    if (bMissing) return -1;

    let cmp = 0;
    if (typeof av === 'number' && typeof bv === 'number') {
      cmp = av - bv;
    } else {
      cmp = String(av).localeCompare(String(bv));
    }
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div style={{ padding: '20px' }}>
      <h1>NBA Player Search</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>Sort by:</strong> {sortOptions.find(o => o.key === sortBy)?.label || sortBy} ({sortDir})
          <button
            onClick={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))}
            style={{ marginLeft: '10px' }}
          >
            Toggle direction
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {sortOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                background: sortBy === opt.key ? '#111' : '#fff',
                color: sortBy === opt.key ? '#fff' : '#111',
                cursor: 'pointer',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <strong>Filter by:</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
          <button
            onClick={() => setActiveSeason(!activeSeason)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeSeason ? '#111' : '#fff',
              color: activeSeason ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Season
          </button>
          <button
            onClick={() => setActiveHeight(!activeHeight)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeHeight ? '#111' : '#fff',
              color: activeHeight ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Height
          </button>
          <button
            onClick={() => setActivePosition(!activePosition)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activePosition ? '#111' : '#fff',
              color: activePosition ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Position
          </button>
          <button
            onClick={() => setActiveVertical(!activeVertical)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeVertical ? '#111' : '#fff',
              color: activeVertical ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Max Vertical
          </button>
          <button
            onClick={() => setActiveStandingVertical(!activeStandingVertical)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeStandingVertical ? '#111' : '#fff',
              color: activeStandingVertical ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Standing Vertical
          </button>
          <button
            onClick={() => setActiveThreeQuarterSprint(!activeThreeQuarterSprint)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeThreeQuarterSprint ? '#111' : '#fff',
              color: activeThreeQuarterSprint ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            3/4 Sprint
          </button>
          <button
            onClick={() => setActiveStandingReach(!activeStandingReach)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeStandingReach ? '#111' : '#fff',
              color: activeStandingReach ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Standing Reach
          </button>
          <button
            onClick={() => setActiveWingspan(!activeWingspan)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeWingspan ? '#111' : '#fff',
              color: activeWingspan ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Wingspan
          </button>
          <button
            onClick={() => setActiveWeight(!activeWeight)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeWeight ? '#111' : '#fff',
              color: activeWeight ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Weight
          </button>
          <button
            onClick={() => setActiveHandWidth(!activeHandWidth)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeHandWidth ? '#111' : '#fff',
              color: activeHandWidth ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Hand Width
          </button>
          <button
            onClick={() => setActiveHandLength(!activeHandLength)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeHandLength ? '#111' : '#fff',
              color: activeHandLength ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Hand Length
          </button>
          <button
            onClick={() => setActiveLaneAgility(!activeLaneAgility)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: activeLaneAgility ? '#111' : '#fff',
              color: activeLaneAgility ? '#fff' : '#111',
              cursor: 'pointer',
            }}
          >
            Lane Agility
          </button>
        </div>
      </div>
      {activeSeason && (
        <div style={{ marginBottom: '20px' }}>
          <label>Season: {seasonMin} - {seasonMax}</label>
          <br />
          <input
            type="range"
            min="2000"
            max="2023"
            value={seasonMin}
            onChange={(e) => setSeasonMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="2000"
            max="2023"
            value={seasonMax}
            onChange={(e) => setSeasonMax(Number(e.target.value))}
          />
        </div>
      )}
      {activeHeight && (
        <div style={{ marginBottom: '20px' }}>
          <label>Height (inches): {heightMin} - {heightMax}</label>
          <br />
          <input
            type="range"
            min="60"
            max="84"
            value={heightMin}
            onChange={(e) => setHeightMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="60"
            max="84"
            value={heightMax}
            onChange={(e) => setHeightMax(Number(e.target.value))}
          />
        </div>
      )}
      {activePosition && (
        <div style={{ marginBottom: '20px' }}>
          <label>Positions:</label>
          <br />
          {['PG', 'SG', 'SF', 'PF', 'C'].map(pos => (
            <label key={pos} style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                checked={selectedPositions.includes(pos)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPositions([...selectedPositions, pos]);
                  } else {
                    setSelectedPositions(selectedPositions.filter(p => p !== pos));
                  }
                }}
              />
              {pos}
            </label>
          ))}
        </div>
      )}
      {activeVertical && (
        <div style={{ marginBottom: '20px' }}>
          <label>Max Vertical (inches): {verticalMin} - {verticalMax}</label>
          <br />
          <input
            type="range"
            min="20"
            max="50"
            step="0.1"
            value={verticalMin}
            onChange={(e) => setVerticalMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="20"
            max="50"
            step="0.1"
            value={verticalMax}
            onChange={(e) => setVerticalMax(Number(e.target.value))}
          />
        </div>
      )}
      {activeStandingVertical && (
        <div style={{ marginBottom: '20px' }}>
          <label>Standing Vertical (inches): {standingVerticalMin} - {standingVerticalMax}</label>
          <br />
          <input
            type="range"
            min="15"
            max="40"
            step="0.1"
            value={standingVerticalMin}
            onChange={(e) => setStandingVerticalMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="15"
            max="40"
            step="0.1"
            value={standingVerticalMax}
            onChange={(e) => setStandingVerticalMax(Number(e.target.value))}
          />
        </div>
      )}
      {activeThreeQuarterSprint && (
        <div style={{ marginBottom: '20px' }}>
          <label>3/4 Sprint (seconds): {threeQuarterSprintMin} - {threeQuarterSprintMax}</label>
          <br />
          <input
            type="range"
            min="2.5"
            max="4.5"
            step="0.01"
            value={threeQuarterSprintMin}
            onChange={(e) => setThreeQuarterSprintMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="2.5"
            max="4.5"
            step="0.01"
            value={threeQuarterSprintMax}
            onChange={(e) => setThreeQuarterSprintMax(Number(e.target.value))}
          />
        </div>
      )}
      {activeStandingReach && (
        <div style={{ marginBottom: '20px' }}>
          <label>Standing Reach (ft in): {standingReachMin} - {standingReachMax}</label>
          <br />
          <input
            type="range"
            min="7"
            max="10"
            step="0.01"
            value={standingReachMin}
            onChange={(e) => setStandingReachMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="7"
            max="10"
            step="0.01"
            value={standingReachMax}
            onChange={(e) => setStandingReachMax(Number(e.target.value))}
          />
        </div>
      )}
      {activeWingspan && (
        <div style={{ marginBottom: '20px' }}>
          <label>Wingspan (ft in): {wingspanMin} - {wingspanMax}</label>
          <br />
          <input
            type="range"
            min="6"
            max="9"
            step="0.01"
            value={wingspanMin}
            onChange={(e) => setWingspanMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="6"
            max="9"
            step="0.01"
            value={wingspanMax}
            onChange={(e) => setWingspanMax(Number(e.target.value))}
          />
        </div>
      )}
      {activeWeight && (
        <div style={{ marginBottom: '20px' }}>
          <label>Weight (lbs): {weightMin} - {weightMax}</label>
          <br />
          <input
            type="range"
            min="150"
            max="350"
            value={weightMin}
            onChange={(e) => setWeightMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="150"
            max="350"
            value={weightMax}
            onChange={(e) => setWeightMax(Number(e.target.value))}
          />
        </div>
      )}
      {activeHandWidth && (
        <div style={{ marginBottom: '20px' }}>
          <label>Hand Width (inches): {handWidthMin} - {handWidthMax}</label>
          <br />
          <input
            type="range"
            min="8"
            max="12"
            step="0.01"
            value={handWidthMin}
            onChange={(e) => setHandWidthMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="8"
            max="12"
            step="0.01"
            value={handWidthMax}
            onChange={(e) => setHandWidthMax(Number(e.target.value))}
          />
        </div>
      )}
      {activeHandLength && (
        <div style={{ marginBottom: '20px' }}>
          <label>Hand Length (inches): {handLengthMin} - {handLengthMax}</label>
          <br />
          <input
            type="range"
            min="7"
            max="10"
            step="0.01"
            value={handLengthMin}
            onChange={(e) => setHandLengthMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="7"
            max="10"
            step="0.01"
            value={handLengthMax}
            onChange={(e) => setHandLengthMax(Number(e.target.value))}
          />
        </div>
      )}
      {activeLaneAgility && (
        <div style={{ marginBottom: '20px' }}>
          <label>Lane Agility (seconds): {laneAgilityMin} - {laneAgilityMax}</label>
          <br />
          <input
            type="range"
            min="10"
            max="15"
            step="0.01"
            value={laneAgilityMin}
            onChange={(e) => setLaneAgilityMin(Number(e.target.value))}
          />
          <input
            type="range"
            min="10"
            max="15"
            step="0.01"
            value={laneAgilityMax}
            onChange={(e) => setLaneAgilityMax(Number(e.target.value))}
          />
        </div>
      )}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
          <h2 style={{ margin: 0 }}>Players ({total})</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={!canPrev}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                background: canPrev ? '#fff' : '#f5f5f5',
                cursor: canPrev ? 'pointer' : 'not-allowed',
              }}
              aria-label="Previous page"
            >
              ←
            </button>
            <div style={{ fontVariantNumeric: 'tabular-nums' }}>
              Page {Math.min(page, totalPages)} of {totalPages}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={!canNext}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                background: canNext ? '#fff' : '#f5f5f5',
                cursor: canNext ? 'pointer' : 'not-allowed',
              }}
              aria-label="Next page"
            >
              →
            </button>
          </div>
        </div>
        <ul>
          {sortedPlayers.map((player) => (
            <li key={`${player.player_id}-${player.season}`} style={{ marginBottom: '10px' }}>
              <strong>{player.player_name}</strong> ({player.position}) - Season: {player.season}
              <br />
              Height: {player.height_wo_shoes_ft_in}", Weight: {player.weight} lbs, Max Vertical: {player.max_vertical_leap}", Standing Vertical: {player.standing_vertical_leap}", Standing Reach: {player.standing_reach_ft_in}", Wingspan: {player.wingspan_ft_in}"
              <br />
              Lane Agility: {player.lane_agility_time}s, 3/4 Sprint: {player.three_quarter_sprint}s, Hand: {player.hand_width}" x {player.hand_length}"
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}