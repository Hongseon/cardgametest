// 게임 상태
const gameState = {
    cards: [],
    flippedCards: [],
    moves: 0,
    matchedPairs: 0,
    startTime: null,
    timerInterval: null,
    isProcessing: false,
    totalPairs: 8
};

// 카드 이모지 배열 (8쌍)
const cardEmojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎤'];

// 게임 초기화
function initGame() {
    resetGameState();
    createCards();
    shuffleCards();
    renderCards();
    startTimer();
    loadLeaderboard();
}

// 게임 상태 리셋
function resetGameState() {
    gameState.cards = [];
    gameState.flippedCards = [];
    gameState.moves = 0;
    gameState.matchedPairs = 0;
    gameState.startTime = Date.now();
    gameState.isProcessing = false;
    
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    updateUI();
}

// 카드 생성
function createCards() {
    gameState.cards = [];
    
    // 각 이모지를 2번씩 추가하여 쌍 만들기
    const cardPairs = [...cardEmojis, ...cardEmojis];
    
    cardPairs.forEach((emoji, index) => {
        gameState.cards.push({
            id: index,
            emoji: emoji,
            isFlipped: false,
            isMatched: false
        });
    });
}

// 카드 셔플 (Fisher-Yates 알고리즘)
function shuffleCards() {
    for (let i = gameState.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.cards[i], gameState.cards[j]] = [gameState.cards[j], gameState.cards[i]];
    }
}

// 카드 렌더링
function renderCards() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    gameState.cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.cardId = card.id;
        
        // 카드 등장 애니메이션을 위한 지연
        cardElement.style.animationDelay = `${index * 0.05}s`;
        cardElement.style.opacity = '0';
        cardElement.style.animation = 'cardAppear 0.5s ease forwards';
        
        if (card.isFlipped || card.isMatched) {
            cardElement.classList.add('flipped');
            cardElement.textContent = card.emoji;
        }
        
        if (card.isMatched) {
            cardElement.classList.add('matched');
        }
        
        cardElement.addEventListener('click', () => handleCardClick(card.id));
        gameBoard.appendChild(cardElement);
    });
}

// 카드 클릭 처리
function handleCardClick(cardId) {
    // 이미 처리 중이거나, 매칭된 카드, 이미 뒤집힌 카드는 무시
    if (gameState.isProcessing) return;
    
    const card = gameState.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    
    // 카드 뒤집기
    card.isFlipped = true;
    gameState.flippedCards.push(card);
    renderCards();
    
    // 두 장이 뒤집혔으면 매칭 검사
    if (gameState.flippedCards.length === 2) {
        gameState.isProcessing = true;
        gameState.moves++;
        updateUI();
        
        setTimeout(() => {
            checkMatch();
        }, 1000);
    }
}

// 매칭 검사
function checkMatch() {
    const [card1, card2] = gameState.flippedCards;
    
    if (card1.emoji === card2.emoji) {
        // 매칭 성공
        card1.isMatched = true;
        card2.isMatched = true;
        gameState.matchedPairs++;
        
        // 게임 완료 확인
        if (gameState.matchedPairs === gameState.totalPairs) {
            setTimeout(() => {
                endGame();
            }, 500);
        }
    } else {
        // 매칭 실패 - 카드 다시 뒤집기
        setTimeout(() => {
            card1.isFlipped = false;
            card2.isFlipped = false;
            gameState.flippedCards = [];
            gameState.isProcessing = false;
            renderCards();
        }, 1000);
        return;
    }
    
    gameState.flippedCards = [];
    gameState.isProcessing = false;
    renderCards();
}

// 타이머 시작
function startTimer() {
    gameState.startTime = Date.now();
    gameState.timerInterval = setInterval(() => {
        updateUI();
    }, 100);
}

// UI 업데이트
function updateUI() {
    // 시도 횟수
    document.getElementById('moves').textContent = gameState.moves;
    
    // 경과 시간
    if (gameState.startTime) {
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        document.getElementById('timer').textContent = elapsed;
    }
    
    // 점수 계산 (시도 횟수가 적을수록, 시간이 짧을수록 높은 점수)
    const timeSeconds = gameState.startTime ? Math.floor((Date.now() - gameState.startTime) / 1000) : 0;
    const score = calculateScore(gameState.moves, timeSeconds);
    document.getElementById('score').textContent = score;
}

// 점수 계산
function calculateScore(moves, timeSeconds) {
    if (moves === 0 || timeSeconds === 0) return 0;
    // 점수 = (10000 / 시도횟수) * (100 / 시간초) * 100
    const baseScore = 10000;
    const movesBonus = baseScore / moves;
    const timeBonus = timeSeconds > 0 ? 100 / timeSeconds : 0;
    return Math.floor(movesBonus * timeBonus);
}

// 게임 종료
function endGame() {
    clearInterval(gameState.timerInterval);
    
    const timeSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);
    const finalScore = calculateScore(gameState.moves, timeSeconds);
    
    // 모달에 최종 결과 표시
    document.getElementById('finalMoves').textContent = gameState.moves;
    document.getElementById('finalTime').textContent = timeSeconds;
    document.getElementById('finalScore').textContent = finalScore.toLocaleString();
    
    // 축하 효과
    createCelebrationEffect();
    
    // 모달 표시
    setTimeout(() => {
        const modal = document.getElementById('gameOverModal');
        modal.classList.add('show');
    }, 500);
    
    // 입력 필드 초기화
    document.getElementById('playerName').value = '';
}

// 축하 효과 생성
function createCelebrationEffect() {
    const emojis = ['🎉', '✨', '🌟', '🎊', '💫'];
    const gameBoard = document.getElementById('gameBoard');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const effect = document.createElement('div');
            effect.textContent = emoji;
            effect.style.position = 'absolute';
            effect.style.left = Math.random() * 100 + '%';
            effect.style.top = Math.random() * 100 + '%';
            effect.style.fontSize = '2em';
            effect.style.pointerEvents = 'none';
            effect.style.zIndex = '9999';
            effect.style.animation = 'celebrationFloat 2s ease-out forwards';
            document.body.appendChild(effect);
            
            setTimeout(() => {
                effect.remove();
            }, 2000);
        }, i * 50);
    }
}

// 날짜 포맷팅 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diffTime / (1000 * 60));
            return diffMinutes <= 1 ? '방금 전' : `${diffMinutes}분 전`;
        }
        return `${diffHours}시간 전`;
    } else if (diffDays === 1) {
        return '어제';
    } else if (diffDays < 7) {
        return `${diffDays}일 전`;
    } else {
        return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
    }
}

// 메달 아이콘 가져오기
function getMedalIcon(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
}

// 리더보드 로드
async function loadLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '<p class="loading">로딩 중...</p>';
    
    try {
        const scores = await getLeaderboard(10);
        
        if (scores.length === 0) {
            leaderboard.innerHTML = `
                <div class="empty-leaderboard">
                    <div class="empty-leaderboard-icon">📊</div>
                    <p>아직 기록이 없습니다.</p>
                    <p style="font-size: 0.9em; margin-top: 5px;">첫 번째 기록을 남겨보세요!</p>
                </div>
            `;
            return;
        }
        
        leaderboard.innerHTML = '';
        scores.forEach((score, index) => {
            const rank = index + 1;
            const item = document.createElement('div');
            const rankClass = rank <= 3 ? `rank-${rank}` : '';
            const medalIcon = getMedalIcon(rank);
            
            item.className = `leaderboard-item ${rankClass}`;
            item.innerHTML = `
                <div style="display: flex; align-items: center; min-width: 50px;">
                    ${medalIcon ? `<span class="leaderboard-medal">${medalIcon}</span>` : ''}
                    <span class="leaderboard-rank">${rank}</span>
                </div>
                <div style="flex: 1; margin: 0 10px;">
                    <div class="leaderboard-name">${score.player_name || '익명'}</div>
                    ${score.created_at ? `<div class="leaderboard-date">${formatDate(score.created_at)}</div>` : ''}
                </div>
                <div style="text-align: right;">
                    <div class="leaderboard-score">${score.score.toLocaleString()}</div>
                    <div class="leaderboard-details">${score.attempts}회 · ${score.time_seconds}초</div>
                </div>
            `;
            leaderboard.appendChild(item);
        });
    } catch (error) {
        console.error('리더보드 로드 오류:', error);
        leaderboard.innerHTML = `
            <div class="empty-leaderboard">
                <div class="empty-leaderboard-icon">⚠️</div>
                <p>리더보드를 불러올 수 없습니다.</p>
                <p style="font-size: 0.9em; margin-top: 5px;">네트워크 연결을 확인해주세요.</p>
            </div>
        `;
    }
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // 새 게임 버튼
    document.getElementById('newGameBtn').addEventListener('click', () => {
        initGame();
    });
    
    // 리더보드 새로고침 버튼
    document.getElementById('refreshLeaderboardBtn').addEventListener('click', () => {
        loadLeaderboard();
    });
    
    // 점수 저장 버튼
    document.getElementById('saveScoreBtn').addEventListener('click', async () => {
        const playerName = document.getElementById('playerName').value.trim();
        const timeSeconds = parseInt(document.getElementById('finalTime').textContent);
        const finalScore = parseInt(document.getElementById('finalScore').textContent);
        const moves = parseInt(document.getElementById('finalMoves').textContent);
        
        if (await saveScore(playerName, finalScore, moves, timeSeconds)) {
            alert('점수가 저장되었습니다!');
            loadLeaderboard();
            document.getElementById('gameOverModal').classList.remove('show');
        }
    });
    
    // 모달 닫기 버튼
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        document.getElementById('gameOverModal').classList.remove('show');
    });
    
    // 모달 외부 클릭 시 닫기
    document.getElementById('gameOverModal').addEventListener('click', (e) => {
        if (e.target.id === 'gameOverModal') {
            document.getElementById('gameOverModal').classList.remove('show');
        }
    });
    
    // 게임 초기화
    initGame();
});

