-- 카드 뒤집기 게임을 위한 Supabase 데이터베이스 설정
-- Supabase SQL Editor에서 이 스크립트를 실행하세요

-- scores 테이블 생성
CREATE TABLE IF NOT EXISTS scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    moves INTEGER NOT NULL,
    time_seconds INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_scores_score ON scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_scores_created_at ON scores(created_at DESC);

-- Row Level Security (RLS) 설정
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- 기존 정책이 있다면 삭제
DROP POLICY IF EXISTS "Anyone can read scores" ON scores;
DROP POLICY IF EXISTS "Anyone can insert scores" ON scores;

-- 모든 사용자가 점수를 읽을 수 있도록 설정
CREATE POLICY "Anyone can read scores" ON scores
    FOR SELECT USING (true);

-- 모든 사용자가 점수를 추가할 수 있도록 설정
CREATE POLICY "Anyone can insert scores" ON scores
    FOR INSERT WITH CHECK (true);

-- 테이블이 제대로 생성되었는지 확인
SELECT * FROM scores LIMIT 5;

