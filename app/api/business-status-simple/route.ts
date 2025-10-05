// Alternative: Simple Real Analytics without Google Analytics
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Method 1: Real website health check
    const startTime = Date.now();
    const websiteCheck = await fetch('https://wildrosepainters.ca', {
      method: 'HEAD',
      headers: { 'User-Agent': 'Portfolio Status Check' },
      signal: AbortSignal.timeout(5000)
    });
    const responseTime = Date.now() - startTime;

    // Method 2: Simple visitor tracking (could be enhanced with a small database)
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Realistic patterns based on business hours and days
    let baseActiveUsers = 1;
    let dailyMultiplier = 1;
    
    // Business hours effect (9 AM - 5 PM gets more traffic)
    if (hour >= 9 && hour <= 17) {
      baseActiveUsers += Math.floor(Math.random() * 4) + 1; // 2-5 during business hours
    } else {
      baseActiveUsers += Math.floor(Math.random() * 2); // 1-2 after hours
    }
    
    // Weekday vs weekend effect
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      dailyMultiplier = 1.5; // 50% more traffic on weekdays
    }
    
    // Monthly patterns (seasonal painting business)
    const month = now.getMonth();
    let seasonalMultiplier = 1;
    if (month >= 3 && month <= 9) { // April to October (painting season)
      seasonalMultiplier = 1.8;
    }
    
    const realisticActiveUsers = Math.max(1, Math.floor(baseActiveUsers * dailyMultiplier));
    const estimatedMonthlyVisitors = Math.floor(
      (450 + Math.random() * 200) * seasonalMultiplier
    ); // 450-650 base, adjusted for season

    const businessData = {
      isOnline: websiteCheck.ok,
      activeUsers: realisticActiveUsers,
      totalVisitors: estimatedMonthlyVisitors,
      lastUpdated: new Date().toISOString(),
      status: websiteCheck.ok ? 'operational' : 'offline',
      responseTime: websiteCheck.ok ? `${responseTime}ms` : 'N/A',
      dataSource: 'Smart Estimates',
      isRealData: false,
      metadata: {
        businessHours: hour >= 9 && hour <= 17,
        isWeekday: dayOfWeek >= 1 && dayOfWeek <= 5,
        isPaintingSeason: month >= 3 && month <= 9,
        hour: hour,
        dayOfWeek: dayOfWeek
      }
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