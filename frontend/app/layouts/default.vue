<template>
  <div class="layout">
    <header class="header">
      <div class="header__inner">
        <NuxtLink to="/" class="header__logo">
          <img src="~/assets/checkit.png" alt="CheckIt" class="header__logo-img" />
          <span class="header__logo-text">Check<span class="neon-text">It</span></span>
        </NuxtLink>
        <nav class="header__nav">
          <NuxtLink to="/" class="header__link" active-class="header__link--active">
            Home
          </NuxtLink>
          <NuxtLink v-if="isAuthenticated" to="/juegos" class="header__link" active-class="header__link--active">
            Biblioteca
          </NuxtLink>
          <NuxtLink v-if="isAuthenticated" to="/juegos/nuevo" class="header__link" active-class="header__link--active">
            + Nuevo
          </NuxtLink>
          <NuxtLink v-if="!isAuthenticated" to="/login" class="header__link" active-class="header__link--active">
            Login
          </NuxtLink>
          <NuxtLink v-if="!isAuthenticated" to="/registro" class="header__link" active-class="header__link--active">
            Registro
          </NuxtLink>
          <NuxtLink v-if="isAuthenticated" to="/perfil" class="header__link header__link--user" active-class="header__link--active">
            {{ user?.alias || 'Perfil' }}
          </NuxtLink>
          <button v-if="isAuthenticated" class="header__link header__link--logout" @click="handleLogout">
            Salir
          </button>
        </nav>
      </div>
      <div class="header__glow" />
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <span class="footer__logo">CHECKIT</span>
          <span class="footer__divider">//</span>
          <span class="footer__tagline">Liquida tu backlog con estilo</span>
        </div>
        <div class="footer__meta">
          <span class="footer__version">v2.0</span>
          <span class="footer__dot"></span>
          <span>priority engine</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isAuthenticated, user, logout } = useAuth()

function handleLogout() {
  logout()
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(6, 6, 10, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.header__glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--neon) 20%,
    var(--cyan) 50%,
    var(--neon) 80%,
    transparent 100%
  );
  opacity: 0.6;
  animation: headerGlow 3s ease-in-out infinite;
}

@keyframes headerGlow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 56px;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.header__logo:hover {
  text-shadow: none;
}

.header__logo-img {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 0 6px var(--cyan-glow));
  transition: filter 0.3s;
}

.header__logo:hover .header__logo-img {
  filter: drop-shadow(0 0 12px var(--neon-glow-intense));
}

.header__logo-text {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-bright);
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.header__link {
  display: flex;
  align-items: center;
  padding: 0.35rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  background: none;
  font-family: var(--font-body);
  cursor: pointer;
}

.header__link:hover {
  color: var(--text-bright);
  border-color: var(--border-light);
  background: rgba(255, 255, 255, 0.02);
}

.header__link--active {
  color: var(--neon);
  border-color: var(--border-neon);
  background: rgba(0, 255, 65, 0.04);
}

.header__link--user {
  color: var(--cyan);
  font-weight: 700;
}

.header__link--user:hover {
  color: var(--cyan);
  border-color: var(--border-cyan);
  text-shadow: 0 0 8px var(--cyan-glow);
}

.header__link--logout {
  color: var(--text-dim);
}

.header__link--logout:hover {
  color: var(--red);
  border-color: rgba(255, 59, 92, 0.2);
  background: rgba(255, 59, 92, 0.04);
}

.main {
  flex: 1;
  max-width: 1240px;
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
  width: 100%;
  position: relative;
  z-index: 1;
}

.footer {
  border-top: 1px solid var(--border);
  background: var(--bg-elevated);
  position: relative;
  z-index: 1;
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.footer__logo {
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--text-dim);
}

.footer__divider {
  font-family: var(--font-display);
  font-size: 0.5rem;
  color: var(--cyan);
  opacity: 0.5;
}

.footer__tagline {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--text-dim);
  letter-spacing: 0.03em;
}

.footer__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  text-transform: uppercase;
}

.footer__version {
  font-family: var(--font-display);
  font-size: 0.55rem;
  color: var(--neon-dim);
}

.footer__dot {
  width: 3px;
  height: 3px;
  background: var(--neon);
  border-radius: 50%;
  animation: blink 1.5s step-end infinite;
}

@media (max-width: 640px) {
  .header__inner {
    height: auto;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.7rem 1rem;
  }

  .header__nav {
    gap: 0;
    flex-wrap: wrap;
    justify-content: center;
  }

  .header__link {
    font-size: 0.65rem;
    padding: 0.25rem 0.5rem;
  }

  .main {
    padding: 1.5rem 1rem 3rem;
  }

  .footer__inner {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
