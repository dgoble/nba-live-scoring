'use client';

import { useState, useEffect } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface PlayerStat {
  id: string;
  playerName: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  threePointers: number;
  fantasyPoints: number;
}

interface PlayerStatsProps {
  teamId: string | null;
  gameDate?: string;
  onFantasyPointsUpdate?: (totalPoints: number) => void;
}

// Fantasy points calculation based on standard scoring
const calculateFantasyPoints = (stats: Omit<PlayerStat, 'id' | 'playerName' | 'fantasyPoints'>) => {
  return (
    stats.points +
    stats.rebounds * 1.2 +
    stats.assists * 1.5 +
    stats.steals * 3 +
    stats.blocks * 3 -
    stats.turnovers * 1 +
    stats.threePointers * 0.5
  );
};

export default function PlayerStats({ 
  teamId, 
  gameDate = new Date().toISOString().split('T')[0],
  onFantasyPointsUpdate 
}: PlayerStatsProps) {
  const [players, setPlayers] = useState<PlayerStat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalFantasyPoints, setTotalFantasyPoints] = useState<number>(0);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (!teamId) return;
      
      try {
        setLoading(true);
        // In a real implementation, this would fetch from the API
        // For now, we'll use mock data
        const response = await fetch(`/api/players/stats?teamId=${teamId}&gameDate=${gameDate}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch player stats');
        }
        
        const data = await response.json();
        setPlayers(data);
        
        // Calculate total fantasy points
        const total = data.reduce((sum: number, player: PlayerStat) => sum + player.fantasyPoints, 0);
        setTotalFantasyPoints(total);
        if (onFantasyPointsUpdate) {
          onFantasyPointsUpdate(total);
        }
        
        setError(null);
      } catch (err) {
        setError('Error loading player stats. Please try again.');
        console.error('Error fetching player stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [teamId, gameDate, onFantasyPointsUpdate]);

  // For demonstration, create default player data if none exists
  useEffect(() => {
    if (!loading && players.length === 0 && teamId) {
      const defaultPlayers = [
        { id: '1', playerName: 'Player 1', points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, turnovers: 0, threePointers: 0, fantasyPoints: 0 },
        { id: '2', playerName: 'Player 2', points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, turnovers: 0, threePointers: 0, fantasyPoints: 0 },
        { id: '3', playerName: 'Player 3', points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, turnovers: 0, threePointers: 0, fantasyPoints: 0 },
        { id: '4', playerName: 'Player 4', points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, turnovers: 0, threePointers: 0, fantasyPoints: 0 },
        { id: '5', playerName: 'Player 5', points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, turnovers: 0, threePointers: 0, fantasyPoints: 0 },
      ];
      setPlayers(defaultPlayers);
    }
  }, [loading, players, teamId]);

  const handleStatChange = (playerId: string, statName: string, value: number) => {
    const updatedPlayers = players.map(player => {
      if (player.id === playerId) {
        const updatedPlayer = { ...player, [statName]: value };
        
        // Recalculate fantasy points
        const { id, playerName, fantasyPoints, ...stats } = updatedPlayer;
        const newFantasyPoints = calculateFantasyPoints(stats);
        
        return { ...updatedPlayer, fantasyPoints: parseFloat(newFantasyPoints.toFixed(1)) };
      }
      return player;
    });
    
    setPlayers(updatedPlayers);
    
    // Recalculate total fantasy points
    const newTotal = updatedPlayers.reduce((sum, player) => sum + player.fantasyPoints, 0);
    setTotalFantasyPoints(parseFloat(newTotal.toFixed(1)));
    
    if (onFantasyPointsUpdate) {
      onFantasyPointsUpdate(parseFloat(newTotal.toFixed(1)));
    }
  };

  if (!teamId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Player Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Please select a team to view player stats</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <p className="text-center">Loading player stats...</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>PTS</TableHead>
                  <TableHead>REB</TableHead>
                  <TableHead>AST</TableHead>
                  <TableHead>STL</TableHead>
                  <TableHead>BLK</TableHead>
                  <TableHead>TO</TableHead>
                  <TableHead>3PM</TableHead>
                  <TableHead>FP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.playerName}</TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        value={player.points}
                        onChange={(e) => handleStatChange(player.id, 'points', parseInt(e.target.value) || 0)}
                        className="w-12 p-1 border rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        value={player.rebounds}
                        onChange={(e) => handleStatChange(player.id, 'rebounds', parseInt(e.target.value) || 0)}
                        className="w-12 p-1 border rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        value={player.assists}
                        onChange={(e) => handleStatChange(player.id, 'assists', parseInt(e.target.value) || 0)}
                        className="w-12 p-1 border rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        value={player.steals}
                        onChange={(e) => handleStatChange(player.id, 'steals', parseInt(e.target.value) || 0)}
                        className="w-12 p-1 border rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        value={player.blocks}
                        onChange={(e) => handleStatChange(player.id, 'blocks', parseInt(e.target.value) || 0)}
                        className="w-12 p-1 border rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        value={player.turnovers}
                        onChange={(e) => handleStatChange(player.id, 'turnovers', parseInt(e.target.value) || 0)}
                        className="w-12 p-1 border rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        value={player.threePointers}
                        onChange={(e) => handleStatChange(player.id, 'threePointers', parseInt(e.target.value) || 0)}
                        className="w-12 p-1 border rounded"
                      />
                    </TableCell>
                    <TableCell className="font-bold">{player.fantasyPoints}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold">
                  <TableCell colSpan={8} className="text-right">Total Fantasy Points:</TableCell>
                  <TableCell>{totalFantasyPoints}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
