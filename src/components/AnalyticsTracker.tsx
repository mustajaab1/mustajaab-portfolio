'use client';

import { useEffect } from 'react';
import { trackVisitor } from '@/app/actions';

export default function AnalyticsTracker() {
  useEffect(() => {
    // Avoid double tracking in dev hot-reloads
    const tracked = sessionStorage.getItem('analytics_tracked');
    if (tracked) return;

    try {
      const ua = navigator.userAgent;
      let browser = 'Chrome';
      let device = 'Desktop';

      if (ua.includes('Firefox')) {
        browser = 'Firefox';
      } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser = 'Safari';
      } else if (ua.includes('Edge')) {
        browser = 'Edge';
      } else if (ua.includes('OPR') || ua.includes('Opera')) {
        browser = 'Opera';
      }

      if (/Mobile|Android|iPhone|iPod/i.test(ua)) {
        device = 'Mobile';
      } else if (/Tablet|iPad/i.test(ua)) {
        device = 'Tablet';
      }

      trackVisitor({ device, browser }).then(() => {
        sessionStorage.setItem('analytics_tracked', 'true');
      });
    } catch (err) {
      console.warn('Silent analytics capture bypassed:', err);
    }
  }, []);

  return null;
}
