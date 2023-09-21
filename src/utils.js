export function formatMinutesAndSeconds (time) {
    const minutes = Math.trunc(time / 60)
        .toString()
        .padStart(2, '00');
    const seconds = Math.trunc(time % 60)
        .toString()
        .padStart(2, '00');

    return `${minutes}:${seconds}`;
}
