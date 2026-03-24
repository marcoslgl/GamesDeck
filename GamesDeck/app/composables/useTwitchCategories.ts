export interface Category {
  id: string;
  name: string;
  box_art_url: string;
  viewer_count?: number;
}

interface CategoriesResponse {
  categories: Category[];
  count: number;
}

export const useTwitchCategories = () => {
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<CategoriesResponse>("/api/twitch/categories");
      categories.value = data.categories || [];
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch categories";
      console.error("Error fetching Twitch categories:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    categories: readonly(categories),
    loading: readonly(loading),
    error: readonly(error),
    fetchCategories,
  };
};
