import * as SQLite from 'expo-sqlite';
import exercisesData from '../assets/data/exercises.json';

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
    CREATE TABLE IF NOT EXISTS Workout (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      created_at TEXT,
      updated_at TEXT
    );
    CREATE TABLE IF NOT EXISTS WorkoutExercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_id INTEGER,
      exercise_id INTEGER,
      sets INTEGER,
      reps INTEGER,
      duration INTEGER,
      order_num INTEGER,
      FOREIGN KEY (workout_id) REFERENCES Workout(id),
      FOREIGN KEY (exercise_id) REFERENCES Exercise(id)
    );
    `);
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



// const fetchExercises = async () => {
//   try{
//     const db = await SQLite.openDatabase(DATABASE_NAME);
//     const result = await db.execAsync('SELECT * FROM Exercise');
//     return result.rows
//   } catch (error) {
//     console.error('Error fetching exercises:', error);
//     throw error;
//   }
// }

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


export { initDatabase, fetchExercisesByGroup };




// const addExercise = () => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             'INSERT INTO Exercises (id, name, muscle_group, description) VALUES (?, ?, ?, ?)',
//             [exercise.id, exercise.name, exercise.muscle_group, exercise.desc],
//             () => { console.log('Exercise inserted successfully'); },
//             error => { console.log('Error inserting exercise: ' + error.message); }
        
//         )
//     })
// }

// const deleteExercise = (id) => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             'DELETE FROM Exercises WHERE id = ?',
//             [id],
//             () => { console.log('Exercise deleted successfully'); },
//             error => { console.log('Error deleting exercise: ' + error.message); }
//         )
//     })
// }


//   export { initializeDatabase, fetchExercises, addExercise, deleteExercise, fetchExercisesByGroup };

