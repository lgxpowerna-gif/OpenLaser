import XRegExp from 'xregexp';

// AbstractDriver class
class AbstractGenerator {
  // Class constructor...
  constructor(settings) {
    this.settings = settings;
  }

  postProcessRaster(gcode) {
    if (!this.settings.gcodeToolOn || !this.settings.gcodeToolOff) {
      return gcode;
    }

    // Safer iterative approach to avoid Firefox stack overflow from heavy XRegExp recursion on large G-code
    const lines = gcode.split(/\r?\n/);
    const result = [];
    let laserOn = false;
    const toolOn = this.settings.gcodeToolOn;
    const toolOff = this.settings.gcodeToolOff;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        result.push(lines[i]);
        continue;
      }

      const isG0 = /^G0\b/i.test(line);
      const isG1 = /^G1\b/i.test(line);

      if (isG0 && laserOn) {
        result.push(toolOff);
        laserOn = false;
      } else if (isG1 && !laserOn) {
        result.push(toolOn);
        laserOn = true;
      }

      result.push(lines[i]);
    }

    // Ensure laser is off at the end
    if (laserOn) {
      result.push(toolOff);
    }

    return result.join('\n');
  }
}

// Exports
export { AbstractGenerator }
export default AbstractGenerator
