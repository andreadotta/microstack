import { CommonParams } from 'commons-api-client';
import devConfig from './config.dev.json';
import prodConfig from './config.prod.json';
/**
 * Configures the application based on the provided parameters.
 *
 * @param {CommonParams} params The common parameters for the configuration which includes debugMode and useMock.
 * @returns {Object} Returns an object that is a combination of either development or production configurations based on debugMode, with useMock appended to it.
 *
 */
export function config(params: CommonParams) {
  const { debugMode = false, useMock = false } = params;

  return {
    ...(debugMode ? devConfig : prodConfig),
    USE_MOCK: useMock,
  };
}

export default config;