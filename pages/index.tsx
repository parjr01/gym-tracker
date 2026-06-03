import { useState, useEffect } from 'react';
import Head from 'next/head';
import { CheckCircle2, RotateCcw, Flame, Dumbbell, Clock } from 'lucide-react';

export interface ExerciseSet {
  setNumber: number;
  reps: string;
  weight: string;
  isCompleted: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  phase: string;
  sets: ExerciseSet[];
  mediaUrl: string;
  notes?: string;
}

export interface WorkoutDay {
  id: string;
  title: string;
  subtitle: string;
  exercises: Exercise[];
}

const initialWorkouts: WorkoutDay[] = [
  {
    id: "day-1",
    title: "Day 1: Upper Body",
    subtitle: "Focus: Chest, Back, Arms",
    exercises: [
      {
        id: "d1-ex1",
        name: "Arm circles, Band pull-aparts, Light push-ups",
        phase: "Warm-up",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "Continuous 4 mins dynamic preparation. Keep tension light.",
        sets: [{ setNumber: 1, reps: "Continuous", weight: "Bodyweight", isCompleted: false }]
      },
      {
        id: "d1-ex2",
        name: "Barbell Bench Press",
        phase: "Main Lift",
        mediaUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
        notes: "Targeting 6-8 reps. Rest 90 seconds between working sets.",
        sets: [
          { setNumber: 1, reps: "6–8", weight: "85-87.5", isCompleted: false },
          { setNumber: 2, reps: "6–8", weight: "85-87.5", isCompleted: false },
          { setNumber: 3, reps: "6–8", weight: "85-87.5", isCompleted: false }
        ]
      },
      {
        id: "d1-ex3",
        name: "Barbell Bent Over Row",
        phase: "Main Lift",
        mediaUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&w=600&q=80",
        notes: "Targeting 6-8 reps. Keep pull heavy to match bench progress.",
        sets: [
          { setNumber: 1, reps: "6–8", weight: "75", isCompleted: false },
          { setNumber: 2, reps: "6–8", weight: "75", isCompleted: false },
          { setNumber: 3, reps: "6–8", weight: "75", isCompleted: false }
        ]
      },
      {
        id: "d1-ex4",
        name: "Overhead Press",
        phase: "Superset 1 (A1)",
        mediaUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80",
        notes: "No rest! Move immediately to Weighted Cable Crunches.",
        sets: [
          { setNumber: 1, reps: "8–10", weight: "50-52.5", isCompleted: false },
          { setNumber: 2, reps: "8–10", weight: "50-52.5", isCompleted: false },
          { setNumber: 3, reps: "8–10", weight: "50-52.5", isCompleted: false }
        ]
      },
      {
        id: "d1-ex5",
        name: "Weighted Cable Crunches",
        phase: "Superset 1 (A2)",
        mediaUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80",
        notes: "Targeting 12-15 reps. Rest 60 seconds after completing this set.",
        sets: [
          { setNumber: 1, reps: "12–15", weight: "Heavy", isCompleted: false },
          { setNumber: 2, reps: "12–15", weight: "Heavy", isCompleted: false },
          { setNumber: 3, reps: "12–15", weight: "Heavy", isCompleted: false }
        ]
      },
      {
        id: "d1-ex6",
        name: "Barbell Bicep Curls",
        phase: "Superset 2 (B1)",
        mediaUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        notes: "No rest! Move straight into Skullcrushers.",
        sets: [
          { setNumber: 1, reps: "10–12", weight: "Control", isCompleted: false },
          { setNumber: 2, reps: "10–12", weight: "Control", isCompleted: false },
          { setNumber: 3, reps: "10–12", weight: "Control", isCompleted: false }
        ]
      },
      {
        id: "d1-ex7",
        name: "Skullcrushers (EZ-Bar)",
        phase: "Superset 2 (B2)",
        mediaUrl: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?auto=format&fit=crop&w=600&q=80",
        notes: "Targeting 10-12 reps. Rest 60 seconds after completing this set.",
        sets: [
          { setNumber: 1, reps: "10–12", weight: "Control", isCompleted: false },
          { setNumber: 2, reps: "10–12", weight: "Control", isCompleted: false },
          { setNumber: 3, reps: "10–12", weight: "Control", isCompleted: false }
        ]
      },
      {
        id: "d1-ex8",
        name: "Incline Treadmill Sprint Intervals",
        phase: "Cardio Finisher",
        mediaUrl: "https://images.unsplash.com/photo-1578875218687-35999e80ff22?auto=format&fit=crop&w=600&q=80",
        notes: "8 rounds total: 30s sprint / 30s recovery walk at maximum incline.",
        sets: [{ setNumber: 1, reps: "8 Rounds", weight: "Max Inc", isCompleted: false }]
      }
    ]
  },
  {
    id: "day-2",
    title: "Day 2: Lower Body & Forearms",
    subtitle: "Focus: Leg Power & Posterior Chain Development",
    exercises: [
      {
        id: "d2-ex1",
        name: "Bodyweight squats, Leg swings, Ankle rotations",
        phase: "Warm-up",
        mediaUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        notes: "Continuous movement for 4 mins to activate lower limbs.",
        sets: [{ setNumber: 1, reps: "Continuous", weight: "Bodyweight", isCompleted: false }]
      },
      {
        id: "d2-ex2",
        name: "Barbell Squats",
        phase: "Main Lift",
        mediaUrl: "https://images.unsplash.com/photo-1574680131995-12399994115e?auto=format&fit=crop&w=600&q=80",
        notes: "Explosive out of the hole with clean depth. Rest 90s.",
        sets: [
          { setNumber: 1, reps: "6–8", weight: "75-80", isCompleted: false },
          { setNumber: 2, reps: "6–8", weight: "75-80", isCompleted: false },
          { setNumber: 3, reps: "6–8", weight: "75-80", isCompleted: false }
        ]
      },
      {
        id: "d2-ex3",
        name: "Romanian Deadlifts",
        phase: "Main Lift",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "Keep the barbell very close to your shins. Rest 90s.",
        sets: [
          { setNumber: 1, reps: "8–10", weight: "80-85", isCompleted: false },
          { setNumber: 2, reps: "8–10", weight: "80-85", isCompleted: false },
          { setNumber: 3, reps: "8–10", weight: "80-85", isCompleted: false }
        ]
      },
      {
        id: "d2-ex4",
        name: "Leg Extensions",
        phase: "Superset 1 (A1)",
        mediaUrl: "https://images.unsplash.com/photo-1591940742888-71542310b99d?auto=format&fit=crop&w=600&q=80",
        notes: "No rest! Transition straight into Standing Calf Raises.",
        sets: [
          { setNumber: 1, reps: "12–15", weight: "Mod-Heavy", isCompleted: false },
          { setNumber: 2, reps: "12–15", weight: "Mod-Heavy", isCompleted: false },
          { setNumber: 3, reps: "12–15", weight: "Mod-Heavy", isCompleted: false }
        ]
      },
      {
        id: "d2-ex5",
        name: "Standing Calf Raises",
        phase: "Superset 1 (A2)",
        mediaUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        notes: "Focus on a deep stretch and hard contraction. Rest 45s.",
        sets: [
          { setNumber: 1, reps: "12–15", weight: "Heavy", isCompleted: false },
          { setNumber: 2, reps: "12–15", weight: "Heavy", isCompleted: false },
          { setNumber: 3, reps: "12–15", weight: "Heavy", isCompleted: false },
          { setNumber: 4, reps: "12–15", weight: "Heavy", isCompleted: false }
        ]
      },
      {
        id: "d2-ex6",
        name: "Farmer's Carries",
        phase: "Superset 2 (B1)",
        mediaUrl: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=600&q=80",
        notes: "Walk for 45 seconds continuously. Grip tight. No rest.",
        sets: [
          { setNumber: 1, reps: "45 sec", weight: "Heavy DBs", isCompleted: false },
          { setNumber: 2, reps: "45 sec", weight: "Heavy DBs", isCompleted: false },
          { setNumber: 3, reps: "45 sec", weight: "Heavy DBs", isCompleted: false }
        ]
      },
      {
        id: "d2-ex7",
        name: "Behind-the-Back Wrist Curls",
        phase: "Superset 2 (B2)",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "High tension forearms isolation. Rest 45s.",
        sets: [
          { setNumber: 1, reps: "15", weight: "Barbell", isCompleted: false },
          { setNumber: 2, reps: "15", weight: "Barbell", isCompleted: false },
          { setNumber: 3, reps: "15", weight: "Barbell", isCompleted: false }
        ]
      },
      {
        id: "d2-ex8",
        name: "Stationary Bike Power Intervals",
        phase: "Cardio Finisher",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "8 intervals: 30s high-resistance hard pedal / 30s cruise.",
        sets: [{ setNumber: 1, reps: "8 Rounds", weight: "HIIT", isCompleted: false }]
      }
    ]
  },
  {
    id: "day-3",
    title: "Day 3: Push & Abs",
    subtitle: "Focus: Shoulders, Triceps, Chest Structure",
    exercises: [
      {
        id: "d3-ex1",
        name: "Arm crossovers, Push-ups, Shoulder shrugs",
        phase: "Warm-up",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "Continuous 4 mins shoulder girdle preparation.",
        sets: [{ setNumber: 1, reps: "Continuous", weight: "Bodyweight", isCompleted: false }]
      },
      {
        id: "d3-ex2",
        name: "Incline Dumbbell Press",
        phase: "Main Lift",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "Controlled eccentric with high press trajectory. Rest 90s.",
        sets: [
          { setNumber: 1, reps: "8–10", weight: "~34 DBs", isCompleted: false },
          { setNumber: 2, reps: "8–10", weight: "~34 DBs", isCompleted: false },
          { setNumber: 3, reps: "8–10", weight: "~34 DBs", isCompleted: false }
        ]
      },
      {
        id: "d3-ex3",
        name: "Lateral Raises",
        phase: "Main Lift",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "Strict form, do not swing the body. Rest 60s.",
        sets: [
          { setNumber: 1, reps: "12–15", weight: "Moderate", isCompleted: false },
          { setNumber: 2, reps: "12–15", weight: "Moderate", isCompleted: false },
          { setNumber: 3, reps: "12–15", weight: "Moderate", isCompleted: false },
          { setNumber: 4, reps: "12–15", weight: "Moderate", isCompleted: false }
        ]
      }
    ]
  },
  {
    id: "day-4",
    title: "Day 4: Pull & Forearms",
    subtitle: "Focus: Lat Volume & Bicep Power Progression",
    exercises: [
      {
        id: "d4-ex1",
        name: "Cat-cow poses, Light lat pulldowns, Wrist rotations",
        phase: "Warm-up",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "Continuous 4 mins back and forearm activation matrix.",
        sets: [{ setNumber: 1, reps: "Continuous", weight: "Light", isCompleted: false }]
      },
      {
        id: "d4-ex2",
        name: "Lat Pulldowns (or Pull-Ups)",
        phase: "Main Lift",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "Drive directly down with your elbows. Rest 90s.",
        sets: [
          { setNumber: 1, reps: "8–10", weight: "Heavy", isCompleted: false },
          { setNumber: 2, reps: "8–10", weight: "Heavy", isCompleted: false },
          { setNumber: 3, reps: "8–10", weight: "Heavy", isCompleted: false }
        ]
      }
    ]
  },
  {
    id: "day-5",
    title: "Day 5: Legs & Abs",
    subtitle: "Focus: Core Stability & Quad Overload",
    exercises: [
      {
        id: "d5-ex1",
        name: "Glute bridges, Walking lunges, Ankle mobility",
        phase: "Warm-up",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "Continuous 4 mins dynamic activation to lubricate hip joints.",
        sets: [{ setNumber: 1, reps: "Continuous", weight: "Bodyweight", isCompleted: false }]
      },
      {
        id: "d5-ex2",
        name: "Leg Press",
        phase: "Main Lift",
        mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        notes: "Deep safe descent respecting new 100 kg squat tier. Rest 90s.",
        sets: [
          { setNumber: 1, reps: "10–12", weight: "140-160", isCompleted: false },
          { setNumber: 2, reps: "10–12", weight: "140-160", isCompleted: false },
          { setNumber: 3, reps: "10–12", weight: "140-160", isCompleted: false }
        ]
      }
    ]
  }
];

export default function Home() {
  const [workouts, setWorkouts] = useState<WorkoutDay[]>(initialWorkouts);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('heavy_tracker_recomp_data');
    if (saved) {
      try { setWorkouts(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const triggerRestClock = (seconds: number) => {
    setTimer(seconds);
    setIsTimerActive(true);
  };

  const handleSetToggle = (exerciseId: string, setNumber: number) => {
    const adjusted = workouts.map((day, dIdx) => {
      if (dIdx !== activeDayIndex) return day;
      return {
        ...day,
        exercises: day.exercises.map((ex) => {
          if (ex.id !== exerciseId) return ex;
          return {
            ...ex,
            sets: ex.sets.map((s) => {
              if (s.setNumber !== setNumber) return s;
              const nextCompletionStatus = !s.isCompleted;
              if (nextCompletionStatus) {
                if (ex.phase.includes("Warm-up")) triggerRestClock(45);
                else if (ex.phase.includes("Superset")) triggerRestClock(60);
                else if (ex.phase.includes("Main Lift")) triggerRestClock(90);
              }
              return { ...s, isCompleted: nextCompletionStatus };
            })
          };
        })
      };
    });
    setWorkouts(adjusted);
    localStorage.setItem('heavy_tracker_recomp_data', JSON.stringify(adjusted));
  };

  const wipeCurrentLogs = () => {
    if (!window.confirm("Wipe layout logs for this active training track?")) return;
    const blanked = workouts.map((day, dIdx) => {
      if (dIdx !== activeDayIndex) return day;
      return {
        ...day,
        exercises: day.exercises.map((ex) => ({
          ...ex,
          sets: ex.sets.map((s) => ({ ...s, isCompleted: false }))
        }))
      };
    });
    setWorkouts(blanked);
    localStorage.setItem('heavy_tracker_recomp_data', JSON.stringify(blanked));
  };

  const activeDay = workouts[activeDayIndex];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-emerald-500/30 tracking-tight antialiased">
      <Head>
        <title>Gym Tracker // Workout Recomposition Engine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      {timer > 0 && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 px-5 py-3.5 rounded-2xl shadow-2xl transition-all border border-neutral-800 ${isTimerActive ? 'bg-emerald-500 text-neutral-950 shadow-emerald-950/20' : 'bg-neutral-900 text-neutral-400'}`}>
          <Clock className="w-5 h-5 stroke-[2.5]" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-75">REST TIME</p>
            <p className="text-xl font-black font-mono leading-none mt-0.5">
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </p>
          </div>
          <button onClick={() => setIsTimerActive(!isTimerActive)} className="ml-2 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-neutral-950/10 hover:bg-neutral-950/20 transition">
            {isTimerActive ? 'Pause' : 'Start'}
          </button>
        </div>
      )}

      <header className="sticky top-0 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 z-40 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500 rounded-xl text-neutral-950 shadow-lg shadow-emerald-500/10">
              <Dumbbell className="w-4 h-4 fill-current" />
            </div>
            <h1 className="text-md font-black uppercase tracking-wider">GYM TRACKER</h1>
          </div>
          <button onClick={wipeCurrentLogs} className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-rose-400 transition py-1 px-2 rounded-lg hover:bg-neutral-900">
            <RotateCcw className="w-3.5 h-3.5" /> Clear Session
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6 pb-36">
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-neutral-900">
          {workouts.map((day, idx) => (
            <button key={day.id} onClick={() => setActiveDayIndex(idx)} className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${idx === activeDayIndex ? 'bg-neutral-100 text-neutral-950 border-neutral-100 shadow-md' : 'bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-neutral-200'}`}>
              {day.title.split(':')[0]}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-tight text-white">{activeDay.title}</h2>
          <p className="text-sm text-neutral-400 mt-0.5 font-medium">{activeDay.subtitle}</p>
        </div>

        <div className="space-y-4">
          {activeDay.exercises.map((exercise) => (
            <div key={exercise.id} className="bg-neutral-900 rounded-2xl border border-neutral-850 overflow-hidden shadow-sm">
              <div className="relative h-32 w-full bg-neutral-950">
                <img src={exercise.mediaUrl} alt={exercise.name} className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                
                <div className="absolute bottom-3 left-4 right-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest mb-1.5 border ${exercise.phase.includes('Warm-up') ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                    <Flame className="w-2.5 h-2.5 fill-current" /> {exercise.phase}
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight text-white leading-tight">{exercise.name}</h3>
                  {exercise.notes && <p className="text-xs text-neutral-400 mt-0.5 font-medium leading-normal">{exercise.notes}</p>}
                </div>
              </div>

              <div className="p-3 bg-neutral-900/30">
                <div className="grid grid-cols-4 text-[10px] font-black uppercase tracking-widest text-neutral-500 pb-1.5 border-b border-neutral-850 px-2">
                  <div>Set</div>
                  <div className="text-center">Target</div>
                  <div className="text-center">Reps</div>
                  <div className="text-right">Log</div>
                </div>

                <div className="mt-1.5 space-y-0.5">
                  {exercise.sets.map((set) => (
                    <div key={set.setNumber} className={`grid grid-cols-4 items-center px-2 py-1.5 rounded-lg transition-all duration-150 ${set.isCompleted ? 'bg-emerald-950/10 border border-emerald-500/20' : 'hover:bg-neutral-850/40 border border-transparent'}`}>
                      <div className="text-xs font-black text-neutral-400">
                        {set.setNumber}
                      </div>
                      <div className="text-center text-xs font-mono font-bold text-neutral-200">
                        {set.weight}
                      </div>
                      <div className="text-center text-xs font-mono font-bold text-neutral-450">
                        {set.reps}
                      </div>
                      <div className="flex justify-end">
                        <button onClick={() => handleSetToggle(exercise.id, set.setNumber)} className={`p-1 rounded-md transition-all ${set.isCompleted ? 'text-emerald-400 bg-emerald-500/20' : 'text-neutral-700 hover:text-neutral-500 bg-neutral-800/80'}`}>
                          <CheckCircle2 className="w-5 h-5 fill-current stroke-neutral-900" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl border border-neutral-900 bg-neutral-950/40 text-xs space-y-1.5 text-neutral-400 font-medium">
          <p className="text-neutral-300 font-bold uppercase tracking-wider text-[10px]">Recomposition Blueprint Parameters</p>
          <p>• Move immediately between exercises designated within supersets to lock in your strict 60-minute session limit.</p>
          <p>• Maintain high protein target input (1.8–2.2g per kg body weight) to construct lean mass across a minor deficit.</p>
        </div>
      </main>
    </div>
  );
}