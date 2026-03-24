import { ref, nextTick, onBeforeUnmount, type Ref } from "vue";

export const useGridColumns = () => {
  const columnsInRow = ref(0);

  const calculateColumns = (gridContainer: HTMLElement | null) => {
    if (!gridContainer) return;
    const gridElement = gridContainer.querySelector("[data-grid]") as HTMLElement;
    if (!gridElement) return;

    const gridStyle = window.getComputedStyle(gridElement);
    const columnCount = gridStyle.gridTemplateColumns.split(" ").length;
    columnsInRow.value = columnCount;
  };

  const init = async (gridContainer: Ref<HTMLElement | null>) => {
    await nextTick();
    calculateColumns(gridContainer.value);

    const resizeObserver = new ResizeObserver(() => calculateColumns(gridContainer.value));
    if (gridContainer.value) {
      resizeObserver.observe(gridContainer.value);

      onBeforeUnmount(() => {
        resizeObserver.disconnect();
      });
    }
  };

  return { columnsInRow, init };
};
