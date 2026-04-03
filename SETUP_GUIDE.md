# NBA Platform - Laravel Backend + Nuxt Frontend Setup Guide

## Project Structure

```
NBA-platform/
├── .git/                      (root-level git for monorepo)
├── .gitignore                 (covers both apps)
├── NBA-APP-backend/           (Laravel API)
└── NBA-APP-frontend/          (Nuxt 3)
```

## Backend Setup (Laravel + Sanctum Token Auth)

### Already Configured:
- ✅ Sanctum installed for token authentication
- ✅ CORS configuration created (`config/cors.php`)
- ✅ API routes configured at `/api/login`, `/api/logout`, `/api/user`
- ✅ Database migrations run (`personal_access_tokens` table created)
- ✅ AuthenticatedSessionController updated for both web and API

### Herd Configuration (Critical)

In **Laravel Herd**:
1. Open Herd Dashboard
2. **Link** a new site:
   - Site Name: `nba-app-backend.test`
   - Directory: `C:\repos\NBA-platform\NBA-APP-backend`
3. Click **Link** and confirm

### Test Backend Access

```powershell
# Should redirect to login (302), not 403 (Forbidden)
Invoke-WebRequest "http://nba-app-backend.test" | Select-Object StatusCode
```

### Run Backend in Herd
Just visit `http://nba-app-backend.test` in your browser, or Herd handles it automatically.

---

## Frontend Setup (Nuxt 3)

### Already Configured:
- ✅ Nuxt 3 initialized
- ✅ composables/useAuth.ts (login, logout, getUser)
- ✅ pages/login.vue (login form)
- ✅ pages/dashboard.vue (authenticated dashboard)
- ✅ nuxt.config.ts configured with API base URL
- ✅ Dependencies installed

### Environment Variables
- `.env` → `API_BASE=http://nba-app-backend.test/api`

### Run Frontend Dev Server

```powershell
cd "C:\repos\NBA-platform\NBA-APP-frontend"
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## Complete Local Development Workflow

### Terminal 1: Start Backend (Optional - if not using Herd)

```powershell
cd "C:\repos\NBA-platform\NBA-APP-backend"
php artisan serve --host=127.0.0.1 --port=8000
```

Backend: `http://localhost:8000`

### Terminal 2: Start Frontend

```powershell
cd "C:\repos\NBA-platform\NBA-APP-frontend"
npm run dev
```

Frontend: `http://localhost:3000`

---

## Testing Token Authentication Flow

### 1. Create a Test User

```powershell
cd "C:\repos\NBA-platform\NBA-APP-backend"
php artisan tinker

# Inside tinker shell:
App\Models\User::factory()->create([
    'email' => 'test@example.com',
    'password' => bcrypt('password123'),
]);

exit
```

### 2. Login via API (Test with cURL or Postman)

```powershell
$loginData = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest `
  -Uri "http://nba-app-backend.test/api/login" `
  -Method POST `
  -Body $loginData `
  -ContentType "application/json" `
  -UseBasicParsing | ConvertFrom-Json
```

Response:
```json
{
  "user": { "id": 1, "name": "...", "email": "test@example.com" },
  "token": "abc123|xyz789..."
}
```

### 3. Use Token for Protected Endpoints

```powershell
$token = "abc123|xyz789..."

Invoke-WebRequest `
  -Uri "http://nba-app-backend.test/api/user" `
  -Headers @{ "Authorization" = "Bearer $token" } `
  -UseBasicParsing | ConvertFrom-Json
```

### 4. Test in Browser

1. Visit `http://localhost:3000`
2. Redirects to `/login`
3. Enter: `test@example.com` / `password123`
4. Click **Login**
5. Redirects to `/dashboard` with user data

---

## API Endpoints

### Public Endpoints

**POST** `/api/login`
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "user": { "id": 1, "name": "John", "email": "test@example.com" },
  "token": "abc123|xyz789..."
}
```

### Protected Endpoints (Requires: `Authorization: Bearer <token>`)

**GET** `/api/user`
- Returns authenticated user object

**POST** `/api/logout`
- Revokes all user tokens
- Returns: `{ "message": "Logged out successfully" }`

---

## Frontend Structure

- **composables/useAuth.ts** → Auth state & API calls
- **pages/login.vue** → Login form
- **pages/dashboard.vue** → Protected dashboard
- **pages/index.vue** → Auto-redirect to dashboard
- **nuxt.config.ts** → Nuxt configuration with API base

---

## Git Workflow (Monorepo)

Since `.git` is at the root:

```powershell
cd "C:\repos\NBA-platform"

# Stage backend changes
git add NBA-APP-backend/

# Stage frontend changes
git add NBA-APP-frontend/

# Commit
git commit -m "feat: add token auth setup"

# Push
git push
```

Both frontend and backend changes are tracked in one repo.

---

## Troubleshooting

### 403 Forbidden at Backend
- Ensure Herd site points to `C:\repos\NBA-platform\NBA-APP-backend`
- Not the root or `public/` folder
- Restart Herd if needed

### Frontend Can't Reach Backend API
- Check `nuxt.config.ts` → `apiBase` matches backend URL
- Check browser console for CORS errors
- Ensure backend is running (Herd or `php artisan serve`)
- Verify `.env` in frontend folder

### Token Not Working
- Confirm token includes the `|` separator (personal access token format)
- Check `Authorization: Bearer <token>` header format
- Ensure user exists in database
- Verify `personal_access_tokens` table has entries

---

## Next Steps

1. **Link backend site in Herd** (if not done)
2. **Create test user** (run tinker command above)
3. **Start frontend dev server** (`npm run dev`)
4. **Visit frontend** (`http://localhost:3000`)
5. **Login** with test credentials
6. **Verify token auth works**

---

## Additional Resources

- **Laravel Sanctum**: https://laravel.com/docs/sanctum
- **Nuxt 3**: https://nuxt.com
- **Laravel Herd**: https://herd.laravel.com

