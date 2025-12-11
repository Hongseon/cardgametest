// Vercel 배포 시 환경 변수를 config.js로 주입하는 빌드 스크립트
const fs = require('fs');
const path = require('path');

// 환경 변수에서 Supabase 설정 읽기
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

// config.js 파일 생성
const configContent = `// Supabase 설정 파일 (자동 생성)
// ⚠️ 이 파일은 빌드 시 자동으로 생성됩니다
// 환경 변수에서 Supabase 설정을 읽어옵니다

window.SUPABASE_CONFIG = {
    url: '${supabaseUrl}',
    anonKey: '${supabaseAnonKey}'
};
`;

// config.js 파일 쓰기
const configPath = path.join(__dirname, '../config.js');
fs.writeFileSync(configPath, configContent, 'utf8');

console.log('✅ config.js 파일이 생성되었습니다.');
console.log('Supabase URL:', supabaseUrl ? '설정됨' : '⚠️ 설정되지 않음');
console.log('Supabase Key:', supabaseAnonKey ? '설정됨' : '⚠️ 설정되지 않음');

// 환경 변수가 없으면 경고
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('\n⚠️ 경고: 환경 변수가 설정되지 않았습니다.');
    console.warn('Vercel 대시보드에서 다음 환경 변수를 설정하세요:');
    console.warn('  - SUPABASE_URL');
    console.warn('  - SUPABASE_ANON_KEY');
}

