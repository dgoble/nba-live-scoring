'use client';

import { useState } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '../ui/tabs';
import TeamSelector from './TeamSelector';
import QuarterScoring from './QuarterScoring';
import PlayerStats from './PlayerStats';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  conference: string;
  division: string;
}

export default function LiveScoreboard() {
  const [homeTeam, setHomeTeam] = useState<Team | null>(null);
  const [awayTeam, setAwayTeam] = useState<Team | null>(null);
  const [homeFantasyPoints, setHomeFantasyPoints] = useState<number>(0);
  const [awayFantasyPoints, setAwayFantasyPoints] = useState<number>(0);
  const [gameDate, setGameDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const handleHomeTeamSelect = (team: Team | null) => {
    setHomeTeam(team);
  };
  
  const handleAwayTeamSelect = (team: Team | null) => {
    setAwayTeam(team);
  };
  
  const handleHomeFantasyPointsUpdate = (points: number) => {
    setHomeFantasyPoints(points);
  };
  
  const handleAwayFantasyPointsUpdate = (points: number) => {
    setAwayFantasyPoints(points);
  };
  
  const fantasyPointsDifference = homeFantasyPoints - awayFantasyPoints;
  const leadingTeam = fantasyPointsDifference > 0 
    ? homeTeam?.name 
    : fantasyPointsDifference < 0 
      ? awayTeam?.name 
      : 'Tied';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Game Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-4">
              <TeamSelector 
                label="Home Team" 
                onTeamSelect={handleHomeTeamSelect} 
              />
              <TeamSelector 
                label="Away Team" 
                onTeamSelect={handleAwayTeamSelect} 
              />
              <div className="w-full space-y-2">
                <label className="text-sm font-medium">Game Date</label>
                <input
                  type="date"
                  value={gameDate}
                  onChange={(e) => setGameDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Fantasy Points Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Home</p>
                  <p className="text-2xl font-bold">{homeFantasyPoints}</p>
                  <p className="text-sm">{homeTeam?.name || 'Select Team'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Difference</p>
                  <p className={`text-2xl font-bold ${fantasyPointsDifference > 0 ? 'text-green-500' : fantasyPointsDifference < 0 ? 'text-red-500' : ''}`}>
                    {Math.abs(fantasyPointsDifference).toFixed(1)}
                  </p>
                  <p className="text-sm">{leadingTeam}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Away</p>
                  <p className="text-2xl font-bold">{awayFantasyPoints}</p>
                  <p className="text-sm">{awayTeam?.name || 'Select Team'}</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${fantasyPointsDifference > 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                  style={{ 
                    width: `${Math.min(Math.abs(fantasyPointsDifference) / (homeFantasyPoints + awayFantasyPoints) * 100, 100) || 50}%`,
                    marginLeft: fantasyPointsDifference < 0 ? 'auto' : '0'
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Tabs defaultValue="quarter-scoring">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quarter-scoring">Quarter Scoring</TabsTrigger>
            <TabsTrigger value="player-stats">Player Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="quarter-scoring">
            <QuarterScoring 
              teamId={homeTeam?.id || null} 
              opponentId={awayTeam?.id || null}
              gameDate={gameDate}
            />
          </TabsContent>
          <TabsContent value="player-stats">
            <PlayerStats 
              teamId={homeTeam?.id || null}
              gameDate={gameDate}
              onFantasyPointsUpdate={handleHomeFantasyPointsUpdate}
            />
          </TabsContent>
        </Tabs>
        
        <Tabs defaultValue="quarter-scoring">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quarter-scoring">Quarter Scoring</TabsTrigger>
            <TabsTrigger value="player-stats">Player Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="quarter-scoring">
            <QuarterScoring 
              teamId={awayTeam?.id || null} 
              opponentId={homeTeam?.id || null}
              gameDate={gameDate}
            />
          </TabsContent>
          <TabsContent value="player-stats">
            <PlayerStats 
              teamId={awayTeam?.id || null}
              gameDate={gameDate}
              onFantasyPointsUpdate={handleAwayFantasyPointsUpdate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
