# Specification

## Summary
**Goal:** Ship an MVP scaffold of Spellheim: a first-person 2.5D fantasy game with a landing-to-game flow, basic gameplay systems (movement, spells, combat, biomes, NPCs, music), cohesive UI theme, and save persistence.

**Planned changes:**
- Add an app shell with a Spellheim landing screen and navigation into/out of the game scene without full page reloads.
- Build a playable first-person 2.5D scene using React Three Fiber: ground plane, world bounds/collisions, and a smooth WASD + mouse-look movement loop.
- Add a character customization screen (name, class/archetype, 2–3 cosmetics) and display the chosen profile in an in-game HUD; persist locally when signed out and via backend when signed in.
- Implement spellcasting with at least three spells (projectile, area effect, defensive shield), including keybind display, mana/energy, cooldowns, and visible VFX that can affect a target.
- Add a minimal combat loop with at least one hostile creature (spawn, health/damage, simple approach/attack AI, death/defeated state, respawn/removal) and player health/mana HUD.
- Implement three visually distinct biomes (palette + props/terrain/lighting variations) with a way to switch biomes while keeping controls and combat working.
- Add one non-hostile NPC with an interaction prompt and a multi-step dialogue UI (next/close).
- Add background music playback with play/pause and volume controls; persist mute/volume and keep behavior consistent across biome changes and scene transitions.
- Implement backend persistence in a single Motoko actor for user save data keyed to Internet Identity principal when available, with local fallback when not signed in.
- Apply a consistent fantasy-themed visual design system across landing, customization, HUD, dialogue, and settings (not blue/purple-dominant).
- Add and reference generated static image assets from `frontend/public/assets/generated` (logo, HUD panel texture, spell icons).

**User-visible outcome:** Users can start from a landing screen, customize a character, enter a playable first-person scene, move and cast spells to fight a basic enemy, switch between three biomes, talk to an NPC via dialogue UI, and control background music—with profile/settings saved locally or to their signed-in account.
