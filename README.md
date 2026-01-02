# Mosaicos Bien – Custom Mosaic Designer

Custom mosaic design web application for **Mosaicos Bien**  
https://www.mosaicosbien.com

This project is built using **vibe coding** principles: fast iteration, clear contracts, strong types, and a living README/PRD that evolves with the product.

---

## 🎯 Objective

Create a **living PRD / README** that documents:
- Business requirements
- User flows
- Technical architecture
- UI and rendering rules
- Data models
- Construction phases

This document is expected to evolve continuously and act as the **single source of truth** for the product.

---

## 🧱 What Is a Mosaic?

A floor mosaic is a decorative tile used on floors (and sometimes walls) that forms patterns, geometric shapes, or figures by combining colors and shapes.

Key characteristics:
- The design is embedded in the material (not painted)
- Extremely durable
- Patterns are formed by combining **2 or 4 tiles**
- Tiles can be **rotated and flipped** to complete a full pattern

---

## 👤 User Flow

1. User access the build your design Page
2. User select the category
3. Page present the tiles for the category selected
4. User selects a tile
5. Page presents the builder UI with the selected tile and the following components
   - SVG preview
   - List of parts that compose the SVG
   - The 5x5 matrix to show the draw or pattern of the tiles
   - Operate buttons like undo, redo, save, clean, quote
   - Color palette
6. User select one of the parts of the SVGs
7. User select a color from the palette
8. System reflects the color selected in the SVG preview and the matrix
9. User select other parts of the SVG and change the color until the user decide the mosaic is finished.
10. User Save or Quote the mosaic
11. If user save the mosaic an auto-save on localStorage is done (if the user want to quote) the user needs to provide a name for the saved mosaic
12. A list of saved mosaics for the page session is shown with preview
13. User select the quote option. If not authenticated: System shows authentication modal with benefits
14. User completes authentication (or continues as guest)
15. User accepts **personal data treatment (Habeas Data – Colombia)**
16. System presents the fill the quote form (firstName, lastName, email, phoneNumber, quantityBorder, quantityMosaic) and the mosaic to quote in preview
17. The authenticated user have the option to see past quotes and saved mosaics

* localStorage should be persistent everytime the user access the page again, so we can keep saved designs in the same browser

Note: In the future some mosaic are going to be an image, so the part and color selection are not going to be available.

---

## Quote information

The following are the requirements
- First name (required)
- Last name (required)
- Email (required)
- Phone number (requiered)
- Quantity (required): number of meters requested
- Quantity Border (optional): number of meters

The quote should be send by email to the sales department and to the user.
The quote should be saved to the Database
If the user 

Note: there is a some tech challenge to sent the mosaic as an image by email

---

## 🛠 Technical Specifications

### General
- Web application built with **React or Next.js**
- Backend powered by **Supabase**
- Database: **PostgreSQL (Supabase)**
- API: **Supabase PostgREST**
- File storage: **Supabase Storage**
- Bilingual support: **English & Spanish**

### Legal
- Must comply with **Colombian Habeas Data Law**
- Explicit user consent is required before saving or quoting designs

---

## 🌍 Internationalization (i18n)

The application must support:
- Translated categories
- Translated color names
- Bilingual emails
- Neutral URLs (`/design`, not `/diseno`)

---

## ⚛️ Frontend Stack

- React 19
- Vite 7
- TypeScript 5
- JavaScript (latest)
- Tailwind CSS 4
- ReUI
- shadcn/ui
- Radix UI
- Lucide Icons
- TanStack (Query / Store / Router as needed)
- Motion (animations)

---

## 🎨 Mosaic Rendering Specifications

- SVG is used for:
  - Mosaic visualization
  - Color manipulation
- Some mosaics may use images when SVG is not feasible
- Border mosaics are more complex and may include:
  - Corners
  - 1–2 additional tiles
- Each SVG includes g properties to group (`part#`) to identify colorable regions
- Color changes apply to entire parts
- Each tile can be:
  - Rotated
  - Flipped
- Real-world dimensions must be preserved (e.g. 20x20, 25x25, 10x5)
- Main pattern display:
  - 4x4 visible grid
- Internal logic grid:
  - 5x5 (extra row/column for borders)

### Performance Rules
- Inline SVG only for the **main preview**
- Grid rendering uses:
  - Optimized SVGs
  - `requestIdleCallback`
  - Memoization via state hashing

---

## 🖼 UI Layout

Step 1        Step 2        Step 3         Step 4
●────────────○────────────○────────────○
Category     Tile          Design          Save / Quote

┌────────────────────────────────────────┐
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ Category │ │ Category │ │ Category │ │
│ │ Name     │ │ Name     │ │ Name     │ │
│ └──────────┘ └──────────┘ └──────────┘ │
└────────────────────────────────────────┘

Step 1        Step 2        Step 3         Step 4
●────────────●────────────○────────────○
Category     Tile          Design          Save / Quote

┌────────────────────────────────────────┐
│  ┌────────┐ ┌────────┐                 │
│  │ Tile   │ │ Tile   │                 │
│  │ Preview│ │ Preview│                 │
│  │ SVG    │ │ Image  │                 │
│  └────────┘ └────────┘                 │
└────────────────────────────────────────┘
Step 1        Step 2        Step 3         Step 4
●────────────●────────────●────────────○
Category     Tile          Design          Save / Quote

┌────────────────────┬─────────────────────────┬──────────────────┐
│  PARTS             │                         │ TILE INFO     ▶  │
│  [■][■][■][■]      │                         │                  │
│                    │                         │ ┌──────────────┐ │
│  COLORS → part1    │                         │ │   Original   │ │
│  Recent: [■][■]    │      Tile Matrix        │ │    [svg]     │ │
│  [■][■][■][■][■][■]│                         │ └──────────────┘ │
│  [■][■][■][■][■][■]│                         │                  │
│  [■][■][■][■][■][■]│                         │ Name: Hex-01     │
│  ...               │                         │ Category: geo    │
│                    │                         │ Size: 20×20      │
│                    │                         │ Parts: 4         │
└────────────────────┴─────────────────────────┴──────────────────┘

Step 1        Step 2        Step 3         Step 4
●────────────●────────────●────────────●
Category     Tile          Design          Save / Quote
┌──────────────────────────────────────────────┐
│ Saved Designs                                │
├──────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐                   │
│ │Prev  │ │Prev  │ │Prev  │                   │
│ │Name  │ │Name  │ │Name  │                   │
│ └──────┘ └──────┘ └──────┘                   │
└──────────────────────────────────────────────┘

### Parts UI specification

#### Parts
The parts are the <g> element with id equals part#, we need to paint in a small box the svg part.
Add hover highlights on SVG parts, a selection indicator, and a parts legend panel
Add hover highlight + persistent selection outline, plus a Parts legend with thumbnails and human labels (“Border”, “Center”, “Dot”…). Show “Selected: Part X” near palette.

#### Clean
Rename to “Reset colors” / “Reset design” and Reset border and add a confirm dialog with scope + preview of impact.

#### Colors
Organize by: Neutrals, Warm, Earth, Cool, Accent + recent colors row

#### Undo/Redo
Undo/redo history - 20-state history with Ctrl+Z/Y support



### Authentication modal
┌──────────────────────────────────────────────┐
│ Why create an account?                       │
│ ✓ Save designs                               │
│ ✓ Track quotes                               │
│                                              │
│ [ Login / Register ]                         │
│ [ Continue as Guest ]                        │
└──────────────────────────────────────────────┘

### Quote modal
┌──────────────────────────────────────────────┐
│ Quote Request                                │
├────────────────┬─────────────────────────────┤
│ First Name     │ Mosaic Preview              │
│ Last Name      │ (Read‑only)                 │
│ Email          │                             │
│ Phone          │                             │
│ Qty Border     │                             │
│ Qty Mosaic     │                             │
│ Habeas Data    │                             │
│ [ Request ]    │                             │
└────────────────┴─────────────────────────────┘

### Categories
```ts
[
  { name: "paris", display: "paris" },
  { name: "barcelona", display: "barcelona" },
  { name: "morocco", display: "morocco" },
  { name: "border", display: "border" },
  { name: "square", display: "square" },
  { name: "rectangle", display: "rectangle" },
  { name: "hexagonal", display: "hexagonal" },
  { name: "g1", display: "g1" }
]
```

# 🧩 Mosaic Constructor Behavior

### Constructor Components
* **Large SVG preview** for detailed inspection.
* **Parts selector:**
    * Some parts are backgrounds.
    * Some parts are corners.
    * Some parts have irregular shapes.
    * Supports up to 8 or more parts.
* **Compact UI** to avoid visual overload.
* **Color palette** rendered in the exact order of `HexColorsList`.

---

### Pattern Grid
* **Main grid:** 5 x 5
* **Visible pattern:** 4 x 4
* **Remaining cells** represent the border from 4,0 to 4,4 and 0,4 to 4,4
* **Borders** are only visible when a border mosaic is selected.
* **Small spacing** between tiles (3–4 px).

---

### Tile Behavior
* **Each tile:**
    * Uses the same SVG.
    * Has its own rotation and flip configuration.
    * Rotation configuration is mosaic-specific.

---

### Persistence Rules
* **Selected mosaic** persists until a new one is selected.
* **Selected border** persists until:
    * Another border is selected, or
    * The border is cleared.

---

### Required Actions
* [ ] Clear mosaic
* [ ] Clear border
* [ ] Clear mosaic and border


# 🧠 React State Model

```typescript
interface MosaicState {
  name: string;
  type: "mosaic";
  shape: "square";
  collection: CategoriesNames;
  xml: string;
  width: number;
  height: number;
  parts: {
    partId: string;
    colorHex: string;
  }[];
  border?: BorderState;
  updatedAt: Date;
}
```

# 🗄️ Supabase Database Schema

### `users`
* **id** (uuid)
* **name**
* **email**
* **company**
* **accepted_habeas_data** (boolean)
* **created_at**

### `mosaics`
* **id**
* **name**
* **category**
* **shape**
* **svg** (XML string)
* **width**
* **height**
* **rotation**

### `user_mosaics`
* **id**
* **user_id**
* **mosaic_id**
* **state** (json)
* **created_at**

### `quotations`
* **id**
* **user_id**
* **mosaic_snapshot** (jsonb)
* **metadata** (jsonb)
* **status**

## PRD – Public Mosaic Query by Category

### Objective
Allow public, read-only access to mosaics filtered by category for catalog visualization and design selection.

### Scope
- Retrieve mosaics by category.
- Public access without user authentication.
- Read-only operations only.

### Business Rules
- Each mosaic belongs to a single category.
- Only public mosaics can be queried.
- Categories must be predefined in the system.
- Mosaic data must be immutable through public endpoints.

### Non-Functional Requirements
- The endpoint must support pagination.
- Average response time should be under 500 ms.
- The system must not expose sensitive data.
- The service must be scalable for public traffic.

### Security Considerations
- Public access is allowed for read-only operations.
- No create, update, or delete actions are permitted.
- Abuse prevention mechanisms should be in place.

### Usage Example
**Input:**
- Category: `paris`

**Output:**
- List of mosaics associated with the selected category.

---

## 🧩 SVG Definition (Partial)

```json
{
  "name": "Barcelona 23",
  "type": "mosaic" | "border",
  "shape": "square" | "hexagon" | "rectangle" | "g1",
  "collection": "category name",
  "width": 203,
  "height": 203,
  "rotate": [[0, 90, 0, 90], [-90, -180, -90, -180]],
  "svg": "<svg>...</svg>",
  "description": "",
  "svgVersion": "v1.0.0"
}
```

## 🎨 Color palette
```typescript
export const HexColorsList: MosaicColor[] = [
  { hex: "#EFEFEF", name: "C1-Blanco" },
  { hex: "#C1C8CF", name: "C2-Gris Plata" },
  { hex: "#BCC2C0", name: "C3-Cenizo" },
  { hex: "#8B8683", name: "C4-Café Claro" },
  { hex: "#D4C6C4", name: "C5-Palo de Rosa" },
  { hex: "#D4A57A", name: "C6-Ladrillo" },
  { hex: "#BC8370", name: "C7-Guayaba" },
  { hex: "#C8C48C", name: "C8-Amarillo Claro" },
  { hex: "#9AC4B0", name: "C9-Verde Pastel" },
  { hex: "#469AA4", name: "C10-Verde Turquesa Claro" },
  { hex: "#96CDE7", name: "C11-Azul Pastel" },
  { hex: "#DE8ABA", name: "C12-Fucsia" },
  { hex: "#DADECF", name: "C13-Beige" },
  { hex: "#818890", name: "C14-Gris Oscuro" },
  { hex: "#44494D", name: "C15-Negro" },
  { hex: "#7B6D65", name: "C16-Café Medio" },
  { hex: "#D8BEAF", name: "C17-Rosado Pastel" },
  { hex: "#C68871", name: "C18-Salmon" },
  { hex: "#AE6245", name: "C19-Rojo Especial" },
  { hex: "#D3C177", name: "C20-Amarillo Normal" },
  { hex: "#88AD82", name: "C21-Verde Aceituna" },
  { hex: "#01A8B8", name: "C22-Verde Turquesa Fuerte" },
  { hex: "#84CCDD", name: "C23-Azul Aguamarina" },
  { hex: "#8871B3", name: "C24-Morado" },
  { hex: "#D3D2BC", name: "C25-Champañe" },
  { hex: "#686965", name: "C26-Eucalipto" },
  { hex: "#2E3236", name: "C27-Negro Humo" },
  { hex: "#554840", name: "C28-Café Oscuro" },
  { hex: "#A99790", name: "C29-Arena" }, 
  { hex: "#C27547", name: "C30-Naranja" },
  { hex: "#7D513B", name: "C31-Rojo Oscuro" },
  { hex: "#D7BD80", name: "C32-Amarillo Fuerte" },
  { hex: "#8A8966", name: "C33-Ocre" },
  { hex: "#416969", name: "C34-Verde Oscuro" },
  { hex: "#4B9ED7", name: "C35-Azul Normal" },
  { hex: "#5283A4", name: "C35-Azul Oscuro" },
];
```

## Types of tiles

### Box 

### Rectangular
Basic rectangular tiles with solid colors (no patterns) are available in three sizes:
- **Rectangular 25x5cm** (5:1 ratio) - viewBox: 250x50
- **Rectangular 20x10cm** (2:1 ratio) - viewBox: 200x100
- **Rectangular 30x10cm** (3:1 ratio) - viewBox: 300x100

These solid tiles can be used to create different patterns:
- **Brick pattern** - offset rows like bricks in a wall
- **Stack bond** - aligned vertical columns
- **Herringbone** - diagonal V-shaped pattern
- **Chevron** - V-shaped pattern with angled cuts

**Implementation Details:**
- SVG viewBox is proportional to actual tile dimensions
- MosaicCard component uses dynamic `aspect-ratio` based on width/height
- Grid layout uses `items-start` to align tiles properly
- Each tile has a single colorable part (part1) for solid color customization

# 🚧 Construction Phases

### Phase 1 – Base Infrastructure
* [x] React app bootstrap
* [x] Git ignore configuration
* [x] Supabase setup (separate `/supabase` folder)
* [x] Static catalog on supabase
* [x] Get tiles from supabase
* [x] Simple SVG viewer

### Phase 2 – Builder
* [x] Seed SVG with parts
* [x] Stepper UI 
* [x] Basic Builder layout
* [x] Part selection
* [x] Color changes
* [x] Rotation
* [ ] Auto-save
* [x] Undo, Redo, Save

### Phase 3 - Advance Builder
* [x] Real rectangular size
* [ ] Basic Border implementation
* [ ] Advance border with 3 tiles
* [x] Hexagonal tiles
* [x] G1 tiles
* [ ] Image tiles

### Phase 4 – User & Storage
* [ ] Authentication
* [x] Saved mosaics
* [ ] Preview generation

### Phase 5 – Quotation
* [ ] Snapshot export
* [ ] Email notifications
* [ ] Minimal backoffice

### Phase 6 - Technical Data sheet
- [ ] Enable technical data sheet
- [ ] 

### Phase 6 – Optimization
* [ ] Color palette from mosaicos
* [ ] Performance tuning
* [ ] UX refinement
* [ ] Analytics & metrics

---

# 📈 Metrics (Planned)
* **Time spent designing:** tracking user engagement duration.
* **Most used colors:** identifying palette trends.
* **Most quoted mosaics:** catalog performance.
* **Conversion to quotation:** ratio of designs vs. actual quotes.

---

# 🧠 Vibe Coding Principles
> **"Code is a conversation; clarity is the goal."**

* **Strong TypeScript contracts:** Type safety as a foundation, not an afterthought.
* **Explicit decisions over implicit behavior:** Avoid "magic" code; prioritize readability.
* **Clear separation:** Strict boundaries between **rendering**, **state**, and **data**.
* **Authoritative README:** The documentation is the source of truth and must be kept up to date.
