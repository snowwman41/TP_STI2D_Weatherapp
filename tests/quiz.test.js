import { describe, it, assertEqual, assertTrue } from "./runner.js";
import { scoreQuiz } from "../assets/js/quiz.js";

const quiz = [
  { type: "qcm", bonneReponse: 1 },
  { type: "vraifaux", bonneReponse: true },
  { type: "complete", bonneReponse: "addEventListener" }
];

describe("quiz.scoreQuiz", () => {
  it("tout juste -> 1", () => assertEqual(scoreQuiz(quiz, [1, true, "addEventListener"]).ratio, 1));
  it("moitié -> ~0.33 par bonne réponse", () => assertEqual(scoreQuiz(quiz, [1, false, "x"]).ratio, 1/3));
  it("complete insensible à la casse/espaces", () =>
    assertTrue(scoreQuiz([quiz[2]], [" AddEventListener "]).ratio === 1));
});
