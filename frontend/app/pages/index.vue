<template>
  <div class="home">
    <section class="hero">
      <div class="hero__glow hero__glow--top" />
      <div class="hero__glow hero__glow--bottom" />

      <div class="hero__badge">
        <span class="hero__badge-dot" />
        BACKLOG PRIORITY ENGINE
      </div>

      <h1 class="hero__title">
        <span class="hero__title-top">Liquida tu</span>
        <span class="hero__title-main neon-text">
          BACK<span class="hero__title-cyan">LOG</span>
          <span class="hero__cursor">_</span>
        </span>
      </h1>

      <div class="hero__formula-hero">
        <span class="hero__formula-hero-var">M</span>
        <span class="hero__formula-hero-op">&divide;</span>
        <span class="hero__formula-hero-var">H</span>
        <span class="hero__formula-hero-eq">=</span>
        <span class="hero__formula-hero-var hero__formula-hero-var--result">D</span>
      </div>

      <p class="hero__subtitle">
        Metacritic &divide; Horas = <span class="cyan-text">Dopamina</span>
      </p>

      <p class="hero__desc">
        Priorizamos tu biblioteca con un algoritmo tan absurdo como brillante.
        Dividimos la puntuación entre las horas necesarias para completarlo.
        Más puntuación, menos horas: tu cerebro recibe una sobredosis de dopamina instantánea. Cero compromisos.
      </p>

      <div class="hero__actions">
        <template v-if="isAuthenticated">
          <NuxtLink to="/juegos/nuevo" class="btn-neon glow-pulse">
            <span>Crear juego</span>
          </NuxtLink>
          <NuxtLink to="/juegos" class="btn-neon">
            <span>Mi biblioteca</span>
          </NuxtLink>
          <NuxtLink to="/perfil" class="btn-neon">
            <span>Perfil</span>
          </NuxtLink>
          <button class="btn-neon btn-neon--danger" @click="handleLogout">
            <span>Salir</span>
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="btn-neon glow-pulse">
            <span>Iniciar sesión</span>
          </NuxtLink>
          <NuxtLink to="/registro" class="btn-neon">
            <span>Registrarse</span>
          </NuxtLink>
        </template>
      </div>

      <div class="hero__demo" @click="exploded = !exploded">
        <div class="hero__demo-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <span class="hero__demo-label">ALGORITMO EN ACCIÓN</span>
        <span class="hero__demo-arrow">{{ exploded ? '▼' : '▶' }}</span>

        <Transition name="slideDown">
          <div v-if="exploded" class="hero__demo-content">
            <div class="hero__demo-row">
              <span class="hero__demo-game">Elden Ring</span>
              <span class="hero__demo-calc">96 / 70h</span>
              <span class="hero__demo-score score-low">1.4</span>
            </div>
            <div class="hero__demo-row">
              <span class="hero__demo-game">Portal 2</span>
              <span class="hero__demo-calc">95 / 8h</span>
              <span class="hero__demo-score score-high">11.9</span>
            </div>
            <div class="hero__demo-row">
              <span class="hero__demo-game">Hades</span>
              <span class="hero__demo-calc">93 / 20h</span>
              <span class="hero__demo-score score-mid">4.7</span>
            </div>
            <div class="hero__demo-verdict">
              <span>▶ Portal 2 va primero. Dopamina pura.</span>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <section class="features">
      <h2 class="features__title">
        <span class="features__title-accent">//</span> CÓMO FUNCIONA
      </h2>
      <div class="features__grid">
        <div v-for="(f, i) in features" :key="f.title" class="feature-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="feature-card__icon">{{ f.icon }}</div>
          <h3 class="feature-card__title">{{ f.title }}</h3>
          <p class="feature-card__desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { isAuthenticated, logout } = useAuth()
const exploded = ref(false)

const features = [
  {
    icon: '01',
    title: 'Crear jueguito',
    desc: 'Subí los datos de cada título: nombre, categoría, etiquetas, horas y puntuación Metacritic.',
  },
  {
    icon: '02',
    title: 'Priorizar',
    desc: 'El algoritmo hace su magia: puntuación dividida entre horas. A mayor ratio, más arriba en tu lista.',
  },
  {
    icon: '03',
    title: 'Ordenar y filtrar',
    desc: 'Ordená por prioridad, puntuación o estado. Filtra por etiquetas y categoría al instante.',
  },
  {
    icon: '04',
    title: 'Completar',
    desc: 'Marcá como terminado, añadí valoración de 1 a 5 estrellas y dejá notas épicas sobre tu experiencia.',
  },
]

function handleLogout() {
  logout()
}
</script>

<style scoped>
.home {
  animation: fadeIn 0.5s ease;
}

.hero {
  text-align: center;
  padding: 4rem 0 3rem;
  position: relative;
}

.hero__glow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}

.hero__glow--top {
  top: -20%;
  width: 500px;
  height: 300px;
  background: rgba(0, 255, 65, 0.04);
}

.hero__glow--bottom {
  bottom: 10%;
  width: 400px;
  height: 200px;
  background: rgba(0, 229, 255, 0.03);
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 1rem;
  border: 1px solid var(--border-neon);
  border-radius: 20px;
  font-family: var(--font-display);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--neon-dim);
  margin-bottom: 2.5rem;
}

.hero__badge-dot {
  width: 6px;
  height: 6px;
  background: var(--neon);
  border-radius: 50%;
  animation: blink 2s step-end infinite;
  box-shadow: 0 0 8px var(--neon-glow-intense);
}

.hero__title {
  margin-bottom: 2rem;
}

.hero__title-top {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 0.25rem;
}

.hero__title-main {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 10vw, 7rem);
  font-weight: 900;
  letter-spacing: 0.04em;
  line-height: 1;
  animation: flicker 4s infinite;
}

.hero__title-cyan {
  color: var(--cyan);
  text-shadow: 0 0 15px var(--cyan-glow), 0 0 30px var(--cyan-glow);
}

.hero__cursor {
  animation: blink 1.2s step-end infinite;
  font-weight: 300;
  opacity: 0.7;
}

.hero__formula-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.hero__formula-hero-var {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--neon);
  text-shadow: 0 0 10px var(--neon-glow-intense);
}

.hero__formula-hero-op {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-dim);
}

.hero__formula-hero-eq {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--cyan);
}

.hero__formula-hero-var--result {
  color: var(--cyan);
  text-shadow: 0 0 10px var(--cyan-glow);
}

.hero__subtitle {
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: 500;
  letter-spacing: 0.06em;
  margin-bottom: 1rem;
  color: var(--text-dim);
}

.hero__desc {
  max-width: 600px;
  margin: 0 auto 2.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.8;
  color: var(--text-dim);
}

.hero__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.hero__demo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.5rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
}

.hero__demo:hover {
  border-color: var(--border-neon);
  background: var(--bg-hover);
}

.hero__demo-icon {
  color: var(--cyan);
}

.hero__demo-label {
  font-family: var(--font-display);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--text-dim);
}

.hero__demo-arrow {
  font-size: 0.6rem;
  color: var(--neon);
}

.hero__demo-content {
  width: 100%;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.hero__demo-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.4rem 0;
  font-size: 0.75rem;
  font-weight: 500;
}

.hero__demo-game {
  color: var(--text);
  min-width: 100px;
  text-align: left;
}

.hero__demo-calc {
  color: var(--text-dim);
  font-variant-numeric: tabular-nums;
}

.hero__demo-score {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 0.75rem;
  min-width: 40px;
  text-align: right;
}

.score-low { color: var(--red); }
.score-mid { color: var(--yellow); }
.score-high { color: var(--neon); text-shadow: 0 0 8px var(--neon-glow-intense); }

.hero__demo-verdict {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--neon);
}

.slideDown-enter-active {
  transition: all 0.3s ease;
}

.slideDown-leave-active {
  transition: all 0.2s ease;
}

.slideDown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slideDown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.features {
  padding: 3rem 0 2rem;
  border-top: 1px solid var(--border);
}

.features__title {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-bright);
  margin-bottom: 2rem;
  text-align: center;
}

.features__title-accent {
  color: var(--cyan);
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.feature-card {
  padding: 1.5rem;
  background: var(--bg-card-solid);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideUp 0.5s ease both;
}

.feature-card:hover {
  border-color: var(--border-neon);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px var(--neon-glow);
}

.feature-card__icon {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--cyan);
  margin-bottom: 0.75rem;
  text-shadow: 0 0 8px var(--cyan-glow);
}

.feature-card__title {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-bright);
  margin-bottom: 0.5rem;
}

.feature-card__desc {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.7;
  color: var(--text-dim);
}
</style>
