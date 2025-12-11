# 🎴 카드 뒤집기 게임

가장 간단한 웹 기술로 만든 카드 뒤집기 게임입니다. Supabase를 사용하여 점수를 저장하고 리더보드를 제공합니다.

## 🎮 게임 방법

1. 카드를 클릭하여 뒤집습니다
2. 같은 이모지의 카드 쌍을 찾아 매칭합니다
3. 최소한의 시도와 시간으로 모든 카드를 매칭하세요!
4. 게임 완료 후 이름을 입력하고 점수를 저장할 수 있습니다

## 🚀 시작하기

### 1. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성합니다
2. SQL Editor에서 다음 SQL을 실행하여 `scores` 테이블을 생성합니다:

```sql
-- scores 테이블 생성
CREATE TABLE scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    moves INTEGER NOT NULL,
    time_seconds INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX idx_scores_score ON scores(score DESC);
CREATE INDEX idx_scores_created_at ON scores(created_at DESC);

-- Row Level Security (RLS) 설정
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 점수를 읽을 수 있도록 설정
CREATE POLICY "Anyone can read scores" ON scores
    FOR SELECT USING (true);

-- 모든 사용자가 점수를 추가할 수 있도록 설정
CREATE POLICY "Anyone can insert scores" ON scores
    FOR INSERT WITH CHECK (true);
```

### 2. Supabase 설정

1. `supabase-config.js` 파일을 엽니다
2. Supabase 프로젝트의 URL과 Anon Key를 입력합니다:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

Supabase 프로젝트의 URL과 Anon Key는 다음 위치에서 찾을 수 있습니다:
- Supabase 대시보드 → Settings → API

### 3. 게임 실행

1. 웹 서버를 실행합니다 (예: Python의 `python -m http.server` 또는 Node.js의 `npx serve`)
2. 브라우저에서 `index.html`을 엽니다
3. 게임을 즐기세요!

## 📁 파일 구조

```
newcardgame/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── script.js           # 게임 로직
├── supabase-config.js  # Supabase 설정
└── README.md           # 프로젝트 설명
```

## 🎯 기능

- ✅ 4x4 카드 그리드 (8쌍의 카드)
- ✅ 카드 뒤집기 애니메이션
- ✅ 시도 횟수 및 경과 시간 추적
- ✅ 점수 계산 시스템
- ✅ Supabase를 통한 점수 저장
- ✅ 리더보드 (상위 10명)
- ✅ 반응형 디자인 (모바일 지원)

## 🎨 점수 계산 방식

점수는 다음 공식을 사용하여 계산됩니다:
- 시도 횟수가 적을수록 높은 점수
- 시간이 짧을수록 높은 점수
- 공식: `(10000 / 시도횟수) * (100 / 시간초)`

## 🔧 기술 스택

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Supabase (PostgreSQL 데이터베이스)

## 📝 라이선스

이 프로젝트는 자유롭게 사용할 수 있습니다.

