# 🔒 보안 가이드

## Supabase 키 관리

이 프로젝트는 보안을 위해 Supabase 키를 별도 파일로 분리했습니다.

### 로컬 개발 환경

1. **config.js 파일 생성**
   ```bash
   cp config.example.js config.js
   ```

2. **config.js 파일 편집**
   - `config.example.js`를 복사하여 `config.js` 생성
   - 실제 Supabase URL과 Anon Key 입력
   - `config.js`는 `.gitignore`에 포함되어 Git에 업로드되지 않습니다

### 배포 환경

배포 플랫폼에 따라 환경 변수를 설정하세요:

#### Vercel

1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. 다음 변수 추가:
   - `SUPABASE_URL`: Supabase 프로젝트 URL
   - `SUPABASE_ANON_KEY`: Supabase Anon Key

3. 빌드 설정에서 환경 변수를 주입하도록 설정:
   - Build Command: (비워두기)
   - Output Directory: `.`
   - Install Command: (비워두기)

4. 또는 `vercel.json` 파일 생성:
   ```json
   {
     "buildCommand": "node scripts/inject-env.js",
     "outputDirectory": "."
   }
   ```

#### Netlify

1. Netlify 대시보드 → Site settings → Environment variables
2. 다음 변수 추가:
   - `SUPABASE_URL`: Supabase 프로젝트 URL
   - `SUPABASE_ANON_KEY`: Supabase Anon Key

3. 빌드 설정:
   - Build command: `node scripts/inject-env.js` (선택사항)
   - Publish directory: `.`

#### GitHub Pages

GitHub Pages는 환경 변수를 직접 지원하지 않으므로:
- `config.js` 파일을 수동으로 생성하여 배포
- 또는 GitHub Actions를 사용하여 빌드 시 환경 변수 주입

### 환경 변수 주입 스크립트 (선택사항)

배포 시 환경 변수를 자동으로 주입하려면 `scripts/inject-env.js` 파일을 생성:

```javascript
const fs = require('fs');
const path = require('path');

const configTemplate = `window.SUPABASE_CONFIG = {
    url: '${process.env.SUPABASE_URL || ''}',
    anonKey: '${process.env.SUPABASE_ANON_KEY || ''}'
};`;

fs.writeFileSync(
    path.join(__dirname, '../config.js'),
    configTemplate
);
```

### ⚠️ 중요 보안 사항

1. **절대 Git에 키를 커밋하지 마세요**
   - `config.js`는 `.gitignore`에 포함되어 있습니다
   - `config.example.js`만 Git에 포함됩니다 (템플릿)

2. **Anon Key는 공개되어도 괜찮지만**
   - Row Level Security (RLS)가 올바르게 설정되어 있는지 확인하세요
   - Supabase 대시보드에서 RLS 정책을 확인하세요

3. **Service Role Key는 절대 사용하지 마세요**
   - Service Role Key는 서버 사이드에서만 사용해야 합니다
   - 클라이언트 사이드에서는 Anon Key만 사용하세요

4. **CORS 설정 확인**
   - Supabase 대시보드 → Settings → API
   - 배포된 도메인을 "Allowed CORS origins"에 추가하세요

### 파일 구조

```
newcardgame/
├── config.js          # 실제 키 (Git에 업로드 안됨)
├── config.example.js # 템플릿 (Git에 업로드됨)
├── supabase-config.js # 설정 읽기 로직
└── .gitignore        # config.js 제외
```

### 문제 해결

**키가 작동하지 않는 경우:**
1. `config.js` 파일이 존재하는지 확인
2. `window.SUPABASE_CONFIG` 객체가 올바르게 설정되었는지 브라우저 콘솔에서 확인
3. 배포 환경에서는 환경 변수가 올바르게 설정되었는지 확인

**브라우저 콘솔에서 확인:**
```javascript
console.log(window.SUPABASE_CONFIG);
```

