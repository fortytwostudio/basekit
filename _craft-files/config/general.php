<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

return [
  // Global settings
  '*' => [
    // Site is live by default:
    'isSystemLive' => true,
    // Prevent craft from sizing down large uploads for transforming
    // it screws up image quality
    'maxCachedCloudImageSize' => 8000,
    // Users go here when logging in instead of the pointless dashboard
    'postCpLoginRedirect' => 'entries',
    // Default Week Start Day (0 = Sunday, 1 = Monday...)
    'defaultWeekStartDay' => 1,
    // Yes we want trailing slashes by default
    'addTrailingSlashesToUrls' => true,
    // Don't allow CMS updates to be run in Craft by default
    'allowUpdates' => false,
    // Whether Craft should specify the path using PATH_INFO or as a query
    // string parameter when generating URLs that include index.php
    'usePathInfo' => true,
    // Nobody wants that shit
    'useEmailAsUsername' => false,
    // Enable if you want slower page loads
    'generateTransformsBeforePageLoad' => false,
    // Enable CSRF Protection (recommended)
    'enableCsrfProtection' => true,
    // Whether generated URLs should omit "index.php"
    'omitScriptNameInUrls' => true,
    // Control Panel trigger word
    'cpTrigger' => 'admin',
    // Pagination uses this instead of just p or whatever
    'pageTrigger' => 'page/',
    // The secure key Craft will use for hashing and encrypting data
    'securityKey' => getenv('SECURITY_KEY'),
    // Default directory for error templates
    'errorTemplatePrefix' => '_errors/',
    // Makes sense, no?
    'autoLoginAfterAccountActivation' => true,
  ],

  // Dev (local) environment settings
  'dev' => [
    // Base site URL… see Craft docs if you're using multi sites
    'siteUrl' => null,
    // Dev Mode on of course
    'devMode' => true,
    // Yes we want updates in development
    'allowUpdates' => true,
    // And disable this shit
    'enableTemplateCaching' => false,
    // Stay logged in
    'overridePhpSessionLocation' => true,
    // Also stay logged in
    'requireMatchingUserAgentForSession' => false,
    // For a whole year
    'rememberedUserSessionDuration' => 'P1Y',
    // Really a whole year
    'userSessionDuration' => 'P1Y',
    // Don't bother with backups
    'backupCommand' => false,
    // Just don't ffs
    'backupOnUpdate' => false,
  ],

  // Staging environment settings
  'staging' => [
    // Turn the site off so people can't snoop about
    'isSystemLive' => false,
    // Base site URL
    'siteUrl' => null,
    // Still don't want caching
    'enableTemplateCaching' => false,
    // Same as above for the dev env
    'overridePhpSessionLocation' => true,
    'requireMatchingUserAgentForSession' => false,
    'rememberedUserSessionDuration' => 'P1Y',
    'userSessionDuration' => 'P1Y',
  ],

  // Production environment settings
  'production' => [
    // Base site URL
    'siteUrl' => null,
    // Aye we want the caching on production
    'enableTemplateCaching' => true,
  ],
];