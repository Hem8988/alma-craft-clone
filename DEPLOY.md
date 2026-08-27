# Deploy: gssssangla (VPS + pm2)

App: TanStack Start (React SSR). Built with nitro's `node-server` preset, run with pm2,
reverse-proxied by nginx. Runs on **127.0.0.1:3080**.

Server path used below: `/home/gssssangla/public_html`

---

## 1. One-time server setup

```bash
# Node 20+ already installed. Install bun (lockfile is bun.lock) and pm2.
curl -fsSL https://bun.sh/install | bash
exec $SHELL          # reload PATH so `bun` is available
npm i -g pm2         # skip if pm2 already global

# Get the code (public_html must be empty or not yet a repo)
cd /home/gssssangla
rm -rf public_html                       # only if it's empty/disposable
git clone https://github.com/Hem8988/alma-craft-clone.git public_html
cd public_html
```

If `public_html` must stay as the folder and is already a git repo, just `cd` in and `git pull`.

---

## 2. Build

```bash
cd /home/gssssangla/public_html
git pull
bun install --frozen-lockfile
NITRO_PRESET=node-server bun run build
```

Output lands in `.output/` — `.output/server/index.mjs` is the server,
`.output/public/` the static assets (served by the same process).

> `NITRO_PRESET=node-server` is the important bit — without it the build targets
> Cloudflare and there is no Node server to run.

---

## 3. Start with pm2

```bash
cd /home/gssssangla/public_html
pm2 start ecosystem.config.cjs
pm2 save                     # persist across reboots
pm2 logs gssssangla          # verify it booted, listening on :3080
curl -I http://127.0.0.1:3080
```

---

## 4. nginx for the domain

Point the site's server block at the app (add inside the `server { ... }` for the domain):

```nginx
location / {
    proxy_pass http://127.0.0.1:3080;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

```bash
nginx -t && systemctl reload nginx
```

---

## 5. Redeploy (every update)

```bash
cd /home/gssssangla/public_html
git pull
bun install --frozen-lockfile
NITRO_PRESET=node-server bun run build
pm2 reload gssssangla
```

---

## Notes

- Port 3080 is set in `ecosystem.config.cjs` (`env.PORT`). Change it there + in the
  nginx `proxy_pass` if it clashes. Check used ports with `ss -tlnp`.
- If `bun` is not wanted on the server, `npm install && NITRO_PRESET=node-server npm run build`
  also works (ignores `bun.lock`).
- pm2 process name is **gssssangla** so `pm2 logs gssssangla` works as in your screenshot.
