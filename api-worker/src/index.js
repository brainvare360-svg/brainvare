import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// ─── CORS ────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
    'https://brainvare.com',
    'https://www.brainvare.com',
    'https://brainvare-site.pages.dev',
    'http://localhost:5173',
    'http://localhost:4173',
];

app.use('*', cors({
    origin: (origin) => ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
}));

// ─── JWT Helpers ─────────────────────────────────────────
function base64url(data) {
    return btoa(String.fromCharCode(...new Uint8Array(data)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlEncode(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return atob(str);
}

async function signJWT(payload, secret) {
    const header = base64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = base64urlEncode(JSON.stringify(payload));
    const data = `${header}.${body}`;

    const key = await crypto.subtle.importKey(
        'raw', new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
    return `${data}.${base64url(sig)}`;
}

async function verifyJWT(token, secret) {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token');

    const data = `${parts[0]}.${parts[1]}`;
    const signature = Uint8Array.from(base64urlDecode(parts[2]), c => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
        'raw', new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const valid = await crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(data));
    if (!valid) throw new Error('Invalid signature');

    const payload = JSON.parse(base64urlDecode(parts[1]));
    if (payload.exp && Date.now() / 1000 > payload.exp) throw new Error('Token expired');
    return payload;
}

async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─── Auth Middleware ─────────────────────────────────────
async function requireAuth(c, next) {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
    try {
        const payload = await verifyJWT(authHeader.slice(7), c.env.JWT_SECRET);
        c.set('user', payload);
        return next();
    } catch {
        return c.json({ error: 'Invalid or expired token' }, 401);
    }
}

// ═══════════════════════════════════════════════════════════
// AUTH ROUTES
// ═══════════════════════════════════════════════════════════

app.post('/auth/login', async (c) => {
    const { email, password } = await c.req.json();
    if (!email || !password) {
        return c.json({ error: 'Email and password required' }, 400);
    }

    // Check email
    if (email !== c.env.ADMIN_EMAIL) {
        return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Check password (compare SHA-256 hash)
    const inputHash = await sha256(password);
    if (inputHash !== c.env.ADMIN_PASSWORD_HASH) {
        return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Issue JWT (valid 24 hours)
    const token = await signJWT({
        email,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
    }, c.env.JWT_SECRET);

    return c.json({ token, email });
});

app.get('/auth/verify', requireAuth, async (c) => {
    return c.json({ valid: true, user: c.get('user') });
});

// ═══════════════════════════════════════════════════════════
// CONTENT ROUTES (KV)
// ═══════════════════════════════════════════════════════════

app.get('/content', async (c) => {
    const data = await c.env.KV.get('content', 'json');
    return c.json(data || {});
});

app.put('/content', requireAuth, async (c) => {
    const body = await c.req.json();
    await c.env.KV.put('content', JSON.stringify(body));
    return c.json({ success: true });
});

// ═══════════════════════════════════════════════════════════
// PAGES ROUTES (KV)
// ═══════════════════════════════════════════════════════════

app.get('/pages', async (c) => {
    const data = await c.env.KV.get('pages', 'json');
    return c.json(data || {});
});

app.put('/pages', requireAuth, async (c) => {
    const body = await c.req.json();
    await c.env.KV.put('pages', JSON.stringify(body));
    return c.json({ success: true });
});

// ═══════════════════════════════════════════════════════════
// ENQUIRIES ROUTES (D1)
// ═══════════════════════════════════════════════════════════

app.get('/enquiries', requireAuth, async (c) => {
    const { results } = await c.env.DB.prepare(
        'SELECT * FROM enquiries ORDER BY created_at DESC'
    ).all();
    return c.json(results || []);
});

app.post('/enquiries', async (c) => {
    const { name, email, subject, message } = await c.req.json();

    if (!name || !email || !message) {
        return c.json({ error: 'Name, email, and message are required' }, 400);
    }

    const id = crypto.randomUUID();
    const created_at = new Date().toISOString();

    await c.env.DB.prepare(
        'INSERT INTO enquiries (id, name, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(id, name, email, subject || '', message, 'new', created_at).run();

    return c.json({ success: true, id });
});

app.put('/enquiries/:id', requireAuth, async (c) => {
    const id = c.req.param('id');
    const { status } = await c.req.json();

    if (!['new', 'read', 'replied'].includes(status)) {
        return c.json({ error: 'Invalid status' }, 400);
    }

    await c.env.DB.prepare(
        'UPDATE enquiries SET status = ? WHERE id = ?'
    ).bind(status, id).run();

    return c.json({ success: true });
});

app.delete('/enquiries/:id', requireAuth, async (c) => {
    const id = c.req.param('id');
    await c.env.DB.prepare('DELETE FROM enquiries WHERE id = ?').bind(id).run();
    return c.json({ success: true });
});

app.delete('/enquiries', requireAuth, async (c) => {
    await c.env.DB.prepare('DELETE FROM enquiries').run();
    return c.json({ success: true });
});

// ═══════════════════════════════════════════════════════════
// REELS ROUTES (R2)
// ═══════════════════════════════════════════════════════════

const REELS_METADATA_KEY = 'data/reels.json';

app.get('/reels', async (c) => {
    const obj = await c.env.BUCKET.get(REELS_METADATA_KEY);
    if (!obj) return c.json({ items: [] });
    const data = await obj.text();
    return c.json(JSON.parse(data));
});

app.put('/reels', requireAuth, async (c) => {
    const body = await c.req.text();
    JSON.parse(body); // validate JSON
    await c.env.BUCKET.put(REELS_METADATA_KEY, body, {
        httpMetadata: { contentType: 'application/json' },
    });
    return c.json({ success: true });
});

app.post('/upload', requireAuth, async (c) => {
    const formData = await c.req.formData();
    const file = formData.get('video');

    if (!file) return c.json({ error: 'No video file provided' }, 400);
    if (!file.type.startsWith('video/')) return c.json({ error: 'File must be a video' }, 400);

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop() || 'mp4';
    const key = `reels/${timestamp}-${randomId}.${extension}`;

    await c.env.BUCKET.put(key, file.stream(), {
        httpMetadata: { contentType: file.type },
    });

    const cdnUrl = `https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/${key}`;
    return c.json({ success: true, url: cdnUrl, key });
});

app.delete('/delete', requireAuth, async (c) => {
    const key = c.req.query('key');
    if (!key || !key.startsWith('reels/')) {
        return c.json({ error: 'Invalid key' }, 400);
    }
    await c.env.BUCKET.delete(key);
    return c.json({ success: true });
});

// ═══════════════════════════════════════════════════════════
// HEALTH CHECK
// ═══════════════════════════════════════════════════════════

app.get('/', (c) => c.json({
    service: 'brainvare-api',
    status: 'ok',
    timestamp: new Date().toISOString(),
}));

// ─── 404 fallback ────────────────────────────────────────
app.notFound((c) => c.json({ error: 'Not found' }, 404));

// ─── Error handler ───────────────────────────────────────
app.onError((err, c) => {
    console.error('API Error:', err);
    return c.json({ error: 'Internal server error' }, 500);
});

export default app;
