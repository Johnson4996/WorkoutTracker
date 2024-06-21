export const getDaysOfTheWeek = () => {
const currentDate = new Date();
const day = currentDate.getDay();
const date = currentDate.getDate();

const dates = [];

for (let i = 0; i < 7; i++) {
    const current = new Date(currentDate);
    current.setDate(date - day + i);
    dates.push(current);

}
return dates
}