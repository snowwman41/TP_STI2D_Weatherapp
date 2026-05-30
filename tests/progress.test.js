import { describe, it, assertEqual, assertTrue } from "./runner.js";
import { isUnlocked, markCompleted, resetProgress, unlockAll } from "../assets/js/progress.js";

describe("progress", () => {
  it("première étape toujours déverrouillée", () => {
    resetProgress();
    assertTrue(isUnlocked(0));
  });
  it("étape verrouillée tant que la précédente n'est pas finie", () => {
    resetProgress();
    assertEqual(isUnlocked(1), false);
  });
  it("compléter une étape déverrouille la suivante", () => {
    resetProgress();
    markCompleted(0);
    assertTrue(isUnlocked(1));
  });
  it("déverrouillage prof ouvre tout", () => {
    resetProgress();
    unlockAll();
    assertTrue(isUnlocked(5));
  });
});
