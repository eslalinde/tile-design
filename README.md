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

1. User selects a mosaic category
2. User selects a mosaic from that category
3. User selects a customizable part of the mosaic
4. User selects a color from the color palette
5. User can repeat color changes an unlimited number of times
6. User can save the mosaic design
7. If the user is not authenticated, the system requests:
   - Name
   - Email
   - Company
8. User must accept **personal data treatment (Habeas Data – Colombia)**
9. User can view saved mosaics
10. User can request a quote for:
    - The current mosaic
    - A saved mosaic
11. User completes the quotation form
12. The system sends an email to:
    - Quotation team
    - User

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
- Each SVG includes **custom tags** (`part#`) to identify colorable regions
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

### Page Structure
- Centered content
- Title
- Category menu
- Mosaic constructor
- Footer

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
* **Remaining cells** represent the border.
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

# 🚧 Construction Phases

### Phase 1 – Base Infrastructure
* [x] React app bootstrap
* [x] Git ignore configuration
* [x] Supabase setup (separate `/supabase` folder)
* [ ] Static catalog
* [ ] Simple SVG viewer

### Phase 2 – Constructor
* [ ] Part selection
* [ ] Color changes
* [ ] Rotation & flip
* [ ] Persistent state

### Phase 3 – User & Storage
* [ ] Authentication
* [ ] Saved mosaics
* [ ] Preview generation

### Phase 4 – Quotation
* [ ] Snapshot export
* [ ] Email notifications
* [ ] Minimal backoffice

### Phase 5 – Optimization
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