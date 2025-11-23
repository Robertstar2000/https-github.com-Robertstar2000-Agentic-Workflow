import { exec } from 'child_process';
import { promisify } from 'util';
import * as os from 'os';

const execAsync = promisify(exec);

/**
 * Opens a file in the system's default browser
 * @param {string} filePath - Absolute path to the file to open
 * @returns {Promise<void>}
 * @throws {Error} If the browser cannot be opened
 */
export const openInBrowser = async (filePath: string): Promise<void> => {
    const platform = os.platform();
    let command: string;

    switch (platform) {
        case 'win32':
            // Windows: use 'start' command
            command = `start "" "${filePath}"`;
            break;
        case 'darwin':
            // macOS: use 'open' command
            command = `open "${filePath}"`;
            break;
        case 'linux':
            // Linux: use 'xdg-open' command
            command = `xdg-open "${filePath}"`;
            break;
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }

    try {
        await execAsync(command);
    } catch (error) {
        throw new Error(`Failed to open browser: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

/**
 * Opens a URL in the system's default browser
 * @param {string} url - URL to open
 * @returns {Promise<void>}
 * @throws {Error} If the browser cannot be opened
 */
export const openUrlInBrowser = async (url: string): Promise<void> => {
    const platform = os.platform();
    let command: string;

    switch (platform) {
        case 'win32':
            command = `start "" "${url}"`;
            break;
        case 'darwin':
            command = `open "${url}"`;
            break;
        case 'linux':
            command = `xdg-open "${url}"`;
            break;
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }

    try {
        await execAsync(command);
    } catch (error) {
        throw new Error(`Failed to open URL in browser: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
