import { defineStore } from "pinia";
import type { MainCategory } from "~/types";

export const useMainStore = defineStore("main", {
  state: () => ({
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
});
