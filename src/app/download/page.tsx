"use client";

import { useEffect, useState } from 'react';
import { handleSmartDownload, detectDevice, APP_STORE_URL, PLAY_STORE_URL } from '@/utils/device-utils';

export default function DownloadPage() {
    const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'web'>('web');
    const [redirecting, setRedirecting] = useState(true);

    useEffect(() => {
        const device = detectDevice();
        setDeviceType(device);

        // Auto-redirect on mobile devices
        if (device === 'ios' || device === 'android') {
            handleSmartDownload();
            // Stop showing redirecting message after 2 seconds
            setTimeout(() => setRedirecting(false), 2000);
        } else {
            // On desktop, don't show redirecting message
            setRedirecting(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                {redirecting ? (
                    <>
                        <div className="mb-8">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                        </div>
                        <h1 className="text-3xl font-bold mb-3">Redirecting...</h1>
                        <p className="text-blue-100">Taking you to the app store</p>
                    </>
                ) : (
                    <>
                        <div className="mb-8">
                            <img
                                src="/LogoWhiteText.png"
                                alt="TeamTuned"
                                className="h-20 w-auto mx-auto mb-6"
                            />
                            <h1 className="text-3xl font-bold mb-3">Download TeamTuned</h1>
                            <p className="text-blue-100 mb-8">
                                {deviceType === 'web'
                                    ? 'Choose your platform to download the app'
                                    : 'If the redirect didn\'t work, tap the button below'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <a
                                href={APP_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                            >
                                📱 Download on App Store
                            </a>
                            <a
                                href={PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                            >
                                🤖 Get it on Google Play
                            </a>
                        </div>

                        <p className="mt-8 text-sm text-blue-200">
                            Detected device: <span className="font-semibold">{deviceType === 'ios' ? 'iOS' : deviceType === 'android' ? 'Android' : 'Desktop'}</span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
