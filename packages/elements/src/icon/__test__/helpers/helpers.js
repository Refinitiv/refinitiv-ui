export const tickSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="tick"><path stroke="currentColor" d="m14 4-8.25 8.25L2 8.5" fill="none" fill-rule="evenodd"></path></svg>';
export const spriteSvg = `<?xml
version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <svg viewBox="0 0 16 16" id="3d-surface" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.5 2.5v11l-11-2v-7zM2.5 6.5l11-1M2.5 8.5l11 1M8.5 12.5v-9M4.5 12V4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="Industry" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 13.5h3v-11h-3v11ZM13.5 13.5V5.883l-4 2.4V13.5h4ZM9.5 13.5V5.883l-4 2.4V13.5h4ZM5.5 5.5h-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="access" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.793 2.5H3.5v11h9V5.207L9.793 2.5Z"/>
                <path d="M9.5 2.5v3h3M10.5 12V9L9.114 7.5H8.88L7.501 9 7.5 12M10.5 10.5h-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="add" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7.5 13V2M13 7.5H2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="add-calendar" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9 13.508H2.5v-10h10.994V9M13.5 6.5h-11M4.5 5V2M11.5 5V2M11.5 9v5M14 11.5H9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="add-column" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5.5 2.5v11h-3v-11zM7 7.5h7M10.5 11V4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="add-mini" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7.5 11V4M11 7.5H4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="add-note" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10 5.988V.5H0v10h5.513"/>
                <circle cx="8" cy="8.5" r="3"/>
                <path d="M6.5 8.5h3M8 7v3"/>
                <path stroke-linejoin="bevel" d="M0 2.5h10"/>
                <path d="M4 .5v2M2 .5v2M6 .5v2M8 .5v2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="add-panel" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2.5H2.5v11h11V8M10.5 2v7M14 5.5H7" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="add-to-basket" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M0 0h2l1.5 7-1 2h7"/>
                <path d="M2.5 1h9v.5L9.628 7.078 3.5 7M6.5 2.5v3M8 4H5"/>
                <circle cx="9.5" cy="10" r="1"/>
                <circle cx="3.5" cy="10" r="1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="add-to-briefcase" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.5 7.5h-11v5h11zM12 3.5H4M13 5.5H3M6 9.5h4-4Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="add-to-file" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.5 2.5v3.004h3"/>
                <path d="M9 13.497H2.502V2.5H9L11.5 5v2.999M14 11.5H9M11.5 9v5M8 10.5H4M9 8.5H4M7 6.5H4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="admin-profile" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="4" cy="2.5" r="2"/>
                <path d="M9.414 9.914a2 2 0 1 0-2.828-2.828 2 2 0 0 0 2.828 2.828ZM4.5 5.509h-1C1.5 5.509 0 7.38 0 9.5v1h3.5M8 10.5V12M11.5 8.5H10M10.5 6 9.414 7.086M8 5v1.5M8 8v1M6 8.5H4.5M6.586 9.914 5.5 11M6.586 7.086 5.5 6M10.5 11 9.414 9.914"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="ai-add-to-folder" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5v10h11v-8H7.793l-2-2H2.5ZM7.5 6v5M5 8.5h5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="ai-previously-viewed" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12 2.5 13.5 4v5.5h-4l-1.319-1h-.358L6.5 9.5h-4V4L4 2.5M2.5 9.5v2c0 .684.525 2 2 2s2-1.007 2-2v-2M9.5 9.5v2c0 .684.525 2 2 2s2-1.007 2-2v-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="ai-reading-mode" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5H3c2.003 0 3.503.667 4.5 2 1.005-1.333 2.505-2 4.5-2h.5v8H12c-1.982 0-3.449 1-4.4 3h-.214c-.91-2-2.372-3-4.386-3h-.5v-8Z"/>
                <path d="M2.5 10.5v3h10v-3M7.5 4.5v9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="align-justify" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 12.5h12M2 9.5h12M2 3.5h12M2 6.5h12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="align-left" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 2.5v11h9v-11h-9ZM5 4.5h2M5 6.5h5M5 8.5h6M5 10.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="align-middle" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 2.5v11h9v-11h-9ZM6 10.5h4M7 8.5h2M5 6.5h6M6 4.5h4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="align-right" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 2.5v11h9v-11h-9ZM5 8.5h6M9 4.5h2M6 6.5h5M7 10.5h4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="analytics-align-bottom" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 13.5h12M9.5 11.5h3v-9h-3zM3.5 11.5h3v-6h-3z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="analytics-align-center" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M10.5 4.5v3h-6v-3zM12.5 9.5v3h-10v-3zM7.5 2v2.5M7.5 7.5v2M7.5 12.5V14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="analytics-align-left" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2v12M4.5 9.5v3h9v-3zM4.5 3.5v3h6v-3z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="analytics-align-middle" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 4.5h3v6h-3zM8.5 2.5h3v10h-3zM2 7.5h1.5M6.5 7.5h2M11.5 7.5H14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="analytics-align-right" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.5 2v12M11.5 3.5v3h-6v-3zM11.5 9.5v3h-9v-3z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="analytics-align-top" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 2.5h12M3.5 4.5h3v6h-3zM9.5 4.5h3v9h-3z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="annotation-add-title" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M13.494 13.507H2.499v-11h10.995v11Z" stroke="currentColor"/>
            <path d="M13.5 4.5h-11M6.5 6.5h-2V8m2-1.5h2V8m-2-1.5v5m0 0H5m1.5 0H8M10.5 9v3M12 10.5H9" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="api" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M7.5 11V5.5H10l.51.5v1.994l-.521.508H7.5zM4 12.012C4.962 13 6.197 13.5 8 13.5c1.804 0 3.033-.498 4-1.488M12.5 5v6M5.5 11V6.5l-1.387-1H3.88l-1.378 1L2.5 11M5.5 8.5h-3M4 4c1.01-.988 2.211-1.5 4.014-1.5 1.804 0 2.99.52 3.986 1.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="apply-slicing" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4.5 2.5 1.5 2 5 6.5M6 4.5h4M2 4.5h2M12 4.5h2M7 11l6.5-8.5"/>
                <path d="M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM6 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="apply-style" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m5 6 1.5-1.5 2 1 3-3h1l1 1v1l-3 3 1 2L10 11z"/>
                <path d="M2.5 9 7 13.5h1l2-2.5-5-5-2.5 2zM5.5 8.5 3.529 10M7.5 10.5l-2 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="approximate" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3 11c.667-1.333 1.667-2 3-2 2 0 2 3 4 3 1.255 0 2.255-.667 3-2M3 6c.667-1.333 1.667-2 3-2 2 0 2 3 4 3 1.255 0 2.255-.667 3-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="arrow" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M2 8h11.3M11.3 6l2 2-2 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="arrow-down-fill" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M8 11 3 6h10z" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="arrow-more" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path fill="currentColor" fill-rule="nonzero" d="M14.5 14.5 16 13v3h-3z"/>
                <path stroke="currentColor" d="M2 8h11.3M11.3 6l2 2-2 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="arrow-up-fill" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="m8 6 5 5H3z" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="assign" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.496 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="8.504" cy="7" r="1.5"/>
                <circle cx="2.504" cy="2" r="1.5"/>
                <path d="M11.004 12c0-1.974-.843-2.5-2.5-2.5S6 10.026 6 12M5.004 7c0-1.974-.843-2.5-2.5-2.5C1.164 4.5 0 4.746 0 6M3.004 7.5l1.5 2-1.5 2"/>
                <path d="M.004 7v1l1.5 1.5h3M7.5 4.5 6 2.5l1.5-2"/>
                <path d="M11.004 5V4l-1.5-1.5h-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="attach" xmlns="http://www.w3.org/2000/svg">
            <path d="m13 9-5 4c-1.162.873-3.87 1.062-5 0S1.417 9.395 3 8l6-5c1.268-1.106 3.083-1.155 4 0 1.414 1.782.011 3.105-1 4-.738.653-2.619 2.09-5 4-.702.563-1.71.909-2.28.32-.764-.791-.31-1.727.28-2.32.996-1 2.432-2 5-4" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="back" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6.5 3.5-4 4 4 4M2.5 7.5H14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="bigger-plus" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd">
                <path d="M8 2v12M14 8H2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="blend" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4.5 9.5 3 3 3-3M13 3.503h-3L7.5 7.5 5 3.503H2M7.5 12.5v-5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="bold" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 12.5v-9H8c1.667 0 2.5.667 2.5 2s-.833 2-2.5 2c2.333 0 3.5.833 3.5 2.5s-1.167 2.5-3.5 2.5H4.5ZM4.5 7.5h4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="bolt-down" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 3v10.5"/>
                <path stroke-linecap="round" d="M3 9.506h2.508v2.998L9 7.499H6.503V4z"/>
                <path d="m9 11 2.5 2.5L14 11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="bolt-up" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m14 5-2.5-2.5L9 5"/>
                <path stroke-linecap="round" d="M3 9.506h2.508v2.998L9 7.499H6.503V4z"/>
                <path d="M11.5 13V2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="bookmark" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 12.066V3.5h-9v8.566l4.5-3 4.5 3Z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="bookmarks" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10.5 13.007V4.5h-8v8.507l4-2.963 4 2.963Z"/>
                <path d="m12 11 1.508 1V2.5H4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="boolean-operations" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor"/>
            <path d="M10 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="both-to-max" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 10v3.5h3.496zM13.5 6V2.5h-3.496zM7 9l-2.5 2.5M9 7l2.5-2.5M3.5 8V3.5H8M12.5 8v4.503H8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="both-to-min" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M6.496 13V9.5H3zM9.5 3v3.5h3.496zM2.5 13.5l2-2M13.5 2.5l-2 2M3.5 8V3.5H8M12.5 8v4.503L8 12.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="briefcase" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 4.5v9h11v-9h-11Z"/>
                <path d="M6.5 7.5v2h3v-2h-3Z"/>
                <path stroke-linecap="square" d="M2.5 7.5h11"/>
                <path d="M10.5 4.5v-1a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v1h5Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="briefcase-add" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10.5 5.938V2H.5v8h6"/>
                <path stroke-linejoin="bevel" d="M.5 5h8"/>
                <path d="m7.5 2 .019-1a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1L3.5 2"/>
                <circle cx="8.5" cy="8" r="3"/>
                <path d="M7 8h3M8.5 6.5v3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="briefcase-remove" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10.5 5.938V2H.5v8h6"/>
                <path stroke-linejoin="bevel" d="M.5 5h8"/>
                <path d="m7.5 2 .019-1a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1L3.5 2"/>
                <circle cx="8.5" cy="8" r="3"/>
                <path d="M7 8h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="bring-forward" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11 6.5h2.5v7h-7V11"/>
                <path d="M2.5 2.5h7v7h-7z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="bring-to-front" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4 7.5H2.5v-5h5V4M12 8.5h1.5v5h-5V12"/>
                <path d="M5.5 5.5h5v5h-5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="bug" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5.5 11.5v-5h5v5l-1.5 1H7zM12.5 14v-.354c0-1.049-.214-1.34-.5-1.646-.306-.327-.986-.5-1.462-.5M3.538 14v-.354c0-1.049.214-1.34.5-1.646.306-.327.986-.5 1.462-.5M3.503 4v1C3.503 5.996 4 6.5 5 6.5h.5M12.516 4v1c0 .996-.497 1.5-1.497 1.5h-.5M2.5 10c0-1.081.716-1.5 1.5-1.5h1.5M6.5 4.5c0-1.333.5-2 1.5-2s1.5.667 1.5 2h-3ZM7.5 6.5v6M13.5 10c0-1.081-.716-1.5-1.5-1.5h-1.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="buzz" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M3 9.508h5L7.444 14 13 7.508H8L8.556 3z" fill="none" fill-rule="evenodd" stroke-linecap="round"/>
        </svg>
        <svg viewBox="0 0 16 16" id="calc" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.51 2.515h9.004v9.994l-1 1H4.51l-1-1zM3.5 5.5h9M5.5 7v1M5.5 9v1M7.5 9v1M5.5 11v1M7.5 11v1M7.5 7v1M10.5 9v3M9 7.5h2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="calendar" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 3.5h11v10h-11zM13.5 6.5h-11M4.5 5V2M11.5 5V2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="candle-chart" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.5 4.5h4v7h-4zM2.5 6.5h4v4h-4zM11.5 2v2.5M11.5 11.5V14M4.5 2v4.5M4.5 10.5V14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="cbp-cut" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 2v12M3.5 6.5h7v6"/>
                <path d="m13.5 9.5-2.96 3-3.04-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="cbp-hike" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 2v12M3.5 9.5h7v-6"/>
                <path d="m7.5 6.5 2.96-3 3.04 3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="cbp-no-change" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 2v12M3.5 7.5h9M9.5 4.509l3 2.96-3 3.04"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="cc" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 5.5H6C4.5 5.5 4.5 7 4.5 7v2s0 1.5 1.5 1.5h1M11 5.5h-1C8.5 5.5 8.5 7 8.5 7v2s0 1.5 1.5 1.5h1" stroke="currentColor"/>
            <path d="M2.5 5s0-1.5 1.5-1.5h8s1.5 0 1.5 1.5v6s0 1.5-1.5 1.5H4c-1.5 0-1.5-1.5-1.5-1.5V5Z" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="change-layout" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5v11h11v-11h-11ZM2.5 6.5h11M6.5 13.5v-7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-abcd-pattern" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM2 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM3 6.5l-1 6M14 3.5l-1 6M12.5 2.5l-8 2M11.5 11.5l-8 2M4.5 5.5l7 5M14 3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM13 12.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-anchored-note" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7.714 14 6.03 15.5h-.06C2.323 12.392.5 9.225.5 6 .5 2.332 3.023.5 6 .5s5.5 1.59 5.5 5.5"/>
                <path d="M6 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12.5 9.5v6M10 11.5h5M9.5 13v1c1.008 1 1.5 1.5 3 1.5s2-.5 3-1.5v-1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-anchored-text" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(.5 .5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="12" cy="8" r="1"/>
                <path d="M12 9v6M9.5 11h5M9 12.5v1c1.008 1 1.5 1.5 3 1.5s2-.5 3-1.5v-1M0 2.5V0h12v2.5M6 0v15V0ZM3.5 15h5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-andrews-pitchfork" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 14.5v1h1l14-13v-2h-2zM8 14.5l1 1h1l5.5-5.5V9l-1-1zM8 1.5l-1-1H6L.5 6v1l1 1z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-arc" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="9" cy="2" r="1.5"/>
                <circle cx="2" cy="12" r="1.5"/>
                <circle cx="14" cy="11" r="1.5"/>
                <path d="m3 11 5-8M3 13c1.333 1.67 3 2.506 5 2.506 2.246 0 4.082-1.002 5.507-3.006M10 3c2.667.98 4 3.144 4 6.492"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-area" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m1 10 4.655-3.733 3.104 3.2L15 2.5M1 15.5h1M3 15.5h1M5 15.5h1M7 15.5h1M9 15.5h1M11 15.5h1M13 15.5h1M15 15.5h1M0 14.5h1M2 14.5h1M4 14.5h1M6 14.5h1M8 14.5h1M10 14.5h1M12 14.5h1M14 14.5h1M1 13.5h1M3 13.5h1M5 13.5h1M7 13.5h1M9 13.5h1M11 13.5h1M13 13.5h1M15 13.5h1M0 12.5h1M2 12.5h1M4 12.5h1M6 12.5h1M8 12.5h1M10 12.5h1M12 12.5h1M14 12.5h1M3 11.5h1M5 11.5h1M7 11.5h1M9 11.5h1M11 11.5h1M13 11.5h1M15 11.5h1M4 10.5h1M6 10.5h1M10 10.5h1M12 10.5h1M14 10.5h1M5 9.5h1M11 9.5h1M13 9.5h1M15 9.5h1M12 8.5h1M14 8.5h1M1 11.5h1M13 7.5h1M15 7.5h1M14 6.5h1M15 5.5h1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-arrow" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 12V1L12 7 8.5 8.5l3 5L9 15l-2.5-5z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-arrow-mark-down" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M.5 7.5h4v-7h7v7h4V8L8 15 .5 8z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-arrow-mark-left" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M8.5.5v4h7v7h-7v4H8L1 8 8 .5z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-arrow-mark-right" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M7.5 15.5v-4h-7v-7h7v-4H8L15 8l-7 7.5z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-arrow-mark-up" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M.5 8.5h4v7h7v-7h4V8L8 1 .5 8z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-arrows" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="13.5" cy="2.5" r="2"/>
                <circle cx="2.5" cy="13.5" r="2"/>
                <path d="m4 12 7.5-7.5M7 4.5h4.5V9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-backtest" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M10.5 13.506V7.5H13l.5.499v2l-.5.5.5.504v2.003l-.5.499zM10.5 10.5H13M10 2.5h3M2 2.5h3M6 2.5h3M10 4.5h3M2 4.5h3M6 4.5h3M2 6.5h3M6 6.5h2M2 8.5h3M6 8.5h2M2 10.5h3M6 10.5h2M2 12.5h3M6 12.5h2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-balloon" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M.5 15V2.5l2-2h10.969l2.031 2v6l-2.031 2H6z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-bar" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 14V9M6.5 14V4M9.5 14V7M12.5 14V2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-bars" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 0v16M3.5 2v14M3.5 6.5H7M0 13.5h3.5M8 3.5h4.5M12.5 9.5H16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-bars-pattern" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 5.5h2v7h-2zM4.5 6.5h2v3h-2zM9.5 3.5h2v8h-2zM13.5 4.5h2v5h-2zM10.5 0v3.5M10.5 11.5V15M14.5 9.5V12M14.5 1v3.5M1.5 12.5V16M1.5 0v5.5M5.5 9.5V15M5.5 3v3.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-baseline" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m.5 15.5 1-4M2.5 7.5l1-4 2 3 1.875-6h.242l1.883 7M1 9.5H0M3 9.5H2M5 9.5H4M7 9.5H6M9 9.5H8M11 9.5h-1M13 9.5h-1M15 9.5h-1M11 11.5l1.404 4h.21l.886-4M14.5 7.5l1-5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-bouble-curve" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="14" cy="2" r="1.5"/>
                <circle cx="4" cy="5" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="11" cy="11" r="1.5"/>
                <path d="M5 4c1.479-1.664 3.979-2.496 7.5-2.496M4.502 6.5C4.46 7.5 6 8.018 7.431 8 9 7.98 10.5 8.763 10.5 9.543M3.5 14.47c2.747.228 7.5 0 7.5-2.055"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-brush" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 10.5c-.999 0-1.42 1.014-1.676 1.809C2.213 14.203.888 14.822.5 15v.5H3c3.703 0 3.5-2.372 3.5-3l-2-2ZM6 9l2 2 7.5-7.496V.5h-3zM7.5 7.5l2 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-bubble" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="2" r="1.5"/>
                <circle cx="9" cy="3" r="2.5"/>
                <circle cx="10.5" cy="9.5" r="1"/>
                <circle cx="3.5" cy="8.5" r="3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-callout" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M.5 15V.5h15v10H5z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-candles" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 3.5h4v10h-4zM9.5 4.5h4v6h-4zM4.5 13.5V16M4.5 0v3.5M11.5 0v4.5M11.5 10.5V16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-chart-delete-trendlines" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(1 1)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m0 6 7-5 3 2 4-3M0 10l7-5 3 1.5h1L14 4M0 14l6.5-4.5L0 14Z"/>
                <circle cx="10.5" cy="10.5" r="4"/>
                <path d="M8 10.5h5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-chartline" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="m1 15 3-5 2.5 2.5 4-6 2 2L15 1" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-cross" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.5 0v5M0 7.5h6M8.5 16v-6M16 7.5h-5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-cross-line" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="8.5" cy="7.5" r="2"/>
                <path d="M8.5 0v5.5M0 7.5h6.5M8.5 16V9.5M16 7.5h-5.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-curve" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="13.5" cy="2.5" r="2"/>
                <circle cx="5.5" cy="5.5" r="2"/>
                <circle cx="2.5" cy="13.5" r="2"/>
                <path d="M4.5 7.5 3 12M11.509 3 7 5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-cyclic-lines" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="8.5" r="2"/>
                <circle cx="9.5" cy="8.5" r="2"/>
                <path d="M2.5 0v6.5M2.5 10.5V16M9.5 0v6.5M9.5 10.5V16M15.5 0v16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-cypher-pattern" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="2" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <path d="m3 13 4-5M3 3l4 3M1.5 12.5v-9"/>
                <circle cx="13" cy="3" r="1.5"/>
                <circle cx="8" cy="7" r="1.5"/>
                <circle cx="14" cy="11" r="1.5"/>
                <path d="M12.5 10.5 9 8M9 6l3-2"/>
                <path stroke-linecap="square" d="M9.503 14.5H7.497v-2.99h2.006"/>
                <path d="m13.5 4.5.5 4.949"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-data-window" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10 .5h5.5v15H.5V10"/>
                <path d="M.5.5h8v8h-8zM4.5 2v5M7 4.5H2M15.5 6.5H14M15.5 9.5H14M15.5 12.5H14M15.5 3.5H14M6.5 15.5V14M9.5 15.5V14M12.5 15.5V14M3.5 15.5V14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-date-and-price-range" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="14" cy="2" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <path d="m4 5 2.5-2.5L9 5M11.023 7 13.5 9.5 11.023 12M1.5 12.5v-11h3.502M3.5 14.5h11V11M8 1.5h4.5M14.5 8V3.5M6.5 12V2.5M4 9.5h9.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-date-range" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM14.5 3.5V16M1.5 12.5V0M4 7.5h7.5M8.5 10.5l3-3-3-3M14 3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-decimals" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 5.5v-4l1-1h2l1 1v4l-1 1h-2zM11.5 5.5v-4l1-1h2l1 1v4l-1 1h-2zM11.5 13.5v-4l1-1h2l1 1v4l-1 1h-2zM9.5 16v-2M1.5 8V6M0 11.5h8.5M6 9.002 8.5 11.5 6 14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-disjoint-angle" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="6" r="1.5"/>
                <circle cx="2" cy="11" r="1.5"/>
                <circle cx="14" cy="2" r="1.5"/>
                <circle cx="14" cy="14" r="1.5"/>
                <path d="m3.5 5.5 9-3M3.5 11.5l9 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-dot" xmlns="http://www.w3.org/2000/svg">
            <circle stroke="currentColor" cx="8" cy="8" r="3.5" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-double-curve" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="14" cy="2" r="1.5"/>
                <circle cx="4" cy="5" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="11" cy="11" r="1.5"/>
                <path d="M5 4c1.479-1.664 3.979-2.496 7.5-2.496M4.502 6.5C4.46 7.5 6 8.018 7.431 8 9 7.98 10.5 8.763 10.5 9.543M3.5 14.47c2.747.228 7.5 0 7.5-2.055"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-elliott-correction-wave" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 .5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="7.5" r="1.5"/>
                <circle cx="2" cy="13.5" r="1.5"/>
                <circle cx="10" cy="13.5" r="1.5"/>
                <circle cx="14" cy="7.5" r="1.5"/>
                <path d="M4.5 4.497V1.494L5.5 0h1l1 1.494v3.003M16 4h-3l-.5-.487V.496L13.003 0H16M2.5 12 5 8.5M10.5 12 13 8.5M9.5 12 7 8.5M7.5 3h-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-elliott-double-combo-wave" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.508 0v1L13.5 2.5l2.019-1.496V0"/>
                <circle cx="6" cy="8" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="10" cy="14" r="1.5"/>
                <circle cx="14" cy="8" r="1.5"/>
                <path d="M2.5 12.5 5 9M10.5 12.5 13 9M9.5 12.5 7 9M13.5 5V2.5"/>
                <path stroke-linecap="square" d="M3.5.5V1l.9 3.5h.316l1.247-3h.08l1.235 3h.334L8.497 1V.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-elliott-impulse-wave" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 .5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="7.5" r="1.5"/>
                <circle cx="2" cy="13.5" r="1.5"/>
                <circle cx="10" cy="13.5" r="1.5"/>
                <circle cx="14" cy="7.5" r="1.5"/>
                <path d="M2.5 12 5 8.5M10.5 12 13 8.5M9.5 12 7 8.5M4.5 1.5 6 0h.5v4.5M12 4h3.5V2.5L15 2h-2l-.5-.5V0H16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-elliott-triangle-wave" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 .5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="7.5" r="1.5"/>
                <circle cx="2" cy="13.5" r="1.5"/>
                <circle cx="10" cy="13.5" r="1.5"/>
                <circle cx="14" cy="7.5" r="1.5"/>
                <path d="M2.5 12 5 8.5M10.5 12 13 8.5M9.5 12 7 8.5M16 4h-3.5V0H16M4.5 4.497V1.494L5.5 0h1l1 1.494v3.003M7.5 3h-3M15 2h-2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-elliott-triple-combo-wave" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 .5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="7.5" r="1.5"/>
                <circle cx="2" cy="13.5" r="1.5"/>
                <circle cx="10" cy="13.5" r="1.5"/>
                <circle cx="14" cy="7.5" r="1.5"/>
                <path stroke-linecap="square" d="M3.5 0v.5L4.4 4h.316l1.247-3h.08l1.235 3h.334L8.497.5V0"/>
                <path d="M16 4h-3.5v-.487L15.5.5V0H12M2.5 12 5 8.5M10.5 12 13 8.5M9.5 12 7 8.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-ellipse" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="7" cy="2" r="1.5"/>
                <circle cx="2" cy="8" r="1.5"/>
                <circle cx="14" cy="8" r="1.5"/>
                <circle cx="9" cy="14" r="1.5"/>
                <path d="M2 6.484C2.338 4.12 3.496 2.626 5.475 2M8.455 2c2.774-.123 4.964 1.405 5.545 4.484M14 9.465c0 2.41-1.914 4.252-3.406 4.535M7.493 14C4.773 13.854 2.5 12.154 2 9.465"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-eraser" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M15 15.5H3L.5 13v-2.5l10-10H13L15.5 3v2.5L8 13M7 4l5 5-5-5Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-event-markers" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5.5 12V6.5l1.5-2h2l1.5 2V12M5.5 9.5h5"/>
                <rect x=".5" y=".5" width="15" height="15" rx="7.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-event-markers-2" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.509 6V3L3 2.5h2l.5.5v3M10.509 6V2.5H13l.5.5v1l-.5.5h-2.491M6 10.5H3l-.491.5v2l.491.5h3"/>
                <path stroke-linecap="square" d="M10.5 13.5H13l.5-.5v-2l-.5-.5h-2.5z"/>
                <path d="M2.5 4.5h3"/>
                <rect x=".5" y=".5" width="7" height="7" rx="3"/>
                <rect x="8.5" y=".5" width="7" height="7" rx="3"/>
                <rect x=".5" y="8.5" width="7" height="7" rx="3"/>
                <rect x="8.5" y="8.5" width="7" height="7" rx="3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-event-markers-empty" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(1 1)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <rect x=".5" y=".5" width="5" height="5" rx="2.5"/>
                <rect x="8.5" y=".5" width="5" height="5" rx="2.5"/>
                <rect x=".5" y="8.5" width="5" height="5" rx="2.5"/>
                <rect x="8.5" y="8.5" width="5" height="5" rx="2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-extended" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(.5 .5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m15 0-2.5 2.5M2.5 12.5 0 15M9.5 5.5l-4 4"/>
                <circle cx="4" cy="11" r="2"/>
                <circle cx="11" cy="4" r="2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fib-channel" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="5" r="1.5"/>
                <circle cx="14" cy="2" r="1.5"/>
                <circle cx="14" cy="7" r="1.5"/>
                <circle cx="2" cy="10" r="1.5"/>
                <path d="m3.5 4.5 9-2M3.5 9.5l9-2M2.5 15.5l12-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fib-circles" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.022 1.588A7.934 7.934 0 0 0 8 .5C3.594.5.5 3.59.5 8c0 1.463.393 2.834 1.079 4.013M4.004 14.184C5.184 14.876 6.534 15.5 8 15.5c5.654 0 7.504-4.327 7.504-7.819 0-1.463-.11-2.82-.796-4"/>
                <circle cx="8" cy="8" r="4.5"/>
                <circle cx="13.5" cy="2.5" r="2"/>
                <circle cx="2.5" cy="13.5" r="2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fib-retracement" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.5 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.5 15.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM0 4.5h11.5M0 9.5h16M4.5 13.5H16M0 .5h16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fib-speed-resistance-arcs" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
                <path d="M.5 6c.02 5 5.091 6.5 6.009 6.5M9.493 12.5c1.31 0 5.962-1.5 6.007-6.5M3.517 4c.013 4 2.921 4.53 4.476 4.512C9.547 8.493 12.457 8 12.497 4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fib-speed-resistance-fan" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="11" cy="5" r="1.5"/>
                <path d="M1.5 0v12.5M16 14.5H3.5M9.5 4.5h-8M11.5 6.5v8M14.5 1.5 12 4M10 6l-7 7M7.5.5l-5 12M15.5 8.5l-12 5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fib-spiral" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(.488 .5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="5.512" cy="9.5" r="1.5"/>
                <circle cx="10.512" cy="4.5" r="1.5"/>
                <path d="m6.512 8.5 3-3M11.512 3.5l3.5-3.5M8.012 7c-.849-1.335-2.02-2.002-3.517-2.002C2.251 4.998 0 6.78 0 9.5c0 2.72 1.746 5.521 5.512 5.521 3.766 0 7-2.88 5.754-9.177M.512 2.5c1-.667 2.5-1 4.5-1s3.5.667 4.5 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fib-time-zone" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="8.5" r="2"/>
                <circle cx="9.5" cy="8.5" r="2"/>
                <path d="M2.5 0v6.5M2.5 10.5V16M9.5 0v6.5M9.5 10.5V16M15.5 0v16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fib-wedge" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="2.5" r="2"/>
                <circle cx="2.5" cy="13.5" r="2"/>
                <circle cx="13.5" cy="13.5" r="2"/>
                <path d="M4.5 13.5h7M4.5 3.5c3.5 0 8 2.519 8 8M2.5 6.52c.665.017 7.024-.712 7.024 6.98M2.5 4.5v7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fibonacci-fan" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 14v1.484L.5 15.5V10L11 .5h1.5v4M.5 12l15-9.5M3.5 15.5l12-5M.5 14.5l15-8M12.5 6v2M12.5 10v1.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fibonacci-projections" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 14 6 7l4 3 5.5-7.5M0 .5h16M0 2.5h13M0 4.5h11H0ZM0 6.5h4M8 6.5h2M0 8.5h2M0 10.5h1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-fibonacci-retracements" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m1 12 5-5 3.5 3L15 3M0 2.5h13M0 4.5h11H0ZM0 6.5h4M8 6.5h2M0 8.5h2M5 10.5h2M12 10.5h4M14 8.5h2M15 6.5h1M4 12.5h12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-flag-mark" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M.5 15V.5h15V1L11 5.5l4.5 4.5v.5H5z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-flat-top-bottom" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="6.5" r="2"/>
                <circle cx="2.5" cy="13.5" r="2"/>
                <circle cx="13.5" cy="13.5" r="2"/>
                <circle cx="13.5" cy="2.5" r="2"/>
                <path d="m4.5 6 7-3M4.5 13.5h7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-forecast" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 5.5h2v7h-2zM6.5 4.5h2v7h-2z"/>
                <circle cx="13.5" cy="13.5" r="2"/>
                <path d="M1.5 12.5V16M1.5 0v5.5M15.5 6.5l-1.962 2-2.038-2M13.5 0v8.5M7.5 0v4.5M7.5 11.5V14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-gan-box" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M14.5 3v11.5h-11M2.5 12.5v-10h10"/>
                <circle cx="14" cy="2" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <path d="M6.5 2.5v12M10.5 2.5v12M14.5 10.5h-12M14.5 6.5h-12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-gan-fan" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M1.5 1v13.531H15M7.5 1.5l-6 12M14.5 8.5l-12 6M14.5 1.5l-13 13"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-gan-line" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M1.5 1v13.531H15M14.5 1.5 3 13"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-gann-box" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M14.5 3v11.5h-11M2.5 12.5v-10h10"/>
                <circle cx="14" cy="2" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <path d="M6.5 2.5v12M10.5 2.5v12M14.5 10.5h-12M14.5 6.5h-12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-gann-fan" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="11" cy="5" r="1.5"/>
                <path d="M15.5.5 12 4M10 6l-7 7M7.5.5l-5 12M15.5 8.5l-12 5M1.5 0v12.5M16 14.5H3.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-gann-square" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="13.5" r="2"/>
                <circle cx="13.5" cy="2.5" r="2"/>
                <path d="M2.5 11.5v-9h9M13.5 4.5v9h-9M3.5 11.5l3-9M4.5 12.5l9-3M4 12l8-8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-gann-square-fixed" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 .375)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="13.125" r="2"/>
                <circle cx="10.5" cy="5.125" r="2"/>
                <path d="M7.5.125 4 11.625M15.5 8.125 4 11.625M15.5 13.125h-11M2.5 11.125v-11h13v13h-11M10.5.125v3M10.5 7.125v6M15.5 5.125h-3M8.5 5.125h-6"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-ghost-feed" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="14" cy="2" r="1.5"/>
                <path d="M5.5 6.5h2v5h-2zM9.5 4.5h2v7h-2zM13 3l-1.5 1.5M5.5 10.5 3 13M7.5 9.5l2-2M10.5 0v4.5M6.5 3v3.5M6.5 11.5V15M10.5 11.5V16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-head-and-shoulders" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="8" cy="2" r="1.5"/>
                <path d="M14.5 15.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM0 10.5h4.5"/>
                <path stroke-linejoin="bevel" d="m5.5 9.5 2.5-6 2.5 6M1.5 10.5l2-4 2 3"/>
                <path d="M11.5 10.5H16M6.5 10.5h3"/>
                <path stroke-linejoin="bevel" d="m10.5 9.5 2-3 2 4"/>
                <path d="M1.5 13.5v-3M14.5 13.5v-3M1.5 15.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5.5 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM10.5 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12.5 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM3.5 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-heatmap" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5.5v15M8.5.5v15M15.5 8.5h-7M8.5 11.5h-5M3.5 10.5h-3M3.5 5.5h-3M8.5 6.5h-5M.5.5v15h15V.5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-heikin-ashi" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 4.5h4v11h-4zM9.5 4.5h4v5h-4zM4.5 0v4.5V0ZM11.5 0v4.5V0Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-hide-drawing-tools" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m14.5 13.5-12-12" stroke-linecap="square"/>
                <path d="m14 10 1.5-1.815v-.341C13.016 4.51 10.35 2.5 7.5 2.5h-.997M4.5 3.5c-.897.633-2.228 2.08-3.994 4.343v.32C2.836 11.675 5.333 13.454 8 13.5c1.35.023 3.173-.988 4.5-2"/>
                <path d="M6.503 5.5C5.5 6.5 5.5 7.378 5.5 8c0 1.188 1.003 2.5 2.502 2.5 1.243 0 2.077-.333 2.501-1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-histogram" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 10v4-4ZM3.5 7v7M6.5 5v9M9.5 8v6-6ZM12.5 2v12M15.5 4v10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-hollow-candle" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 3.5h4v10h-4zM9.5 4.5h4v7h-4zM2.5 7.5h4M2.5 9.5h4M2.5 11.5h4M2.5 5.5h4M4.5 0v16M11.5 0v4.5M11.5 11.5V16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-hollow-candles" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 3.5h4v10h-4zM9.5 4.5h4v7h-4zM2.5 7.5h4M2.5 9.5h4M2.5 11.5h4M2.5 5.5h4M4.5 0v16M11.5 0v4.5M11.5 11.5V16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-horizontal-bold-line" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7.5h12" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-horizontal-cursor" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 6.5h6M2 3.5h8-8ZM0 12.5h16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-horizontal-line" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="7.5" cy="2.5" r="2"/>
                <path d="M0 2.5h5.5M9.5 2.5H16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-horizontal-ray" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="2.5" r="2"/>
                <path d="M4.5 2.5H16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-info-line" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 12.5 8 5l4 3.5 3.5-7M1 5.5.5 5V1L1 .5h2l.5.5v4l-.5.5zM7 15.5l-.5-.5v-4l.5-.5h2l.5.5v4l-.5.5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-inside-pitchfork" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="6" cy="8" r="1.5"/>
                <circle cx="13" cy="14" r="1.5"/>
                <path d="m12 3-2 7.5L12 3ZM15.5 6.5 14 13l1.5-6.5ZM7.5 8.5l5 4M4.5 13.5l1-4M3.5 13.5h8M6.5 6.5 8 0"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-insider-transactions" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7.523 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM11.5 14.5c-.114-3.406-1.427-5-3.992-5s-3.877 1.594-3.992 5H11.5ZM16.008 2.5h-4l-.5.5v2l.5.5h2.996l.504.5.004 2-.504.5h-4M5.008 2.5h-4l-.5.5v2l.5.5h2.996M13.508 10V1M2.508 10V1M0 8.5h4.008"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-kagi" xmlns="http://www.w3.org/2000/svg">
            <path d="M.5 10v5.5h3V.5h4v10h4.015v-6H15.5V14" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-line" xmlns="http://www.w3.org/2000/svg">
            <path d="m12 2.5-9.5 10v1h1l10-9.5V2.5z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-line-bar" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 14v-3M6.5 14V8M9.5 14v-3M12.5 14V8M13 3 9 7 6 5 3 8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-line-break" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 6.5h4v5h-4zM5.5.5h4v5h-4zM10.5 6.5h5v9h-5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-line-segment" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m10.5 4.5-6 6M11.5 5.5l-6 6M1.5 10.5h4v4h-4zM10.5 1.5h4v4h-4z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-lock-drawing-mode" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 13.5v-3L10 1.13 13 4l-9.5 9.5zM11 6 8 3M9.5 4.5l-7 7M4 13l-3-3M14.5 11.5v-1.496C14.5 9.001 14 8.5 13 8.5s-1.5.501-1.5 1.504V11.5"/>
                <path d="M10.5 11.5h5v4h-5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-long-position" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="2" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="2" cy="9" r="1.5"/>
                <circle cx="14" cy="9" r="1.5"/>
                <path d="M3.5 1.5H16M3.5 8.5h9M3.5 14.5H16M5.5 5.5l2-2 2 2M9.5 10.5l-2 2-2-2M7.5 3.5v9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-magnet" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 15.5h4v-7c0-2.667 1.167-4 3.5-4s3.5 1.333 3.5 4v7h4v-8c0-4.667-2.5-7-7.5-7S.5 2.833.5 7.5v8ZM.5 12.5h4M11.5 12.5h4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-measure-tool" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M1 12 12 1l3 3L4 15zM3.5 9.5 5 11M6.5 6.5 8 8M9.5 3.5 11 5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-modified-schiff-pitchfork" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 1.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="4" cy="4.5" r="1.5"/>
                <circle cx="2" cy="11.5" r="1.5"/>
                <circle cx="11" cy="11.5" r="1.5"/>
                <path d="M5 3.5 8.5 0M12 10.5 15.5 7M4.5 11 12 3.5M5 5.5l5 5M3.5 11h6"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-new-data-arrived" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 6v8M11.5 2v10M8 4.5h3.5M11.5 7.5H14M2 11.5h2.5M4.5 9.5H8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-note" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M6 15.29c3.678-3.755 5.5-6.908 5.5-9.423C11.5 2.33 9.406.5 6 .5S.5 2.33.5 5.867c0 2.515 1.822 5.668 5.5 9.422Z"/>
                <circle cx="6" cy="6" r="1.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-parallel-channel" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="10.5" cy="2.5" r="2"/>
                <circle cx="2.5" cy="10.5" r="2"/>
                <circle cx="10.5" cy="10.5" r="2"/>
                <path d="m12 9 3.5-3.5M5.5 15.5 9 12M4 9l5-5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-period-average" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M15.5 7.5H.5M12 4l3.5 3.476v.045L12 11M4 11 .5 7.525v-.057L4 4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-pitchfan" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="4" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="12" cy="14" r="1.5"/>
                <path d="M1.5 0v2.5M16 14.5h-2.5M10.5 14.5h-7M11.5 12.5l-8-8M2.5 12.5l8-11M3.5 13.5l11-8M1.5 5.5v7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-pitchfork" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 .469)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="4.531" r="1.5"/>
                <circle cx="11" cy="13.531" r="1.5"/>
                <circle cx="2" cy="13.531" r="1.5"/>
                <path d="M3 3.531 6.469 0M12 12.531 15.469 9M3 12.531l8-8M3 5.531l7 7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-point-figure" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(.063 .031)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="7.937" cy="7.969" r="1.5"/>
                <circle cx="7.937" cy="12.969" r="1.5"/>
                <path d="m.937.969 4.032 4M.937 5.969l4.032 4M.937 10.969l4 4M1 4.969l3.937-4M.937 9.969l4.032-4M.937 14.969l4-4M10.937.969l4.032 4M10.937 5.969l4.032 4M11 4.969l3.937-4M10.937 9.969l4.032-4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-polyline" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="7" cy="2" r="1.5"/>
                <circle cx="14" cy="2" r="1.5"/>
                <circle cx="14" cy="8" r="1.5"/>
                <circle cx="8" cy="8" r="1.5"/>
                <circle cx="8" cy="14" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="2" cy="7" r="1.5"/>
                <path d="M1.5 8.5v4M3.5 14.5h3M8.5 9.5v3M14.5 6.5v-3M9.5 7.5h3M8.5 1.5h4M5.5 2.5l-3 3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-price-label" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 .5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="13" r="2"/>
                <path d="M2.5 10.937V0h13v9h-9L4 11.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-price-range" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="14" cy="2" r="1.5"/>
                <path d="M3.5 14.5H16M0 1.5h12.5M8.5 12V4.5M5 8l3.5-3.5L12 8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-projection" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="2.5" r="2"/>
                <circle cx="2.5" cy="13.5" r="2"/>
                <circle cx="13.5" cy="13.5" r="2"/>
                <path d="M2.5 4.5v7-7ZM4.5 13.5h7M4.5 2.5c2.25.027 4.313.86 6.188 2.5 1.874 1.64 2.812 3.806 2.812 6.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-range" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 2.5h6M2 5.5h4-4ZM12.5 0v16M0 11.5h16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-ray" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M1.5 3V.5h12V3M7.5.5v15-15ZM5 15.5h5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-ray-old" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6.5 12 8-9.5v-1h-1L4 9.5"/>
                <path d="M1.5 9.5h5v5h-5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-rectangle" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="2.5" r="2"/>
                <circle cx="13.5" cy="2.5" r="2"/>
                <circle cx="2.5" cy="13.5" r="2"/>
                <circle cx="13.5" cy="13.5" r="2"/>
                <path d="M2.5 4.5v7M13.5 4.5v7M4.5 13.5h7M4.5 2.5h7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-regression-line" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m5.5 13.5 5-11M13 .5h2.5v15H13M3 10.5H.5M3 5.5H.5M13 10.5h2.5M13 5.5h2.5M3 15.5H.5V.5H3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-regression-trend" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 1)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="9.5" r="2"/>
                <circle cx="13.5" cy="4.5" r="2"/>
                <path d="M2.5 7.5V4l11-4v2.5M2.5 11.5V14l11-4.5v-3M4.5 8.5l7-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-renko" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10.5.5h5v5h-5zM5.5 6.5h4v4h-4zM.5 11.5h4v4h-4z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-reverse-ray" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m9.5 4-8 9.5v1h1l9.5-8"/>
                <path d="M14.5 6.5h-5v-5h5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-rotated-rectangle" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="10" cy="2" r="1.5"/>
                <circle cx="6" cy="6" r="1.5"/>
                <circle cx="2" cy="10" r="1.5"/>
                <circle cx="6" cy="14" r="1.5"/>
                <circle cx="10" cy="10" r="1.5"/>
                <circle cx="14" cy="6" r="1.5"/>
                <path d="m7 5 2-2M3 9l2-2M11 9l2-2M13 5l-2-2M5 13l-2-2M7 13l2-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-schiff-pitchfork" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 1.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="4" cy="4.5" r="1.5"/>
                <circle cx="2" cy="11.5" r="1.5"/>
                <circle cx="11" cy="11.5" r="1.5"/>
                <path d="M5 3.5 8.5 0M12 10.5 15.5 7M6 9.5l6-6M5 5.5l5 5M3.5 11h6"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-short-position" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="2" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="2" cy="7" r="1.5"/>
                <circle cx="14" cy="7" r="1.5"/>
                <path d="M3.5 1.5H16M3.5 14.5H16M5.5 5.5l2-2 2 2M9.5 10.5l-2 2-2-2M7.5 3.5v9M3.5 7.5h9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-show-drawing-tools" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(.5 2.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M15 5.64v-.277C12.687 1.798 10.187.011 7.5 0 4.813-.01 2.313 1.777 0 5.363v.277C2.324 9.207 4.824 10.993 7.5 11c2.676.007 5.176-1.78 7.5-5.36Z"/>
                <circle cx="7.5" cy="5.5" r="2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-sine-line" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM11 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
                <path d="M.5 7c0-2.002.592-3.5 3-3.5M15.5 9c0 2.002-.592 3.5-3 3.5M6.5 4c1.004.678 1.506 2.015 1.506 4.013 0 1.998.498 3.327 1.494 3.987"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-speed-resistance-lines" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 12v3.484L.5 15.5V10L11 .5h1.5V6M12.5 8v2.5M.5 12l15-7.5M.5 14l15-4.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-stepped-line" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M0 10.5h2.5V7.517h2V4.5h3v9h3v-11h3v7H16" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-strong-magnet" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 6.5h3V5c.104-1 .938-1.5 2.5-1.5s2.396.5 2.5 1.5v1.5h3V4C13.17 1.667 11.337.5 8 .5S2.83 1.667 2.5 4v2.5ZM2.5 6.5v2h3v-2M10.5 6.5v2h3v-2M13 10l-3 2 3 1-3 2M3 10l3 2-3 1 3 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-target-cursor" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 2.5h6M2 5.5h4-4ZM12.5 0v16M0 11.5h16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-text" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M1.5 3V.5h12V3M7.5.5v15-15ZM5 15.5h5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-three-drives-pattern" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 1)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="4" r="1.5"/>
                <circle cx="2" cy="11" r="1.5"/>
                <circle cx="8" cy="6" r="1.5"/>
                <circle cx="8" cy="12" r="1.5"/>
                <circle cx="14" cy="2" r="1.5"/>
                <path d="M1.5 5.5v4M7.5 7.5v3M3.5 4.5l3 1M9.5 6.5 15 8M9.5 12.5l4 1M3.5 10.5l3 1M3.5 10.5l3-4M9 11l4.5-7.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-time-cycles" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 2.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="4.5" cy="9" r="2"/>
                <circle cx="11.5" cy="9" r="2"/>
                <path d="M4.5 7V4C4.5 1.333 3 0 0 0M11.5 7V4c0-2.667 1.5-4 4.5-4M11.5 4c0-2.667-1.167-4-3.5-4S4.5 1.333 4.5 4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-trend-angle" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="13.5" cy="2.5" r="2"/>
                <circle cx="2.5" cy="13.5" r="2"/>
                <path d="M4.5 13.5H16M8.5 8c1.043.376 1.876.876 2.5 1.5 1 1 1.5 2.333 1.5 4M4.5 12.5 12 4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-trend-based-fib-extension" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="11.5" cy="2.5" r="2"/>
                <circle cx="2.5" cy="4.5" r="2"/>
                <circle cx="2.5" cy="11.5" r="2"/>
                <path d="M0 15.5h16M4.5 11.5H16M2.5 6.5v3M9.5 2.5l-5 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-trend-based-fib-time" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle transform="rotate(-90 2.5 4.5)" cx="2.5" cy="4.5" r="2"/>
                <circle transform="rotate(-90 4.5 13.5)" cx="4.5" cy="13.5" r="2"/>
                <circle transform="rotate(-90 11.5 13.5)" cx="11.5" cy="13.5" r="2"/>
                <path d="M15.5 16V0M11.5 11.5V0M6.5 13.5h3M2.5 6.5l2 5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-trend-channel" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 11.5V8.429l7-6.929L9 3zM6.5 14.5v-3.071l7-6.929L15 6z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-trend-line" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle transform="rotate(-90 2.5 13.5)" cx="2.5" cy="13.5" r="2"/>
                <circle transform="rotate(-90 13.5 2.5)" cx="13.5" cy="2.5" r="2"/>
                <path d="m4 12 8-8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-trend-lines" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m2 6 6-4 3 2 3-2M2 10l6-4 3 2 3-2M2 14l6-4 3 2 3-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-triangle" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="2.5" r="2"/>
                <circle cx="2.5" cy="13.5" r="2"/>
                <circle cx="13.5" cy="13.5" r="2"/>
                <path d="M2.5 4.5v7M11.5 13.5h-7M12 12 4 4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-triangle-pattern" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0 .5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="13.5" r="1.5"/>
                <circle cx="6" cy="3.5" r="1.5"/>
                <circle cx="10" cy="10.5" r="1.5"/>
                <path d="M5 2.5 1.538 0H1.5v12.016M7.478 3.5 15.5 7.47v.075L11 9.5M3 12.5 5.5 5M7 4.5 9.5 9M3.5 13.5l5-2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-unlock-drawing-mode" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5 13.5v-3L10 1.13 13 4l-9.5 9.5zM11 6 8 3M9.5 4.5l-7 7M4 13l-3-3M14.5 11.5v-1.496c0-1.003-.495-1.504-1.5-1.504-.67 0-1.17.333-1.5 1"/>
                <path d="M10.5 11.5h5v4h-5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-vertical-bold-line" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2v12V2Z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-vertical-cursor" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 0v16V0ZM2 2.5h6M2 5.5h4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-vertical-line" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(6)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle transform="rotate(90 2.5 7.5)" cx="2.5" cy="7.5" r="2"/>
                <path d="M2.5 0v5.5M2.5 9.5V16"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-view" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 1)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="10.5" cy="6.5" r="1"/>
                <circle cx="6.5" cy="9.5" r="1"/>
                <circle cx="3.5" cy="2.5" r="1"/>
                <path d="M12 12.5H.5V.993"/>
                <path d="M3 10c0-4.275 3.367-6.998 8.018-6.998"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-xabcd-pattern" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="2" r="1.5"/>
                <circle cx="13" cy="3" r="1.5"/>
                <circle cx="8" cy="7" r="1.5"/>
                <circle cx="2" cy="14" r="1.5"/>
                <circle cx="14" cy="11" r="1.5"/>
                <path d="m3 13 4-5M12.5 10.5 9 8M3 3l4 3M9 6l3-2M1.5 12.5v-9M13.5 4.5l.5 4.949"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chart-y-axis-placement" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m5.5 3.5 3 4 3-4M16 .5h-2.483v15H16M1 .5h2.5v15H1M16 10.5h-2.5M16 5.5h-2.5M1 5.5h2.5M1 10.5h2.5M8.5 13V7.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="chord-icon" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <circle id="hva" cx="7" cy="7" r="6"/>
                <mask id="hvb" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="12" height="12" fill="currentColor">
                    <use xlink:href="#hva"/>
                </mask>
            </defs>
            <g transform="translate(1 1)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <use mask="url(#hvb)" stroke-width="2" stroke-dasharray="3" transform="rotate(3 7 7)" xlink:href="#hva"/>
                <path d="M7.506 11c0-.936-.34-4.25 2.494-6.5M6.387 3c0 1.075 1.807 2.686 3.613 1.5"/>
                <path d="M3.5 8.5h6.997c-.331 0-1.164-.138-2.497-.415C6.667 7.808 5.167 6.779 3.5 5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="clear-filters" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m9.5 13.5 4-4M9.5 9.5l4 4M2.5 2.5h8v2L7.503 7.02v5.387l-1.995-1.414V7.008L2.5 4.5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="clock" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path d="M8 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" stroke="currentColor"/>
                <path stroke="currentColor" d="M10 8.5H7.5V5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="clock-2" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" stroke="currentColor"/>
                <path stroke="currentColor" d="M10 10 7.5 8.5V4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="collection" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5 7.51H4c-.976 0-1.5.59-1.5 1.538V13.5h11V9.048C13.5 8 12.995 7.51 12 7.51h-1"/>
                <path d="M4 11.5h1.5l1-6.5c-.667-.333-1-.833-1-1.5 0-1 1.25-1 2.5-1s2.5 0 2.5 1c0 .667-.333 1.167-1 1.5l1 6.5H12M7 7.51h2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="company-guidance" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8 2.707 2.707 8 8 13.293 13.293 8 8 2.707Z"/>
                <path d="M9.504 6.5 7.5 8.469V11"/>
                <path d="M7 6.5h2.504V9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="company-visit" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 4.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
                <circle cx="8.5" cy="6.5" r="1.5"/>
                <path d="M9.994 6H11V3H9L7 0H2.5l-1 3H0v3h1M4 6h3M1.5 3H9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="compare-documents" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6 13-1.5-1.5L6 10M10 7l1.5 1.5L10 10"/>
                <path d="M8 13.5h5.5v-11H10M8.5 7V2.5h-6v11H4M4.5 11.5H10M7 8.5h4.5M4 4.5h3M4 6.5h3M4 8.5h2M10 4.5h2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="compass" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.497 1.503)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M1.003 10.997v-.334l2.863-5.785 5.802-2.88h.335v.334L7.139 8.134l-5.802 2.863z"/>
                <circle cx="5.503" cy="6.497" r="1"/>
                <path d="M7.507 1.374A5.5 5.5 0 0 0 .381 8.507M3.498 11.62a5.5 5.5 0 0 0 7.126-7.133"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="compose" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7 2.5H2.5v11h11V9"/>
                <path d="M6.5 9.5V7L11 2.5 13.5 5 9 9.5zM11.5 6.5l-2-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="conference" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2.5" cy="2" r="1.5"/>
                <path d="M3.5 4.5h-1C.833 4.5 0 5.667 0 8v.503h1.5M9 12c0-2.008-.996-3.5-2.5-3.5h-2C2.99 8.5 2 9.992 2 12"/>
                <circle transform="matrix(-1 0 0 1 17 0)" cx="8.5" cy="2" r="1.5"/>
                <circle transform="matrix(-1 0 0 1 11 0)" cx="5.5" cy="6" r="1.5"/>
                <path d="M7.5 4.5h1C10.167 4.5 11 5.667 11 8v.503H9.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="conference-presentation" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7.498 2.5c1.335 0 2.002.667 2.002 2v3c0 1.333-.667 2-2.002 2-1.334 0-2-.667-1.998-2v-3c-.002-1.333.664-2 1.998-2ZM5.5 6.5h4"/>
                <path d="M3.5 6c.006.21.006.544 0 1-.014 1.062.5 4.5 4 4.5s4-3.455 4-4.5V6M7.5 11.5v2M4 13.5h7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="copy" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path stroke-linecap="round" d="M10.503 2.515v3l3-.015"/>
                <path d="M9 5.5H7h2ZM10.793 2.5H5.5v9h8V5.207L10.793 2.5ZM12 9.516H7M12 7.516H7"/>
                <path d="M11 13.516H2.5V4.5H4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="core-algo" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.5 3.5h-3M9.5 4.5v-2h4v2zM4.5 4.5v-2h2v2zM4.5 8.5v-2h6v2zM11.5 4.5v-2M6.5 8.5v-2M8.5 8.5v-2M7.5 12.5v-2h6v2zM9.5 12.5v-2M11.5 12.5v-2M7.5 11.5h-5M4.5 7.5h-2M14 7.5h-3.5M4.5 3.5h-2M2.5 13V2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="core-re-net" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M14 2 9.5 6.5M14 14 9.5 9.5M2 2l4.5 4.5M2 14l4.5-4.5M6.5 3v3.5H3M3 9.5h3.5V13M13 6.5H9.5V3M9.5 13V9.5H13"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="core-rfq" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m8.5 4-3 2.5h-3v2h3l3 2.5z"/>
                <path d="M5.5 6.5v7h-2v-5M11 7.5h3M10.5 5.5l3-3M10.5 9.5l3 3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="corporate-actions" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9 9.5h3M9 11.5h3M9 4.5h3M9 6.5h3M2.5 2.5h11v11h-11z"/>
                <path d="m8 9-2.5 2.5L4 10.016M8 4 5.5 6.5 4 5.016"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="correlate-lines" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M14 10.5H2M14 12.5H2M14 3.5H2M14 5.5H2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="crop" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M4.5 2.5v9h6"/>
                <path d="M5.5 4.5h6v9M2 4.5h1.5M12.5 11.5H14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="cross" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12 12 4 4M12 4l-8 8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="cross-circle" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" stroke="currentColor"/>
                <path d="m5.455 10.6 5-5.134-5 5.135Z" stroke="currentColor"/>
                <path d="m5.455 5.466 5.17 5.135-5.17-5.135Z" stroke="currentColor"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="cross-mini" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11 11 5 5M11 5l-6 6"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="csv" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V2.5h6l3 3V6"/>
                <path d="M9.5 2.5v3h3M3.5 12v1.5h9V12M5 7.5H3l-.5.5v2l.5.5h2M10.5 7v2.5l.5 1h1l.5-1V7M6 10.5h2.5v-1l-2-1v-1H9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="cursor" xmlns="http://www.w3.org/2000/svg">
            <path d="m4.5 3.076 5.975 5.043-1.049.221-1.368.289.584 1.227 1.37 2.876-1.5.624-1.39-2.921-.558-1.17-1.104.726-.96.63V3.077Z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="customer-service" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.515 5.5c0-1.5-1.015-3-3.515-3S4.5 4 4.5 5.5M10.515 5.5H12c1 0 1.5.667 1.5 2s-.498 2-1.493 2h-1.492v-4ZM5.5 9.5H4.015c-1 0-1.5-.667-1.5-2s.497-2 1.492-2H5.5v4ZM3.5 9.5V11l2 1.5h1v.5l.5.5h2l.5-.5v-1l-.5-.5H7l-.5.5v.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="cut" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 9.5a2 2 0 1 0 2 2M9.5 11.5a2 2 0 1 0 2-2"/>
                <path d="M9.5 11.5V11l-7-6V2.5H3l8 7h.5M4.5 9.5H5l1-1"/>
                <path d="M6.5 11.5V11L8 9.715M8 7l5-4.5h.5V5l-4 3.5M11 11.5h1M4 11.5h1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dashboard" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7 2.5H2.5v6H7M6 4.5H2.5 6ZM6 6.5H2.5 6ZM4.5 2.5v6M2.5 11v3M4.5 12v2M6.5 10v4M8.5 11v3M10.5 12v2M12.5 10v4M10.5 8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                <path d="m8.5 7.5 2-2 1-3M10.5 5.5l2 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="data-point" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2.502)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="9.498" r="1.5"/>
                <path d="M8.5 5.004V0H11l.5.499v1l-.5.5.5.503v2.004l-.5.498zM3.5 5.498v-5L4 0h2l.5.498v5M3.5 2.998h3M3 6.998h9M8.5 1.998H11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="decrease-indent" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 13.5h12H2ZM5.493 9.51 3 7.5l2.493-2.008zM8 4.5h5M8 8.5h5M8 10.5h3M8 6.5h3M2 2.5h12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="default-size" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m14 2-3.5 3.5M14 14l-3.5-3.5M2 2l3.5 3.5M2 14l3.5-3.5M5.5 5.5h5v5h-5zM5.5 2v3.5H2M2 10.5h3.5V14M14 5.5h-3.5V2M10.5 14v-3.5H14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="delete-from-briefcase" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10.5 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                <path d="M13.5 10.5V6.513L2.5 6.5v5H8M12 10.5H9M12 2.5H4M13 4.5H3M6 8.5h2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="directional-linking" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9 10.429 6.429 13 3 9.571 5.571 7M13.5 7V2.5H9M6 10l2-2M9 7l1.5-1.5M11.5 4.5l2-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="directory" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M.5.5h9v11h-9z"/>
                <circle cx="5" cy="4" r="1.5"/>
                <path d="M7.478 9.5c-.161-1.806-1.193-3-2.478-3-1.228 0-2.298 1.285-2.475 3h4.953ZM11.5 10V2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dislike-empty" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.5 8.5h-2v-6h2zM9.5 9V4.471L8.471 3.5H5l-2.506 2v2.072l.98.928h3.02V9l-.992 2.497V13.5h1.033L8 10.527z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="display-all-fields" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.499 12.504H3.5V3.5h8.998zM3.5 6.5h9M3.5 9.5h9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dividend" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="7" cy="5.5" r="5"/>
                <path d="M3.5 2C1.465 2.633 0 4.252 0 6.496a5 5 0 0 0 5 5c1.15 0 2.19-.457 3.035-1.11"/>
                <path stroke-linecap="square" d="M9 3.507H5v2.009h4v2l-4-.004"/>
                <path d="M6.999 2v7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dividends" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5.505 6.52V2.5h5v6.001"/>
                <path d="M8.503 13.5V8.501h4.002V13.5M14 13.5H2M10.5 13.5l.004-2.499M6.506 13.5V6.501H3.49l.013 6.999"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dockbottom" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 2.5h-8v11h8v-11Z"/>
                <path d="m10.5 6.5-2 2-2-2M4.5 10.5h8M8.5 4v4.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dockleft" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12 7.5H7.5M5.5 11.5v-8M2.5 3.5h11v8h-11z"/>
                <path d="m9.5 9.5-2-2 2-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dockright" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M4 7.5h4.5M10.5 3.5v8M13.5 11.5h-11v-8h11z"/>
                <path d="m6.5 5.5 2 2-2 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="docktop" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 2.5h-8v11h8v-11Z"/>
                <path d="m6.5 9.5 2-2 2 2M4.5 5.5h8M8.5 12V7.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="down" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="m2.5 5.5 5.5 5 5.5-5" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="down-all" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m3 4 5 5 5-5M13 12.5H3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="down-two" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m3 3 5 5 5-5M3 8l5 5 5-5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="download" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4.5 7.5 3 3 3-3M7.5 10.5V2M12.5 11v2.5h-10V11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="download-calendar" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m7 13.5-4.493.006v-10h11.005V9M4.5 5V2M11.5 5V2"/>
                <path d="m13 11-2.5 2.506L8 11M13.5 6.5h-11M10.5 8v5.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="downpanel-open" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10.495 5.5 7.5 2.5l-3.005 3M2.5 13.5v-3h10v3zM7.5 2.5V8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dpa-annotations" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5.5 13.5h4l4-3.857V4.5h-8z"/>
                <path d="M9.5 13.5v-4h4M4 11.5H2.5v-9H11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dpa-drafting-notes" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 13v.5h5l4-3.857V3.5h-9z"/>
                <path d="M8.5 13.5v-4h4M5.5 2v3M10.5 2v3M5 6.5h6M5 8.5h2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="drag" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.5 14V9.5l-1-1h-2l-.932-4H8.5v6h-.234L6.5 8.5h-1V10l2 3v1"/>
                <path d="M12.5 7V2.5h-7v4H7M4 4.5H2.5v4H4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="draw-custom-1" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="2" cy="10" r="1.5"/>
                <path d="M8.5 7v5.043M11 9.501H6M6.5.5 11 5M1.506 7.004C1.506 3.538 2.455 2 5 2M6.5 4.017V.5h3.51"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="draw-custom-2" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 9v5.043M14 11.501H9M2.5 12.522V10L10 2.5 12.5 5 5 12.522z"/>
                <path stroke-linecap="square" d="m10.5 6.5-2-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-add-to-gallery" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="8" cy="3.5" r="3"/>
                <path d="M6.5 3.5h3M8 2v3M11.5 11.5H0V0M2 10V3M4 10V6M6 10V8M8 10V8M10 10V8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-copy-work" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6 9.5 1.5 2-1.5 2"/>
                <path d="M2.5 9v1L4 11.5h3.5M9.996 6.5l-1.5-2 1.5-2"/>
                <path d="M13.5 7V6L12 4.5H8.496M11.502 12.5h-2v-4h3v3"/>
                <path d="M11.502 11.5H13.5l.002 2h-2zM4.502 6.5h-2v-4h3v3"/>
                <path d="M4.502 5.5H6.5l.002 2h-2z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-default" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.494 13.508H2.499v-11h10.995zM13.5 4.5h-11"/>
                <path d="M9.5 8V6.5h2V8M4.5 8V6.5h2V8M11.5 10v1.5h-2V10M4.5 12v-1.5h2V12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-delete-chart" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.5 2.5v3h3"/>
                <path d="M8.35 13.5H2.5v-11h6l3 3V9M10 14l4-4M14 14l-4-4M4.5 12V8M6.5 12V6M8.5 12V9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-encript" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 4.5V2h-5l-2-2h-4v2.5"/>
                <circle cx="2.5" cy="6" r="2"/>
                <path d="M4.5 6h7v2.5M9.5 8.5V6M.5 9.5V11h11V9.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-manage-entitlements" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="8" cy="2.5" r="2"/>
                <circle cx="2.5" cy="4" r="1.5"/>
                <path d="M8.5 11.5h2.494V8c0-1.5-1.402-2.5-2.994-2.5-1.657 0-3 .783-3 2.5M3.5 6.5h-1C.833 6.5 0 7.667 0 10v.5h1.5"/>
                <path d="m9 7.5-4 4-2-2.007"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-manage-tips" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 5c0-1.188-2.195-2.503-4.5-2.503S2.5 3.5 2.5 6c0 1.667.664 2.833 1.992 3.5v2H9M5 13.5h4"/>
                <path d="M6.5 4.5h2l6 6-2 2-6-6zM10.5 10.5l2-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-monitor" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.499 2.508h10.995v11H2.499z"/>
                <path d="M8.499 8.508h3v3h-3zM13.5 6.5h-11M12 4.5h-1M10 4.5H9M8 4.5H7M7 8.508H4M7 10.5H4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-move-charts" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m9.5 8 2 1.5 2-1.5"/>
                <path d="M9 4.496h1l1.5 1.5V9.5M2.5 10V2.5h4l1 1V7"/>
                <path d="M5.5 2.5v2h2M9 9.5H7.5l-1-1h-2v5h8l1-1.5v-.5H8l-1.5 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-recycle-bin" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10.5 12V9.5H8"/>
                <path d="M5.5 10v1l1 .5h2c.955-.958 1.621-1.624 2-2M5.5 6v2.5H8"/>
                <path d="M10.5 8V7l-1-.5h-2l-2 2M2 4.5h12"/>
                <path d="M3.5 4.5v9h9v-9M5.5 4.5l1-2h3l1 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-remove-collection" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5 7.51H4c-.976 0-1.5.59-1.5 1.538V13.5H7"/>
                <path d="M4 11.5h1.5l1-6.5c-.667-.333-1-.833-1-1.5 0-1 1.25-1 2.5-1s2.5 0 2.5 1c0 .667-.333 1.167-1 1.5l.5 3M7 7.51h2M13.5 8c-.337-.385-.837-.49-1.5-.49h-1M8.5 14 13 9.5M8.5 9.5 13 14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-remove-from-gallery" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 11.5H0V0M2 10V3M4 10V6M6 10V8M8 10V8M10 10V8"/>
                <circle cx="8" cy="3.5" r="3"/>
                <path d="M6.5 3.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="dsc-view-default-style" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m5 6 1.5-1.5 2 1 3-3h1l1 1v1l-3 3 .531 1.062M8.993 10l-4-4L2.5 8v1L6 12.5M5.5 8.5 3.53 10M14 9l-4.5 4.5-2-2.007"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="earnings-corporate" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.509 6.003V5L11 4.503 5 4.5l-.5.5v2l.5.503h6l.509.497v3l-.509.503H5L4.5 11v-1M8 14V2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="economic" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h11v11h-11z"/>
                <path d="M12 10.503H9.435L8.005 9l-1.559 2-1.459-1.496h-.984M12 6.501h-1l-1 1.102-1.995-2.178-1.74 2.062-.79-.986H4.01"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="edit" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 13.5v-3l8-8 3 3-8 8zM11 8 8 5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="ellipse" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.5c1.55 0 2.92.516 3.909 1.34.984.82 1.591 1.947 1.591 3.16s-.607 2.34-1.591 3.16c-.99.824-2.359 1.34-3.909 1.34-1.55 0-2.92-.516-3.909-1.34C3.107 10.34 2.5 9.213 2.5 8s.607-2.34 1.591-3.16C5.081 4.016 6.45 3.5 8 3.5Z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="ellipse-more" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path fill="currentColor" fill-rule="nonzero" d="M14.5 14.5 16 13v3h-3z"/>
                <path d="M8 3.5c1.55 0 2.92.516 3.909 1.34.984.82 1.591 1.947 1.591 3.16s-.607 2.34-1.591 3.16c-.99.824-2.359 1.34-3.909 1.34-1.55 0-2.92-.516-3.909-1.34C3.107 10.34 2.5 9.213 2.5 8s.607-2.34 1.591-3.16C5.081 4.016 6.45 3.5 8 3.5Z" stroke="currentColor"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="email" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M2.5 4v8.5h11V4H13L8 7.5 3 4zM13.5 4v-.5h-11V4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="emote" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="6" r="5.5"/>
                <path d="M3 7.354C3 8.432 4.593 9.51 6.154 9.51 7.72 9.51 9 8.5 9 7.354M7.5 3v2M4.5 3v2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="enhanced-due-diligence" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 8V4.5h-9v9H6M4 6.5h6"/>
                <path d="m8 11 2 2 4-4M4 8.5h6M4 10.5h2M13.503 7V2.514H4.526L2.5 4v.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="eraser" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 10 4 11.5h2L13 5l-2.5-2.5zM6.5 6.5 9 9M2 13.5h1M6 13.5h8M4 13.5h1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="event-marker" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M11 11.5H6.5l-1-1v-5l1-1H11M5.5 7.5H11"/>
                <rect x=".5" y=".5" width="15" height="15" rx="7.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="excel" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.793 2.5H3.5v11h9V5.207L9.793 2.5Z"/>
                <path d="M9.5 2.5v3h3M10 7.5l-4 4M6.5 7.5l3 4M7 11.5H5M11 7.5H9M8 7.5H5M11 11.5H8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="excel-add-filter" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11.5h5M11.5 9v5" stroke="currentColor"/>
            <path clip-rule="evenodd" d="M2.497 2.48h8v2L7.5 7v5.386l-1.995-1.413V6.988L2.497 4.479v-2Z" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-add-object" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.51 2.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5.99 10H0V0h9.99v6"/>
                <circle cx="2.99" cy="3" r="1"/>
                <path d="M1.99 8 3 6h.49L5 7M6.49 8h3M7.99 6.5v3M7.99 2l-1.5 3.5L7.99 2Z"/>
                <circle cx="7.99" cy="8" r="3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-datahub" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h11v4h-11zM2.5 8.5h11v4h-11zM6 4.5h1M4 4.5h1M9 4.5h3M6 10.5h1M4 10.5h1M9 10.5h3M11.5 8.5v-2M11.5 14v-1.5M4.5 14v-1.5M4.5 8.5v-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="excel-filter-applied" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 12V9M12.5 13v1" stroke="currentColor"/>
            <path clip-rule="evenodd" d="M3.5 2.5h8v2L8.503 7.02v5.387l-1.995-1.414V7.008L3.5 4.5v-2Z" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-filter-more" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5.5 12V6.5l-3-2v-2h9v2L8.473 6M9.5 13V9.5H13M13.5 13.5l-4-4M7.5 8V7M7.5 10V9M7.5 12v-1M7.5 14v-1M10 7.5H9M12 7.5h-1M14 7.5h-1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-formula-builder" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M6 12.5H2.5v-10h11V7"/>
                <path d="M8.5 12V8.5H12M6 4.5H4M9 4.5H7M12 4.5h-2M6 6.5H4M6 8.5H4M6 10.5H4M9 6.5H7M12 6.5h-2M13.5 13.5l-5-5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-linking" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m7 13.5-4.493.006v-10h11.005V9M4.5 5V2M11.5 5V2"/>
                <path d="m11 9 2.506 2.5L11 14M13.5 6.5h-11M8 11.5h5.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-pause-in-circle" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="6" r="5.5"/>
                <path d="M7.5 8V4M4.5 8V4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-play-in-circle" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.5 5.93 5 3.5h-.5v5H5l3.5-2.404z"/>
                <circle cx="6" cy="6" r="5.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-sensitivity-test" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m3.522 0 2.947 2-2.947 2L.5 2z"/>
                <rect x=".5" y="8" width="6" height="3" rx="1.5"/>
                <path d="M6.469 10H8c1 0 1.5-.5 1.5-1.5V7M6.469 2H8c1 0 1.5.5 1.5 1.5V4M3.5 8V4M7.5 4h4v3h-4z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-sign-in" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m8 5 2.5 2.5L8 10M2 7.5h8.5"/>
                <path d="M5.5 10v3.5h8v-11h-8V5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-sign-out" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m11 5 2.506 2.5L11 10M5 7.5h8.506M8.5 5V2.5h-6v11h6V10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="excel-traces" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m11 5 2.506 2.5L11 10"/>
                <path d="M2 4.5h3.506l3.015 3H13.5M2 10.5h3.506l3.007-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="exceldoc" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V2.5h6l3 3V6"/>
                <path d="M9.5 2.5v3h3"/>
                <path d="M3 13.5h10H3Z" stroke-linecap="square"/>
                <path d="M9.5 7.5h-6v4h6zM12 11.5h.5v-4H12L9.5 9.376v.266z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="exit-fullscreen" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="evenodd" stroke="currentColor">
                <path d="M6.5 13.5v-4h-4M6.5 9.5 2 14M9.5 2.5v4h4M9.5 6.5 14 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="export" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.504 8v5.505H13.5V9"/>
                <path d="M5.499 11v-1c0-2.77 1.274-4 4.501-4h2.404"/>
                <path d="m10 3 3 3-3 3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="export-chart" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m11.414 6.414 2-2-2-2M14 13.5H2.5V2M8 4.5h5.5M4.5 12V5M6.5 12V8M8.5 12V7M10.5 12V9M12.5 12V8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="expression-builder" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m13 9-4 4M13 13 9 9M2 13c1.142.486 2.196.253 3-1 .804-1.253 1.02-2.778 2-7 .38-1.639 1.254-2.604 3-1.639M4 6.5h5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="extend-heatmap-section" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path stroke-linecap="square" d="M2.512 7V2.503h10.991v10.996H9"/>
                <path d="M2.5 9.5h4v4h-4zM7 5.5h3.5V9M6.5 9.5l4-4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="external-content" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M6 6.503H3.5v6H9.5V10M12.5 8V3.5H8M6 10l6.5-6.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="eye" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 4)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12 4C8-1.333 4-1.333 0 4c4 5.333 8 5.333 12 0Z"/>
                <circle cx="6" cy="4" r="1.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="eye-off" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path stroke-linecap="square" d="m13.5 13.5-11-11"/>
                <path d="m12 10 2-2c-.13-.171-.227-.298-.292-.38-2.234-2.833-4.468-4.003-6.701-3.51M5.035 4.977C4.023 5.643 3.012 6.65 2 8c3.008 4.01 6.015 5.005 9.023 2.984"/>
                <path d="M6.13 6.5a2 2 0 0 0 2.68 2.969"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="eyedropper" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="m9.5 8.469-5 5.031h-2v-2l5-5"/>
                <path d="M8.5 4.5c0-1.016 1.12-2 2.5-2s2.5 1.059 2.5 2.5-.948 2.5-2 2.5V9l-.5.5h-.5l-4-4V5l.5-.5h1.5ZM7.5 10.5h-4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="favorites" xmlns="http://www.w3.org/2000/svg">
            <path d="m10.899 12.049-.586-3.303 2.537-2.36-3.412-.343L8 3.13 6.562 6.043l-3.412.344 2.537 2.36-.584 3.302L8 10.427l2.899 1.622Z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="favorites-filled" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="m8 11-3.573 2 .72-4.073L2 6l4.237-.427L8 2l1.763 3.573L14 6l-3.147 2.927.723 4.073z" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="favorites-settings" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M11.914 11.914a2 2 0 1 0-2.828-2.828 2 2 0 0 0 2.828 2.828Z" stroke="currentColor"/>
            <path d="M10.5 12.5V14M14 10.5h-1.5M13 8l-1.086 1.086M10.5 7v1.5M10.5 10v1M8.5 10.5H7M9.086 11.914 8 13M9.086 9.086 8 8M13 13l-1.086-1.086M11.75 7.5 13 6.438l-3.455-.475L8 3 6.455 5.963 3 6.438l2.5 2.306L4.91 12l1.59-1" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="favourites" xmlns="http://www.w3.org/2000/svg">
            <path d="m10.899 12.049-.586-3.303 2.537-2.36-3.412-.343L8 3.13 6.562 6.043l-3.412.344 2.537 2.36-.584 3.302L8 10.427l2.899 1.622Z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="feather" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 14v-.5C3.998 10.984 5.832 8.818 8 7"/>
                <path d="M3.5 8.462c0-1.78 1.333-3.6 4-5.462v1.99C8.42 4.033 9.252 3.37 10 3c.748-.37 1.914-.537 3.5-.5.043.961-.123 1.795-.5 2.5a8.414 8.414 0 0 1-1.514 2L11 7.5h2c-.662 1.264-1.329 2.097-2 2.5s-1.671.57-3 .5l1 1.589c-2.074.835-4.339.235-5.5-.089V8.462Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="feedback" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.5 9.5c1.5 0 4-.475 4-3s-2.5-3-5-3-5 .512-5 3c0 1.66 1 2.66 3 3v3H6l2.5-3ZM5 6.5h1M7 6.5h1M9 6.5h1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="filings-link" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" stroke="currentColor"/>
                <path d="M6.5 5v6-6Z" stroke="currentColor"/>
                <path stroke="currentColor" d="M10 5.5H6M9 8H6"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="fill-background" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5.5 4V2.5h2V8"/>
                <path d="M9 4.5 12.5 8v.5h-2L6 13 2 9l4-4M12.5 10.118l-1 2V13.5h2v-1.382l-1-2Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="filter" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M2.5 2.5h11v2.996l-3.998 2.5v5.498H6.496V7.996L2.5 5.496z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="five-charts" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h4v2h-4zM9.5 2.5h4v2h-4zM2.5 6.5h4v2h-4zM9.5 6.5h4v2h-4zM2.5 10.5h4v2h-4z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="flag-2" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M3.5 14V2M3.5 4.167C4.633 3.389 5.654 3 6.564 3c1.365 0 2.09 1 3.068 1 .652 0 1.608-.333 2.868-1v6c-1.153.667-2.109 1-2.868 1-1.139 0-2.004-1-3.068-1-.71 0-1.73.333-3.064 1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="flame" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.364 15s.909-1.4.909-1.867c0-2.053-1.818-3.733-1.818-3.733v1.867L7.545 9.4V7.533S5.727 9.867 5.727 12.2c0 2.053 1.818 2.8 1.818 2.8h-.909S3 14.16 3 10.333c0-1.68 1.273-3.08 1.818-3.733.455-.56 1.818-2.613 1.818-5.6 0 0 3.637 1.867 3.637 7.467 0 0 .909-.467.909-3.734 0 0 .727.56.909.934.545 1.026.909 2.893.909 4.666C13 13.507 9.364 15 9.364 15Z" fill="currentColor" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="font-size-decrease" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.5 14 5.677 6.497h-.352L2.5 14M3.5 11.5h4M8.5 2.5V3l2.462 3.497h.09L13.5 3v-.5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="font-size-increase" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.5 14 5.637 4.5h-.28L2.5 14M3.5 10.5h4M13.5 6.5V6l-2.461-3.5h-.075L8.5 6v.5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="forward" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="m9.5 11.5 4-4-4-4M13.5 7.5H2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="four-panes" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 7.5v-5h5v5zM7.5 7.5v-5h5v5zM2.5 12.5v-5h5v5zM7.5 12.5v-5h5v5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="fullview" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10.5 9.5v3h-8v-6h3"/>
                <path d="M13.5 9.5h-8v-6h8z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="function-normal" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6.52 11-.014-5.496H10"/>
                <path d="M2.5 2.5h11v11h-11zM6.5 8.5h2.504"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="fx" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.5 2.5v11h-11v-11zM11.5 8.5l-3 3M11.5 11.5l-3-3"/>
                <path d="M4 11.5c1 0 1.597-.289 2-.72.403-.43.49-1.047 1.5-4.28.363-1.163.672-1.961 2.5-1.961M5.5 6.5h4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="gradient-fill" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6 8-3.5 3v2.5h11V6L9 10zM2 8l4-3.5 3 2.086L14 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="grc-log-out" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M8 8V2M4.11 4.11a5.5 5.5 0 1 0 7.78 0"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="grid" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M14 2.5H2M14 13.5H2M2.5 2.5v11M9.5 2.5v11M13.5 2.5v11M14 4.5H2M4.5 2.5v11M14 7.5H2M13.5 10.5h-11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="height-to-max" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m10.5 4.5-2-1.999-2 1.999zM6 2.513l-2.487-.007v10.99L6 13.51M11 13.51l2.5-.007V2.506H11M6.5 11.5l2 2.003 2-2.003zM8.5 7V4.5M8.5 9v2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="height-to-min" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6.5 4.5 2 1.999 2-1.999zM6 2.513l-2.487-.007v10.99L6 13.51M11 13.51l2.5-.007V2.506H11M10.5 11.503 8.5 9.5l-2 2.003zM8.5 2v2.5M8.5 14v-2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="help" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" fill="none" fill-rule="evenodd">
                <circle stroke="currentColor" cx="6" cy="6" r="5.5"/>
                <path d="M4.454 4.772C4.886 3.91 5.402 3.48 6 3.48c.897 0 1.508.296 1.508.989C7.508 5.16 6 5.5 6 6.25V7" stroke="currentColor"/>
                <path stroke="currentColor" d="M6 8v1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="high-low-bar" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 8v5M8.5 8v2M6.5 8v6M10.5 8v1M10.5 2v5M12.5 4v3M8.5 5v2M6.5 6v1M4.5 8v4M2.5 8v3M4.5 4v3M2.5 3v4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="highlight" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 11.5V9L9 2.5 11.5 5 5 11.5zM9.5 6.5l-2-2"/>
                <path stroke-linecap="square" d="M2.5 13.5h11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="history" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M2.5 3v3.508H6"/>
                <path d="M4 12c1.774 1.656 4.56 1.99 6.766.716a5.5 5.5 0 0 0 2.013-7.513C11.633 3.22 10 2.511 8 2.511c-1.621 0-3.107.833-4.458 2.5-.238.294-.585.793-1.042 1.497"/>
                <path d="M10.5 9.5 8.5 8V4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="hollow-arrow-down" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M3.506 5.5V6L8 10l4.507-4v-.5z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="hollow-arrow-up" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M12.507 10.5V10L8.012 6l-4.506 4v.5z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="home" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.507 6.5v7H9.5V9.498h-3V13.5H3.514v-7"/>
                <path d="M14 8 8 2.5 2 8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="html" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V2.5h6l3 3V6"/>
                <path d="M9.5 2.5v3h3M3 13.5h10H3ZM5.5 7v1l.941 3.5h.223l1.282-3h.11l1.272 3h.23L10.5 8V7M12 11.5l1.5-2-1.5-2M4 11.5l-1.5-2 1.5-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="image" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.51 3)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M-.01-.5h11v11h-11z"/>
                <circle cx="7.49" cy="3" r="1.5"/>
                <path d="M0 8.48 3.518 5l2.985 3.011 1.995-.995L10.49 10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="import" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.504 8v5.505H13.5V9"/>
                <path d="M2 3.5h2.5c2.769 0 4 1.369 4 4.596v2.31"/>
                <path d="m11.5 7.5-3 3-3-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="increase-font" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M6.5 13 4.641 7.5h-.287L2.5 13M13.5 13l-2.863-9.5h-.28L7.5 13M3 10.5h3M8.5 9.5h4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="increase-indent" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8 8.5h5M8 6.5h3M8 10.5h3M8 4.5h5M3.5 5.479 6.013 8 3.5 10.5zM2 13.5h12M2 2.5h12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="individual" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="3" r="2.5"/>
                <path d="M11.48 11.5c-.23-2.954-2.502-5-5.48-5a5.5 5.5 0 0 0-5.478 5H11.48Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="info" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" stroke="currentColor"/>
                <path d="M8 7v4-4ZM8 5v1-1Z" stroke="currentColor"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="institutional" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m2 5 6-3 6 3M2 13.5h12M6.5 8v3.5M9.5 8v3.5M4.5 8v3.5M11.5 8v3.5M3 11.5h10M3 6.5h10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="ipo-pricing" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path stroke-linecap="square" d="M8.502 9.495V7.498h-2v4M4.5 7.5v4"/>
                <path d="M14 13.506H2.5V5.503H14"/>
                <path stroke-linecap="square" d="M6.5 9.5h2"/>
                <path d="M10.5 7.5h2v4h-2zM12.5 5.5v-3h-9v3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="italic" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6.5 12.5 3-9M7 3.5h5M4 12.5h5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="jpg" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V2.5h6l3 3V6"/>
                <path d="M9.5 2.5v3h3M3.5 12v1.5h9V12M13 7.5h-2.5v3h2V9M6.5 11V7.5H8l.51.5v.994l-.521.508H6.5zM2 10.5h1.5v-3M2 7.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="knowledge-graph" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="7" r="1.5"/>
                <path d="M6.5 2.5v3M7 8l3 2M2 10l3-2"/>
                <circle cx="1.5" cy="10.5" r="1"/>
                <circle cx="10.5" cy="10.5" r="1"/>
                <circle cx="6.5" cy="1.5" r="1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="l-doc" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V2.5h6l3 3V6"/>
                <path d="M9.5 2.5v3h3"/>
                <path d="M3 13.5h10H3Z" stroke-linecap="square"/>
                <path d="m11.5 11.5 2-1.5V9l-2-1.5M4.5 11.5l-2-1.5V9l2-1.5M9.5 10.5v1h-2V7M6 7.5h3M6 11.5h1.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="last-updated-date-time" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path stroke="currentColor" d="M7.5 12.5h-5v-9h10v4M5 6.5H4M7 6.5H6M5 8.5H4M5 10.5H4M4.5 5V2M10.5 5V2"/>
                <path d="M10 6.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" stroke="currentColor"/>
                <path stroke="currentColor" d="M12 10.5H9.5V8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="layout" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h11v11h-11zM2.5 7.5h11M6.5 13.5v-6M9.5 7.5v-5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="left" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M10.5 2.5 5.5 8l5 5.5" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="left-all" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M12 4 9 8l3 4M7 4 4 8l3 4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="leftpanel-closed" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m10.5 10.5 3-3-3-3M2.5 2.5h3v11h-3zM13.5 7.5H8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="leftpanel-open" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m11.5 4.5-3 3 3 3M2.5 2.5h3v11h-3zM8.5 7.5H14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="lego-brick" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 3.5h2v7h-11v-7h2v-1h2v1h3v-1h2z"/>
                <path d="M13 9.5h.5v4h-11v-4H3M4.5 8.5v-2h2v2zM9.5 8.5v-2h2v2zM4.5 2.5h2v2h-2zM9.5 4.5v-2h2v2zM6.5 3.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="less-detail" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7.5h12" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="lightbulb" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path d="M3.5 6c0-2.5 2.195-3.503 4.5-3.503S12.5 3.5 12.5 6c0 1.667-.664 2.833-1.992 3.5v2H5.5v-2c-1.333-.667-2-1.833-2-3.5ZM6 13.5h4" stroke="currentColor"/>
                <path d="M6.454 5.772C6.886 4.91 7.402 4.48 8 4.48c.897 0 1.508.296 1.508.989C9.508 6.16 8 6.5 8 7.25V8" stroke="currentColor"/>
                <path d="M8 9v1" stroke="currentColor"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="like-empty" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 7.5h2v6h-2zM6.5 7v4.529l1.029.971H11l2.506-2V8.428l-.98-.928h-3.02V7l.992-2.497V2.5H9.465L8 5.473z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="line" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fill-rule="nonzero" d="M2 7h12v1H2z"/>
        </svg>
        <svg viewBox="0 0 16 16" id="line-chart" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4.5 8.5 2-4L10 11l3.5-8.5"/>
                <path stroke-linecap="square" d="M2.5 2.5v11h11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="line-chart-2" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="m2 12 4-4 3 2 5-6" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="line-chart-grid" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2v7.5H14"/>
                <path d="m5 7 2-3 3 2 3-4M2.5 11.5h2v2h-2zM6.5 11.5h2v2h-2zM10.5 11.5h2v2h-2z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="line-chart-hpc" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="1.5" cy="1.5" r="1" transform="translate(7 2)"/>
                <circle cx="1.5" cy="1.5" r="1" transform="translate(11 5)"/>
                <path d="m8 8 5-6M2.535 1.999c0 2.666-.034 6.174-.034 11.505H14"/>
                <path d="m4.504 9.008 1.471-3.044L7 11.033l4-2.025 2 2.025"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="line-medium" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fill-rule="nonzero" d="M2 7h12v2H2z"/>
        </svg>
        <svg viewBox="0 0 16 16" id="line-more" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path fill="currentColor" fill-rule="nonzero" d="M14.5 14.5 16 13v3h-3z"/>
                <path stroke="currentColor" d="M2 7.5h12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="line-thick" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fill-rule="nonzero" d="M2 6h12v3H2z"/>
        </svg>
        <svg viewBox="0 0 16 16" id="line-thickness" xmlns="http://www.w3.org/2000/svg">
            <g fill="currentColor" fill-rule="nonzero">
                <path d="M2 2h12v1H2zM2 6h12v2H2zM2 11h12v3H2z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="line-thin" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fill-rule="nonzero" d="M2 7h12v1H2z"/>
        </svg>
        <svg viewBox="0 0 16 16" id="link" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7 5.571 9.571 3 13 6.429 10.429 9M9 10.429 6.429 13 3 9.571 5.571 7M6 10l4-4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="list" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M2.5 2.5v2h11v-2h-11ZM2.5 6.5v2h11v-2h-11ZM2.5 10.5v2h11v-2h-11Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="list-number" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 2.5h1.503V7M2 9.5h2.502v1.495l-2 1v1.5H5M7 2.5h7M7 4.5h7M7 9.5h7M7 11.497l7 .002"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="live-content" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-.364 1.588)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="8.864" cy="4.912" r="1"/>
                <path d="M11.278 7.205c1.367-1.367 1.367-3.633 0-5M6.364 2.412a3.53 3.53 0 0 0 0 4.974"/>
                <path d="M5 .757C2.669 3.09 2.669 6.911 5 9.243M13 9.243c2.331-2.332 2.331-6.154 0-8.486M8.864 12.412v-6.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="lock" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10.494 7.5V5.005c0-1.672-.831-2.509-2.494-2.509-1.663 0-2.495.837-2.495 2.51V7.5M3.5 7.5h9v6h-9z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="long-arrow-down" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4.5 10.5 3 3 3-3M7.5 13.5V2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="long-arrow-up" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m10.5 5.5-3-3-3 3M7.5 2.5V14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="long-press" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fill-rule="nonzero" d="M14.5 14.5 16 13v3h-3z"/>
        </svg>
        <svg viewBox="0 0 16 16" id="make-fullscreen" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.471 6.764V2.521H9.228M13.471 2.521 8.986 7M2.525 9.328v4.243h4.243M2.525 13.571 7.01 9.092"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="map" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="6" r="5.5"/>
                <ellipse cx="6" cy="6" rx="2.5" ry="5.5"/>
                <path d="M1 3.5h10M1 8.5h10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="map-chart" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.51 3v2.503H12"/>
                <path d="M9.793 2.5H3.5v11h9V5.207L9.793 2.5ZM7.5 5v1M10.5 9v1"/>
                <path d="M5.502 4.002v7.496l5.516.002"/>
                <path d="M7.5 10.007c0-1.671.84-2.507 2.518-2.507"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="map-layers" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.512 5 8 8l5.512-3v-.456L8 2 2.512 4.544zM2 11l6 3 6-3M2 8l6 3 6-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="mappin" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(3.714 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.286 11.195C6.812 7.973 8.07 5.642 8.07 4.285a3.786 3.786 0 1 0-7.571 0c0 1.357 1.259 3.688 3.786 6.91Z"/>
                <circle cx="4.286" cy="4.5" r="1.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="market-holiday" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="5.5" cy="3.5" r="3"/>
                <path d="M4 3.5h3M4.5 9v3M6.5 9v3M8.5 8v4M10.5 0v12M2.5 8v4.031M.5 5v7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="meeting" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.63 3.508H5.51C4.419 4.169 3.582 4.5 3 4.5H2M2 10.5h.5l1 1 2 2 2-1 1 1 2-1H12l.5-1-3-3M10.478 5.5 8 7.5H6.5V6l3.18-3.5H11l1.478 2L14 4.504M11.5 10.5H14M8 10l2.5 2.5M6 11l1.5 1.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="menu" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 2.5h12M2 7.5h12M2 12.5h12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="message" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 3.5v7h3v3h.293l3-3H13.5v-7h-11Z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="messenger-chat-room" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M6.844 10.5 3.5 13v-2.5h-2v-6h9v6z"/>
                <path d="m10.5 9.5 2 1.5V8.5h2v-6h-9v2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="messenger-inbox" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M6 3.5H4l-1.5 7v3h10v-3l-1.5-7H9"/>
                <path d="M2.5 10.5h3l1 1h2l1-1h3M5 7l2.23 2.5h.535L10 7M7.5 2v7.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="mini-down" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="m5 6 3 3 3-3" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="mini-left" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M9 5 6 8l3 3" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="mini-right" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="m7 11 3-3-3-3" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="mini-up" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M11 10 8 7l-3.083 3" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="minus" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M13 7.5H3" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="mobile-icon" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(4 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <rect x=".5" y=".5" width="7" height="11" rx="1"/>
                <path d="M3 9.5h2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="more" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 6)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="1.5" cy="1.5" r="1"/>
                <circle cx="5.5" cy="1.5" r="1"/>
                <circle cx="9.5" cy="1.5" r="1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="more-detail" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 6.5h12M2 9.5h12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="more-vertical" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(-90 9.5 3.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="1.5" cy="1.5" r="1"/>
                <circle cx="5.5" cy="1.5" r="1"/>
                <circle cx="9.5" cy="1.5" r="1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="most-detail" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 7.5h12M2 4.5h12M2 10.5h12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="moving-grid" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 4.5h11v2h-11zM2.5 9.5h11v2h-11z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="mp3" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V2.5h6l3 3V6"/>
                <path d="M9.5 2.5v3h3M3.5 12v1.5h9V12M5.505 11V7.5h-.277L4.005 9.007 2.754 7.5H2.5V11M11 10.5h2.5V10L13 9l.5-1v-.5H11M7.5 11V7.5H9l.51.5v.994l-.521.508H7.5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="msgr-adduser" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="5" cy="4" r="2.5"/>
                <path d="M9.476 11.5C9.25 9.13 7.408 7.5 5 7.5a4.5 4.5 0 0 0-4.473 4h8.949ZM10.5 0v3M9 1.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="msgr-alert" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8 3.044 2.5 13.127v.373h11v-.373L8 3.044ZM8 6.5V10M8 11v1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="msgr-blast" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M2.5 8.5h4v-3h-4zM11.5 2.5H11l-4.5 3v3l4.5 3h.5z"/>
                <path d="m5.5 8.5 2 5h-2l-2-5zM11.5 8.5c1.105 0 2-.395 2-1.5s-.895-1.5-2-1.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="msgr-camera" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 2.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M0 2h2.5l1-2h4l1 2H11v9.007H0z"/>
                <circle cx="5.5" cy="6.5" r="2.5"/>
                <path d="M4.501 2h2.003"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="msgr-removeuser" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 3)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="5" cy="3" r="2.5"/>
                <path d="M5 6.5c1.269 0 2.418.464 3.238 1.283.684.685 1.134 1.615 1.239 2.717H.527a4.486 4.486 0 0 1 1.291-2.682A4.486 4.486 0 0 1 5 6.5ZM9 .5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="multi-presentation" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4 14 3.5-3 3.5 3M4 8l2-1.54L7 7.5l2-1.04 1 1.04M7.5 14v-4"/>
                <path d="M2.5 4.5h9v5h-9z"/>
                <path d="M4 2.5h9.5V8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="neutral" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path stroke-linejoin="round" d="m11 9 1.5-5.5L14 9M2 9l1.5-5.5L5 9"/>
                <path d="M8 13.5V2M5 13.5h6M3.5 3.5h9M11 9.5h3M2 9.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="new" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.51 2.5v4.003h3.99"/>
                <path d="M9.235 2.5H3.5v11h9V5.813L9.235 2.5Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="new-alert" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M6 13.5h4M11.5 8v.62l1 1.92v.96h-9v-.96L5 8.62V4.78s1-1.278 2-1.278M10.5 7V2M13 4.5H8"/>
        </svg>
        <svg viewBox="0 0 16 16" id="news" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 13.5h9v-11h-9v11ZM2.5 13.5h2v-8h-2v8Z"/>
                <path d="M6.5 7.5h3v-3h-3v3ZM6 9.5h6M6 11.5h6"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="news-fullview" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 7.5h4v3h-4zM2.5 2.5h11v2h-11z"/>
                <path stroke-linecap="square" d="M8.5 7.5h5M8.5 10.5h5M2.5 13.5h11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="news-headlines-only" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h11v2h-11zM2.5 10.5h5v2h-5zM2.5 6.5h8v2h-8z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="news-headlines-summary" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h11v2h-11z"/>
                <path stroke-linecap="square" d="M2.5 7.5h11M2.5 10.5h11M2.5 13.5h11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="news-most-significant" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4 2.506h9.497V11.5l-1.992 2.003H2.502V4.502h9.003v9"/>
                <path d="m4 8 3 1.5L10 8M7 6v3-3ZM4.493 11.5 7 9.5l2.51 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="news-topnews" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4 2.506h9.497V12"/>
                <path d="M2.5 4.5h9v9h-9zM4 6.5h5M6.5 6.5V12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="news-trending" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.498 4v9.502H4.002"/>
                <path d="M2.5 2.5h9v9h-9z"/>
                <path d="M5.997 4.5H9.5V8"/>
                <path d="m2.522 8.5 1.966-2 1.516 2 3.496-4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="next" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4 13 5-5-5-5M12.5 3v10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="next-page" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.793 2.5H3.5v11h9V5.207L9.793 2.5Z"/>
                <path d="m8.5 7.5 2 2-2 2M10.5 9.5H5M9.5 2.5v3h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="nine-charts" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h2v2h-2zM6.5 2.5h2v2h-2zM10.5 2.5h2v2h-2zM2.5 6.5h2v2h-2zM6.5 6.5h2v2h-2zM10.5 6.5h2v2h-2zM2.5 10.5h2v2h-2zM6.5 10.5h2v2h-2zM10.5 10.5h2v2h-2z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="note" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.503 13.504v-4H12.5"/>
                <path d="M12.503 2.5H3.5v10.997l5.5.007L12.503 10zM12.5 4.5h-9M9.5 2.5v2M6.5 2.5v2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="ohlc-chart" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 13.5h3.5v-11H9M9 13.5h4.5V2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="one-and-three-panes" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h2v4h-2zM2.5 8.5h11v5h-11zM6.5 2.5h3v4h-3zM11.5 2.5h2v4h-2z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="one-and-two-panes" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h4v5h-4zM8.5 2.5h5v5h-5zM2.5 9.5h11v4h-11z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="one-column" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 2.5v11h9v-11h-9Z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="ongoing-screening" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m2.521 2-.018 4.5H7"/>
                <path d="M13.693 6.635c-.77-2.308-2.736-4.133-5.613-4.133-2.876 0-4.443 2.313-5.387 4.042M13.52 13.964V9.513H9"/>
                <path d="M2.35 9.328c.77 2.308 3.083 4.17 5.65 4.17 2.533 0 4.474-2 5.35-4.078"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="open" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 3.5v9h11v-7H7.793l-2-2H2.5Z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="open-playlist" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 2.5h10M2 5.5h10M2 8.5h5M2 11.5h5M9.5 8.5v5h.5l3.5-2.229v-.551L10 8.5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="open-quote" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 10.5v3h-9v-8h2"/>
                <path d="M13.5 10.5h-9v-8h9zM9.5 8v1"/>
                <path d="M10 4.505h1.503V9M6 4.505h2.502V6l-2 1v1.5H8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="order-list" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 2.5h6M2 4.5h6M2 6.5h6M2 8.5h4M2 10.5h4M10.5 13.5V2M8 11l2.5 2.5L13 11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="order-list-up" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 2.5h10M2 4.5h7M2 6.5h4M2 8.5h4M2 10.5h4M14 8l-2.5-2.5L9 8M11.5 5.5V14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="other" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="6" r="5.5"/>
                <circle cx="6" cy="6" r="2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="outline-fill" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M2.5 2.5h11v11h-11z"/>
                <path d="M5.5 5.5h5v5h-5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="outline-fill-only" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 3H3v10h10V3Zm-2 2H5v6h6V5Z" fill="currentColor" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="outline-no-fill" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M2.5 2.5h11v11h-11z"/>
                <path d="M5.5 5.5h5v5h-5zM13 3l-2.619 2.619M5.654 10.346 3 13"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="overweight" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path stroke-linejoin="round" d="m11 8 1.5-5.5L14 8M2 11l1.5-5.5L5 11"/>
                <path d="m3.5 5.5 9-3M8 13.5V2M5 13.5h6-6ZM2 11.5h3M11 8.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="palette" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.5 11.284c0 .784 1.008.718.5 1.716s-3.273.481-4.825-1.275C2.622 9.969 2.5 9 2.5 7c0-2 1.787-4.5 5.5-4.5s5.347 2.457 5.5 4.5c.153 2.043-.918 3.5-2.5 3.5-1.582 0-2.5 0-2.5.784Z"/>
                <path d="M5.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM7.5 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM10.5 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="panel-bottom-open" xmlns="http://www.w3.org/2000/svg">
            <path d="m4.5 4.5 3 3 3-3M2.5 10.5v3h10v-3h-10ZM7.5 7.5V2" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="panel-top-open" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.495 11.5 7.5 8.5l-3.005 3M2.5 2.5v3h10v-3h-10ZM7.5 8.5V14" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="parameter-normal" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h11v11h-11z"/>
                <path d="M6.5 11.011V5.506h2.488l.522.516V8l-.522.508H6.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="paste" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M7.5 13.5h3l3-3v-4h-6z"/>
                <path d="M10.5 13.5v-3h3M12.5 6.5v-3h-2l-.5 1H5l-.5-1h-2v9h5M6 2.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="pause" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5.5 12V4M10.5 12V4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="pdf" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.793 2.5H3.5v11h9V5.207L9.793 2.5Z"/>
                <path d="M9.5 2.5v3h3M7 11l.5-6-.5-.5H5.5V5l4.5 5.5h.5v-2L10 8l-4.5 2v1.5h.69z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="phone" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 10.736v1.656a1.103 1.103 0 0 1-1.206 1.104A10.96 10.96 0 0 1 7.52 11.8a10.774 10.774 0 0 1-3.319-3.312 10.91 10.91 0 0 1-1.698-4.786A1.103 1.103 0 0 1 3.605 2.5h1.66c.555-.005 1.048-.049 1.126.5.07.53.422 1.5.609 2 .152.403-.188.859-.491 1.165l-.703.701a8.84 8.84 0 0 0 3.319 3.312l.702-.7A1.662 1.662 0 0 1 11 9c.448 0 1.399.29 2 .477s.514.698.5 1.259Z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg viewBox="0 0 16 16" id="phone-icon" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 10.736v1.656a1.103 1.103 0 0 1-1.206 1.104A10.96 10.96 0 0 1 7.52 11.8a10.774 10.774 0 0 1-3.319-3.312 10.91 10.91 0 0 1-1.698-4.786A1.103 1.103 0 0 1 3.605 2.5h1.66c.555-.005 1.048-.049 1.126.5.07.53.422 1.5.609 2 .152.403-.188.859-.491 1.165l-.703.701a8.84 8.84 0 0 0 3.319 3.312l.702-.7A1.662 1.662 0 0 1 11 9c.448 0 1.399.29 2 .477s.514.698.5 1.259Z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg viewBox="0 0 16 16" id="pie-chart" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
                <path d="m4 12 3.5-3.5v-6M7.5 8.5l6-1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="pin" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m2 14 3.5-3.5M4 7l5 5 1-1-1-2 2.491-2.459L13 7l1-1-4-4-1 1 .52 1.488L7 7 5 6z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="play" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="m11.5 8-7-4v8z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="plus-in-circle" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8 5.5H3M5.5 8V3"/>
                <circle cx="5.5" cy="5.5" r="5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="plus-in-square" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 2.5v10h-10v-10h10ZM7.5 5v5M10 7.5H5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="png" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V2.5h6l3 3V6"/>
                <path d="M9.5 2.5v3h3M3.5 12v1.5h9V12M9.5 7v3.5H9l-2-3h-.5V11M14 7.5h-2.5v3h2V9M2.5 11V7.5H4l.51.5v.994l-.521.508H2.5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="popout" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 9v3.505H3.513V3.5H7M8 8l4.5-4.5M8.999 3.5H12.5v3.516"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="powerpoint" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V2.5h6l3 3v8H3"/>
                <path d="M9.5 2.5v3h3M6 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                <path d="m4 11 1.5-1.5v-3M5.5 9.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="present" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 8.5h-1v-3h11v3h-1v5h-9zM7.5 5.5v8M3.5 8.5h9M6 5.5l-1.5-1V3l.5-.5h1.5L8 5l1.408-2.5H11l.5.606V4.5l-1.5 1H6Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="presentation" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4 14 4-3 4 3M8 14v-4M2.5 3.5h11v6h-11z"/>
                <path d="m5 8 2-2.527L9 7.48l2.014-2.476M8 3.477V2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="previous" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12 3 7 8l5 5M3.5 13V3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="previous-page" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.793 2.5H3.5v11h9V5.207L9.793 2.5Z"/>
                <path d="m7.5 11.583-2-2 2-2M9.5 2.5v3h3M5.5 9.5H11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="print" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M6 11.5h4M4.5 11v2.5h7V11M2.5 8.5h11M8.5 2.5v3h3M2.5 12.014V6.5h2"/>
                <path d="M4.5 8.5v-6h4.517L11.5 5.004V8.5M11.5 6.5h2v5.514"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="profile" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M8 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.5 14v-2.5c.883-1.333 2.383-2 4.5-2s3.617.667 4.5 2V14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="quote" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 2.505h1.503V7M1.997 9.506H3.5l.003 3.989M11 2.505h2.502V4l-2 1v1.5H14M5 9.495h2.502v1.497l-2 1v1.503H8M5.5 2.505V6.5h2.016L7.5 2.505zM5.5 4.5h2M2 6.5h3M2 13.495h3M9.5 6v1M9.5 13v1M13.51 9.495l-2.01.011V13.5l2.01-.012z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="range" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m9 12 4-4-4-4M7 4 3 8l4 4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" xml:space="preserve" id="rating-1" xmlns="http://www.w3.org/2000/svg">
            <g fill="currentColor" fill-rule="evenodd">
                <path d="M0 10h4v6H0z"/>
                <path opacity=".4" d="M6 5h4v11H6zM12 0h4v16h-4z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" xml:space="preserve" id="rating-2" xmlns="http://www.w3.org/2000/svg">
            <g fill="currentColor" fill-rule="evenodd">
                <path d="M0 10h4v6H0zM6 5h4v11H6z"/>
                <path opacity=".4" d="M12 0h4v16h-4z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" xml:space="preserve" id="rating-3" xmlns="http://www.w3.org/2000/svg">
            <g fill="currentColor" fill-rule="evenodd">
                <path d="M0 10h4v6H0zM6 5h4v11H6zM12 0h4v16h-4z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="read-all" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 7V2.5h-10v11H7M4 4.5h6M4 6.5h6"/>
                <path d="m8 11 2 2 4-4M4 8.5h6M4 10.5h2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="real-time" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path d="M8 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" stroke="currentColor"/>
                <path stroke="currentColor" d="m5 9 2-2 2 2 2-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="rectangle" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M2.5 3.5h11v9h-11z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="rectangle-more" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path fill="currentColor" fill-rule="nonzero" d="M14.5 14.5 16 13v3h-3z"/>
                <path stroke="currentColor" d="M2.5 3.5h11v9h-11z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="redo" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m10 3.5 3 3-3 3"/>
                <path d="M13 6.5H9c-2.322 0-4.744.52-6 5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="redu" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m10 3.5 3 3-3 3"/>
                <path d="M13 6.5H9c-2.322 0-4.744.52-6 5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="refresh" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m2.511 2-.008 4.505H7"/>
                <path d="M2.925 10.34A5.5 5.5 0 0 0 10.234 13c2.753-1.284 4.05-4.583 2.766-7.336-.968-2.077-2.862-3.16-5-3.16-2.085 0-3.917 1.334-5.497 4.001"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="reorganise-lines" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path stroke-linecap="square" d="m10.5 4.5-1-1 1-1M10.5 8.5l-1-1 1-1M10.5 12.5l-1-1 1-1"/>
                <path d="M9.5 3.5h4.001l-.001 8H9.499M9.5 7.5h4M2.5 2.5h4v2h-4zM2.5 6.5h4v2h-4zM2.5 10.5h4v2h-4z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="report" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path stroke-linecap="square" d="M13.5 13.5H4l-.5-.5v-1.5h10v-9h-10v9"/>
                <path d="M6.5 4.5h5v4h-5zM2 9.5h3M2 7.5h3M2 5.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="research" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.793 2.5H3.5v11h9V5.207L9.793 2.5Z"/>
                <path d="M9.5 2.5v3h3M6.5 12V7.5H10l.51.5v1l-.51.502H6.5"/>
                <path d="M8.505 9.485 10.5 11.5v.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="resize" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 7V2.5H7M13.5 9v4.5H9M7 7 2.5 2.5M9 9l4.5 4.5M10 2.5h3.5V6M6 13.5H2.5V10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="right" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="m5.5 13.5 5-5.5-5-5.5" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="right-all" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4 12 3-4-3-4M9 12l3-4-3-4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="rightpanel-closed" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m5.5 4.5-3 3 3 3M13.5 13.5h-3v-11h3zM2.5 7.5H8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="rightpanel-open" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4.5 10.5 3-3-3-3M13.5 13.5h-3v-11h3zM7.5 7.5H2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="roadshow" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m5.5 2.5 2 5.5-2 5.5h-3l2-5.5-2-5.5h3ZM11.5 2.5l2 5.5-2 5.5h-3l2-5.5-2-5.5h3Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="rocket" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2.5)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m2.5 7 2 2 7-4.5V0H7zM2.5 7h-2v-.5L2 3h3M4.5 9v2H5l3.5-1.5v-3M0 10.5l2-2M1 11.5l2-2"/>
                <circle cx="8.5" cy="3" r="1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="rotate" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.674 2.994c-.34.04-.672.11-.994.211l-.298-.954a6.458 6.458 0 0 1 1.987-.293l-.01 1c-.23-.003-.46.01-.685.036Zm2.04.151a5.437 5.437 0 0 0-.672-.137l.137-.99a6.436 6.436 0 0 1 2.167.71l-.478.878a5.292 5.292 0 0 0-1.154-.46Zm-3.972.452c-.6.319-1.135.748-1.57 1.266l-.766-.643a6.295 6.295 0 0 1 1.867-1.506l.47.883ZM12.487 5a4.975 4.975 0 0 0-.612-.675l.677-.736c.158.145.308.298.448.458V2h1v4h-4V5h2.487Zm-8.883.697a4.98 4.98 0 0 0-.57 1.79l-.993-.115a5.98 5.98 0 0 1 .684-2.153l.879.478Zm-.59 2.667c.04.59.191 1.162.438 1.691l-.906.423a5.78 5.78 0 0 1-.53-2.045l.998-.07Zm9.896 1.77c.136-.264.25-.542.338-.834l.957.291c-.107.35-.243.684-.406 1l-.89-.458Zm-9.016.681a5 5 0 0 0 1.252 1.231l-.566.825a6 6 0 0 1-1.502-1.478l.816-.578Zm7.207 1.292a5.243 5.243 0 0 0 1.326-1.214l.793.609a6.242 6.242 0 0 1-1.58 1.447l-.54-.842Zm-5.187.374a5.35 5.35 0 0 0 1.725.463l-.096.996a6.431 6.431 0 0 1-2.046-.55l.417-.909Zm2.63.475a5.461 5.461 0 0 0 1.756-.425l.393.92a6.461 6.461 0 0 1-2.077.502l-.071-.997Z" fill="currentColor" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="same-size" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="10" cy="2" r="1.5"/>
                <circle cx="2" cy="10" r="1.5"/>
                <path d="M10.517 5v5.502H5M1.5 7V1.498H7M4 4.5h3M5 7.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="sankey" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 4.5h4.5l1-1V2M2 6.5h8.5l1-1v-2l1-1H14M2 8.5h12M2 10.5h5.5l1 1v1l1 1H12M2 12.5h3.5l1 1v.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="save" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h9l2 2v9h-11V5.096z"/>
                <path d="M4.5 13.5v-5h7v5zM10.5 2.5v3h-5v-3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="save-as" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5.5 6.5h6.545L13.5 7.773V13.5h-8V8.152z"/>
                <path d="M7.5 13.5v-3h4v3zM11.5 6.5v2h-4v-2"/>
                <path d="M4 9.5H2.5v-7h6.545L10.5 3.773V5"/>
                <path d="M8.5 2.5v2h-4v-2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="screen" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.608 4.977c-.722.885-1.083 1.885-1.083 3 0 3.154 2.309 5.518 5.475 5.518 2.204 0 4.041-1.334 5.513-4.002M12.83 5.706a4.986 4.986 0 0 0-.823-1.7"/>
                <path d="M13.513 13V9.516H10M9 2.5l2 .5M5 3.539 7.5 2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="search" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="5.5" cy="5.5" r="5"/>
                <path stroke-linejoin="round" d="M12 12 9.019 9.014"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="search-minus" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="5.5" cy="5.5" r="5"/>
                <path stroke-linejoin="round" d="M12 12 9.172 9.172"/>
                <path d="M8 5.5H3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="search-plus" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="5.5" cy="5.5" r="5"/>
                <path stroke-linejoin="round" d="M12 12 9.172 9.172"/>
                <path d="M5.5 3v5M8 5.5H3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="secondary-filing" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8 7.5H5l-.5.5v1.5l3-.003V11l-.5.5H4"/>
                <path d="M2.5 5.5h11v8h-11zM12.5 5.5v-3h-9v3"/>
                <path d="M12 7.5H9.5v4H12M12 9.5H9.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="select-area" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V3.5H6M7 3.5h2M10 3.5h2.5V6M12.5 10v2.5H10M9 12.5H7M6 12.5H3.5V10M12.5 7v2M3.5 7v2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="send" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m10.5 5.696-3-3-3 3M7.5 2.5V10M2.5 8v5.498h10V8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="send-backward" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M5 9.5H2.5v-7h7V5"/>
                <path d="M6.5 6.5h7v7h-7z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="send-to-back" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8 11.5H4.5V8M11.5 8V4.5H8M2.5 2.5h4v4h-4zM9.5 9.5h4v4h-4z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="sendfeed" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9 13.5H3.509l.03-10.982h8.992L12.501 8"/>
                <path stroke-linejoin="round" d="M13.5 11.5H9"/>
                <path d="m11.404 9.5 2 2.048-2 1.952M5.006 4.5H10M5 6.5h5M5.006 8.5H8M5.006 10.5H7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="sendfull" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10 13.5H5.501v-9h7V8"/>
                <path d="M13.5 11.5H9" stroke-linejoin="round"/>
                <path d="M7.006 6.5H11M7 8.5h3M7.006 10.5H8M11.531 9.5l2 1.992-2 2.008M4.004 12.502l-1.502.002v-10H11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="set-alert" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M12.5 11.5h-9V10l2-2V4c.652-.998 1.485-1.497 2.5-1.497.987 0 1.82.499 2.5 1.497v4l2 2v1.5ZM10 13.5H6"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="set-default" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-1.39 .99)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.89 6.268v4.242h4.318l5.484-4.57-3.398-4.248L3.89 6.268Z"/>
                <circle cx="6.389" cy="8.01" r="1"/>
                <path d="M5.39 12.51h9.51v-4h-1.504"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="settings" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(3 3)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="5" cy="5" r="1.5"/>
                <path d="m9.134 6.458-.122.293.615 1.555L8.48 9.434l-1.6-.573-.28.114-.68 1.525H4.304l-.72-1.519-.468-.19c.121.05.103.08.14.073-.016.01-.08.034-.155.063-.24.092-.594.235-1.062.427l-.306.125L.575 8.34l.121-.307c.185-.469.322-.823.41-1.062.032-.086.057-.155.075-.21-.016.077.01.071.056.182l-.193-.462L-.5 5.674V4.132l1.55-.627.108-.254-.615-1.557L1.689.567l1.6.573.444-.181c-.1.04-.113.019-.133.048.006-.023.035-.085.069-.16.102-.232.25-.579.443-1.04L4.24-.5h1.625l.72 1.52.28.114L8.442.529l1.147 1.125-.582 1.583.115.275 1.379.646v1.5l-1.366.8Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="shapes" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="8.5" cy="3" r="2.5"/>
                <path d="M.001 11.505 0 2.467l9.02 9.038z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="share" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m3 5 5.5-2.5M3 7l5.5 2.5"/>
                <circle cx="10" cy="2" r="1.5"/>
                <circle cx="10" cy="10" r="1.5"/>
                <circle cx="2" cy="6" r="1.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="shared" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="8" cy="2.5" r="2"/>
                <circle cx="2.5" cy="4" r="1.5"/>
                <path d="M5 11.5h6V9c0-2.45-1.065-3.5-3-3.5S5 6.55 5 9v2.5ZM3.5 6.5h-1C.833 6.5 0 7.667 0 10v.503h3.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="shared-locked" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10 7.516a2.5 2.5 0 0 0 0-5H9M10 8.516c1.933 0 3.5.833 3.5 3.333v1.667h-7V12M7.5 6.516V4.522c0-1.337-.667-2.006-2-2.006s-2 .669-2 2.006v1.994h4Z"/>
                <path d="M2.5 6.5h6v4h-6z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="show-statistics" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M12.5 12v1.5h-9V13l5-4.744v-.51L3.5 3v-.5h9V4" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="significant-news" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7 13.503H2.502V4.502H12"/>
                <path d="M3 2.5h10.516V7M8 6.5H4.5v2H7M4 10.5h3M10 13.503c-.667-.42-1.489-.705-1.489-2.503 0-1.205.662-2.538 1.985-4v4.505H11.5l1-3.005c1.848 1.658 1.634 4.006.5 5.003"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="single-pane" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M2.5 12.5v-10h10v10z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="six-charts" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h2v4h-2zM6.5 2.5h2v4h-2zM6.5 9.5h2v4h-2zM10.5 2.5h2v4h-2zM10.5 9.5h2v4h-2zM2.5 9.5h2v4h-2z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="skip-backward" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="evenodd" stroke="currentColor">
                <path d="M13.5 14V9c0-2.5-1.5-4.5-5-4.5h-6"/>
                <path d="M5 2 2.5 4.5l2 2M4 10l1.4-1.5h.1V14M10.5 8.5h-3v2h2s1 0 1 1v1c0 1-1 1-1 1H7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="skip-forward" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="evenodd" stroke="currentColor">
                <path d="M2.5 14V9c0-2.5 1.5-4.5 5-4.5h6"/>
                <path d="m11 2 2.5 2.5-2 2M5 10l1.4-1.5h.1V14M11.5 8.5h-3v2h2s1 0 1 1v1c0 1-1 1-1 1H8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="skip-to-end" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6 13 5-5-5-5"/>
                <path d="m2 13 5-5-5-5M13.5 3v10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="skip-to-start" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10 3 5 8l5 5"/>
                <path d="M14 3 9 8l5 5M2.5 13V3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="slides" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13.5 10V2.5H6"/>
                <path d="M11.5 12V4.5H4"/>
                <path d="M2.5 6.5h7v7h-7z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="snippets" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11 13.5H2.502V2.499H11.5V6"/>
                <g transform="translate(8 8)">
                    <circle stroke-linecap="round" cx="1.5" cy="1.5" r="2"/>
                    <path stroke-linejoin="round" d="M5.5 5.5 3 3"/>
                </g>
                <path d="M4.006 4.5H10M4.006 6.5H7M4 8.5h2M4.006 10.5H6"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="solid-fill" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M2.5 2.5h11v11h-11z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="solid-fill-only" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fill-rule="nonzero" d="M3 3h10v10H3z"/>
        </svg>
        <svg viewBox="0 0 16 16" id="solid-no-fill" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd" stroke="currentColor">
                <path d="M2.5 2.5h11v11h-11zM13 3l-2.619 2.619-4.727 4.727L3 13"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="sort-a-to-z" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m7.5 8-2-5.503h-1L2.5 8M3.5 5.497h3M11.5 2v11.5M9 11l2.5 2.5L14 11M3 10.5h3.5v.5l-3 1.5v1H7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="sort-up-down" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="m5 9 3 4 3-4M11 7 8 3 5 7" fill="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="sort-z-to-a" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7 14 5.5 9.5h-1L3 14M3.5 12.5h3M11.5 2v11.5M9 11l2.5 2.5L14 11M2 2.5h5.5V3l-5 2.5v1H8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="sound" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 5V2.5h6l3 3v8H4"/>
                <path d="M10.5 2.5v3h3M8.5 8.5v-3H8l-3.5 1v3"/>
                <path d="M8.5 10V8.5H7l-.5.51V10l.5.5h1zM4.5 11V9.5H3l-.5.51V11l.5.5h1z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="sound-decrease" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M7.5 12V4L5 6.5H2.5v3H5zM14 7.5H9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="sound-increase" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 5v5M7.5 12V4L5 6.5H2.5v3H5zM14 7.5H9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="sound-mute" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m14 6-4 4M14 10l-4-4M7.5 12V4L5 6.5H2.5v3H5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="sound-on" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10 6c.667.605 1 1.272 1 2s-.333 1.395-1 2M11 4c.498.316 2 1.598 2 4s-1.196 3.426-2 4M7.5 12V4L5 6.5H2.5v3H5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="split" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8.5 11.5h-6v-9h9.01v6"/>
                <path d="M8.5 8.5h5v5h-5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="stack-h" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.503 4.502v9h5V7.5l-2.5-3z"/>
                <path d="M2.503 12.02V2.5H8"/>
                <path d="M9.503 7.5H6.502v-3M6 11.5h2M6 9.5h2M10.5 2v5M13.5 2v5M10.5 4.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="stack-l" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.503 4.502v9h5V7.5L6.502 4.502z"/>
                <path d="M2.503 12.02V2.5H8"/>
                <path d="M9.503 7.5H6.502V4.502M6 11.5h2M6 9.5h2M11.5 2v3.504H14"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="stack-m" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.503 4.502v9h5V7.5L6.502 4.502z"/>
                <path d="M2.503 12.02V2.5H8"/>
                <path d="M9.503 7.5H6.502V4.502M6 11.5h2M6 9.5h2M13.5 6V2.499h-.274L12 4l-1.248-1.501H10.5V6"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="stack-overflow" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 9v4.5h11V9M4.5 8.5l7 1M7.5 2.5l6 5M5.5 5.5l7 3M4 11.5h7.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="statement-release" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9 5.5H5l-.496.5v1L5 7.502h3l.504.502v2.04L8 10.51H4M6.502 12l.002-8M10 4.5h2M10 6.5h2.031M10 8.5h2M10 10.509l2-.009"/>
                <path d="M2.5 2.5h11v11h-11z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="stop" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M4.5 4.5h7v7h-7z" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="summary" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 11.5v2H3l-.5-.5v-1.5h9v-9H3l-.5.5v8.5M11.5 11.5h2V10c0-1-.333-1.5-1-1.5h-1M11.5 6.5h2V5c0-1-.333-1.5-1-1.5h-1"/>
                <path d="M5.5 2.5v6h.255l1.495-2h.494l1.498 2H9.5v-6"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="supply-chain" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 1.5h1v9h-1"/>
                <path stroke-linecap="square" d="M9.5 10.5h-1v-9h1"/>
                <path d="M2.5 5.5h2M7.5 5.5h2"/>
                <circle cx="1.5" cy="1.5" r="1"/>
                <circle cx="10.5" cy="5.5" r="1"/>
                <circle cx="10.5" cy="10.5" r="1"/>
                <circle cx="1.5" cy="5.5" r="1"/>
                <circle cx="6" cy="6" r="1.5"/>
                <circle cx="10.5" cy="1.5" r="1"/>
                <circle cx="1.5" cy="10.5" r="1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="support-circle" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" fill="none" fill-rule="evenodd">
                <circle stroke="currentColor" cx="6" cy="6" r="5.5"/>
                <path d="M4.454 4.772C4.886 3.91 5.402 3.48 6 3.48c.897 0 1.508.296 1.508.989C7.508 5.16 6 5.5 6 6.25V7" stroke="currentColor"/>
                <path d="M6 8v1" stroke="currentColor"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="swap" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m9.5 11.5 4-4-4-4M6.5 3.5l-4 4 4 4M6 7.5h4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="switch-dark" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 10.5v-5h5v5zM8.5 3.5h4v4"/>
                <path d="M7.5 8.5h3v5h-5v-3M6 6.5h1M4 6.5h1M3 7.5h1M5 7.5h1M4 8.5h1M6 8.5h1M3 9.5h1M5 9.5h1M14 6l-1.5 1.5L11 6M10 5 8.5 3.5 10 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="switch-light" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 10.5v-5h5v5zM8.5 3.5h4v4"/>
                <path d="M7.5 8.5h3v5h-5v-3M9 9.5h1M8 10.5h1M7 11.5h1M9 11.5h1M6 12.5h1M8 12.5h1M14 6l-1.5 1.5L11 6M10 5 8.5 3.5 10 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="switch-normal" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 10.505h3l4-6.007h4M8 9l2 2.5h3.5"/>
                <path d="m11.5 2.505 2 2.008-2 1.992M11.5 9.46l2 2.023-2 1.977M1.996 5.503H5l2 2.506"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="tab-top-open" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M2.5 13.5h11v-11h-11v11Z" stroke="currentColor"/>
            <path d="M9.5 12V7M7.5 2.5v3h-5M7 9.5h5" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="table-of-contents" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 12.5h9M2 9.5h12M2 6.5h6M2 3.5h8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="tag" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m2.5 8.5 6-6 5 5-6 6h-5z"/>
                <path d="M6 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="telescope" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m7.5 8-1 .5H5L4 7l8-4.5 1.5 2.584v.547L10.5 7M8.5 9.5V14M5.5 14v-1l3-2.5M11.5 14v-1l-.644-.537L8.5 10.5"/>
                <path d="M9 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM4 7.5l-1.5 1v1h1l1.5-1"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="text" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path stroke-linecap="round" d="M9.5 2.5v3h3"/>
                <path d="M10 8.5H5M10 10.5H5M9.793 2.5H3.5v11h9V5.207L9.793 2.5ZM5 6.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="text-bold" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 12.5v-9H8c1.667 0 2.5.667 2.5 2s-.833 2-2.5 2c2.333 0 3.5.833 3.5 2.5s-1.167 2.5-3.5 2.5H4.5ZM4.5 7.5H8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="text-center" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M14 3.5H2M11 12.5H5M13 9.5H3M12 6.5H4"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="text-italic" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6.5 12.5 3-9M7 3.5h5M4 12.5h5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="text-left" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 3.5h12M2 12.5h6M2 9.5h11M2 6.5h9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="text-right" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M14 3.5H2M14 12.5H8M14 9.5H3M14 6.5H5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="text-underline" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 3v4c0 2.5 1.488 3.5 3.5 3.5s3.5-1 3.5-3.5V3M3 12.5h10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="three-and-two-panes" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h2v4h-2zM2.5 8.5h11v5h-11zM6.5 2.5h3v4h-3zM11.5 2.5h2v4h-2z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="three-charts" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 2.5h2v11h-2zM6.5 2.5h2v11h-2zM10.5 2.5h2v11h-2z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="three-column" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 2.5h-2v11h2zM9.5 2.5h-3v11h3zM13.5 2.5h-2v11h2z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="three-equal-panes" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 6.5v-3h11v3zM2.5 9.5v-3h11v3zM2.5 12.5v-3h11v3z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="three-panes" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 9.5v-7h11v7zM2.5 11.5v-2h11v2zM2.5 13.5v-2h11v2z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="tick" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="m14 4-8.25 8.25L2 8.5" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="tick-in-circle" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9 4 4.5 8.5l-2-2"/>
                <circle cx="6" cy="6" r="5.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="toasts-panel" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4 11h1M4 8h1M2.5 3.5v9h11v-9h-11ZM4 5h1M2.5 9.5h11M2.5 6.5h11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="top-hit" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.52 3.5H2.5v2c0 .667.674 1 2.02 1M10.5 3.5h2.02v2c0 .667-.673 1-2.02 1"/>
                <path d="M4.52 2.5v6c.862.667 1.862 1 3 1 1.14 0 2.14-.333 3-1v-6h-6ZM7.5 9.5v4M4 13.5h7"/>
                <path d="M6 4.512h1.5v2.973M6 7.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="top-industry" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 13.5h2v-11h-2v11ZM13.5 13.5v-8h-1.975L8.5 8.223V13.5h5ZM6.5 13.5h2v-11h-2v11ZM6.5 8.5h-2M6.5 13.5h-2M8.625 4.5h-2.25M4.625 4.5h-2.25"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="tornado-chart" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8 3.5H3M8 7.5H6M8 9.5H2M8 5.5H7M14 5.5H9M12 3.5H9M11 7.5H9M10 9.5H9M8 11.5H4M8 13.5H5M12 11.5H9M13 13.5H9"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="training" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 5.929V5.07l5-2.571h1l5 2.571v.858L8.5 8.5h-1z"/>
                <path d="M4.5 7v6.511H5A4.81 4.81 0 0 1 8 12.5a4.81 4.81 0 0 1 3 1.011h.5V7M13.5 5.5V12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="traning" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 5.929V5.07l5-2.571h1l5 2.571v.858L8.5 8.5h-1z"/>
                <path d="M4.5 7v6.511H5A4.81 4.81 0 0 1 8 12.5a4.81 4.81 0 0 1 3 1.011h.5V7M13.5 5.5V12"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="transactions" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 10V2.5H9M13.5 6v7.5H7M10 3.5h3.5M6 12.5H2.5"/>
                <path d="M10 5.507H5.5v2.009l5.004-.004v2H6M8 4v7M11.5 1.5l2 2-2 2.007M4.5 10.5l-2 2.016 2 1.984"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="transcript" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 5V3.5h8V5M7.5 12.5v-9M5 12.5h5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="translate" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 3.5h7M5.5 2v1.5M3 7.497c2.667.118 4-1.215 4-3.997"/>
                <path d="M4 5c0 1.513 2.595 2.5 4 2.5M3.475 9c0 1.25.791 2.5 2.525 2.5h1.49"/>
                <path d="m6.49 10 1.518 1.5L6.49 13M9.467 14 11.5 9l1.967 5M10 12.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="trash" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 4.5h12M3.5 4.5v9h9v-9M6.5 7v4M9.5 7v4M5.5 4.5l1-2h3l1 2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="tree" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M11.5 2.5h2v2h-2zM2.5 7.5h2v2h-2zM11.5 10.5h2v2h-2zM11.5 6.5h2v2h-2zM4.5 8.5h7M11.003 4.5H7.5l-.003 8H11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="twitter" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 12.5c2.277-.253 3.748-.78 4.5-1.5-2.37-.65-4-2.22-4.153-3 .818.27 2.17.504 3.153.504C4.088 6.886 3.104 5.41 3 4c2.345 1.813 3.552 2.2 5.088 2.598-1.29-2.005.04-4.06 1.62-4.06 1.055 0 1.818.32 2.292.962h1.5V4c-.199.439-.532.939-1 1.5 1.276 2.178.944 4.713-1.024 6.5-3.171 2.88-8.976.828-8.976.5Z" stroke="currentColor" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="two-column" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.5 2.5v11h3v-11h-3ZM3.5 2.5v11h3v-11h-3Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="two-equal-panes" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 7.5v-5h11v5zM2.5 12.5v-5h11v5z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="two-panes" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 10.5v-8h11v8zM2.5 13.5v-3h11v3z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="two-side-panes" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 12.5v-10h5v10zM7.5 12.5v-10h5v10z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="txt" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V2.5h6l3 3V6"/>
                <path d="M9.5 2.5v3h3M3.5 12v1.5h9V12M3.501 7.5 3.5 11M2 7.5h3M12.501 7.5 12.5 11M6.5 11v-.5l3-3V7"/>
                <path d="M9.5 11v-.5l-3-3V7M11 7.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="underline" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4.5 3v4c0 2.5 1.488 3.5 3.5 3.5s3.5-1 3.5-3.5V3M3 12.5h10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="underweight" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path stroke-linejoin="round" d="m11 11 1.5-5.5L14 11M2 8l1.5-5.5L5 8"/>
                <path d="m3.5 2.5 9 3M8 13.5V2M5 13.5h6-6ZM11 11.5h3M2 8.5h3"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="undo" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m6 3.5-3 3 3 3"/>
                <path d="M3 6.5h4c2.322 0 4.744.52 6 5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="unlock" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M10.494 7.5V5.005c0-1.672-.831-2.509-2.494-2.509-1.663 0-2.495.837-2.495 2.51M3.5 7.5h9v6h-9z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="unspecified" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M8 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM4 12.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 12.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12.483 9.5c.739-2.373-.097-3.867-1.692-4.747"/>
                <path d="M6.5 4c-2.028.46-2.999 1.67-2.999 4M4.697 12.275C6.049 13.865 8.599 13.702 10 13"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="up" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="M13.5 10.5 8 5.5l-5.5 5" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="up-all" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13 12 8 7l-5 5M3 3.5h10"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="up-two" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M13 13 8 8l-5 5M13 8 8 3 3 8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="uppanel-closed" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m4.5 10.5 3 3 3-3M2.5 5.5v-3h10v3zM7.5 13.5V8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="vertical-cursor" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4 4.5h5M4 6.5h4M11.5 3.016v11.01-11.01Z"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="vessel" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2 13.5h2c.984 0 .998-1 2-1s1.002 1 2 1 1-1 2-1 1 1 2 1h2"/>
                <path d="m4 13.5-1.5-4V9L8 6.5 13.5 9v.5l-1.5 4"/>
                <path d="M4.5 8V4.5h7V8M6.5 4.5v-2h3v2M8.5 6.5v7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="video" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M2.5 14V2M4.5 14V2M11.5 14V2M13.5 14V2M13.5 3.5h-11M11.5 5.5h2M2.5 5.5h2M13.5 7.5h-11M2.5 9.5h2M11.5 9.5h2M13.5 11.5h-11"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="void" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2 2)" stroke="currentColor" fill="none" fill-rule="evenodd">
                <circle cx="6" cy="6" r="5.5"/>
                <path d="m2 10 8-8"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" fill="none" id="wand" xmlns="http://www.w3.org/2000/svg">
            <path d="m2 14 7.5-7.5m0 2.5v2M9.5 4V2M14 6.5h-2M7 6.5H5M12.682 9.682l-1.414-1.414M7.732 4.732 6.318 3.318M11.267 4.732l1.415-1.414" stroke="currentColor"/>
        </svg>
        <svg viewBox="0 0 16 16" id="warning-circle" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <path d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" stroke="currentColor"/>
                <path d="M8 9V5v4ZM8 11v-1 1Z" stroke="currentColor"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="water" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 9c0 4.101 2.938 4.501 4.5 4.5 1.562-.001 4.5-.491 4.5-4.5 0-1.946-1.5-4.113-4.5-6.5C5 4.829 3.5 6.995 3.5 9Z"/>
                <path d="M5.5 9c0 1.174.72 2.5 2.5 2.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="width-to-max" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m2.5 11 .006 2.5H13.5V11M13.5 4V2.501H2.506L2.5 4M11.501 9.5l1.999-2-1.999-2zM4.499 5.5 2.5 7.5l1.999 2zM9 7.5h2.5M4.5 7.5H7"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="width-to-min" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="m2.5 11 .006 2.5H13.5V11M13.5 4V2.501H2.506L2.5 4M11.499 5.5 9.5 7.5l1.999 2zM4.501 9.5l1.999-2-1.999-2zM14 7.5h-2.5M4.5 7.5H2"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="word" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M9.793 2.5H3.5v11h9V5.207L9.793 2.5Z"/>
                <path d="M9.5 2.5v3h3M5.5 7l.5 4.5h.663L7.952 8h.11l1.295 3.5H10l.5-4.5"/>
            </g>
        </svg>
        <svg viewBox="0 0 16 16" id="zip-icon" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M3.5 6V2.5h6l3 3V6"/>
                <path d="M9.5 2.5v3h3M10.5 11V7.5H12l.51.5v.994l-.521.508H10.5zM5 10.5H2.5V10l2-2v-.5H2M3.5 12v1.5h9V12M7.501 7.5v3M6 7.5h3M6 10.5h3"/>
            </g>
        </svg>
    </defs>
</svg>
`;
export const iconName = 'tick';
let iconId = 0;

export const checkRequestedUrl = (requests, url) =>{
  for (let i = 0; i < requests.length; i++) {
    if(requests[i][0] === url){
      return true;
    }
  }
  return false;
}

export const generateUniqueName = name => `${name}_${iconId+=1}`;

export const createMockSrc = icon => `https://mock.cdn.com/icons/${icon}.svg`;

export const createFakeResponse = (body, config = responseConfigSuccess) => {
  const { ok, status, headers} = config;
  const response = new window.Response(body, {
    ok,
    status,
    headers,
    clone: () => ({
      text: async () => {
        return await Promise.resolve(body);
      }
    })
  });
  window.fetch.returns(Promise.resolve(response));
}

export const responseConfigSuccess = {
  ok: true,
  status: 200,
  headers: {
    'Content-type': 'image/svg+xml'
  }
};

export const responseConfigError = {
  ok: false,
  status: 404,
  headers: {}
};

export const isEqualSvg = (svg, otherSvg) => {
  const parser = new DOMParser();
  const svgNode = parser.parseFromString(svg, 'image/svg+xml');
  const otherSvgNode = parser.parseFromString(otherSvg, 'image/svg+xml');
  return svgNode.isEqualNode(otherSvgNode);
};
