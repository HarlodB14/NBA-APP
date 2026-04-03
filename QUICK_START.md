# NBA Platform - Quick Start Commands

## Frontend Dev Server (Terminal 1)
```powershell
cd C:\repos\NBA-platform\NBA-APP-frontend
npm run dev
```
Runs on: http://localhost:3000

## Backend API Server (Terminal 2 - Optional if using Herd)
```powershell
cd C:\repos\NBA-platform\NBA-APP-backend
php artisan serve --host=127.0.0.1 --port=8000
```
Runs on: http://localhost:8000 (or use http://nba-app-backend.test via Herd)

## Create Test User (One Time)
```powershell
cd C:\repos\NBA-platform\NBA-APP-backend
php artisan tinker
```
Then paste:
```
App\Models\User::factory()->create([
    'email' => 'test@example.com',
    'password' => bcrypt('password123'),
]);
exit
```

## Test Login Endpoint
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest `
  -Uri "http://nba-app-backend.test/api/login" `
  -Method POST `
  -Body $body `
  -ContentType "application/json" | ConvertFrom-Json
```

## Build for Production

### Backend
```powershell
cd C:\repos\NBA-platform\NBA-APP-backend
composer install --optimize-autoloader --no-dev
```

### Frontend
```powershell
cd C:\repos\NBA-platform\NBA-APP-frontend
npm run build
```
Output: `.output/` folder

## Clean Up

### Backend
```powershell
cd C:\repos\NBA-platform\NBA-APP-backend
rm -r vendor, node_modules
composer install
npm install
```

### Frontend
```powershell
cd C:\repos\NBA-platform\NBA-APP-frontend
rm -r node_modules, .nuxt, .output
npm install
```

