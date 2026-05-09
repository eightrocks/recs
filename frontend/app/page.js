'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [players, setPlayers] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [heightMin, setHeightMin] = useState(60);
  const [heightMax, setHeightMax] = useState(84);
  const [verticalMin, setVerticalMin] = useState(20);
  const [verticalMax, setVerticalMax] = useState(50);
  const [weightMin, setWeightMin] = useState(150);
  const [weightMax, setWeightMax] = useState(350);
  const [sortBy, setSortBy] = useState('player_name');
  const [sortDir, setSortDir] = useState('asc'); // 'asc' | 'desc'
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const fetchPlayers = async () => {
    const params = new URLSearchParams({
      name,
      heightMin,
      heightMax,
      verticalMin,
      verticalMax,
      weightMin,
      weightMax,
      page,
      pageSize,
    });
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
  }, [name, heightMin, heightMax, verticalMin, verticalMax, weightMin, weightMax, page]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [name, heightMin, heightMax, verticalMin, verticalMax, weightMin, weightMax]);


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
      <div style={{ marginBottom: '20px' }}>
        <label>Max Vertical Leap (inches): {verticalMin} - {verticalMax}</label>
        <br />
        <input
          type="range"
          min="20"
          max="50"
          value={verticalMin}
          onChange={(e) => setVerticalMin(Number(e.target.value))}
        />
        <input
          type="range"
          min="20"
          max="50"
          value={verticalMax}
          onChange={(e) => setVerticalMax(Number(e.target.value))}
        />
      </div>
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