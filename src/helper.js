    // Cleanup html text
    export function cleanupHTML(text) {
        const parser = new DOMParser();
        return parser.parseFromString(`<!doctype html><body>${text}`, 'text/html').body.textContent;
    }