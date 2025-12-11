# 🚀 배포 가이드

카드 뒤집기 게임을 배포할 수 있는 여러 옵션과 방법을 안내합니다.

## 추천 배포 플랫폼

### 1. **Vercel** ⭐ (가장 추천)

**장점:**
- 무료 플랜 제공
- GitHub 연동으로 자동 배포
- 빠른 CDN
- 커스텀 도메인 지원
- 매우 간단한 배포 과정

**배포 방법:**

1. **GitHub에 프로젝트 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Vercel 배포**
   - [vercel.com](https://vercel.com) 접속
   - GitHub 계정으로 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정:
     - Framework Preset: **Other**
     - Root Directory: `./` (기본값)
   - "Deploy" 클릭
   - 완료! 몇 초 후 배포 URL 제공

**결과:** `https://your-project.vercel.app`

---

### 2. **Netlify**

**장점:**
- 무료 플랜 제공
- GitHub 연동
- 드래그 앤 드롭 배포 가능
- 커스텀 도메인 지원

**배포 방법:**

**방법 A: 드래그 앤 드롭 (가장 간단)**
1. [netlify.com](https://netlify.com) 접속
2. "Sites" → "Add new site" → "Deploy manually"
3. 프로젝트 폴더를 드래그 앤 드롭
4. 완료!

**방법 B: GitHub 연동**
1. GitHub에 프로젝트 업로드
2. Netlify에서 "Add new site" → "Import an existing project"
3. GitHub 저장소 선택
4. 빌드 설정:
   - Build command: (비워두기)
   - Publish directory: `.` 또는 `./`
5. "Deploy site" 클릭

**결과:** `https://your-project.netlify.app`

---

### 3. **GitHub Pages**

**장점:**
- 완전 무료
- GitHub 저장소와 통합
- 간단한 설정

**배포 방법:**

1. **GitHub에 프로젝트 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **GitHub Pages 활성화**
   - GitHub 저장소 페이지로 이동
   - Settings → Pages
   - Source: "Deploy from a branch" 선택
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
   - Save 클릭

3. **대기**
   - 몇 분 후 `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME` 접속 가능

**결과:** `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

### 4. **Supabase Hosting** (Supabase 사용 중이라면 추천)

**장점:**
- 이미 Supabase를 사용 중이므로 통합이 좋음
- 같은 플랫폼에서 관리
- 무료 플랜 제공

**배포 방법:**

1. **Supabase CLI 설치**
   ```bash
   npm install -g supabase
   ```

2. **프로젝트 초기화**
   ```bash
   supabase init
   ```

3. **배포**
   ```bash
   supabase functions deploy
   ```
   
   또는 Supabase 대시보드에서:
   - Storage → New bucket 생성
   - 파일 업로드

**참고:** Supabase Hosting은 주로 Edge Functions용이므로, 정적 사이트는 다른 플랫폼이 더 적합할 수 있습니다.

---

## 배포 전 체크리스트

- [ ] `supabase-config.js`에 실제 Supabase URL과 Key가 설정되어 있는지 확인
- [ ] 모든 파일이 올바른 경로에 있는지 확인
- [ ] 브라우저 콘솔에서 오류가 없는지 확인
- [ ] 모바일에서도 잘 작동하는지 테스트

---

## 배포 후 확인 사항

1. **Supabase CORS 설정**
   - Supabase 대시보드 → Settings → API
   - "Allowed CORS origins"에 배포된 URL 추가
   - 예: `https://your-project.vercel.app`

2. **테스트**
   - 게임 플레이 테스트
   - 점수 저장 기능 테스트
   - 리더보드 로드 테스트

---

## 각 플랫폼 비교

| 플랫폼 | 난이도 | 속도 | 무료 플랜 | 추천도 |
|--------|--------|------|-----------|--------|
| **Vercel** | ⭐ 쉬움 | ⭐⭐⭐ 매우 빠름 | ✅ 넉넉함 | ⭐⭐⭐⭐⭐ |
| **Netlify** | ⭐ 쉬움 | ⭐⭐⭐ 빠름 | ✅ 넉넉함 | ⭐⭐⭐⭐ |
| **GitHub Pages** | ⭐⭐ 보통 | ⭐⭐ 보통 | ✅ 제한적 | ⭐⭐⭐ |
| **Supabase** | ⭐⭐⭐ 어려움 | ⭐⭐ 보통 | ✅ 제한적 | ⭐⭐ |

---

## 가장 빠른 배포 방법 (5분)

1. **Vercel 사용 (추천)**
   ```bash
   # Vercel CLI 설치
   npm i -g vercel
   
   # 프로젝트 폴더에서
   vercel
   
   # 질문에 답변
   # 완료!
   ```

2. **또는 Netlify 드래그 앤 드롭**
   - netlify.com 접속
   - 프로젝트 폴더 드래그 앤 드롭
   - 완료!

---

## 커스텀 도메인 연결

모든 플랫폼에서 커스텀 도메인을 연결할 수 있습니다:

1. 도메인 구매 (예: Namecheap, GoDaddy)
2. 플랫폼 설정에서 도메인 추가
3. DNS 설정 변경 (플랫폼에서 안내)
4. SSL 인증서 자동 발급

---

## 문제 해결

### CORS 오류
- Supabase 대시보드에서 배포된 URL을 CORS 허용 목록에 추가

### 리소스 로드 실패
- 모든 파일 경로가 상대 경로인지 확인
- CDN 링크가 올바른지 확인

### Supabase 연결 실패
- `supabase-config.js`의 URL과 Key 확인
- 브라우저 콘솔에서 오류 메시지 확인

---

## 추천 순서

1. **처음 배포:** Vercel (가장 쉬움)
2. **GitHub 사용자:** GitHub Pages (통합 편의)
3. **드래그 앤 드롭 선호:** Netlify

가장 추천하는 방법은 **Vercel**입니다! 🚀

