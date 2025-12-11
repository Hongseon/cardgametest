// Supabase 설정
const SUPABASE_URL = 'https://lyqeolfdnnpcfgrfsrvv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5cWVvbGZkbm5wY2ZncmZzcnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNTA2NTYsImV4cCI6MjA4MDkyNjY1Nn0.8lDz3y01TlN3AKle9ZL1eIxaskjtoJkVQXgGpVOJyao';

// Supabase 클라이언트 초기화
let supabaseClient = null;

try {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase 클라이언트가 초기화되었습니다.');
    } else {
        console.warn('Supabase 라이브러리가 로드되지 않았습니다.');
    }
} catch (error) {
    console.error('Supabase 초기화 오류:', error);
}

// 점수 저장 함수
async function saveScore(playerName, score, moves, timeSeconds) {
    if (!supabaseClient) {
        alert('Supabase가 설정되지 않았습니다. 점수를 저장할 수 없습니다.');
        return false;
    }

    try {
        const { data, error } = await supabaseClient
            .from('card_game_scores')
            .insert([
                {
                    player_name: playerName || '익명',
                    score: score,
                    attempts: moves,
                    time_seconds: timeSeconds,
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) throw error;
        
        console.log('점수가 저장되었습니다:', data);
        return true;
    } catch (error) {
        console.error('점수 저장 오류:', error);
        alert('점수 저장에 실패했습니다: ' + error.message);
        return false;
    }
}

// 리더보드 가져오기 함수
async function getLeaderboard(limit = 10) {
    if (!supabaseClient) {
        return [];
    }

    try {
        const { data, error } = await supabaseClient
            .from('card_game_scores')
            .select('*')
            .order('score', { ascending: false })
            .limit(limit);

        if (error) throw error;
        
        return data || [];
    } catch (error) {
        console.error('리더보드 가져오기 오류:', error);
        return [];
    }
}

