export const acceptedTimeFormats = [
    'h:mm aaa',
    'h:mm aa',
    'HH:mm',
    'hh:mm aaa',
    'hh:mm aa',
];
/**
 * Attempt to parse a raw time input string into { hours, minutes }.
 * Handles: "21:30", "930", "9:30", "9:30pm", "9pm", "1200", etc.
 * Returns null if the input cannot be meaningfully parsed.
 */
function parseRawTime(input) {
    if (!input)
        return null;
    const lower = input.toLowerCase().trim();
    const isPm = lower.endsWith('pm');
    const isAm = lower.endsWith('am');
    // Remove am/pm suffix, then strip all non-alphanumeric chars (including colons)
    const timeOnly = lower.replace(/[ap]m$/, '').replace(/\W/g, '');
    if (!timeOnly)
        return null;
    let hours;
    let minutes;
    if (timeOnly.length <= 2) {
        // e.g. "9" → 9:00, "21" → 21:00
        hours = parseInt(timeOnly, 10);
        minutes = 0;
    }
    else if (timeOnly.length === 3) {
        // e.g. "930" → 9:30
        hours = parseInt(timeOnly.slice(0, 1), 10);
        minutes = parseInt(timeOnly.slice(1), 10);
    }
    else if (timeOnly.length === 4) {
        // e.g. "0930" → 09:30, "2130" → 21:30
        hours = parseInt(timeOnly.slice(0, 2), 10);
        minutes = parseInt(timeOnly.slice(2), 10);
    }
    else {
        return null;
    }
    if (isNaN(hours) || isNaN(minutes))
        return null;
    // Apply am/pm adjustment
    if (isPm && hours !== 12 && hours < 12)
        hours += 12;
    if (isAm && hours === 12)
        hours = 0;
    if (hours < 0 || hours > 24)
        return null;
    if (minutes < 0 || minutes > 59)
        return null;
    return { hours, minutes };
}
/**
 * Format a raw time string into the specified display format.
 * Input can be "HH:mm", "930", "9:30pm", etc.
 * Returns an empty string if the input cannot be parsed.
 */
export function formatTime(input, format) {
    if (!input)
        return '';
    const parsed = parseRawTime(input);
    if (!parsed)
        return '';
    const { hours, minutes } = parsed;
    const mm = String(minutes).padStart(2, '0');
    switch (format) {
        case 'HH:mm':
            return `${String(hours).padStart(2, '0')}:${mm}`;
        case 'h:mm aaa': {
            const h = hours % 12 || 12;
            const period = hours < 12 ? 'am' : 'pm';
            return `${h}:${mm} ${period}`;
        }
        case 'h:mm aa': {
            const h = hours % 12 || 12;
            const period = hours < 12 ? 'AM' : 'PM';
            return `${h}:${mm} ${period}`;
        }
        case 'hh:mm aaa': {
            const h = String(hours % 12 || 12).padStart(2, '0');
            const period = hours < 12 ? 'am' : 'pm';
            return `${h}:${mm} ${period}`;
        }
        case 'hh:mm aa': {
            const h = String(hours % 12 || 12).padStart(2, '0');
            const period = hours < 12 ? 'AM' : 'PM';
            return `${h}:${mm} ${period}`;
        }
        default:
            return `${String(hours).padStart(2, '0')}:${mm}`;
    }
}
/**
 * Convert a stored HH:mm value to a display string in the given format.
 * Returns empty string when value is undefined or empty.
 */
export function transformValuePropToInputValue(value, timeFormat) {
    if (!value)
        return '';
    return formatTime(value, timeFormat);
}
