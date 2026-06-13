// Simple hash-based SPA router
export class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    this.beforeEach = null;
    this.afterEach = null;
  }

  add(path, handler) {
    // Convert :param to regex capture groups
    const paramNames = [];
    const pattern = path.replace(/:([^/]+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    this.routes.push({
      path,
      pattern: new RegExp(`^${pattern}$`),
      paramNames,
      handler
    });
    return this;
  }

  async navigate(hash) {
    const path = hash.replace('#', '') || '/';
    
    // Find matching route
    for (const route of this.routes) {
      const match = path.match(route.pattern);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });

        if (this.beforeEach) {
          await this.beforeEach(path, params);
        }

        this.currentRoute = { path, params, route };
        await route.handler(params);

        if (this.afterEach) {
          await this.afterEach(path, params);
        }
        return;
      }
    }

    // 404 fallback
    this.handleNotFound(path);
  }

  handleNotFound(path) {
    const container = document.getElementById('main-content');
    if (container) {
      container.innerHTML = `
        <div style="min-height:60vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:40px 20px;">
          <h1 style="font-size:4rem; color:var(--primary); margin-bottom:16px;">404</h1>
          <h2 style="margin-bottom:8px;">Page Not Found</h2>
          <p style="color:var(--text-muted); margin-bottom:24px;">The page "${path}" doesn't exist.</p>
          <a href="#/" class="btn btn-primary">Go Home</a>
        </div>
      `;
    }
  }

  start() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      this.navigate(window.location.hash);
    });

    // Handle initial load
    if (!window.location.hash) {
      window.location.hash = '#/';
    } else {
      this.navigate(window.location.hash);
    }
  }
}
