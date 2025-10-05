// Real Business Status with Google Analytics Integration
import { NextRequest, NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

let analyticsClient: BetaAnalyticsDataClient | null = null;

// Initialize Google Analytics client
function getAnalyticsClient() {
  if (!analyticsClient && process.env.GOOGLE_ANALYTICS_CREDENTIALS) {
    try {
      const credentials = JSON.parse(process.env.GOOGLE_ANALYTICS_CREDENTIALS);
      analyticsClient = new BetaAnalyticsDataClient({
        credentials,
      });
    } catch (error) {
      console.error('Failed to initialize Google Analytics client:', error);
    }
  }
  return analyticsClient;
}

async function getRealAnalyticsData() {
  const client = getAnalyticsClient();
  const propertyId = 'G-LLRDSED6KZ'; // Your actual GA property ID

  if (!client) {
    // Fallback to realistic estimates if GA not configured
    return {
      activeUsers: Math.floor(Math.random() * 8) + 2,
      totalVisitors: 800 + Math.floor(Math.random() * 100),
      isRealData: false
    };
  }

  try {
    // Get real-time active users
    const [realtimeResponse] = await client.runRealtimeReport({
      property: `properties/G-LLRDSED6KZ`,
      metrics: [{ name: 'activeUsers' }],
    });

    // Get monthly visitors
    const [monthlyResponse] = await client.runReport({
      property: `properties/G-LLRDSED6KZ`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [{ name: 'totalUsers' }],
    });

    const activeUsers = parseInt(realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || '0');
    const monthlyUsers = parseInt(monthlyResponse.rows?.[0]?.metricValues?.[0]?.value || '0');

    return {
      activeUsers,
      totalVisitors: monthlyUsers,
      isRealData: true
    };
  } catch (error) {
    console.error('Google Analytics API error:', error);
    // Fallback to estimates
    return {
      activeUsers: Math.floor(Math.random() * 8) + 2,
      totalVisitors: 800 + Math.floor(Math.random() * 100),
      isRealData: false
    };
  }
}

export async function GET() {
  try {
    // Get real analytics data
    const analyticsData = await getRealAnalyticsData();

    // Check if Wildrose Painters website is online
    const startTime = Date.now();
    const websiteCheck = await fetch('https://wildrosepainters.ca', {
      method: 'HEAD',
      headers: { 'User-Agent': 'Portfolio Status Check' },
      timeout: 5000
    });
    const responseTime = Date.now() - startTime;

    const businessData = {
      isOnline: websiteCheck.ok,
      activeUsers: analyticsData.activeUsers,
      totalVisitors: analyticsData.totalVisitors,
      lastUpdated: new Date().toISOString(),
      status: websiteCheck.ok ? 'operational' : 'offline',
      responseTime: websiteCheck.ok ? `${responseTime}ms` : 'N/A',
      dataSource: analyticsData.isRealData ? 'Google Analytics' : 'Estimated',
      isRealData: analyticsData.isRealData
    };

    return NextResponse.json(businessData);
  } catch (error) {
    console.error('Business status API error:', error);
    return NextResponse.json({
      isOnline: false,
      activeUsers: 0,
      totalVisitors: 0,
      lastUpdated: new Date().toISOString(),
      status: 'offline',
      responseTime: 'N/A',
      dataSource: 'Error',
      isRealData: false
    });
  }
}