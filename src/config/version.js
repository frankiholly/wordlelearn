// Centralized version configuration
// This is the SINGLE source of truth for version information

export const VERSION_CONFIG = {
  version: '3.5.1',
  buildId: 'enhanced_daily_tracking',
  buildDate: new Date().toISOString(),
  
  // Helper methods
  getFullVersion: () => `v${VERSION_CONFIG.version}`,
  getBuildInfo: () => `${VERSION_CONFIG.version} (Build: ${VERSION_CONFIG.buildId})`,
  getCacheParam: () => VERSION_CONFIG.version,
  getDisplayVersion: () => `v${VERSION_CONFIG.version} (Build: ${new Date().toLocaleString()})`
};

// Default export for convenience
export default VERSION_CONFIG;
