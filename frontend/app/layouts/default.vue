<template>
  <div class="layout">
    <header class="header">
      <div class="header__inner">
        <NuxtLink to="/" class="header__logo">
          <span class="header__logo-icon">&gt;_</span>
          <span class="header__logo-text">CheckIt</span>
        </NuxtLink>
        <nav class="header__nav">
          <NuxtLink to="/" class="header__link" active-class="header__link--active">
            <span class="header__link-indicator">#</span> Home
          </NuxtLink>
          <NuxtLink to="/juegos" class="header__link" active-class="header__link--active">
            <span class="header__link-indicator">#</span> Juegos
          </NuxtLink>
          <NuxtLink to="/juegos/nuevo" class="header__link" active-class="header__link--active">
            <span class="header__link-indicator">+</span> Nuevo
          </NuxtLink>
        </nav>
      </div>
      <div class="header__scanline" />
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__tagline">
          <span class="neon-text">&gt;</span> Liquidá tu backlog con estilo y velocidad
        </div>
        <div class="footer__meta">
          <span class="footer__cursor">█</span>
          <span>v1.0 // sprint-1</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.header__scanline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--neon), transparent);
  animation: scanline 4s linear infinite;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 60px;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-bright);
}

.header__logo-icon {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--neon);
  text-shadow: 0 0 10px var(--neon-glow-intense);
  animation: flicker 3s infinite;
}

.header__logo-text {
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.header__nav {
  display: flex;
  gap: 0.25rem;
}

.header__link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-dim);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.header__link:hover {
  color: var(--neon);
  border-color: var(--border-neon);
  background: rgba(0, 255, 65, 0.03);
}

.header__link--active {
  color: var(--neon);
  border-color: var(--border-neon);
  background: rgba(0, 255, 65, 0.05);
}

.header__link-indicator {
  font-family: var(--font-display);
  font-size: 0.7rem;
  opacity: 0.6;
}

.main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  width: 100%;
}

.footer {
  border-top: 1px solid var(--border);
  background: var(--bg-elevated);
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.2rem 1.5rem;
  font-size: 0.75rem;
  color: var(--text-dim);
}

.footer__tagline {
  font-size: 0.7rem;
  letter-spacing: 0.06em;
}

.footer__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer__cursor {
  color: var(--neon);
  animation: blink 1s step-end infinite;
}

@media (max-width: 640px) {
  .header__inner {
    height: auto;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
  }

  .header__nav {
    gap: 0;
  }

  .header__link {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }

  .footer__inner {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
