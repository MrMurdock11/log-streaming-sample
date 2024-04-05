// ./hooks/useEventSource.ts
import { useEffect } from "react";

interface UseEventSourceOptions {
  onOpen?: (ev: Event) => void;
  onMessage: (ev: MessageEvent) => void;
  onError?: (ev: Event | MessageEvent) => void;
}

export const useEventSource = (
  url: string,
  { onOpen, onMessage, onError }: UseEventSourceOptions
): void => {
  useEffect(() => {
    const eventSource = new EventSource(url);

    if (onOpen) eventSource.onopen = onOpen;
    eventSource.onmessage = onMessage;
    eventSource.onerror = (event) => {
      console.error("EventSource error:", event);
      onError?.(event);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url, onOpen, onMessage, onError]);
};
