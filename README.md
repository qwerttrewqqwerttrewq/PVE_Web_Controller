# Vue 3 + Vite

A project to list,start,stop virtual machines with a Vue 3 + Vite setup.

## Try It Out

You can try the frontend at: [https://pve-b0j.pages.dev](https://pve-b0j.pages.dev)

**Note:** The project is not directly usable out of the box. You must configure a Cloudflare Worker to handle requests to the Proxmox VE (PVE) API and enable proper CORS handling.

## Setting Up Cloudflare Worker

To connect the frontend to the PVE API, deploy the following script as a Cloudflare Worker:

```javascript
export default {
    async fetch(request) {
        const allowedOrigins = ['https://pve-b0j.pages.dev']; // Replace with your frontend domain or try it on my page
        const origin = request.headers.get('Origin');

        // Validate request origin
        if (origin && !allowedOrigins.includes(origin)) {
            return new Response('Forbidden', {
                status: 403,
                statusText: 'Forbidden',
                headers: { 'Content-Type': 'text/plain' },
            });
        }

        const url = new URL(request.url);

        // Replace <your-pve-domain> with your actual PVE API domain
        const targetUrl = `https://<your-pve-domain>:8006${url.pathname}${url.search}`;

        const modifiedHeaders = new Headers();
        modifiedHeaders.set('Access-Control-Allow-Origin', origin || '*');
        modifiedHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        modifiedHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Handle OPTIONS requests for CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: modifiedHeaders });
        }

        // Forward the request to the PVE API
        const response = await fetch(targetUrl, {
            method: request.method,
            headers: request.headers,
            body: request.body,
        });

        // Create a new response with CORS headers
        const newResponse = new Response(response.body, response);
        newResponse.headers.set('Access-Control-Allow-Origin', origin || '*');
        newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return newResponse;
    }
};
```

### Steps to Deploy the Worker

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers** and create a new Worker.
3. Copy and paste the script above into the Worker script editor.
4. Replace `https://<your-pve-domain>` with the actual URL of your PVE API.
5. Replace https://pve-b0j.pages.dev with your own frontend domain, or feel free to try it directly on my site. Rest assured, your privacy is secure—it’s purely a frontend page hosted and managed by Cloudflare.
6. Save and deploy the Worker.

## Project Setup

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Backend Requirements

- A Proxmox VE server with API access.You may use CloudFlare Tunnels to get remote access of PVE.
- Cloudflare Worker for handling CORS and proxying requests to the PVE API.

## License

This project is licensed under the MIT License.

