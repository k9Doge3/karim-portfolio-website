import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '10';
    
    // For demo purposes, return enhanced mock data
    // In production, this would use the stored access token to fetch real videos
    const mockVideos = [
      {
        id: "7298765432101234567",
        title: "Day in the Life: CPA Exam Prep 📚",
        description: "Follow along as I share my study routine and tips for passing the CPA exam. From early morning coffee to late night review sessions!",
        view_count: 15600,
        like_count: 892,
        comment_count: 156,
        share_count: 43,
        create_time: Date.now() - (2 * 24 * 60 * 60 * 1000),
        cover_image_url: "/placeholder.jpg",
        web_video_url: "https://tiktok.com/@karim.life/video/1",
        duration: 45,
        hashtags: ["#CPA", "#StudyWithMe", "#Accounting", "#ExamPrep"],
        engagement_rate: 5.7
      },
      {
        id: "7298765432101234568",
        title: "Business Tips for Young Entrepreneurs 💼",
        description: "5 essential tips I wish I knew when starting my first business. From networking to financial planning - here's what matters most!",
        view_count: 23400,
        like_count: 1340,
        comment_count: 287,
        share_count: 89,
        create_time: Date.now() - (4 * 24 * 60 * 60 * 1000),
        cover_image_url: "/placeholder.jpg",
        web_video_url: "https://tiktok.com/@karim.life/video/2",
        duration: 38,
        hashtags: ["#Entrepreneur", "#BusinessTips", "#Startup", "#SmallBusiness"],
        engagement_rate: 7.2
      },
      {
        id: "7298765432101234569",
        title: "Tech Stack for My Portfolio Website 💻",
        description: "Building a modern portfolio with Next.js, TypeScript, and real-time API integrations. Here's my complete setup!",
        view_count: 8900,
        like_count: 567,
        comment_count: 89,
        share_count: 23,
        create_time: Date.now() - (7 * 24 * 60 * 60 * 1000),
        cover_image_url: "/placeholder.jpg",
        web_video_url: "https://tiktok.com/@karim.life/video/3",
        duration: 52,
        hashtags: ["#WebDev", "#NextJS", "#Portfolio", "#TechStack"],
        engagement_rate: 7.6
      },
      {
        id: "7298765432101234570",
        title: "Behind the Scenes: Running Wildrose Painters 🎨",
        description: "What it's really like co-owning a painting business. From client meetings to project management!",
        view_count: 12300,
        like_count: 678,
        comment_count: 134,
        share_count: 45,
        create_time: Date.now() - (10 * 24 * 60 * 60 * 1000),
        cover_image_url: "/placeholder.jpg",
        web_video_url: "https://tiktok.com/@karim.life/video/4",
        duration: 41,
        hashtags: ["#SmallBusiness", "#Painting", "#Contractor", "#BTS"],
        engagement_rate: 6.8
      },
      {
        id: "7298765432101234571",
        title: "My Morning Routine for Productivity ☕",
        description: "How I structure my mornings to maximize productivity while balancing business, studies, and personal projects.",
        view_count: 19800,
        like_count: 1120,
        comment_count: 203,
        share_count: 67,
        create_time: Date.now() - (14 * 24 * 60 * 60 * 1000),
        cover_image_url: "/placeholder.jpg",
        web_video_url: "https://tiktok.com/@karim.life/video/5",
        duration: 35,
        hashtags: ["#MorningRoutine", "#Productivity", "#StudyLife", "#Balance"],
        engagement_rate: 7.0
      }
    ];

    // Apply limit
    const limitedVideos = mockVideos.slice(0, parseInt(limit));

    return NextResponse.json({
      videos: limitedVideos,
      total_count: mockVideos.length,
      has_more: mockVideos.length > parseInt(limit),
      cursor: limitedVideos.length < mockVideos.length ? limitedVideos[limitedVideos.length - 1].id : null,
      last_updated: new Date().toISOString(),
      status: 'success'
    });
  } catch (error) {
    console.error('TikTok videos error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch TikTok videos',
      status: 'error' 
    }, { status: 500 });
  }
}