import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from backend directory
const envPath = join(__dirname, '.env');
console.log('📍 Looking for .env at:', envPath);

dotenv.config({ path: envPath });

console.log('\n🔍 Environment Variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ Not found');
console.log('PORT:', process.env.PORT || 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');

if (process.env.MONGODB_URI) {
  console.log('\n✅ Environment variables loaded successfully!');
  console.log('MongoDB URI starts with:', process.env.MONGODB_URI.substring(0, 30) + '...');
} else {
  console.log('\n❌ MONGODB_URI not found!');
  console.log('Make sure backend/.env exists');
}
