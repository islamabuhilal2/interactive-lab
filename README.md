# LABSCAPE — Student-First 3D Dilution Lab (V8)

## What's changed

This is a substantial UX rebuild of the V7 dilution laboratory. The imported 3D assets and underlying scientific interaction engine remain intact, including dragging glassware on the real L-shaped worktop, graduated-cylinder measurement, stock solution pouring, mixing, real glass/liquid sound samples, an optional burette, and a digital weighing scale.

- Larger, cleaner 3D workspace with labels limited to relevant equipment.
- Student task card and six-step progress tracker.
- Context-sensitive transfer-volume slider and target-volume progress bar.
- Live values for stock added, water added, total volume and calculated concentration.
- Required inquiry checkpoint: interpret concentration change before the final calculation.
- Burette and scale now live in an expandable precision-instruments drawer, which opens during the water-addition step.
- Arabic / English controls, focus camera, zoom, reset, recorded water/glass sounds.
- Responsive layouts for desktop, tablets, portrait and landscape phones.

## Start the laboratory

On Windows with Python 3 installed, double-click `START_LAB_WINDOWS.bat` and open http://localhost:8000 (the launcher opens it automatically).

On macOS / Linux:

    cd <extracted-lab-folder>
    python3 -m http.server 8000

Then open http://localhost:8000.

**Internet access is required to load the Three.js engine and GLTFLoader / OrbitControls modules from the CDN.** All five GLB models, local lab code, and MP3 sound assets are packaged in `assets/`. The interface has system-font fallbacks.

## Learning sequence

1. Drag or tap the graduated cylinder in the equipment tray to prepare it.
2. Set the amount and drag the stock-solution flask near the cylinder to measure 40 mL of 1.00 M solution.
3. Drag the graduated cylinder to the mixing beaker to transfer the sample.
4. Add distilled water until the **final total volume** is 100 mL (60 mL water). Use the water vessel, or dock the beaker beneath the burette and hold the valve to dispense gradually.
5. Observe the color change and decide whether the concentration has increased or decreased.
6. Enter the final concentration using C1 × V1 = C2 × V2. Expected answer: 0.40 mol/L.

The scale is an optional mass-demonstration station: it uses a simulated 115 g empty beaker and approximate solution density of 1 g/mL; it is not a calibrated analytical balance. The water/solvent animation is visual simulation, not real-time fluid dynamics.

## Files

- `index.html` — HTML laboratory interface.
- `styles.css` — responsive design system.
- `lab.js` — scene, 3D models and interaction engine.
- `ux.js` — goal progress, responsive guidance, observation challenge.
- `assets/` — five supplied GLB models (one texture-optimized), three supplied audio recordings.
- `START_LAB_WINDOWS.bat` — simple Windows local-server launcher.

## Verification notes

- JavaScript syntax checked with Node.js.
- DOM-based layout checked at 1440×900, 820×1180, 390×844, and 844×390; no document overflow at those viewports.
- Student progress widget and observation answer-gating verified in browser DOM tests.
- 3D model files and all audio samples present; ZIP integrity checked.
- **Full WebGL scene render and physics interactions could not be exercised in the isolated test browser**, which blocks network/local navigation. Test the final 3D lab in Chrome/Edge using the launcher on your device.
