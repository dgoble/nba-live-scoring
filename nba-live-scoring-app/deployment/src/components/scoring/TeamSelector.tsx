'use client';

import { useState, useEffect } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  conference: string;
  division: string;
}

interface TeamSelectorProps {
  label: string;
  onTeamSelect: (team: Team | null) => void;
}

export default function TeamSelector({ label, onTeamSelect }: TeamSelectorProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would fetch from the API
        // For now, we'll use a mock implementation
        const response = await fetch('/api/teams');
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const data = await response.json();
        setTeams(data);
        setError(null);
      } catch (err) {
        setError('Error loading teams. Please try again.');
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamChange = (value: string) => {
    setSelectedTeam(value);
    const team = teams.find(t => t.id === value) || null;
    onTeamSelect(team);
  };

  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select
        value={selectedTeam}
        onValueChange={handleTeamChange}
        disabled={loading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select team" />
        </SelectTrigger>
        <SelectContent>
          {error ? (
            <SelectItem value="error" disabled>{error}</SelectItem>
          ) : loading ? (
            <SelectItem value="loading" disabled>Loading teams...</SelectItem>
          ) : (
            teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
