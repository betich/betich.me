import { atom } from "nanostores";

export type BackgroundState = "normal" | "rainbow";

interface Background {
  state: BackgroundState;
}

export const $background = atom<Background>({
  state: "normal",
});

export function setBackground(state: BackgroundState) {
  $background.set({ state });
}

export function getBackground() {
  return $background.get().state;
}
