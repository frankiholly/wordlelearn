// Centralized version configuration
// This is the SINGLE source of truth for version information

export const VERSION_CONFIG = {
  version: '3.8.0',
  buildId: 'extreme_win_celebration_complete',
  buildDate: new Date().toISOString(),
  
  // Helper methods
  getFullVersion: () => `v${VERSION_CONFIG.version}`,
  getBuildInfo: () => `${VERSION_CONFIG.version} (Build: ${VERSION_CONFIG.buildId})`,
  getCacheParam: () => VERSION_CONFIG.version,
  getDisplayVersion: () => `(Build: v${VERSION_CONFIG.version} )`
};

// Default export for convenience
export default VERSION_CONFIG;
