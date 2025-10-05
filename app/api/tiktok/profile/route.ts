import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, return mock data
    // In production, this would use the stored access token to fetch real data
    const mockData = {
      profile: {
        open_id: "karim_life_123",
        username: "@karim.life",
        display_name: "Karim | KY Life",
        avatar_url: "/profile-picture.jpg",
        follower_count: 2840,
        following_count: 456,
        likes_count: 18500,
        video_count: 47,
        bio: "CPA Candidate 📊 | Entrepreneur 🚀 | Tech & Business Content",
        verified: false
      },
      videos: [
        {
          id: "7298765432101234567",
          title: "Day in the Life: CPA Exam Prep 📚",
          view_count: 15600,
          like_count: 892,
          comment_count: 156,
          share_count: 43,
          create_time: Date.now() - (2 * 24 * 60 * 60 * 1000), // 2 days ago
          cover_image_url: "/placeholder.jpg",
          web_video_url: "https://tiktok.com/@karim.life/video/1",
          duration: 45
        },
        {
          id: "7298765432101234568", 
          title: "Business Tips for Young Entrepreneurs 💼",
          view_count: 23400,
          like_count: 1340,
          comment_count: 287,
          share_count: 89,
          create_time: Date.now() - (4 * 24 * 60 * 60 * 1000), // 4 days ago
          cover_image_url: "/placeholder.jpg",
          web_video_url: "https://tiktok.com/@karim.life/video/2",
          duration: 38
        },
        {
          id: "7298765432101234569",
          title: "Tech Stack for My Portfolio Website 💻",
          view_count: 8900,
          like_count: 567,
          comment_count: 89,
          share_count: 23,
          create_time: Date.now() - (7 * 24 * 60 * 60 * 1000), // 1 week ago
          cover_image_url: "/placeholder.jpg",
          web_video_url: "https://tiktok.com/@karim.life/video/3",
          duration: 52
        }
      ],
      last_updated: new Date().toISOString(),
      status: 'success'
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('TikTok profile error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch TikTok profile',
      status: 'error' 
    }, { status: 500 });
  }
}