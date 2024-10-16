import {config} from 'dotenv';
import startServer from './src/server.mjs';

config({path:'.env.local'});
startServer();
