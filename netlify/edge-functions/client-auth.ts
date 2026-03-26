export default async (request: Request) => {
  const url = new URL(request.url);
  const cookie = request.headers.get("cookie") || "";

  // Extract client name from path: /client/acme/anything.html → acme
  const match = url.pathname.match(/^\/client\/([^/]+)/);
  if (!match) return; // shouldn't hit this given the path config, but safe fallback

  const clientName = match[1];
  const cookieName = `client_auth_${clientName}`;

  // Look up this client's password from env: CLIENT_PASSWORD_ACME, CLIENT_PASSWORD_BIGCO, etc.
  const envKey = `CLIENT_PASSWORD_${clientName.toUpperCase().replace(/-/g, "_")}`;
  const password = Deno.env.get(envKey);

  // If no password is configured for this client, block access
  if (!password) {
    return new Response("Not found", { status: 404 });
  }

  // Already authenticated for this client
  if (cookie.includes(`${cookieName}=authenticated`)) {
    return; // pass through
  }

  // Password submitted
  if (url.searchParams.get("password") === password) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: url.pathname,
        "Set-Cookie": `${cookieName}=authenticated; Path=/client/${clientName}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
      },
    });
  }

  // Login form
  const wrong = url.searchParams.has("password");
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Client Portal</title>
  <style>
    @font-face {
      font-family: "Nacelle";
      src: url("/fonts/Nacelle-Light.woff2") format("woff2");
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "Nacelle";
      src: url("/fonts/Nacelle-Bold.woff2") format("woff2");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Nacelle", system-ui, -apple-system, "Segoe UI", sans-serif;
      font-weight: 300;
      background: #fff;
      color: rgb(16, 18, 20);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
    }
    header {
      height: 80px;
      border-bottom: 1px solid rgb(16, 18, 20);
      display: flex;
      align-items: center;
      padding: 0 32px;
    }
    a {
      font-size: 0.85rem;
      font-family: "SF Mono", "Menlo", "Consolas", monospace;
      color: rgb(16, 18, 20);
      text-decoration: none;
      transition: color 0.2s ease-in-out;
    }
    a:hover { color: rgb(0, 112, 243); }
    main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px;
    }
    .box {
      width: 100%;
      max-width: 360px;
    }
    .label {
      font-size: 0.7rem;
      font-family: "SF Mono", "Menlo", "Consolas", monospace;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: rgb(53, 58, 62);
      margin-bottom: 12px;
    }
    h1 {
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
      margin-bottom: 32px;
    }
    .error {
      font-size: 0.8rem;
      font-family: "SF Mono", "Menlo", "Consolas", monospace;
      color: rgb(0, 112, 243);
      margin-bottom: 16px;
    }
    input[type="password"] {
      width: 100%;
      padding: 12px 14px;
      font-family: inherit;
      font-size: 1rem;
      font-weight: 300;
      border: 1px solid rgb(16, 18, 20);
      background: #fff;
      color: rgb(16, 18, 20);
      outline: none;
      margin-bottom: 12px;
      transition: border-color 0.2s ease-in-out;
      -webkit-appearance: none;
    }
    input[type="password"]:focus {
      border-color: rgb(0, 112, 243);
    }
    button {
      width: 100%;
      padding: 12px 14px;
      font-family: "SF Mono", "Menlo", "Consolas", monospace;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      background: rgb(16, 18, 20);
      color: #fff;
      border: none;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
    }
    button:hover { background: rgb(0, 112, 243); }
    @media (max-width: 521px) {
      header { height: 50px; padding: 0 16px; }
    }
  </style>
</head>
<body>
  <header>
    <a href="https://ryanjam.es">← ryanjam.es</a>
  </header>
  <main>
    <div class="box">
      <p class="label">Client Portal</p>
      <h1>Password Required</h1>
      ${wrong ? '<p class="error">Incorrect password — try again.</p>' : ""}
      <form method="get">
        <input type="password" name="password" placeholder="Enter password" autofocus />
        <button type="submit">Enter</button>
      </form>
    </div>
  </main>
</body>
</html>`,
    { status: 401, headers: { "Content-Type": "text/html" } },
  );
};

export const config = { path: "/client/*" };
