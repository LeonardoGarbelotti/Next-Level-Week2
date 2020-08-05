export default function convertHour2Minutes(time: string) {

    //separa o horario pelo ":" e transforma cada parte separada em número
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}