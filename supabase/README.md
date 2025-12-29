# Supabase Local Development

This folder contains everything needed to run Supabase locally with Docker.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Node.js 18+ installed

## Quick Start

```bash
# Start Supabase locally (first time takes a few minutes to download images)
npm run supabase:start

# View local Supabase Studio
# Opens at http://localhost:54323

# Stop Supabase
npm run supabase:stop

# Reset database (runs migrations + seed)
npm run supabase:reset
```

## Local URLs

| Service | URL |
|---------|-----|
| API | http://localhost:54321 |
| Studio | http://localhost:54323 |
| Inbucket (Email) | http://localhost:54324 |
| Database | postgresql://postgres:postgres@localhost:54322/postgres |

## Project Structure

```
supabase/
├── config.toml                  # Supabase local config
├── migrations/                  # Database migrations
│   ├── 20240101000001_create_users_table.sql
│   ├── 20240101000002_create_mosaics_table.sql
│   ├── 20240101000003_create_user_mosaics_table.sql
│   └── 20240101000004_create_quotations_table.sql
├── seed.sql                     # Sample data (24 mosaics)
└── README.md                    # This file
```

## Database Schema

### Tables

#### `users`
User accounts with Colombian Habeas Data compliance.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | User's name |
| email | text | Unique email |
| company | text | Optional company |
| accepted_habeas_data | boolean | Data consent |
| created_at | timestamptz | Creation time |

#### `mosaics`
Tile catalog with SVG definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Display name |
| category | text | paris, barcelona, etc. |
| type | enum | 'mosaic' or 'border' |
| shape | enum | square, hexagon, etc. |
| svg | text | SVG markup |
| width, height | integer | Dimensions |
| rotation | jsonb | Grid rotation matrix |
| default_colors | jsonb | Initial colors |

#### `user_mosaics`
Saved user designs.

#### `quotations`
Quote requests with status tracking.

## Seed Data

The seed includes **24 sample mosaics** across 8 categories:

| Category | Count | Description |
|----------|-------|-------------|
| Paris | 3 | Classic European geometric |
| Barcelona | 3 | Gaudí-inspired modernist |
| Morocco | 3 | Zellige star patterns |
| Square | 3 | Basic square tiles |
| Hexagonal | 3 | Honeycomb shapes |
| Rectangle | 3 | Metro-style tiles |
| Border | 3 | Edge decorations |
| G1 | 3 | Special geometric |

## Cloud Deployment

To push local migrations to the cloud project:

```bash
# Link to cloud project
npx supabase link --project-ref goakxyvfhxeeqtxnjkbh

# Push migrations
npx supabase db push
```

## Environment Variables

For local development, create a `.env` file:

```env
# Local Supabase
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=<your-local-anon-key>

# Production (Cloud)
# VITE_SUPABASE_URL=https://goakxyvfhxeeqtxnjkbh.supabase.co
# VITE_SUPABASE_ANON_KEY=<your-cloud-anon-key>
```

The local anon key is displayed when you run `npm run supabase:start`.

## Useful Commands

```bash
# Generate TypeScript types from local DB
npx supabase gen types typescript --local > src/types/database.ts

# View migration status
npx supabase migration list

# Create new migration
npx supabase migration new <migration_name>

# View database logs
npx supabase db logs
```
