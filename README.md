# Hellicer Website

## Огляд проекту

Це проект сайту-портфоліо/лендингу на базі Next.js з App Router. Основна мета — показати компетенції розробника/команди, проєкти, стек технологій та можливість зв’язку через форму контакту. Візуально сайт включає хедер, hero-блок, секції спеціалізації, профілю, проєктів і контакту, а також динамічну локалізацію і тему інтерфейсу.

Сайт поєднує кілька джерел даних:

- проєкти беруться з GitHub API і синхронізуються в PostgreSQL через Prisma;
- профільні дані і статистика завантажуються з GitHub Gists;
- локалізація працює через `next-intl`;
- форма профілю/контакту частково інтегрована з Supabase і GitHub Gists.

## Технологічний стек

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL
- `next-intl` для локалізації (`en`, `uk`)
- GitHub REST API для репозиторіїв і gists
- Supabase для роботи з сесіями/завантаженням файлів
- Radix UI, lucide-react, motion, gsap, Recharts, Swiper

## Структура проекту

```text
.
├── .github/                 # GitHub-related config (if present in repo)
├── prisma/
│   ├── schema.prisma        # Prisma models and enums
│   ├── migrations/          # DB migration files
│   └── seed.ts              # Prisma seed script
├── public/                  # Static assets
├── scripts/
│   └── dev-with-lan-ip.mjs  # Dev server script for LAN access
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── github/repos/route.ts
│   │   │   └── profile/submit/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── githubApi.ts
│   │   ├── profileClientApi.ts
│   │   └── profileStatApi.ts
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── charts/
│   ├── data/
│   │   ├── projects.data.ts
│   │   ├── UserData.ts
│   │   └── techNames.ts
│   ├── features/
│   │   ├── change-language/
│   │   └── switcher-theme/
│   ├── fonts/
│   ├── i18n/
│   │   ├── request.ts
│   │   └── translations/
│   ├── interfaces/
│   ├── lib/
│   │   ├── github.ts
│   │   ├── prisma.ts
│   │   ├── projectPreview.ts
│   │   └── utils.ts
│   ├── shared/
│   ├── types/
│   │   ├── github.ts
│   │   ├── profile.ts
│   │   └── TProfileStat.ts
│   └── swiper.css
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
├── pnpm-lock.yaml
├── README.md
└── .gitignore
```

## Ключові файли та їх роль

### `src/app/page.tsx`

Головна сторінка. Тут створюється `NextIntlClientProvider`, завантажуються мови і локальні переклади, а потім рендериться основний макет з хедером, блоком проєктів і секціями контенту.

### `src/components/layout/Main/page.tsx`

Основний контейнер сторінки. Логіка завантаження даних для профілю та проєктів, а також композиція секцій:

- `HeaderShell`
- `GlobeWrapper`
- `SpecializationCards`
- `LazyAboutSection`
- `ProjectContentBlock`

### `src/lib/github.ts`

Сутність синхронізації GitHub-репозиторіїв в базу даних. Приймає дані з GitHub API, нормалізує їх до `ProjectDto` і записує в Prisma (`githubProject`). Використовується для оновлення каталогу проєктів.

### `src/api/githubApi.ts`

Низькорівневий клієнт до GitHub REST API. Тут валідуються відповіді, конвертуються репозиторії і gists у типізовані DTO, а також формується URL прев’ю через `buildGithubPreviewUrl`.

### `src/api/profileStatApi.ts`

Розбирає GitHub Gists, які містять JSON зі статистикою профілю: основна інформація, навички, radar chart і посилання. Це основне джерело для віджета профілю на сторінці.

### `src/app/api/github/repos/route.ts`

REST-ендпоінт для отримання даних про проєкти. При запиті без `?sync=0` виконується синхронізація з GitHub і повертається актуальний список проєктів.

### `src/app/api/profile/submit/route.ts`

Ендпоінт для створення профільного gist з даними користувача. Виконує валідацію форми, перевіряє розмір фото, завантажує файл у bucket Supabase, а потім публікує JSON-опис у GitHub Gist.

### `prisma/schema.prisma`

Модель даних для PostgreSQL. Серед сутностей є:

- `User`
- `Post`
- `Create`
- `GithubProject`

Зверніть увагу: деякі моделі виглядають як стартовий шаблон або залишки базового scaffold; активна логіка сайту зосереджена навколо `GithubProject`.

## Як працює сайт

### 1) Проєкти

Потік даних для секції проєктів:

1. `src/api/githubApi.ts` отримує список репозиторіїв користувача з GitHub API.
2. `src/lib/github.ts` нормалізує поля репозиторіїв у формат `ProjectDto`.
3. Дані зберігаються в базі PostgreSQL через Prisma (`githubProject`).
4. `src/components/layout/Main/page.tsx` бере дані через `getGithubProjectsFromDb()`.
5. `ProjectContentBlock` відображає їх у UI.

Якщо база не доступна або вернула порожній список, код використовує резервний масив з `src/data/projects.data.ts`.

### 2) Профіль і статистика

Профільна секція завантажує JSON-файли через GitHub Gists і трансформує їх у формат `ProfileDataShape` у `src/api/profileStatApi.ts`.

Там очікуються дані типу:

- `mainInfo`
- `skills`
- `techStack`
- `projects`
- `otherInfo.skillsChart`
- `stats.wakatime`
- `links`

### 2.1) Логіка роботи бекенду з GitHub

Бекенд у цьому проєкті — це не окремий сервіс, а серверна частина Next.js у папці `src/app/api` і `src/lib`. Основна роль GitHub тут двояка: з одного боку, бекенд "читает" репозиторії і gists зі зовнішнього GitHub, а з іншого — пише/створює профільні gists для заповнення даних користувача.

#### 1. Отримання списку репозиторіїв

Файл `src/api/githubApi.ts` містить низькорівневий клієнт для GitHub REST API.

Потік такий:

1. `fetchGithubProjects()` перевіряє наявність `GITHUB_USERNAME` і `GITHUB_TOKEN`.
2. Якщо змінні є, виконує GET запит до:
   `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
3. Запит обов’язково має заголовки:
    - `Authorization: Bearer <token>`
    - `Accept: application/vnd.github+json`
    - `X-GitHub-Api-Version: 2022-11-28`
4. Якщо GitHub повернув помилку, виникає `Error` з текстом статусу і деталями відповіді.
5. Відповідь проходить валідацію через `parseGithubRepos()` — перевіряється, що кожен елемент відповідає очікуваному формату `GithubRepo`.
6. Далі кожен репозиторій перетворюється в DTO через `mapGithubRepoToProject()`.

У `mapGithubRepoToProject()` виконується нормалізація даних:

- `id` -> `String(repo.id)`
- `title` -> `repo.name`
- `description` -> `repo.description ?? 'No description provided.'`
- `status` -> `repo.archived ? 'archived' : 'online'`
- `stack` -> завжди `'fullstack'` для GitHub-репозиторіїв цього проекту
- `tech` -> `[repo.language, ...(repo.topics ?? [])]` з фільтрацією порожніх значень
- `liveUrl` -> `repo.homepage`, якщо є
- `codeUrl` -> `repo.html_url`
- `previewUrl` -> генерується через `buildGithubPreviewUrl({ owner, repository, branch })`

#### 2. Синхронізація в базу даних

Коли дані з GitHub зібрані, вони не відразу надходять у UI. Спочатку вони зберігаються в PostgreSQL через Prisma.

Файл `src/lib/github.ts` містить дві основні функції:

- `syncGithubProjectsToDb()`
- `getGithubProjectsFromDb()`

Логіка синхронізації така:

1. Викликається `fetchGithubProjects()`.
2. Отримується Prisma клієнт через `getPrismaClient()`.
3. Відкривається транзакція `prisma.$transaction(async tx => { ... })`.
4. Спочатку виконується `tx.githubProject.deleteMany()` — це очищає таблицю, щоб уникнути застарілих записів.
5. Якщо список репозиторіїв порожній, функція завершується рано.
6. Інакше виконується `tx.githubProject.createMany({...})` з нормалізованими даними.

Це означає, що база даних є фактично кешем/знімком GitHub-стану на момент синхронізації, а не живим джерелом даних.

#### 3. API-роут для отримання проєктів

Файл `src/app/api/github/repos/route.ts` є HTTP-ендпоінтом для фронтенду або зовнішніх клієнтів.

Логіка GET:

- `dynamic = 'force-dynamic'` — відповідь завжди актуальна, без кешування Next.js.
- перевіряється параметр `sync`:
    - якщо `sync != 0`, запускається `syncGithubProjectsToDb()`
    - це дозволяє оновлювати дані при кожному зверненні до API, якщо не відключено
- потім викликається `getGithubProjectsFromDb()`
- якщо в базі нічого немає, запускається повторна синхронізація і повторний запит
- у кінці повертається JSON-список проєктів

Тобто цей API є точкою, через яку бекенд "підтягує" latest state GitHub і надає його фронтенду.

#### 4. Робота з GitHub Gists для профілю

Профільна інформація не зчитується з репозиторіїв, а з Gists. Це окремий інструмент для динамічного профілю.

Файл `src/api/profileStatApi.ts` відповідає за це.

Логіка:

1. `fetchGithubGists()` отримує список gists користувача з GitHub API.
2. Серед gists відбираються ті, де:
    - опис містить слово `statgist`, або
    - ім’я файла містить `statgist`, або
    - файл є JSON-файлом
3. Відбираються raw URL-адреси файлів.
4. Для кожного raw URL викликається `fetch(rawUrl)`.
5. JSON перевіряється через `isProfileStatGistPayload()`.
6. Якщо структура валідна, дані перетворюються в `ProfileDataShape` через `mapProfileStatToProfileData()`.
7. Потім цей профіль підтягується в UI як актуальна статистика.

Це дає можливість робити профільну інформацію "безпечним чином" незалежно від основного сайту: дані лежать у gist JSON, а frontend просто читає їх як структуровану конфігурацію.

#### 5. Створення профільного gist з форми

Файл `src/app/api/profile/submit/route.ts` відповідає за створення профільного JSON у GitHub Gist після сабміту форми.

Потік:

1. Очікується `formData` з полем `payload` (JSON з даними профілю).
2. `normalizePayload()` валідно парсить структуру й переводить її в тип `ProfileSubmissionPayload`.
3. `validateSubmissionPayload()` перевіряє обов’язкові поля:
    - ім’я
    - посада
    - вік
    - технічний стек
    - мінімальна довжина навичок
4. Якщо передано `photo`, виконується перевірка розміру (`MAX_PHOTO_SIZE_BYTES = 1 MB`).
5. Фото/документи можуть бути завантажені в Supabase bucket.
6. Після валідації формуються дані для gist в форматі:
    - `mainInfo`
    - `skills`
    - `techStack`
    - `projects`
    - `otherInfo.skillsChart`
    - `stats.wakatime`
    - `links`
7. Виконується POST-запит на `https://api.github.com/gists` з токеном GitHub.
8. У разі успіху бекенд отримує `gist.id` і `gist.html_url`.

Це означає, що форма профілю не зберігає дані локально в базі — вона створює публічний GitHub gist, який потім легко читати і оновлювати.

#### 6. Важливі принципи

- GitHub тут є джерелом даних, а не просто шаблоном для відображення.
- База даних (`GithubProject`) — це локальний кеш для проєктів, синхронізований по запиту.
- Gists використовуються як легка CMS/структура для профільних даних.
- Функціонал побудований на принципі: "не кешувати все надовго, а оновлювати по запиту або при потрібному тригері".
- Якщо GitHub API недоступний або база порожня, проект падає на резервний масив `src/data/projects.data.ts`.

Це дає простий, але ефективний бекенд-архід: GitHub як зовнішнє API, Prisma як локальний кеш, а Next.js API routes як шар інтеграції між ними і UI.

### 3) Локалізація

- Підтримуються локалі `en` і `uk`.
- У `src/i18n/request.ts` вибирається мова за `MYNEXTAPP_LOCALE` cookie.
- Якщо cookie не встановлений, використовується `en`.
- Переклади лежать в `src/i18n/translations/`.

### 4) Тема і перемикач мови

У папці `src/features/` є окремі модулі для перемикача локалі та теми. Сайт має інтерфейс, який адаптується під тему і мову користувача.

## Налаштування середовища

Для локального запуску необхідно створити `.env.local` або налаштувати `.env` з такими змінними:

```bash
DATABASE_URL=postgresql://user:password@host:5432/dbname
# або
PRISMA_DATABASE_URL=postgresql://user:password@host:5432/dbname
DIRECT_URL=postgresql://user:password@host:5432/dbname

GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token

NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_PROFILE_UPLOADS_BUCKET=profile-uploads

PORT=3000
```

Примітка: у проекті є `@prisma/adapter-pg`, тому база повинна бути PostgreSQL-сумісною.

## Команди запуску

Рекомендовано використовувати `pnpm`, оскільки у `package.json` вказаний `packageManager: pnpm@10.9.0`.

```bash
pnpm install
pnpm prisma generate
pnpm dev
```

Додаткові команди:

```bash
pnpm build
pnpm start
pnpm lint
npx prisma db push
npx prisma migrate dev
```

## Примітки про dev-сервер

Файл `scripts/dev-with-lan-ip.mjs` запускає Next.js у режимі dev і одночасно виводить:

- локальну адресу `http://localhost:3000`
- адресу в локальній мережі, якщо виявлено IPv4

Це корисно для перевірки сайту з телефону або іншого пристрою в тій самій мережі.

## Потенційні нюанси проекту

- `prisma/schema.prisma` містить моделі `User`, `Post`, `Create`, які не використовуються в активному UI і, ймовірно, залишилися з шаблону/базового scaffold.
- `src/data/projects.data.ts` є fallback-структурою для випадку, коли GitHub API недоступна або база порожня.
- `src/api/profile/submit/route.ts` та GitHub API вимагають валідного `GITHUB_TOKEN`; без нього створення gist і синхронізація не працюють.
- Для повного функціонування треба налаштувати Supabase bucket для фотографій/документів.

## Підсумок

Проект є типовим Next.js-сайтом-портфоліо з динамічними даними, зовнішніми джерелами (GitHub) і локалізацією. Його базова архітектура проста й чиста:

- фронтенд на App Router;
- серверні API маршрути для синхронізації й обробки даних;
- PostgreSQL через Prisma як джерело для проєктів;
- GitHub Gists як спосіб зберігання профільної статистики;
- розширення для мультимовності, UI-компонентів і анімацій.

Це хороший шаблон для персонального/агентського сайту, який легко розширювати новими секціями, сторінками або CMS-підключеннями.
