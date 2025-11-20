import dotenv from 'dotenv';
import path from 'path';

// Load environment variables as early as possible
// When compiled, this runs from dist/, so we need to go up to the project root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

console.log('Environment variables loaded:');
console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY ? 'SET' : 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('PORT:', process.env.PORT);
