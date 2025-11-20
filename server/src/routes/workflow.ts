
import express from 'express';
import { runWorkflowIteration, testProviderConnection } from '../services/workflow';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/run', authenticateToken, async (req, res) => {
    try {
        const { currentState, settings, ragContent } = req.body;
        const newState = await runWorkflowIteration(currentState, settings, ragContent);
        res.json(newState);
    } catch (error: any) {
        console.error("Workflow execution failed:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/test-connection', authenticateToken, async (req, res) => {
    try {
        const { settings } = req.body;
        const success = await testProviderConnection(settings);
        res.json({ success });
    } catch (error: any) {
        console.error("Connection test failed:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
