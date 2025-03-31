-- Migration number: 0001 	 2025-03-31T14:18:20.000Z
-- NBA Live Scoring Model Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS counters;
DROP TABLE IF EXISTS access_logs;
DROP TABLE IF EXISTS quarter_scores;
DROP TABLE IF EXISTS player_stats;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  plan_type TEXT NOT NULL,
  status TEXT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams Table
CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  abbreviation TEXT NOT NULL,
  conference TEXT NOT NULL,
  division TEXT NOT NULL
);

-- PlayerStats Table
CREATE TABLE IF NOT EXISTS player_stats (
  id TEXT PRIMARY KEY,
  player_name TEXT NOT NULL,
  team_id TEXT NOT NULL REFERENCES teams(id),
  points INTEGER DEFAULT 0,
  rebounds INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  steals INTEGER DEFAULT 0,
  blocks INTEGER DEFAULT 0,
  turnovers INTEGER DEFAULT 0,
  three_pointers INTEGER DEFAULT 0,
  fantasy_points REAL DEFAULT 0,
  game_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- QuarterScores Table
CREATE TABLE IF NOT EXISTS quarter_scores (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id),
  opponent_id TEXT NOT NULL REFERENCES teams(id),
  quarter INTEGER NOT NULL,
  points INTEGER DEFAULT 0,
  game_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Access Logs Table (for analytics)
CREATE TABLE IF NOT EXISTS access_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  ip TEXT,
  path TEXT,
  accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_player_stats_team_id ON player_stats(team_id);
CREATE INDEX idx_quarter_scores_team_id ON quarter_scores(team_id);
CREATE INDEX idx_quarter_scores_game_date ON quarter_scores(game_date);
CREATE INDEX idx_access_logs_accessed_at ON access_logs(accessed_at);

-- Insert initial NBA teams data
INSERT INTO teams (id, name, abbreviation, conference, division) VALUES 
('ATL', 'Atlanta Hawks', 'ATL', 'Eastern', 'Southeast'),
('BOS', 'Boston Celtics', 'BOS', 'Eastern', 'Atlantic'),
('BKN', 'Brooklyn Nets', 'BKN', 'Eastern', 'Atlantic'),
('CHA', 'Charlotte Hornets', 'CHA', 'Eastern', 'Southeast'),
('CHI', 'Chicago Bulls', 'CHI', 'Eastern', 'Central'),
('CLE', 'Cleveland Cavaliers', 'CLE', 'Eastern', 'Central'),
('DAL', 'Dallas Mavericks', 'DAL', 'Western', 'Southwest'),
('DEN', 'Denver Nuggets', 'DEN', 'Western', 'Northwest'),
('DET', 'Detroit Pistons', 'DET', 'Eastern', 'Central'),
('GSW', 'Golden State Warriors', 'GSW', 'Western', 'Pacific'),
('HOU', 'Houston Rockets', 'HOU', 'Western', 'Southwest'),
('IND', 'Indiana Pacers', 'IND', 'Eastern', 'Central'),
('LAC', 'LA Clippers', 'LAC', 'Western', 'Pacific'),
('LAL', 'Los Angeles Lakers', 'LAL', 'Western', 'Pacific'),
('MEM', 'Memphis Grizzlies', 'MEM', 'Western', 'Southwest'),
('MIA', 'Miami Heat', 'MIA', 'Eastern', 'Southeast'),
('MIL', 'Milwaukee Bucks', 'MIL', 'Eastern', 'Central'),
('MIN', 'Minnesota Timberwolves', 'MIN', 'Western', 'Northwest'),
('NOP', 'New Orleans Pelicans', 'NOP', 'Western', 'Southwest'),
('NYK', 'New York Knicks', 'NYK', 'Eastern', 'Atlantic'),
('OKC', 'Oklahoma City Thunder', 'OKC', 'Western', 'Northwest'),
('ORL', 'Orlando Magic', 'ORL', 'Eastern', 'Southeast'),
('PHI', 'Philadelphia 76ers', 'PHI', 'Eastern', 'Atlantic'),
('PHX', 'Phoenix Suns', 'PHX', 'Western', 'Pacific'),
('POR', 'Portland Trail Blazers', 'POR', 'Western', 'Northwest'),
('SAC', 'Sacramento Kings', 'SAC', 'Western', 'Pacific'),
('SAS', 'San Antonio Spurs', 'SAS', 'Western', 'Southwest'),
('TOR', 'Toronto Raptors', 'TOR', 'Eastern', 'Atlantic'),
('UTA', 'Utah Jazz', 'UTA', 'Western', 'Northwest'),
('WAS', 'Washington Wizards', 'WAS', 'Eastern', 'Southeast');
