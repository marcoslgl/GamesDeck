export const useFormatter = () => {
  const formatViewers = (count: number): string => {
    return count.toLocaleString("es-ES");
  };

  const getThumbnailUrl = (url: string, width: number = 440, height: number = 248): string => {
    return url.replace("{width}", width.toString()).replace("{height}", height.toString());
  };

  return { formatViewers, getThumbnailUrl };
};
