1️⃣ Persistent Step Indicator (Top, Lightweight)
Recommended pattern: Stepper + titles

Placed under the header, always visible.

Step 1        Step 2        Step 3         Step 4
●────────────○────────────○────────────○
Category     Tile          Design          Save / Quote

Behavior

Current step: filled circle

Completed steps: checkmark

Future steps: outlined

This answers the user’s unconscious question:

“Where am I and what’s next?”

2️⃣ Step-by-Step UX Breakdown (Mapped to Your Screens)
🟦 Step 1 — Choose a Category
UI reinforcement (very important)

Above the category grid:

Title

Step 1: Choose a category

Helper text

Select the type of mosaic you want to design.

Interaction

Clicking a category:

Advances step indicator to Step 2

Smooth transition (no hard page change)

🟦 Step 2 — Choose a Tile
Title

Step 2: Choose a tile

Subtext

Some tiles allow color customization.

Visual cue (excellent UX detail)

Badge on tiles:

🟢 Customizable

⚪ Fixed colors

This prepares the user mentally for Step 3 behavior.

Interaction

Selecting a tile:

Advances step indicator to Step 3

Opens the Builder UI

🟦 Step 3 — Design Your Mosaic (Core Step)

This is the longest step, so it must feel open-ended.

Step label

Step 3: Design your mosaic

Micro-instructions (non-intrusive)

Small text near Parts panel:

Select a part, then choose a color.

UI rules

Step indicator stays on Step 3

No pressure to finish

Save is allowed anytime

Quote is highlighted as “next”

🟦 Step 4 — Save & Quote

This step should activate only after a Save or Quote intent.

Two possible entrances
A) User clicks Save

Step indicator moves to Step 4

Saved Designs panel opens

Toast: Design saved successfully

B) User clicks Quote

Auto-save happens

Step indicator moves to Step 4

Authentication / Quote flow begins

Step label

Step 4: Save or request a quote

3️⃣ Saved Designs: Step 4 Without Leaving Step 3

Important UX insight:

Saved designs are an outcome, not a new task

So:

Saved Designs panel is visible during Step 3

But Step 4 indicator activates only after first save

This avoids confusion.

4️⃣ Allow Backtracking (Confidence Builder)

Users should be able to:

Click Step 1 → change category (with warning)

Click Step 2 → change tile (resets design)

⚠️ Add confirmation:

Changing tile will reset your current design.

This gives freedom without accidents.

5️⃣ Mobile Version (Steps Become Critical)

On mobile, steps matter even more.

Mobile step header
Step 3 of 4 — Design


Keeps orientation when screen space is tight.

6️⃣ Why This Works (UX Rationale)

This implementation:

Matches your existing UI

Requires zero new pages

Reduces abandonment

Feels guided but not restrictive

Scales to future features (AI, presets, images)

You get:

Clarity of a wizard

Freedom of a canvas editor

7️⃣ Final Recommendation (Summary)

✔ Use a persistent step indicator
✔ Label steps explicitly (“Step 1: Choose category”)
✔ Advance steps automatically on intent
✔ Do not block the user with Next buttons
✔ Treat Step 3 as a sandbox, Step 4 as intent-driven