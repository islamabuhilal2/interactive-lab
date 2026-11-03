# Solution Dilution 3D Lab — V7 / Scale Worktop Alignment

## Correction requested

The original GLB worktop is **L-shaped**, not a solid rectangular slab. Its main usable
section extends to z≈0.484; the V6 scale at z=1.18 was over the empty cutout and
thus appeared to float outside the table. This version:

- Moves the **complete real scale** into the main tabletop at world x=3.05, z=-0.55;
  its entire GLB footprint now rests on the worktop, including the digital readout.
- Moves the distilled-water vessel away from the scale to avoid overlap.
- Pulls the initial mixing beaker and graduated cylinder fully inside the tabletop.
- Constrains drag-and-drop to the actual worktop regions while avoiding the inset sink opening
  (including the left extension), instead of an unrestricted rectangle covering the empty area.
- Keeps the scale weighing platform, beaker snap-to-scale, **Scale view**, tare,
  pour animations, burette, recorded sounds, languages, and responsive UI.
- Shortens the scale's floating label to its mass value; explanations stay in the
  information panel rather than covering the instrument itself.

### Starting the lab

Run `START_LAB_WINDOWS.bat` with Python 3 installed, then open the displayed local
URL. Internet access is required for the Three.js CDN modules.

### Equipment and interactions retained

All five supplied GLB models remain part of the project: the table, glassware,
chemistry background apparatus, burette apparatus, and digital kitchen scale.
Recorded sound effects (pour, glass slide, glass clink) remain in `assets/`.
The original six-step dilution workflow, volume tracking, beaker weighing,
tare function, optional burette, Arabic/English UI, and responsive controls
are unchanged.

### Validation

- Imported Table_02.glb and checked its top-facing mesh triangles: worktop is
  L-shaped with a sink opening x≈1.778..2.436, z≈−0.261..0.396.
- Computed the oriented axis-aligned footprint of the supplied scale GLB
  after the program's recentering and 0.64 uniform scaling.
- Confirmed that 100% of the rectangular footprint is inside the tabletop top
  polygon, with >=0.10 model units clearance from the nearest opening edge.
- JavaScript syntax and ZIP integrity were checked.
- Automated browser loading is unavailable because local browser navigation is
  blocked by the test environment; verify the 3D presentation in your browser.
