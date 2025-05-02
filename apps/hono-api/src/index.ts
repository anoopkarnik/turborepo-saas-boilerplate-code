import { Hono } from 'hono'
import aiRoutes from './routes/ai';

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.route("/ai", aiRoutes);

export default app