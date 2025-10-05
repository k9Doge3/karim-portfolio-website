import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, return mock data
    // In production, this would use the stored access token to fetch real data
    const mockData = {
      profile: {
        open_id: "demo_user_123",
        display_name: "KY Life Demo",
        avatar_url: "https://example.com/avatar.jpg",
        follower_count: 1250,
        following_count: 890,
        likes_count: 15600
      },
      videos: [
        {
          id: "video_1",
          title: "Latest Creative Project",
          view_count: 5420,
          like_count: 234,
          share_count: 12,
          create_time: Date.now() - (24 * 60 * 60 * 1000), // 1 day ago
          cover_image_url: "https://example.com/cover1.jpg"
        },
        {
          id: "video_2", 
          title: "Behind the Scenes",
          view_count: 3210,
          like_count: 156,
          share_count: 8,
          create_time: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
          cover_image_url: "https://example.com/cover2.jpg"
        },
        {
          id: "video_3",
          title: "Quick Tutorial",
          view_count: 8950,
          like_count: 445,
          share_count: 23,
          create_time: Date.now() - (7 * 24 * 60 * 60 * 1000), // 1 week ago
          cover_image_url: "https://example.com/cover3.jpg"
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