import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import type { Artifact } from '../types';

/**
 * Creates a temporary directory for storing workflow artifacts
 * @returns {string} The absolute path to the created directory
 */
export const createWorkflowDirectory = (): string => {
    const tempDir = os.tmpdir();
    const workflowDir = path.join(tempDir, 'agentic-workflow', `workflow-${Date.now()}`);

    if (!fs.existsSync(workflowDir)) {
        fs.mkdirSync(workflowDir, { recursive: true });
    }

    return workflowDir;
};

/**
 * Saves workflow artifacts to the file system
 * @param {Artifact[]} artifacts - Array of artifacts to save
 * @param {string} baseDir - Base directory to save artifacts to
 * @returns {string | null} The absolute path to index.html if it exists, null otherwise
 */
export const saveArtifactsToFileSystem = (artifacts: Artifact[], baseDir: string): string | null => {
    let indexHtmlPath: string | null = null;

    artifacts.forEach(artifact => {
        // Skip non-file artifacts (like rag_results, rag_query, etc.)
        if (artifact.key.includes('rag_') || artifact.key === 'requirements_specification.md') {
            return;
        }

        const filePath = path.join(baseDir, artifact.key);
        const fileDir = path.dirname(filePath);

        // Create directory if it doesn't exist
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true });
        }

        // Write the file
        fs.writeFileSync(filePath, artifact.value, 'utf-8');

        // Track index.html path
        if (artifact.key.toLowerCase() === 'index.html') {
            indexHtmlPath = filePath;
        }
    });

    return indexHtmlPath;
};

/**
 * Checks if a file exists
 * @param {string} filePath - Path to check
 * @returns {boolean} True if file exists
 */
export const fileExists = (filePath: string): boolean => {
    return fs.existsSync(filePath);
};

/**
 * Deletes a directory and all its contents
 * @param {string} dirPath - Directory to delete
 */
export const deleteDirectory = (dirPath: string): void => {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
    }
};
