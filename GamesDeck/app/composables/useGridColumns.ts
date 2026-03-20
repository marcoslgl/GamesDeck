import { ref, nextTick, onBeforeUnmount } from "vue";

export const useGridColumns = (gridContainer: Ref<HTMLElement | null>) => {
  const columnsInRow = ref(0);

  const calculateColumns = () => {
    if (!gridContainer.value) return;
    const gridElement = gridContainer.value.querySelector("[data-grid]") as HTMLElement;
    if (!gridElement) return;

    const gridStyle = window.getComputedStyle(gridElement);
    const columnCount = gridStyle.gridTemplateColumns.split(" ").length;
    columnsInRow.value = columnCount;
  };

  const init = async () => {
    await nextTick();
    calculateColumns();

    const resizeObserver = new ResizeObserver(calculateColumns);
    resizeObserver.observe(gridContainer.value!);

    onBeforeUnmount(() => {
      resizeObserver.disconnect();
    });
  };

  return { columnsInRow, init };
};
