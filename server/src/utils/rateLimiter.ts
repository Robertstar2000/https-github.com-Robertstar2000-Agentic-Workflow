/**
 * Rate limiter utility to add delays between API calls
 * Helps stay within API rate limits (e.g., Google's 15 RPM free tier)
 */

/**
 * Adds a delay before proceeding
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Rate limiter class to manage API call timing
 */
export class RateLimiter {
    private lastCallTime: number = 0;
    private minDelayMs: number;

    /**
     * @param requestsPerMinute - Maximum number of requests allowed per minute
     */
    constructor(requestsPerMinute: number) {
        // Calculate minimum delay between requests in milliseconds
        // Add a small buffer (10%) to be safe
        this.minDelayMs = Math.ceil((60 * 1000) / requestsPerMinute * 1.1);
    }

    /**
     * Wait if necessary to respect rate limits
     * Call this before making an API request
     */
    async waitIfNeeded(): Promise<void> {
        const now = Date.now();
        const timeSinceLastCall = now - this.lastCallTime;

        if (timeSinceLastCall < this.minDelayMs) {
            const waitTime = this.minDelayMs - timeSinceLastCall;
            console.log(`[Rate Limiter] Waiting ${waitTime}ms to respect rate limits...`);
            await delay(waitTime);
        }

        this.lastCallTime = Date.now();
    }

    /**
     * Reset the rate limiter
     */
    reset(): void {
        this.lastCallTime = 0;
    }
}

// Global rate limiter instance for Google API
// Set to 12 requests per minute to stay well within the 15 RPM free tier limit
export const googleRateLimiter = new RateLimiter(12);
