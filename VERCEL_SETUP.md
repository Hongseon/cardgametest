# 🚀 Vercel 배포 설정 가이드

Vercel에서 Supabase 키를 환경 변수로 설정하는 방법입니다.

## 1단계: Vercel 프로젝트 생성

1. [vercel.com](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. "Add New Project" 클릭
4. `Hongseon/cardgametest` 저장소 선택
5. 프로젝트 설정:
   - Framework Preset: **Other**
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (자동 설정됨)
   - Output Directory: `.` (기본값)
   - Install Command: `npm install` (자동 설정됨)

## 2단계: 환경 변수 설정

### 방법 1: Vercel 대시보드에서 설정 (추천)

1. Vercel 프로젝트 대시보드로 이동
2. **Settings** → **Environment Variables** 클릭
3. 다음 환경 변수 추가:

   **변수 1:**
   - Name: `SUPABASE_URL`
   - Value: `https://your-project-id.supabase.co` (실제 Supabase 프로젝트 URL로 변경)
   - Environment: `Production`, `Preview`, `Development` 모두 선택
   - **Save** 클릭

   **변수 2:**
   - Name: `SUPABASE_ANON_KEY`
   - Value: `your-supabase-anon-key-here` (실제 Supabase Anon Key로 변경)
   - Environment: `Production`, `Preview`, `Development` 모두 선택
   - **Save** 클릭

   ⚠️ **주의:** 실제 Supabase URL과 Anon Key는 Supabase 대시보드 → Settings → API에서 확인할 수 있습니다.

### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 폴더에서
vercel env add SUPABASE_URL
# 프롬프트에 따라 값 입력

vercel env add SUPABASE_ANON_KEY
# 프롬프트에 따라 값 입력
```

## 3단계: 배포

환경 변수를 설정한 후:

1. **Deployments** 탭으로 이동
2. 최신 배포 옆의 **"..."** 메뉴 클릭
3. **"Redeploy"** 선택
4. 또는 새로운 커밋을 푸시하면 자동으로 재배포됩니다

## 4단계: 확인

배포가 완료되면:

1. 배포된 URL로 접속
2. 브라우저 개발자 도구 (F12) → Console 탭
3. 다음 명령어로 설정 확인:
   ```javascript
   console.log(window.SUPABASE_CONFIG);
   ```
4. 게임을 플레이하고 점수 저장 기능 테스트

## 빌드 프로세스

Vercel은 다음 순서로 빌드합니다:

1. `npm install` - 의존성 설치
2. `npm run build` - 빌드 스크립트 실행
   - `scripts/build.js`가 실행됨
   - 환경 변수를 읽어서 `config.js` 파일 생성
3. 배포

## 문제 해결

### 환경 변수가 적용되지 않는 경우

1. **환경 변수 확인**
   - Vercel 대시보드 → Settings → Environment Variables
   - 변수 이름이 정확한지 확인 (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)

2. **재배포**
   - 환경 변수 추가 후 반드시 재배포 필요
   - Deployments → Redeploy

3. **빌드 로그 확인**
   - Vercel 대시보드 → Deployments → 최신 배포 클릭
   - Build Logs에서 오류 확인

4. **로컬에서 테스트**
   ```bash
   # 환경 변수 설정 (실제 값으로 변경하세요)
   export SUPABASE_URL="https://your-project-id.supabase.co"
   export SUPABASE_ANON_KEY="your-supabase-anon-key-here"
   
   # 빌드 실행
   npm run build
   
   # 생성된 config.js 확인
   cat config.js
   ```

### 빌드 오류

- `npm install` 실패: `package.json` 확인
- `npm run build` 실패: `scripts/build.js` 확인
- Node.js 버전 문제: Vercel은 자동으로 최신 LTS 버전 사용

## 환경 변수 보안

✅ **안전한 방법:**
- Vercel 환경 변수 사용 (이 방법)
- 키가 코드에 하드코딩되지 않음
- Git에 키가 노출되지 않음

❌ **피해야 할 방법:**
- `config.js`를 Git에 커밋
- 코드에 키를 직접 작성

## 추가 설정

### 커스텀 도메인

1. Vercel 대시보드 → Settings → Domains
2. 도메인 추가
3. DNS 설정 안내에 따라 설정

### Supabase CORS 설정

배포 후 Supabase CORS에 도메인 추가:

1. Supabase 대시보드 → Settings → API
2. "Allowed CORS origins"에 추가:
   - `https://your-project.vercel.app`
   - 커스텀 도메인 사용 시 해당 도메인도 추가

## 완료!

이제 Vercel에서 안전하게 배포할 수 있습니다! 🎉

