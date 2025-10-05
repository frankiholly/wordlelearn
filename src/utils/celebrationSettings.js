// User preferences for celebration settings
export const CelebrationSettings = {
  // Load settings from localStorage
  load() {
    console.log('[CelebrationSettings] Loading settings...');
    try {
      const saved = localStorage.getItem('wordle-celebration-settings');
      console.log('[CelebrationSettings] Raw localStorage value:', saved);
      
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('[CelebrationSettings] Parsed saved settings:', parsed);
        
        const merged = { ...this.getDefaults(), ...parsed };
        console.log('[CelebrationSettings] Final merged settings:', merged);
        return merged;
      }
    } catch (error) {
      console.warn('Failed to load celebration settings:', error);
    }
    
    const defaults = this.getDefaults();
    console.log('[CelebrationSettings] Using default settings:', defaults);
    return defaults;
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
