
const arrows = {
    'left': "M15 19l-7-7 7-7",
    'right': "M9 5l7 7-7 7",
    'up': "M5 15l7-7 7 7",
    'down': "M5 9l7 7 7-7",
}
export default function Arrow({ dir, size, color, ...props }) {
    const d = arrows[dir] || arrows['right'];
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
            <path strokeLinecap="round" stroke={color} strokeLinejoin="round" strokeWidth={2} d={d} />
        </svg>
    );
}