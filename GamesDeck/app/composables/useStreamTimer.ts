import { ref, watch, onMounted, onUnmounted, type ComputedRef } from "vue";

interface Stream {
  started_at?: string;
}

export const useStreamTimer = (stream: ComputedRef<Stream | undefined>) => {
  const streamDuration = ref("00:00:00");
  let timerInterval: number | null = null;

  const calculateStreamDuration = (startedAt: string): string => {
    const start = new Date(startedAt);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    const pad = (num: number): string => String(num).padStart(2, "0");
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  };

  const startStreamTimer = () => {
    timerInterval = window.setInterval(() => {
      if (stream.value?.started_at) {
        streamDuration.value = calculateStreamDuration(stream.value.started_at);
      }
    }, 1000);
  };

  const stopStreamTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  watch(
    () => stream.value?.started_at,
    (startedAt) => {
      if (startedAt) {
        streamDuration.value = calculateStreamDuration(startedAt);
      }
    },
  );

  onMounted(() => startStreamTimer());
  onUnmounted(() => stopStreamTimer());

  return { streamDuration };
};
