import { Application } from './core/Application';

const canvas = document.getElementById('scene') as HTMLCanvasElement;
const app = new Application(canvas);
app.boot();
