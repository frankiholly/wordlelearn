// User preferences for celebration settings
export const CelebrationSettings = {
  // Load settings from localStorage
  load() {
    try {
      const saved = localStorage.getItem('wordle-celebration-settings');
      if (saved) {
        return { ...this.getDefaults(), ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Failed to load celebration settings:', error);
    }
    return this.getDefaults();
  },

  // Save settings to localStorage
  save(settings) {
    try {
      localStorage.setItem('wordle-celebration-settings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save celebration settings:', error);
    }
  },

  // Default settings
  getDefaults() {
    return {
      audioEnabled: true,
      visualEnabled: true,
      volume: 0.3 // Evening-appropriate default volume
    };
  },

  // Update specific setting
  updateSetting(key, value) {
    const current = this.load();
    const updated = { ...current, [key]: value };
    this.save(updated);
    return updated;
  }
};
