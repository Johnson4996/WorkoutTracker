import * as SQLite from 'expo-sqlite';
import exercisesData from '../assets/data/exercises.json';
import {TODAY_DATE_FORMATTED} from "@/utils/constants";

const DATABASE_NAME = 'workout_app.db';
let db = null;


const getDatabase = async () => {
  if (db === null) {
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return db;
};

const initDatabase = async () => {
  const db = await getDatabase();


try{
  await db.execAsync(`
  CREATE TABLE IF NOT EXISTS Exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  muscle_group TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS Workouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS WorkoutExercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workout_id INTEGER NOT NULL,
  exercise_id INTEGER NOT NULL,
  FOREIGN KEY (workout_id) REFERENCES Workouts(id),
  FOREIGN KEY (exercise_id) REFERENCES Exercises(id)
);

CREATE TABLE IF NOT EXISTS Sets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workout_exercise_id INTEGER NOT NULL,
  weight REAL NOT NULL,
  reps INTEGER NOT NULL,
  "order" INTEGER NOT NULL,
  FOREIGN KEY (workout_exercise_id) REFERENCES WorkoutExercises(id)
);

CREATE INDEX IF NOT EXISTS idx_workout_exercises_workout_id ON WorkoutExercises (workout_id);
CREATE INDEX IF NOT EXISTS idx_workout_exercises_exercise_id ON WorkoutExercises (exercise_id);
CREATE INDEX IF NOT EXISTS idx_sets_workout_exercise_id ON Sets (workout_exercise_id);`);
    console.log("Database initialized and tables created");
} catch (error) {
  console.error('Error initializing database:', error);
}
  
    

const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM Exercises');
const count = result.count;


if (count === 0) {
    try{
      
      for(const muscleGroup of Object.keys(exercisesData)) {
        
        for(const exercise of exercisesData[muscleGroup]) {
          await db.runAsync(`INSERT INTO Exercises (name, muscle_group, description) VALUES (?, ?, ?)`, [exercise.name, muscleGroup, exercise.desc]);
        }
        console.log("All exercises added for muscle group: ", muscleGroup);
      }
      console.log("All exercises added to database");
    }catch(error){
      console.error('Error adding exercises:', error); 
    }
  }
}

const fetchExercisesByGroup = async (muscle_group) => {

  try{
    await getDatabase()
    const result = await db.getAllAsync('SELECT * FROM Exercises WHERE muscle_group = ?', [muscle_group]);
    return result.sort()
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};

const addExercise = async (name, muscle_group, desc) => {

    try{
      await getDatabase()
      const result = db.runAsync(`INSERT INTO Exercises (name, muscle_group, description) VALUES (?, ?, ?)`, [name, muscle_group, desc]);
      const newExercise = await db.getAllAsync('SELECT * FROM Exercises WHERE name = ?', [name]);
      const newExerciseId = result.lastInsertRowId;
      console.log("Exercise added successfully", newExercise, newExerciseId);
      return newExerciseId
      
    }catch(error){
      console.log("Error adding exercise")
    }
}

const deleteExercise = async (id) => {
  try{
    await getDatabase()
    const result = await db.runAsync(`DELETE FROM Exercises WHERE id = ?`, [id]);
    console.log("Exercise deleted successfully", result);
  }catch(error){
    console.log("Error deleting exercise", error)
  }
}

const createOrGetWorkout = async () => {
  const date = TODAY_DATE_FORMATTED
  try {
    await getDatabase();
    
    const existingWorkout = await db.getFirstAsync(
      'SELECT id FROM Workouts WHERE date = ?',
      [date]
    );

    if (existingWorkout) {
      console.log("Workout accessed successfully");
      console.log(existingWorkout.id);
      return existingWorkout.id;
    } else {
      const result = await db.runAsync(
        'INSERT INTO Workouts (date) VALUES (?)',
        [date]
      );
      const newWorkoutId = result.lastInsertRowId;
      console.log("Workout created successfully");
      return newWorkoutId;
    }
    
  } catch (error) {
    console.log("Error creating/getting workout", error);
    throw error;
  }
};

const addWorkoutExercise = async (workout_id, exercise_id) => {
  
  try{
    await getDatabase()
    const result = await db.runAsync(`INSERT INTO WorkoutExercises (workout_id, exercise_id) VALUES (?, ?)`, [workout_id, exercise_id]);
    console.log("Workout exercise added successfully", result);
    return result.lastInsertRowId;
  }catch(error){
    console.log("Error adding workout exercise", error)
  }
}

const addSet = async (workout_exercise_id, weight, reps) => {
  
  try{
    await getDatabase()
    await db.runAsync(`
      INSERT INTO Sets (workout_exercise_id, weight, reps, "order")
  VALUES (
    ?,
    ?,
    ?,
    (SELECT COALESCE(MAX("order"), 0) + 1
     FROM Sets
     WHERE workout_exercise_id = ?)
  );
`, [workout_exercise_id, weight, reps, workout_exercise_id]);
  }catch(error){
    console.log("Error adding set", error)
  }
}


const getWorkoutsForDay = async (date) => {
  
  try {
    await getDatabase();
    // const all = await db.getAllAsync('SELECT * FROM Workouts');
    // console.log("all workouts", all);

    const result = await db.getAllAsync(`
      SELECT
    w.id AS workout_id,
    e.name AS exercise_name,
    we.id AS workout_exercise_id,
    s.weight,
    s.reps,
    s."order"
FROM
    Workouts w
JOIN
    WorkoutExercises we ON w.id = we.workout_id
JOIN
    Exercises e ON we.exercise_id = e.id
LEFT JOIN
    Sets s ON s.workout_exercise_id = we.id
WHERE
    w.date = ?
ORDER BY
    w.id, e.name, s."order"
    `, [date]);

    return result;
  } catch (error) {
    console.error("Error getting workouts for day:", error);
  }
};

const getLastWorkout = async () => {
  try {
    await getDatabase();
    const result = await db.getAllAsync('SELECT * FROM Workouts ORDER BY id DESC LIMIT 1');
    return result[0].date;
  } catch (error) {
    console.error("Error getting last workout:", error);
  }
};






export { initDatabase, fetchExercisesByGroup, addExercise, deleteExercise, createOrGetWorkout, addWorkoutExercise, addSet, getWorkoutsForDay, getLastWorkout };















