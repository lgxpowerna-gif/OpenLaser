# Starter Material Profiles (Diode Lasers)

Practical starting points for 5–10 W diode lasers.
Always test on scrap and adjust in small steps.

## Plywood (3 mm)
- Power: 60–80%
- Speed: 800–1200 mm/min
- Passes: 1–2
- Focus: tight
- Notes: Masking tape reduces charring. Higher power for darker cuts.

## Acrylic (3 mm, cast)
- Power: 40–60%
- Speed: 600–900 mm/min
- Passes: 1
- Notes: Cast acrylic cuts cleaner than extruded. Air assist helps. Avoid melting by not going too slow.

## Cardboard / Chipboard
- Power: 20–40%
- Speed: 1500–2500 mm/min
- Passes: 1
- Notes: High fire risk. Never leave unattended. Good for quick prototypes.

## Leather (vegetable-tanned)
- Power: 30–50%
- Speed: 800–1200 mm/min
- Passes: 1
- Notes: Test thoroughly. Do not use chrome-tanned leather (toxic fumes).

## Baltic Birch (3 mm)
- Power: 70–90%
- Speed: 600–1000 mm/min
- Passes: 1–2
- Notes: Excellent for detailed work. Masking recommended for clean edges.

## MDF (3 mm)
- Power: 50–70%
- Speed: 700–1100 mm/min
- Passes: 1–2
- Notes: Can produce more smoke. Good ventilation needed.

## How to apply
1. Create an operation in OpenLaser.
2. Enter power and feed rate from the ranges above.
3. Generate (travel optimization runs automatically).
4. Run a small test square.
5. Adjust power or speed by 10% steps until the result is clean.

## Tips for consistency
- Match PWM Max S Value to the controller `$30` (usually 1000).
- Use the same focus height for tests and final jobs.
- Keep the lens clean.

See also ACCURACY.md, MACHINES.md, and RELIABILITY.md.
