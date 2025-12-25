/**
 * Device detection and smart redirect utilities
 */

export type DeviceType = 'ios' | 'android' | 'web';

/**
 * Detect device type from user agent (client-side only)
 */
export function detectDevice(): DeviceType {
    if (typeof window === 'undefined') {
        return 'web'; // SSR fallback
    }

    const userAgent = window.navigator.userAgent.toLowerCase();

    // Check for iOS
    if (/iphone|ipad|ipod/.test(userAgent)) {
        return 'ios';
    }

    // Check for Android
    if (/android/.test(userAgent)) {
        return 'android';
    }

    return 'web';
}

/**
 * App store URLs
 */
export const APP_STORE_URL = 'https://apps.apple.com/us/app/teamtuned/id6756356409';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.waardian.teamtuned&pcampaignid=web_share';
export const WEB_FALLBACK_URL = 'https://www.teamtuned.com';

/**
 * Get the appropriate store URL based on device
 */
export function getStoreUrl(device: DeviceType): string {
    switch (device) {
        case 'ios':
            return APP_STORE_URL;
        case 'android':
            return PLAY_STORE_URL;
        default:
            return WEB_FALLBACK_URL;
    }
}

/**
 * Smart redirect URL for QR codes
 * Works in both local development and production
 */
export function getSmartRedirectUrl(): string {
    // Server-side rendering fallback
    if (typeof window === 'undefined') {
        return `${WEB_FALLBACK_URL}/download`;
    }

    // Get current hostname
    const hostname = window.location.hostname;

    // Check if we're in local development
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');

    // For local development, use a URL that works when scanned from mobile
    // For production, use the production URL
    if (isLocal) {
        // In local dev, point to production URL since localhost won't work when scanned
        // This allows testing the QR code functionality locally
        return `${WEB_FALLBACK_URL}/download`;
    }

    // In production, use the current origin
    return `${window.location.origin}/download`;
}

/**
 * Handle App Store button click - always goes to App Store
 */
export function handleAppStoreDownload() {
    window.open(APP_STORE_URL, '_blank');
}

/**
 * Handle Play Store button click - always goes to Play Store
 */
export function handlePlayStoreDownload() {
    window.open(PLAY_STORE_URL, '_blank');
}

/**
 * Handle download button click with device detection (for QR code redirect page)
 */
export function handleSmartDownload() {
    const device = detectDevice();
    const url = getStoreUrl(device);

    // Only redirect if on mobile device
    if (device === 'ios' || device === 'android') {
        window.location.href = url;
    }
    // On web, do nothing or stay on page
}

/**
 * Alias for handleSmartDownload (backward compatibility)
 */
export const handleDownload = handleSmartDownload;
