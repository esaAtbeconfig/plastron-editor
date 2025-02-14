import {
  BrowserCacheLocation,
  Configuration,
  LogLevel,
} from '@azure/msal-browser';
import { isIE } from './common-config';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: 'e1c9d413-0fcf-4526-a24d-ec4a451b37b4', // 'Application (client) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
    authority: 'https://login.microsoftonline.com/b1d7cd6a-bb81-454f-8d0b-00313e1eefd5', // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
    redirectUri: '/', // Must be the same redirectUri as what was provided in your app registration.
    postLogoutRedirectUri: '/', // Points to window.location.origin by default
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge. Remove this line to use Angular Universal
  },
  system: {
    /**
     * Below you can configure MSAL.js logs. For more information, visit:
     * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
     */
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Error,
      piiLoggingEnabled: false,
    },
  },
};
