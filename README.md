# AI Development Guidelines

## 프로젝트 개요

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Hosting**: Vercel
- **목표**: 관리자 페이지를 통해 컨텐츠를 관리하고, 일관된 디자인 시스템으로 여러 페이지를 구성
- **금기**: README.md 파일은 절대 수정하지 않는다.

---

## 1. 디자인 시스템 규칙

### 1.1 디자인 컴포넌트 참조

- `/design-system` 폴더의 디자인 폼을 **절대 임의로 수정하지 말것**
- 모든 새 페이지는 기존 디자인 폼을 **파생**하여 구현
- 디자인 폼 파일명: `[ComponentName]Design.tsx`

### 1.2 일관성 유지

- **색상**: `tailwind.config.ts`에 정의된 커스텀 색상만 사용
- **간격**: spacing scale 준수 (4px 단위: `space-4`, `space-8` 등)
- **타이포그래피**: 정의된 텍스트 스타일만 사용 (`text-heading-1`, `text-body` 등)
- **컴포넌트**: 재사용 가능한 UI는 `/components/ui`에 배치

### 1.3 반응형 디자인

- Mobile First 접근
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- 모든 페이지는 최소 3가지 뷰포트에서 테스트 필요

---

## 2. 프로젝트 구조

```
/app                    # Next.js App Router
  /admin               # 관리자 페이지
  /(public)            # 공개 페이지
  /api                 # API Routes
/components
  /ui                  # 재사용 UI 컴포넌트
  /layout              # 레이아웃 컴포넌트
/design-system         # 디자인 폼 (수정 금지)
/lib
  /supabase           # Supabase 클라이언트 & 유틸
  /types              # TypeScript 타입 정의
  /utils              # 헬퍼 함수
/public               # 정적 파일
```

---

## 3. 개발 순서 및 규칙

### 3.1 새 기능 구현 순서 (필수)

**단계별로 순차적으로 진행하며, 각 단계 완료 후 다음으로 이동**

#### Step 1: 타입 정의

```typescript
// /lib/types/[feature].ts
export interface FeatureName {
  id: string;
  title: string;
  created_at: string;
  // ... 모든 필드 정의
}
```

#### Step 2: Supabase 스키마 확인/생성

```sql
-- /supabase/migrations/[timestamp]_[feature].sql
CREATE TABLE feature_name (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Step 3: API 함수 작성

```typescript
// /lib/supabase/[feature].ts
export async function getFeatures() {
  const supabase = createClient();
  const { data, error } = await supabase.from("feature_name").select("*");

  if (error) throw error;
  return data;
}
```

#### Step 4: UI 컴포넌트 개발

- 디자인 폼 참조하여 컴포넌트 작성
- Props 타입 정의 필수
- Loading/Error 상태 처리

#### Step 5: 페이지 통합

- Server Component 우선 사용
- 필요시에만 Client Component (`'use client'`)

---

## 4. Supabase 사용 규칙

### 4.1 클라이언트 생성

```typescript
// Server Component
import { createClient } from "@/lib/supabase/server";

// Client Component
import { createClient } from "@/lib/supabase/client";
```

### 4.2 데이터 페칭 패턴

- **읽기**: Server Component에서 직접 페칭
- **쓰기/수정/삭제**: Server Action 사용
- **실시간**: Client Component에서 subscription

### 4.3 에러 핸들링

```typescript
const { data, error } = await supabase.from("table").select();

if (error) {
  console.error("Supabase Error:", error);
  // 사용자 친화적 에러 메시지 표시
  throw new Error("데이터를 불러오는데 실패했습니다.");
}
```

### 4.4 이미지 업로드

- Storage bucket: `public` 또는 `private`
- 파일명 규칙: `[timestamp]-[uuid].[extension]`
- 최대 크기: 5MB
- 허용 확장자: jpg, png, webp, svg

---

## 5. 관리자 페이지 규칙

### 5.1 인증

- `/app/admin` 경로는 middleware에서 보호
- Supabase Auth 사용
- 세션 만료시 자동 로그아웃

### 5.2 CRUD 패턴

**모든 관리자 기능은 동일한 패턴 따름:**

1. **목록 페이지** (`/admin/[feature]`)
   - 테이블 또는 그리드 뷰
   - 검색/필터 기능
   - 페이지네이션 (10개 단위)

2. **생성/수정 페이지** (`/admin/[feature]/new`, `/admin/[feature]/[id]`)
   - Form validation (react-hook-form + zod)
   - 자동 저장 기능 (선택사항)
   - 취소/저장 버튼

3. **삭제**
   - 확인 모달 필수
   - Soft delete 권장 (deleted_at 컬럼)

### 5.3 파일 업로드 UI

```typescript
// 표준 업로드 컴포넌트 사용
<FileUploader
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  onUpload={handleUpload}
/>
```

---

## 6. 코드 품질 규칙

### 6.1 TypeScript

- `any` 타입 사용 금지
- 모든 함수에 반환 타입 명시
- Props interface 필수 정의

### 6.2 네이밍 컨벤션

- **컴포넌트**: PascalCase (`UserCard.tsx`)
- **함수/변수**: camelCase (`getUserData`)
- **상수**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **타입/인터페이스**: PascalCase (`interface User {}`)

### 6.3 주석

- 복잡한 로직에만 주석 추가
- JSDoc 형식 사용

```typescript
/**
 * 사용자 데이터를 가져와 포맷팅합니다
 * @param userId - 사용자 ID
 * @returns 포맷팅된 사용자 정보
 */
async function getUserData(userId: string): Promise<User> {
  // ...
}
```

### 6.4 성능 최적화

- 이미지는 Next.js `Image` 컴포넌트 사용
- 큰 목록은 가상 스크롤 또는 페이지네이션
- `React.memo`, `useMemo`, `useCallback` 적절히 사용

---

## 7. 배포 전 체크리스트

- [ ] TypeScript 에러 없음 (`npm run build`)
- [ ] ESLint 경고 해결 (`npm run lint`)
- [ ] 환경변수 Vercel에 등록
- [ ] Supabase RLS 정책 활성화
- [ ] 반응형 디자인 테스트 (Mobile/Tablet/Desktop)
- [ ] 이미지 최적화 (webp 변환)
- [ ] 메타 태그 및 OG 이미지 설정
- [ ] 404/500 에러 페이지 확인

---

## 8. 금지 사항

❌ 디자인 폼 원본 수정  
❌ 인라인 스타일 사용 (`style={{}}`)  
❌ `any` 타입 사용  
❌ 하드코딩된 API URL  
❌ console.log 프로덕션 배포  
❌ 민감정보 커밋 (.env 파일)  
❌ Direct DOM 조작 (jQuery 스타일)

---

## 9. 환경변수 템플릿

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 10. AI 작업시 우선순위

1. **타입 안정성** > 기능 구현 속도
2. **기존 패턴 준수** > 새로운 방식 도입
3. **디자인 일관성** > 개별 페이지 최적화
4. **에러 핸들링** > Happy path만 구현
5. **재사용성** > 일회성 코드

---

## 참고 자료

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
