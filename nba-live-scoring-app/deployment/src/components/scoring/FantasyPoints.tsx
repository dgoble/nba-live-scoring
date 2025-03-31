'use client';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface FantasyPointsProps {
  homeTeam: string | null;
  awayTeam: string | null;
  homePoints: number;
  awayPoints: number;
  quarterBreakdown?: {
    home: number[];
    away: number[];
  };
}

export default function FantasyPoints({
  homeTeam,
  awayTeam,
  homePoints,
  awayPoints,
  quarterBreakdown
}: FantasyPointsProps) {
  const pointsDifference = homePoints - awayPoints;
  const percentageDifference = Math.abs(pointsDifference) / (homePoints + awayPoints || 1) * 100;
  const leadingTeam = pointsDifference > 0 ? homeTeam : pointsDifference < 0 ? awayTeam : 'Tied';
  
  // Calculate if there's a bonus situation based on the Excel model logic
  const hasBonus = homePoints > 250 || awayPoints > 250;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fantasy Points Tracker</CardTitle>
        <CardDescription>
          Live fantasy points comparison between teams
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Home</p>
            <p className="text-3xl font-bold">{homePoints.toFixed(1)}</p>
            <p className="text-sm font-medium">{homeTeam || 'Select Team'}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Difference</p>
            <p className={`text-3xl font-bold ${pointsDifference > 0 ? 'text-green-600' : pointsDifference < 0 ? 'text-red-600' : 'text-gray-500'}`}>
              {Math.abs(pointsDifference).toFixed(1)}
            </p>
            <p className="text-sm font-medium">{leadingTeam}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Away</p>
            <p className="text-3xl font-bold">{awayPoints.toFixed(1)}</p>
            <p className="text-sm font-medium">{awayTeam || 'Select Team'}</p>
          </div>
        </div>
        
        {/* Visual representation of the difference */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${pointsDifference > 0 ? 'bg-blue-500' : 'bg-red-500'}`}
            style={{ 
              width: `${Math.min(Math.max(percentageDifference, 10), 90)}%`,
              marginLeft: pointsDifference < 0 ? `${100 - Math.min(Math.max(percentageDifference, 10), 90)}%` : '0'
            }}
          ></div>
        </div>
        
        {/* Quarter breakdown if available */}
        {quarterBreakdown && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Quarter Breakdown</h4>
            <div className="grid grid-cols-5 gap-2 text-center text-sm">
              <div className="font-medium">Team</div>
              <div className="font-medium">Q1</div>
              <div className="font-medium">Q2</div>
              <div className="font-medium">Q3</div>
              <div className="font-medium">Q4</div>
              
              <div>{homeTeam || 'Home'}</div>
              {quarterBreakdown.home.map((points, idx) => (
                <div key={`home-q${idx+1}`}>{points}</div>
              ))}
              
              <div>{awayTeam || 'Away'}</div>
              {quarterBreakdown.away.map((points, idx) => (
                <div key={`away-q${idx+1}`}>{points}</div>
              ))}
            </div>
          </div>
        )}
        
        {/* Bonus indicators based on Excel model */}
        {hasBonus && (
          <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-center">
            <p className="text-sm font-medium text-yellow-800">
              Bonus Activated: High Fantasy Point Total
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset</Button>
        <Button>Update</Button>
      </CardFooter>
    </Card>
  );
}
