const ALLOWED_ORIGINS = [
	'https://brainvare.com',
	'https://www.brainvare.com',
	'https://brainvare-website.web.app',
	'https://brainvare-website.firebaseapp.com',
	'http://localhost:5173',
	'http://localhost:4173',
];

function corsHeaders(request) {
	const origin = request.headers.get('Origin') || '';
	const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
	return {
		'Access-Control-Allow-Origin': allowed,
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Max-Age': '86400',
	};
}

const METADATA_KEY = 'data/reels.json';

export default {
	async fetch(request, env) {
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders(request) });
		}

		const url = new URL(request.url);

		// GET /reels — Load reels metadata from R2
		if (request.method === 'GET' && url.pathname === '/reels') {
			try {
				const obj = await env.BUCKET.get(METADATA_KEY);
				if (!obj) {
					return new Response(JSON.stringify({ items: [] }), {
						status: 200,
						headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
					});
				}
				const data = await obj.text();
				return new Response(data, {
					status: 200,
					headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
				});
			} catch (err) {
				return new Response(JSON.stringify({ error: err.message }), {
					status: 500,
					headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
				});
			}
		}

		// PUT /reels — Save reels metadata to R2
		if (request.method === 'PUT' && url.pathname === '/reels') {
			try {
				const body = await request.text();
				// Validate it's valid JSON
				JSON.parse(body);
				await env.BUCKET.put(METADATA_KEY, body, {
					httpMetadata: { contentType: 'application/json' },
				});
				return new Response(JSON.stringify({ success: true }), {
					status: 200,
					headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
				});
			} catch (err) {
				return new Response(JSON.stringify({ error: err.message }), {
					status: 500,
					headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
				});
			}
		}

		// POST /upload — Upload a video to R2
		if (request.method === 'POST' && url.pathname === '/upload') {
			try {
				const formData = await request.formData();
				const file = formData.get('video');

				if (!file) {
					return new Response(JSON.stringify({ error: 'No video file provided' }), {
						status: 400,
						headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
					});
				}

				if (!file.type.startsWith('video/')) {
					return new Response(JSON.stringify({ error: 'File must be a video' }), {
						status: 400,
						headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
					});
				}

				const timestamp = Date.now();
				const randomId = Math.random().toString(36).substring(2, 8);
				const extension = file.name.split('.').pop() || 'mp4';
				const key = `reels/${timestamp}-${randomId}.${extension}`;

				await env.BUCKET.put(key, file.stream(), {
					httpMetadata: { contentType: file.type },
				});

				const cdnUrl = `https://pub-7d4c3d28f22346aabe910818aa5a7001.r2.dev/${key}`;

				return new Response(JSON.stringify({ success: true, url: cdnUrl, key }), {
					status: 200,
					headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
				});
			} catch (err) {
				return new Response(JSON.stringify({ error: err.message }), {
					status: 500,
					headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
				});
			}
		}

		// DELETE /delete?key=reels/filename.mp4
		if (request.method === 'DELETE' && url.pathname === '/delete') {
			try {
				const key = url.searchParams.get('key');

				if (!key || !key.startsWith('reels/')) {
					return new Response(JSON.stringify({ error: 'Invalid key' }), {
						status: 400,
						headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
					});
				}

				await env.BUCKET.delete(key);

				return new Response(JSON.stringify({ success: true }), {
					status: 200,
					headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
				});
			} catch (err) {
				return new Response(JSON.stringify({ error: err.message }), {
					status: 500,
					headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
				});
			}
		}

		return new Response(JSON.stringify({ error: 'Not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
		});
	},
};
