export interface Category {
  id: number;
  name: string;
  image: string;
  viewerCount: number;
  tags?: string[];
}

export interface MainCategory {
  id: number;
  name: string;
  icon: string;
  bgColor: string;
}

export interface LiveChannel {
  id: number;
  title: string;
  streamer: string;
  thumbnail: string;
  viewers: number;
  category: string;
  isLive: boolean;
  streamerAvatar?: string;
  tags?: string[];
}
