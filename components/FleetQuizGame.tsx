"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Fleet Data (imported from sky-quiz/game.js) ──
// We'll load it dynamically to keep this file manageable
import { FLEET_DATA, ALL_TYPES, LEVELS, PROFANITY_LIST } from "./fleetData";

// ── Types ──
interface Question {
  ship: string;
  correctType: string;
  choices: string[];
}

interface LeaderboardEntry {
  name: string;
  station: string;
  score: number;
  level: number;
  correct: number;
  total: number;
  bestStreak: number;
  date: string;
}

interface GameState {
  score: number;
  altitude: number;
  level: number;
  streak: number;
  bestStreak: number;
  totalCorrect: number;
  totalAsked: number;
  correctForLevel: number;
  isPlaying: boolean;
  timeLeft: number;
  answered: boolean;
  currentQuestion: Question | null;
}

// ── Constants ──
const LB_KEY = "deltaFleetQuiz_leaderboard";
const LB_MAX = 25;
const TIMER_CIRCUMFERENCE = 2 * Math.PI * 34;

// ── Profanity Check ──
function containsProfanity(text: string): boolean {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  const spaced = text.toLowerCase();
  for (const word of PROFANITY_LIST) {
    const cleanWord = word.replace(/[^a-z0-9]/g, "");
    if (cleanWord.length >= 3 && clean.includes(cleanWord)) return true;
    if (word.length >= 3 && spaced.includes(word)) return true;
  }
  return false;
}

// ── Leaderboard Helpers ──
function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LB_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  localStorage.setItem(LB_KEY, JSON.stringify(entries));
}

function getHighScore(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem("deltaFleetQuiz_highScore") || "0", 10);
}

function setHighScore(s: number) {
  localStorage.setItem("deltaFleetQuiz_highScore", String(s));
}

// ── Shuffle ──
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Rank Badge Component ──
function RankBadge({ rank }: { rank: number }) {
  let cls = "bg-base-300 text-base-content/60";
  if (rank === 1) cls = "bg-gradient-to-br from-yellow-400 to-orange-500 text-yellow-900 shadow-lg shadow-yellow-500/30";
  if (rank === 2) cls = "bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700 shadow-lg shadow-gray-400/30";
  if (rank === 3) cls = "bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 shadow-lg shadow-amber-600/30";

  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-extrabold text-sm ${cls}`}>
      {rank}
    </span>
  );
}

// ══════════════════════════════════════════════════
// MAIN GAME COMPONENT
// ══════════════════════════════════════════════════
export default function FleetQuizGame() {
  // ── State ──
  const [screen, setScreen] = useState<"start" | "playing" | "gameover">("start");
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const [playerName, setPlayerName] = useState("");
  const [playerStation, setPlayerStation] = useState("");
  const [nameError, setNameError] = useState("");

  const [gameState, setGameState] = useState<GameState>({
    score: 0, altitude: 75, level: 0, streak: 0, bestStreak: 0,
    totalCorrect: 0, totalAsked: 0, correctForLevel: 0,
    isPlaying: false, timeLeft: 15, answered: false, currentQuestion: null,
  });

  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackType, setFeedbackType] = useState<"correct" | "wrong" | "">(""); 
  const [scoreParticle, setScoreParticle] = useState<{ text: string; positive: boolean } | null>(null);
  const [answerStates, setAnswerStates] = useState<Record<number, "correct" | "wrong" | "">>({});
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [leaderboardRank, setLeaderboardRank] = useState(0);
  const [highScore, setLocalHighScore] = useState(0);

  const usedShipsRef = useRef<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  // ── Load saved player info ──
  useEffect(() => {
    const savedName = localStorage.getItem("deltaFleetQuiz_playerName") || "";
    const savedStation = localStorage.getItem("deltaFleetQuiz_playerStation") || "";
    if (savedName) setPlayerName(savedName);
    if (savedStation) setPlayerStation(savedStation);
    setLocalHighScore(getHighScore());
  }, []);

  // ── Timer Logic ──
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleTimeout = useCallback(() => {
    const gs = gameStateRef.current;
    if (gs.answered) return;
    const level = LEVELS[gs.level];

    // Show correct answer
    if (gs.currentQuestion) {
      const correctIdx = gs.currentQuestion.choices.indexOf(gs.currentQuestion.correctType);
      setAnswerStates(prev => ({ ...prev, [correctIdx]: "correct" }));
    }

    setButtonsDisabled(true);
    setFeedbackMsg(`⏱️ Time's up! Answer: ${gs.currentQuestion?.correctType}`);
    setFeedbackType("wrong");
    setScoreParticle({ text: "TIME OUT", positive: false });
    setTimeout(() => setScoreParticle(null), 1200);

    setGameState(prev => {
      const newAlt = prev.altitude - level.altitudeLoss;
      return { ...prev, answered: true, streak: 0, altitude: newAlt, timeLeft: 0 };
    });
  }, []);

  const startTimer = useCallback((levelIdx: number) => {
    stopTimer();
    const timerDuration = LEVELS[levelIdx].timer;

    setGameState(prev => ({ ...prev, timeLeft: timerDuration }));

    timerRef.current = setInterval(() => {
      setGameState(prev => {
        const newTime = prev.timeLeft - 1;
        if (newTime <= 0) {
          stopTimer();
          setTimeout(() => handleTimeout(), 0);
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: newTime };
      });
    }, 1000);
  }, [stopTimer, handleTimeout]);

  // ── Generate Question ──
  const generateQuestion = useCallback((): Question => {
    let available = FLEET_DATA.map((_, i) => i).filter(i => !usedShipsRef.current.includes(i));
    if (available.length === 0) {
      usedShipsRef.current = [];
      available = FLEET_DATA.map((_, i) => i);
    }

    const idx = available[Math.floor(Math.random() * available.length)];
    usedShipsRef.current.push(idx);
    if (usedShipsRef.current.length > Math.floor(FLEET_DATA.length * 0.7)) {
      usedShipsRef.current.shift();
    }

    const correct = FLEET_DATA[idx];
    const wrongTypes = shuffleArray(ALL_TYPES.filter(t => t !== correct.type)).slice(0, 3);
    const choices = shuffleArray([correct.type, ...wrongTypes]);

    return { ship: correct.ship, correctType: correct.type, choices };
  }, []);

  // ── Show Next Question ──
  const showQuestion = useCallback(() => {
    const q = generateQuestion();
    setFeedbackMsg("");
    setFeedbackType("");
    setAnswerStates({});
    setButtonsDisabled(false);

    setGameState(prev => ({
      ...prev,
      answered: false,
      totalAsked: prev.totalAsked + 1,
      currentQuestion: q,
    }));

    startTimer(gameStateRef.current.level);
  }, [generateQuestion, startTimer]);

  // ── Check Game Over & Next ──
  useEffect(() => {
    if (gameState.answered && gameState.isPlaying) {
      if (gameState.altitude <= 0) {
        setTimeout(() => endGame(), 1200);
      } else {
        setTimeout(() => {
          if (gameStateRef.current.isPlaying) {
            showQuestion();
          }
        }, 1800);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.answered, gameState.altitude]);

  // ── Handle Answer ──
  const handleAnswer = (choice: string, idx: number) => {
    if (gameState.answered || !gameState.isPlaying) return;
    stopTimer();

    const isCorrect = choice === gameState.currentQuestion?.correctType;
    const level = LEVELS[gameState.level];

    setButtonsDisabled(true);

    // Highlight correct answer
    const correctIdx = gameState.currentQuestion!.choices.indexOf(gameState.currentQuestion!.correctType);
    const newStates: Record<number, "correct" | "wrong" | ""> = { [correctIdx]: "correct" };
    if (!isCorrect) newStates[idx] = "wrong";
    setAnswerStates(newStates);

    if (isCorrect) {
      const timeBonus = Math.round(gameState.timeLeft * 2);
      const points = Math.round((100 + timeBonus) * level.scoreMultiplier);

      setFeedbackMsg(`✅ +${points} points!`);
      setFeedbackType("correct");
      setScoreParticle({ text: `+${points}`, positive: true });
      setTimeout(() => setScoreParticle(null), 1200);

      setGameState(prev => {
        const newStreak = prev.streak + 1;
        const newBest = Math.max(prev.bestStreak, newStreak);
        const newCFL = prev.correctForLevel + 1;
        let newLevel = prev.level;
        if (newCFL >= 5 && prev.level < LEVELS.length - 1) {
          newLevel = prev.level + 1;
        }
        return {
          ...prev,
          answered: true,
          score: prev.score + points,
          totalCorrect: prev.totalCorrect + 1,
          streak: newStreak,
          bestStreak: newBest,
          altitude: Math.min(100, prev.altitude + level.altitudeGain),
          correctForLevel: newCFL >= 5 ? 0 : newCFL,
          level: newLevel,
        };
      });
    } else {
      setFeedbackMsg(`❌ Correct: ${gameState.currentQuestion?.correctType}`);
      setFeedbackType("wrong");
      setScoreParticle({ text: "-ALT", positive: false });
      setTimeout(() => setScoreParticle(null), 1200);

      setGameState(prev => ({
        ...prev,
        answered: true,
        streak: 0,
        altitude: prev.altitude - level.altitudeLoss,
      }));
    }
  };

  // ── End Game ──
  const endGame = () => {
    stopTimer();
    const gs = gameStateRef.current;

    // Update high score
    const hs = getHighScore();
    if (gs.score > hs) setHighScore(gs.score);
    setLocalHighScore(Math.max(gs.score, hs));

    // Submit to leaderboard
    const entry: LeaderboardEntry = {
      name: playerName, station: playerStation.toUpperCase(),
      score: gs.score, level: gs.level + 1,
      correct: gs.totalCorrect, total: gs.totalAsked,
      bestStreak: gs.bestStreak, date: new Date().toISOString(),
    };

    const lb = getLeaderboard();
    lb.push(entry);
    lb.sort((a, b) => b.score - a.score);
    const rank = lb.findIndex(e => e === entry) + 1;
    if (lb.length > LB_MAX) lb.length = LB_MAX;
    saveLeaderboard(lb);
    setLeaderboardRank(rank <= LB_MAX ? rank : 0);

    setGameState(prev => ({ ...prev, isPlaying: false }));
    setScreen("gameover");
  };

  // ── Start Game ──
  const startGame = () => {
    // Validate
    const name = playerName.trim();
    const station = playerStation.trim().toUpperCase();
    setNameError("");

    if (!name) { setNameError("Please enter your call sign."); return; }
    if (containsProfanity(name) || containsProfanity(station)) {
      setNameError("⚠️ Inappropriate name detected. Please choose another.");
      return;
    }
    if (!station) { setNameError("Please enter your station."); return; }

    localStorage.setItem("deltaFleetQuiz_playerName", name);
    localStorage.setItem("deltaFleetQuiz_playerStation", station);

    usedShipsRef.current = [];
    setGameState({
      score: 0, altitude: 75, level: 0, streak: 0, bestStreak: 0,
      totalCorrect: 0, totalAsked: 0, correctForLevel: 0,
      isPlaying: true, timeLeft: 15, answered: false, currentQuestion: null,
    });
    setLeaderboardRank(0);
    setFeedbackMsg("");
    setFeedbackType("");
    setScreen("playing");

    setTimeout(() => showQuestion(), 600);
  };

  // ── Cleanup ──
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  // ── Derived ──
  const level = LEVELS[gameState.level];
  const timerProgress = level ? 1 - (gameState.timeLeft / level.timer) : 0;
  const timerStroke = gameState.timeLeft <= 3 ? "#FF5252" : "#00E676";
  const altColor = gameState.altitude > 60 ? "text-success" : gameState.altitude > 30 ? "text-warning" : "text-error";

  // ══════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F2847] to-[#1A4A7A] text-white relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Score Particle */}
      {scoreParticle && (
        <div
          className={`fixed left-1/2 top-[45%] -translate-x-1/2 font-extrabold text-xl z-50 pointer-events-none animate-bounce
            ${scoreParticle.positive ? "text-success" : "text-error"}`}
        >
          {scoreParticle.text}
        </div>
      )}

      {/* ════════ START SCREEN ════════ */}
      {screen === "start" && (
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-md w-full animate-[fadeIn_0.6s_ease-out]">
            {/* Delta Logo */}
            <svg viewBox="0 0 60 60" className="w-16 h-16 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(232,24,48,0.5)]">
              <path d="M30 5 L55 50 L5 50Z" fill="#E81830" />
            </svg>
            <h1 className="text-4xl md:text-5xl font-black tracking-wider mb-2 bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent">
              DELTA FLEET QUIZ
            </h1>
            <p className="text-white/60 font-light mb-6">Match the Ship Number to the Aircraft Type</p>

            {/* Player Registration */}
            <div className="space-y-4 mb-6">
              <div className="text-left">
                <label className="text-[0.65rem] font-bold tracking-[0.2em] text-white/60 uppercase pl-1">CALL SIGN</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={e => { setPlayerName(e.target.value); setNameError(""); }}
                  onKeyDown={e => e.key === "Enter" && startGame()}
                  placeholder="Enter your name"
                  maxLength={20}
                  className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-white/30 focus:border-blue-400/50 focus:shadow-[0_0_20px_rgba(116,185,255,0.15)] outline-none transition-all backdrop-blur-md"
                />
              </div>
              <div className="text-left">
                <label className="text-[0.65rem] font-bold tracking-[0.2em] text-white/60 uppercase pl-1">STATION</label>
                <input
                  type="text"
                  value={playerStation}
                  onChange={e => { setPlayerStation(e.target.value.toUpperCase()); setNameError(""); }}
                  onKeyDown={e => e.key === "Enter" && startGame()}
                  placeholder="e.g. ATL, DTW, MSP"
                  maxLength={10}
                  className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-white/30 focus:border-blue-400/50 focus:shadow-[0_0_20px_rgba(116,185,255,0.15)] outline-none transition-all backdrop-blur-md"
                />
              </div>
              {nameError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 text-center animate-[fadeIn_0.3s_ease-out]">
                  {nameError}
                </div>
              )}
            </div>

            {/* Stats Pills */}
            <div className="flex justify-center gap-3 mb-6 flex-wrap">
              <span className="px-4 py-2 bg-white/8 border border-white/15 rounded-full text-sm text-white/60 backdrop-blur-md">
                🏆 High Score: {highScore}
              </span>
              <span className="px-4 py-2 bg-white/8 border border-white/15 rounded-full text-sm text-white/60 backdrop-blur-md">
                ✈️ Fleet: {FLEET_DATA.length} aircraft
              </span>
            </div>

            {/* Start Button */}
            <button
              onClick={startGame}
              className="btn btn-lg border-0 bg-gradient-to-r from-[#E81830] to-[#C0121F] hover:from-[#ff2040] hover:to-[#E81830] text-white font-bold tracking-wider rounded-full shadow-[0_4px_25px_rgba(232,24,48,0.4)] hover:shadow-[0_8px_35px_rgba(232,24,48,0.55)] hover:-translate-y-1 transition-all duration-300 w-full max-w-xs"
            >
              Start Flight ➤
            </button>

            {/* Leaderboard Button */}
            <div className="mt-4">
              <button
                onClick={() => setShowLeaderboard(true)}
                className="btn btn-ghost btn-sm border border-white/15 text-white/60 hover:text-white hover:bg-white/10 rounded-full gap-2"
              >
                🏆 Leaderboard
              </button>
            </div>

            <p className="mt-4 text-sm text-white/30">Answer correctly to stay airborne!</p>
          </div>
        </div>
      )}

      {/* ════════ GAME SCREEN ════════ */}
      {screen === "playing" && gameState.currentQuestion && (
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* HUD */}
          <div className="flex items-start justify-between p-4">
            {/* Score / Level / Streak */}
            <div className="flex gap-2">
              {[
                { label: "SCORE", value: gameState.score, color: "text-yellow-400" },
                { label: "LEVEL", value: gameState.level + 1, color: "text-blue-400" },
                { label: "STREAK", value: `${gameState.streak} 🔥`, color: "text-white" },
              ].map(item => (
                <div key={item.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-2 text-center backdrop-blur-md min-w-[70px]">
                  <div className="text-[0.6rem] font-semibold tracking-widest text-white/60">{item.label}</div>
                  <div className={`text-lg font-extrabold ${item.color}`}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Timer Ring */}
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke={timerStroke} strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={TIMER_CIRCUMFERENCE}
                  strokeDashoffset={TIMER_CIRCUMFERENCE * timerProgress}
                  className="transition-all duration-300"
                />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center font-extrabold text-lg ${gameState.timeLeft <= 3 ? "text-error animate-pulse" : ""}`}>
                {Math.ceil(gameState.timeLeft)}
              </span>
            </div>
          </div>

          {/* Altitude Gauge (right side) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
            <span className="text-[0.65rem] font-bold tracking-widest text-white/60">ALT</span>
            <div className="w-3 h-48 bg-white/8 rounded-full border border-white/15 relative overflow-hidden">
              <div
                className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-700"
                style={{
                  height: `${Math.max(0, Math.min(100, gameState.altitude))}%`,
                  background: "linear-gradient(to top, #FF5252, #FFD740, #00E676)",
                }}
              />
            </div>
            <span className={`text-sm font-bold ${altColor}`}>{Math.round(gameState.altitude)}%</span>
          </div>

          {/* Question Card */}
          <div className="flex-1 flex items-end justify-center pb-8 px-4">
            <div className="w-full max-w-lg bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.3)] animate-[fadeIn_0.4s_ease-out]">
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <span className="bg-[#003366] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                  Q{gameState.totalAsked}
                </span>
                <span className={`text-xs font-bold tracking-widest px-3 py-1 rounded-full
                  ${gameState.level === 0 ? "bg-green-500/15 text-green-400" : ""}
                  ${gameState.level === 1 ? "bg-yellow-500/15 text-yellow-400" : ""}
                  ${gameState.level >= 2 ? "bg-red-500/15 text-red-400" : ""}
                `}>
                  {level.name}
                </span>
              </div>

              {/* Ship Number */}
              <div className="text-center mb-5">
                <p className="text-sm text-white/60 font-light">What aircraft type is</p>
                <h2 className="text-3xl font-black tracking-widest text-white drop-shadow-[0_0_20px_rgba(116,185,255,0.4)]">
                  SHIP {gameState.currentQuestion.ship}
                </h2>
              </div>

              {/* Answer Grid */}
              <div className="grid grid-cols-2 gap-3">
                {gameState.currentQuestion.choices.map((choice, i) => (
                  <button
                    key={i}
                    disabled={buttonsDisabled}
                    onClick={() => handleAnswer(choice, i)}
                    className={`py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-200 border
                      ${answerStates[i] === "correct"
                        ? "bg-green-500/20 border-green-400 shadow-[0_0_20px_rgba(0,230,118,0.3)]"
                        : answerStates[i] === "wrong"
                        ? "bg-red-500/20 border-red-400 shadow-[0_0_20px_rgba(255,82,82,0.3)] animate-[shake_0.4s_ease]"
                        : "bg-white/5 border-white/12 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg"
                      }
                      ${buttonsDisabled && !answerStates[i] ? "opacity-50 cursor-default" : "cursor-pointer"}
                    `}
                  >
                    {choice}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {feedbackMsg && (
                <div className={`mt-4 text-center py-2.5 rounded-lg font-semibold text-sm animate-[fadeIn_0.3s_ease]
                  ${feedbackType === "correct" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}
                `}>
                  {feedbackMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════════ GAME OVER SCREEN ════════ */}
      {screen === "gameover" && (
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-md w-full animate-[fadeIn_0.6s_ease-out]">
            <div className="text-6xl mb-3">💥</div>
            <h2 className="text-3xl font-black tracking-widest mb-6">FLIGHT ENDED</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Final Score", value: gameState.score },
                { label: "Questions", value: `${gameState.totalCorrect} / ${gameState.totalAsked}` },
                { label: "Best Streak", value: gameState.bestStreak },
                { label: "Level Reached", value: gameState.level + 1 },
              ].map(s => (
                <div key={s.label} className="bg-white/8 border border-white/15 rounded-xl py-3 px-2 backdrop-blur-md">
                  <div className="text-[0.65rem] tracking-widest text-white/60 font-semibold uppercase mb-1">{s.label}</div>
                  <div className="text-2xl font-extrabold">{s.value}</div>
                </div>
              ))}
              <div className="col-span-2 bg-yellow-500/8 border border-yellow-500/25 rounded-xl py-3 px-2 backdrop-blur-md">
                <div className="text-[0.65rem] tracking-widest text-white/60 font-semibold uppercase mb-1">High Score</div>
                <div className="text-2xl font-extrabold text-yellow-400">{highScore}</div>
              </div>
            </div>

            {/* Rank Message */}
            {leaderboardRank > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/25 rounded-xl py-3 px-4 mb-6 font-bold text-yellow-400 animate-[fadeIn_0.5s_ease]">
                {leaderboardRank === 1 ? "🥇 NEW #1! You're the top pilot!" :
                 leaderboardRank <= 3 ? `${"🥇🥈🥉"[leaderboardRank - 1] || "🥉"} You placed #${leaderboardRank} on the leaderboard!` :
                 `📋 You placed #${leaderboardRank} on the leaderboard`}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={startGame}
                className="btn border-0 bg-gradient-to-r from-[#E81830] to-[#C0121F] text-white font-bold rounded-full shadow-[0_4px_25px_rgba(232,24,48,0.4)] hover:shadow-[0_8px_35px_rgba(232,24,48,0.55)] hover:-translate-y-1 transition-all"
              >
                Fly Again 🔄
              </button>
              <button
                onClick={() => setShowLeaderboard(true)}
                className="btn btn-ghost border border-white/15 text-white/60 hover:text-white hover:bg-white/10 rounded-full gap-2"
              >
                🏆 Leaderboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ LEADERBOARD MODAL ════════ */}
      {showLeaderboard && (
        <div
          className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease]"
          onClick={e => { if (e.target === e.currentTarget) setShowLeaderboard(false); }}
        >
          <div className="w-full max-w-lg max-h-[85vh] bg-gradient-to-b from-[#0F1932]/95 to-[#0A1226]/98 border border-white/15 rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-[slideUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
            {/* Header */}
            <div className="p-6 pb-4 text-center relative border-b border-white/6">
              <h2 className="text-xl font-black tracking-widest flex items-center justify-center gap-2">
                <span className="animate-pulse">🏆</span> FLIGHT DECK
              </h2>
              <p className="text-sm text-white/60 mt-1">Top Pilots</p>
              <button
                onClick={() => setShowLeaderboard(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/60 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 hover:rotate-90 transition-all"
              >
                ✕
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin">
              {getLeaderboard().length === 0 ? (
                <div className="text-center py-16 text-white/50">
                  <div className="text-5xl mb-3">✈️</div>
                  <p>No flights recorded yet.</p>
                  <p className="text-sm text-white/30 mt-1">Be the first to take off!</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="text-[0.6rem] font-bold tracking-widest text-white/30">
                      <th className="py-2 px-2 text-center w-12">RANK</th>
                      <th className="py-2 px-2 text-left">PILOT</th>
                      <th className="py-2 px-2 text-center w-14">STN</th>
                      <th className="py-2 px-2 text-right w-16">SCORE</th>
                      <th className="py-2 px-2 text-center w-10">LVL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getLeaderboard().map((entry, i) => (
                      <tr
                        key={i}
                        className={`transition-all hover:bg-white/5
                          ${entry.name === playerName && entry.station === playerStation.toUpperCase() ? "bg-[#E81830]/10 border border-[#E81830]/25" : "bg-white/[0.02]"}
                        `}
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        <td className="py-3 px-2 text-center"><RankBadge rank={i + 1} /></td>
                        <td className="py-3 px-2 font-bold tracking-wide">{entry.name}</td>
                        <td className="py-3 px-2 text-center">
                          <span className="px-2 py-0.5 bg-blue-500/15 border border-blue-500/25 rounded-full text-[0.7rem] font-bold tracking-wider text-blue-400">
                            {entry.station}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right font-extrabold text-yellow-400">{entry.score.toLocaleString()}</td>
                        <td className="py-3 px-2 text-center font-semibold text-blue-400">{entry.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 text-center border-t border-white/6">
              <button
                onClick={() => {
                  if (confirm("Clear ALL leaderboard scores? This cannot be undone.")) {
                    localStorage.removeItem(LB_KEY);
                    setShowLeaderboard(false);
                    setTimeout(() => setShowLeaderboard(true), 100);
                  }
                }}
                className="btn btn-sm btn-ghost text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-full text-xs"
              >
                Clear All Scores
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
