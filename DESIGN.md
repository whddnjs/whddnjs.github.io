# Jekyll + GitHub Pages 개인 블로그 설계서

## 1. 프로젝트 목표

개인적인 기록과 지식 정리를 위한 정적 블로그를 구축한다.

주제는 고정하지 않는다.

대부분 개발 관련 글이 될 수 있지만, 필요에 따라 어떤 주제든 자유롭게 작성할 수 있다.

블로그의 핵심 목적은 다음과 같다.

- 개발 지식 정리
- 트러블슈팅 기록
- 기술 학습 기록
- 개인 메모
- 자유로운 기타 포스트

모든 게시글은 직접 검토 후 수동으로 Git에 commit/push하여 발행한다.

---

# 2. 핵심 원칙

블로그는 최대한 단순한 정적 사이트 구조를 유지한다.

```text
Markdown 작성
      ↓
직접 검토
      ↓
git commit / push
      ↓
GitHub Actions
      ↓
검증
      ↓
Jekyll Build
      ↓
GitHub Pages
```

서버나 별도의 백엔드 시스템 없이 GitHub만으로 운영할 수 있어야 한다.

---

# 3. 기술 스택

```text
Static Site Generator
└── Jekyll

Hosting
└── GitHub Pages

CI/CD
└── GitHub Actions

Template
├── HTML
└── Liquid

Style
└── SCSS

Client
└── Vanilla JavaScript

Content
└── Markdown

Font
├── Pretendard
└── JetBrains Mono

Comments
└── giscus

Diagram
└── Mermaid

Math
└── KaTeX
```

기존 Jekyll 테마는 사용하지 않는다.

UI를 직접 구현한다.

---

# 4. 사이트 주소

GitHub 사용자 Pages를 사용한다.

```text
https://<username>.github.io
```

Repository:

```text
<username>.github.io
```

URL 관련 설정은 `_config.yml`에서 관리한다.

---

# 5. 디렉터리 구조

```text
<username>.github.io/
│
├── _config.yml
├── Gemfile
├── index.html
├── 404.html
│
├── _posts/
│
├── _layouts/
│   ├── default.html
│   ├── home.html
│   ├── post.html
│   └── archive.html
│
├── _includes/
│   ├── header.html
│   ├── footer.html
│   ├── hero.html
│   ├── post-list.html
│   ├── post-meta.html
│   ├── toc.html
│   ├── giscus.html
│   ├── code-block.html
│   └── callout.html
│
├── _data/
│   └── tags.yml
│
├── _templates/
│   └── post.md
│
├── assets/
│   ├── css/
│   │   └── main.scss
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── theme.js
│   │   ├── search.js
│   │   ├── infinite-scroll.js
│   │   ├── toc.js
│   │   ├── code.js
│   │   ├── lightbox.js
│   │   └── reading-progress.js
│   │
│   └── images/
│       └── posts/
│
├── scripts/
│   ├── validate-posts.*
│   └── validate-links.*
│
├── pages/
│   ├── about.md
│   ├── archive.html
│   └── tags.html
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

# 6. URL 구조

게시글 URL은 다음 구조를 사용한다.

```text
/posts/:year/:month/:day/:slug/
```

예:

```text
/posts/2026/08/18/angular-signals/
/posts/2026/08/18/git-stash-conflict/
/posts/2026/08/18/my-notes/
```

Jekyll 설정:

```yaml
permalink: /posts/:year/:month/:day/:title/
timezone: Asia/Seoul
```

블로그의 날짜와 시간은 KST 기준으로 관리한다.

---

# 7. 콘텐츠 분류

카테고리는 사용하지 않는다.

게시글은 모두 동일한 구조로 관리한다.

필요한 경우 `tags`를 이용해 글을 분류한다.

예:

```yaml
tags:
  - angular
  - typescript
  - signals
```

또는:

```yaml
tags:
  - git
  - troubleshooting
```

또는:

```yaml
tags:
  - jekyll
  - github-pages
```

태그는 글 성격에 따라 자유롭게 추가한다.

---

# 8. Front Matter

모든 게시글은 동일한 기본 Front Matter 구조를 사용한다.

```yaml
---
layout: post

title: "Angular Signals 정리"
description: "Angular Signals의 기본 개념과 사용 방법"

date: 2026-08-18 10:30:00 +0900
updated: 2026-08-20 14:20:00 +0900

tags:
  - angular
  - typescript
  - signals

slug: angular-signals

toc: true
comments: true
---
```

`updated`는 수정이 없는 경우 생략 가능하다.

`comments`와 `toc`는 게시글별로 켜고 끌 수 있다.

---

# 9. 글 작성 템플릿

공통 게시글 템플릿 하나만 사용한다.

```text
_templates/post.md
```

기본 구조:

```yaml
---
layout: post
title: ""
description: ""
date:
updated:
tags: []
slug:
toc: true
comments: true
---
```

본문 구조는 자유롭게 작성한다.

---

# 10. Home

홈 화면은 미니멀한 구조로 만든다.

```text
┌─────────────────────────────────────────┐
│ Header                                  │
├─────────────────────────────────────────┤

 Blog Name

 Development, notes and things
 worth remembering.


 Latest Posts

 Angular Signals 정리
 Aug 18 · 8 min read

 Angular Signals의 기본 개념과
 주요 특징을 정리한 글입니다.


 Git stash 충돌 해결
 Aug 17 · 4 min read

 stash pop 과정에서 발생한 충돌을
 정리했습니다.


 View all posts →
```

홈에는 최신 게시글 10개를 표시한다.

---

# 11. Hero

홈 상단에 작은 Hero 영역을 둔다.

```text
Blog Name

Development, notes and things
worth remembering.
```

블로그 이름과 설명 문구는 `_config.yml`에서 관리한다.

---

# 12. Header

Desktop:

```text
[Blog]    Home    Tags    Archive    About          Search   Theme
```

메뉴:

- Home
- Tags
- Archive
- About
- Search
- Theme Toggle

Header는 스크롤 중에도 상단에 고정한다.

---

# 13. Mobile Header

모바일:

```text
[Blog]                         Search  Theme  ☰
```

메뉴 일부는 햄버거 메뉴 안에 배치한다.

별도의 하단 Navigation은 사용하지 않는다.

---

# 14. Theme

지원 모드:

```text
Light
Dark
System
```

최초 방문 시 `prefers-color-scheme`을 이용해 OS 설정을 따른다.

사용자가 직접 변경하면 선택값을 `localStorage`에 저장한다.

---

# 15. Layout Width

홈/목록:

```text
약 1000~1100px
```

게시글 본문:

```text
약 760px
```

TOC 포함 게시글 전체:

```text
약 1100~1200px
```

모든 레이아웃은 반응형으로 구현한다.

---

# 16. 게시글 페이지

Desktop 구조:

```text
              Post                       Contents

       Angular Signals 정리              Overview
                                         Signals
   Aug 18 · Updated Aug 20               computed
   8 min read                            effect

   ──────────────────────

   본문

   코드

   이미지

   Callout

   본문


   Tags

   angular
   typescript
   signals


   Copy link
   View on GitHub


   Previous              Next


   Comments
```

---

# 17. 게시글 Meta

제목 아래에는 다음 정보를 표시한다.

```text
작성일
수정일
예상 읽기 시간
```

예:

```text
Aug 18, 2026 · Updated Aug 20, 2026 · 8 min read
```

태그는 본문 하단에 표시한다.

---

# 18. TOC

게시글별로 TOC를 활성화할 수 있다.

```yaml
toc: true
```

Desktop:

```text
오른쪽 Sticky TOC
```

Mobile:

```text
본문 상단 Collapsible TOC
```

현재 읽고 있는 Heading을 표시하도록 구현한다.

---

# 19. Reading UX

지원 기능:

- Reading Progress Bar
- TOC
- Back to Top
- Copy Link
- Previous / Next
- Estimated Reading Time
- Updated Date
- Series Navigation

Reading Progress Bar는 고정 Header 아래에 얇게 표시한다.

Back to Top 버튼은 일정 이상 스크롤했을 때 오른쪽 하단에 표시한다.

---

# 20. Series

필요한 게시글만 선택적으로 시리즈 기능을 사용할 수 있다.

예:

```yaml
series:
  name: angular-signals
  order: 1
```

시리즈 글이면 같은 시리즈의 이전/다음 글을 우선 표시한다.

일반 글은 작성일 기준 이전/다음 글을 표시한다.

---

# 21. 코드 블록

개발 글을 위해 다음 기능을 지원한다.

- Syntax Highlighting
- Language 표시
- Filename 표시
- Copy 버튼
- Line Numbers
- 특정 Line Highlight

예:

```text
app.component.ts                        Copy

01  import { Component } from '@angular/core';
02
03  @Component({
04    ...
05  })
```

코드 폰트는 JetBrains Mono를 사용한다.

---

# 22. Mermaid

Markdown 게시글에서 Mermaid 다이어그램을 지원한다.

필요한 페이지에서만 Mermaid 관련 JavaScript를 로드하는 것을 우선한다.

---

# 23. KaTeX

수학식 렌더링을 위해 KaTeX를 지원한다.

Inline / Block 수식을 지원한다.

가능하면 수식이 존재하는 게시글에서만 관련 리소스를 로드한다.

---

# 24. Callout

다음 Callout 타입을 지원한다.

```text
Note
Tip
Warning
Important
```

Markdown에서 쉽게 사용할 수 있는 규칙을 정의한다.

---

# 25. 이미지

이미지는 게시글별 디렉터리로 관리한다.

```text
assets/images/posts/:slug/
```

예:

```text
assets/images/posts/angular-signals/
├── signal-flow.png
├── example.png
└── result.png
```

이미지는 기본적으로 lazy loading한다.

---

# 26. Lightbox

게시글 본문의 이미지를 클릭하면 확대해서 볼 수 있도록 한다.

지원:

- 이미지 확대
- ESC 닫기
- 배경 클릭 닫기
- 키보드 접근
- Focus 관리

---

# 27. Comments

giscus를 사용한다.

댓글 활성화 여부는 게시글별로 결정한다.

```yaml
comments: true
```

또는:

```yaml
comments: false
```

---

# 28. Tags

태그 페이지:

```text
/tags/
```

예:

```text
Tags

Angular  12
TypeScript  9
Git  7
Jekyll  4
```

태그를 선택하면 해당 태그의 게시글을 최신순으로 보여준다.

---

# 29. Search

Header에서 검색 버튼을 누르면 전체 화면 Search Overlay를 연다.

검색 대상:

```text
title
description
tags
```

본문 전체 검색은 v1에서 제외한다.

검색 결과는 페이지네이션 없이 한 번에 표시한다.

Search Overlay는 다음을 지원한다.

- ESC 닫기
- Focus Trap
- Keyboard Navigation

---

# 30. Archive

URL:

```text
/archive/
```

모든 글을 날짜 기준으로 보여준다.

예:

```text
2026

August

Angular Signals 정리
Git stash 충돌 해결
Jekyll 블로그 구축 기록

July

...
```

---

# 31. Infinite Scroll

Archive 및 긴 게시글 목록은 무한 스크롤을 지원한다.

초기 약 20개 게시글을 표시한다.

스크롤이 하단에 접근하면 다음 글 묶음을 로드한다.

구현은 `IntersectionObserver`를 사용한다.

---

# 32. Previous / Next

게시글 하단:

```text
← Previous                           Next →
```

일반 글은 작성일 기준으로 연결한다.

시리즈 글은 동일 시리즈 기준을 우선한다.

---

# 33. Copy Link

게시글 하단에 `Copy link` 버튼을 제공한다.

클릭하면 현재 게시글 URL을 Clipboard에 복사한다.

---

# 34. View on GitHub

게시글 하단:

```text
View on GitHub ↗
```

해당 게시글의 `_posts/*.md` 파일로 연결한다.

---

# 35. SEO

검색 유입이 주요 목적은 아니지만 기본 메타데이터는 구성한다.

지원:

- title
- description
- canonical
- Open Graph
- sitemap
- RSS

---

# 36. RSS

전체 RSS 하나만 제공한다.

```text
/feed.xml
```

---

# 37. About

URL:

```text
/about/
```

향후 다음 정보를 넣을 수 있다.

- Profile
- Short Bio
- Tech Stack
- GitHub
- Projects

홈에는 별도의 Profile Card를 만들지 않는다.

---

# 38. 404

커스텀 404 페이지를 구현한다.

```text
404

Page not found.

Back to Home
```

Light/Dark Theme을 지원한다.

---

# 39. Font

본문/UI:

```text
Pretendard
```

Code:

```text
JetBrains Mono
```

폰트 로딩으로 초기 렌더링이 과도하게 지연되지 않도록 최적화한다.

---

# 40. 디자인 방향

전체 디자인은 `Minimal Developer Blog` 스타일로 한다.

특징:

- 콘텐츠 중심
- 넓은 여백
- 제한된 색상
- 과도한 카드 UI 지양
- 불필요한 애니메이션 지양
- Typography 중심
- Light/Dark 모두 자연스럽게 표시

---

# 41. Accessibility

초기 구현부터 기본 접근성을 고려한다.

지원:

- Semantic HTML
- Keyboard Navigation
- Visible Focus
- 적절한 ARIA
- Color Contrast
- Focus Trap
- ESC 동작
- `prefers-reduced-motion`

Search, Mobile Menu, Lightbox 등의 UI는 키보드만으로 사용할 수 있어야 한다.

---

# 42. Performance

정적 사이트의 장점을 최대한 유지한다.

적용:

- 최소한의 Vanilla JS
- JS defer
- CSS minification
- Image lazy loading
- Font loading 최적화
- 필요한 페이지에서만 Mermaid 로딩
- 필요한 페이지에서만 KaTeX 로딩
- 불필요한 외부 라이브러리 제거

---

# 43. Browser Support

지원:

- 최신 Chrome
- 최신 Safari
- 최신 Edge
- 최신 Firefox

---

# 44. GitHub Actions

GitHub Actions는 사이트 검증 및 배포에 사용한다.

파일:

```text
.github/workflows/deploy.yml
```

Trigger:

```text
main branch push
```

---

# 45. Deploy Pipeline

```text
main push
    ↓
Checkout
    ↓
Dependencies
    ↓
Validate Posts
    ↓
Validate Internal Links
    ↓
Jekyll Build
    ↓
GitHub Pages Artifact
    ↓
GitHub Pages Deploy
```

검증 또는 build가 실패하면 배포하지 않는다.

---

# 46. Post Validation

배포 전에 게시글 Front Matter를 검증한다.

필수:

```text
layout
title
description
date
tags
slug
```

선택:

```text
updated
toc
comments
series
```

---

# 47. Internal Link Validation

배포 전에 내부 링크를 검사한다.

검사:

- 게시글 링크
- 내부 페이지
- 이미지 경로
- Static Asset 경로

외부 URL은 배포 차단 검증 대상에서 제외한다.

---

# 48. 콘텐츠 작성 Workflow

```text
주제 선정
    ↓
직접 작성 또는 AI로 초안 작성
    ↓
내용 확인
    ↓
Markdown 작성
    ↓
_posts/
    ↓
git commit
    ↓
git push
    ↓
GitHub Actions
    ↓
GitHub Pages
```

---

# 49. 최종 사용자 흐름

홈:

```text
Blog
 ↓
Latest Posts
 ↓
게시글
```

특정 주제:

```text
Tags
 ↓
Angular
 ↓
관련 게시글
```

과거 글:

```text
Archive
 ↓
Year
 ↓
Month
 ↓
Post
```

검색:

```text
Search
 ↓
Title / Description / Tags
 ↓
Post
```

---

# 50. 최종 기술 구조

```text
Jekyll
   +
GitHub Pages
   +
GitHub Actions
   +
Markdown
   +
Liquid
   +
SCSS
   +
Vanilla JavaScript
```

---

# 51. 구현 순서

## Phase 1 — Foundation

```text
Jekyll
Repository Structure
_config.yml
Gemfile
Base Layout
SCSS
Fonts
Header
Responsive Navigation
Theme System
```

## Phase 2 — Content

```text
Post Layout
Front Matter
Home
Latest Posts
Archive
Tags
About
404
Post Template
```

## Phase 3 — Reading UX

```text
TOC
Reading Time
Reading Progress
Back to Top
Previous / Next
Series
Copy Link
View on GitHub
```

## Phase 4 — Rich Content

```text
Code Block
Syntax Highlight
Filename
Copy Code
Line Numbers
Line Highlight
Mermaid
KaTeX
Callout
Image Lightbox
```

## Phase 5 — Discovery

```text
Search Index
Search Overlay
Tags
Archive Infinite Scroll
```

## Phase 6 — Comments / Metadata

```text
giscus
RSS
Sitemap
Open Graph
Canonical
Basic SEO
```

## Phase 7 — CI/CD

```text
Post Validation
Internal Link Validation
Jekyll Build
GitHub Pages Deploy
```

## Phase 8 — Final QA

```text
Responsive QA
Light/Dark QA
Keyboard Navigation
Accessibility
Performance
Browser Testing
Build Verification
```

---

# 52. 구현 원칙

설계서에 명시되지 않은 기능을 임의로 추가하지 않는다.

Jekyll/Liquid/HTML/CSS만으로 해결 가능한 기능은 해당 방식으로 우선 구현한다.

JavaScript가 필요한 기능은 작은 독립 모듈로 구현한다.

Light/Dark Theme 모두에서 동일한 정보 구조와 가독성을 유지한다.

모바일은 별도 사이트가 아니라 동일한 HTML 구조를 반응형으로 처리한다.

실제 Jekyll/GitHub Pages 제약과 설계가 충돌하면 이유와 대안을 문서화한다.

---

# 53. 최종 목표

이 프로젝트는 자유롭게 글을 쓰고 나중에 쉽게 다시 찾기 위한 개인 지식 아카이브다.

대부분 개발 관련 글이 될 수 있지만 특정 주제에 종속되지 않는다.

핵심 우선순위:

```text
Readability
    ↓
Simplicity
    ↓
Maintainability
    ↓
Performance
    ↓
Visual Polish
```