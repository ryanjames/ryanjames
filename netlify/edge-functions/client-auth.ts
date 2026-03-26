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
  return new Response(
    `<!DOCTYPE html>
    <html><body style="font-family:system-ui;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#fafafa">
      <form method="get" style="text-align:center;background:#fff;padding:2rem 3rem;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.1)">
        <h2 style="margin:0 0 1rem">Password Required</h2>
        <input type="password" name="password" placeholder="Enter password" autofocus
          style="padding:8px 12px;font-size:16px;border:1px solid #ccc;border-radius:4px;width:200px">
        <button type="submit"
          style="padding:8px 16px;margin-left:8px;cursor:pointer;border:1px solid #ccc;border-radius:4px;background:#fff">
          Enter
        </button>
      </form>
    </body></html>`,
    { status: 401, headers: { "Content-Type": "text/html" } },
  );
};

export const config = { path: "/client/*" };
