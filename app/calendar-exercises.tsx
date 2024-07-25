import ExerciseLog from "@/components/ExerciseLog/ExerciseLog";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

type CalendarExerciseScreenParams = {
    date: string;
  };

type CalendarExerciseRouteProp = RouteProp<{ CalendarExercise: CalendarExerciseScreenParams }, 'CalendarExercise'>;

export default function CalendarExerciseScreen() {
const route = useRoute<CalendarExerciseRouteProp>();
const { date } = route.params;
    
    return (
        <View>
        <Text>Workouts Completed on {date}</Text>
        <ExerciseLog date={date}/>
        </View>
    );
}