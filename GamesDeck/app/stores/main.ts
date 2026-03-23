import { defineStore } from "pinia";
import type { Category, Streamer, LiveChannel, MainCategory } from "~/types";

export const useMainStore = defineStore("main", {
  state: () => ({
    categories: [
      {
        id: 1,
        name: "League of Legends",
        image: "/ejemplo2.svg",
        viewerCount: 245000,
        tags: ["Competitive", "MOBA", "Ranked"],
      },
      {
        id: 2,
        name: "Valorant",
        image: "/ejemplo2.svg",
        viewerCount: 189000,
        tags: ["FPS", "Competitive", "Tactical"],
      },
      {
        id: 3,
        name: "Elden Ring",
        image: "/ejemplo2.svg",
        viewerCount: 156000,
        tags: ["RPG", "Souls-like", "Adventure"],
      },
      {
        id: 4,
        name: "Fortnite",
        image: "/ejemplo2.svg",
        viewerCount: 342000,
        tags: ["Battle Royale", "Building", "Action"],
      },
      {
        id: 5,
        name: "Just Chatting",
        image: "/ejemplo2.svg",
        viewerCount: 89000,
        tags: ["Casual", "Social", "IRL"],
      },
      {
        id: 6,
        name: "Minecraft",
        image: "/ejemplo2.svg",
        viewerCount: 234000,
        tags: ["Sandbox", "Creative", "Survival"],
      },
      {
        id: 7,
        name: "Counter-Strike 2",
        image: "/ejemplo2.svg",
        viewerCount: 312000,
        tags: ["FPS", "Competitive", "Esports"],
      },
      {
        id: 8,
        name: "Dota 2",
        image: "/ejemplo2.svg",
        viewerCount: 167000,
        tags: ["MOBA", "Competitive", "Strategy"],
      },
      {
        id: 9,
        name: "Rust",
        image: "/ejemplo2.svg",
        viewerCount: 198000,
        tags: ["Survival", "MMO", "PvP"],
      },
      {
        id: 10,
        name: "Cyberpunk 2077",
        image: "/ejemplo2.svg",
        viewerCount: 145000,
        tags: ["RPG", "Action", "Open World"],
      },
      {
        id: 11,
        name: "Baldur's Gate 3",
        image: "/ejemplo2.svg",
        viewerCount: 267000,
        tags: ["RPG", "Fantasy", "Adventure"],
      },
      {
        id: 12,
        name: "World of Warcraft",
        image: "/ejemplo2.svg",
        viewerCount: 201000,
        tags: ["MMO", "RPG", "Fantasy"],
      },
      {
        id: 13,
        name: "Starfield",
        image: "/ejemplo2.svg",
        viewerCount: 178000,
        tags: ["RPG", "Space", "Adventure"],
      },
      {
        id: 14,
        name: "Dragon's Dogma 2",
        image: "/ejemplo2.svg",
        viewerCount: 134000,
        tags: ["Action RPG", "Fantasy", "Adventure"],
      },
      {
        id: 15,
        name: "Final Fantasy XVI",
        image: "/ejemplo2.svg",
        viewerCount: 156000,
        tags: ["RPG", "Action", "Fantasy"],
      },
      {
        id: 16,
        name: "Helldivers 2",
        image: "/ejemplo2.svg",
        viewerCount: 289000,
        tags: ["Coop", "Shooter", "Action"],
      },
      {
        id: 17,
        name: "Sea of Thieves",
        image: "/ejemplo2.svg",
        viewerCount: 123000,
        tags: ["Adventure", "Pirate", "Coop"],
      },
      {
        id: 18,
        name: "Path of Exile",
        image: "/ejemplo2.svg",
        viewerCount: 98000,
        tags: ["ARPG", "RPG", "Action"],
      },
    ] as Category[],

    mainCategories: [
      {
        id: 1,
        name: "Games",
        icon: "/icons/games.svg",
        bgColor: "from-blue-500 to-cyan-500",
      },
      {
        id: 2,
        name: "IRL",
        icon: "/icons/irl.svg",
        bgColor: "from-purple-500 to-pink-500",
      },
      {
        id: 3,
        name: "Music & DJs",
        icon: "/icons/music.svg",
        bgColor: "from-amber-500 to-orange-500",
      },
      {
        id: 4,
        name: "Creative",
        icon: "/icons/creative.svg",
        bgColor: "from-green-500 to-emerald-500",
      },
      {
        id: 5,
        name: "Esports",
        icon: "/icons/esports.svg",
        bgColor: "from-yellow-500 to-amber-500",
      },
    ] as MainCategory[],
  }),

  getters: {
    getCategoriesCount: (state) => state.categories.length,
  },

  actions: {
    getCategoryById(id: number) {
      return this.categories.find((cat) => cat.id === id);
    },
  },
});
