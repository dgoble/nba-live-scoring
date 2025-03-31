'use client';

import { useState, useEffect } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface QuarterData {
  quarter: number;
  points: number;
}

interface QuarterScoringProps {
  teamId: string | null;
  opponentId: string | null;
  gameDate?: string;
}

export default function QuarterScoring({ teamId, opponentId, gameDate = new Date().toISOString().split('T')[0] }: QuarterScoringProps) {
  const [quarterData, setQuarterData] = useState<QuarterData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  useEffect(() => {
    const fetchQuarterData = async () => {
      if (!teamId) return;
      
      try {
        setLoading(true);
        // In a real implementation, this would fetch from the API
        // For now, we'll use mock data based on the Excel analysis
        const response = await fetch(`/api/scores/quarters?teamId=${teamId}&opponentId=${opponentId || ''}&gameDate=${gameDate}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch quarter data');
        }
        
        const data = await response.json();
        setQuarterData(data);
        
        // Calculate total points
        const total = data.reduce((sum: number, quarter: QuarterData) => sum + quarter.points, 0);
        setTotalPoints(total);
        
        setError(null);
      } catch (err) {
        setError('Error loading quarter data. Please try again.');
        console.error('Error fetching quarter data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuarterData();
  }, [teamId, opponentId, gameDate]);

  // For demonstration, create default quarter data if none exists
  useEffect(() => {
    if (!loading && quarterData.length === 0 && teamId) {
      const defaultData = [
        { quarter: 1, points: 0 },
        { quarter: 2, points: 0 },
        { quarter: 3, points: 0 },
        { quarter: 4, points: 0 }
      ];
      setQuarterData(defaultData);
    }
  }, [loading, quarterData, teamId]);

  const handlePointsChange = (quarter: number, points: number) => {
    const updatedData = quarterData.map(q => 
      q.quarter === quarter ? { ...q, points } : q
    );
    
    setQuarterData(updatedData);
    
    // Recalculate total
    const newTotal = updatedData.reduce((sum, q) => sum + q.points, 0);
    setTotalPoints(newTotal);
  };

  if (!teamId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quarter Scoring</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Please select a team to view quarter scoring data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quarter Scoring</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <p className="text-center">Loading quarter data...</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quarter</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quarterData.map((quarter) => (
                  <TableRow key={quarter.quarter}>
                    <TableCell>Q{quarter.quarter}</TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min="0"
                        value={quarter.points}
                        onChange={(e) => handlePointsChange(quarter.quarter, parseInt(e.target.value) || 0)}
                        className="w-16 p-1 border rounded"
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold">
                  <TableCell>Total</TableCell>
                  <TableCell>{totalPoints}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}
