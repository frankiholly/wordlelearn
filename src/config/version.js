// Centralized version configuration
// This is the SINGLE source of truth for version information

export const VERSION_CONFIG = {
  version: '3.6.1',
  buildId: 'enhanced_new_game_daily_logic',
  buildDate: new Date().toISOString(),
  
  // Helper methods
  getFullVersion: () => `v${VERSION_CONFIG.version}`,
  getBuildInfo: () => `${VERSION_CONFIG.version} (Build: ${VERSION_CONFIG.buildId})`,
  getCacheParam: () => VERSION_CONFIG.version,
  getDisplayVersion: () => `(Build: v${VERSION_CONFIG.version} )`
};

// Default export for convenience
export default VERSION_CONFIG;
