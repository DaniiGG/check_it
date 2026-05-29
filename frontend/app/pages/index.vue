<template>
  <div class="home">
    <section class="hero">
      <div class="hero__badge">
        <span class="hero__badge-dot" /> BACKLOG PRIORITY ENGINE v1.0
      </div>

      <h1 class="hero__title">
        <span class="hero__title-line">Liquidá tu</span>
        <span class="hero__title-line hero__title-line--accent" ref="accentRef">
          BACKLOG
          <span class="hero__cursor">_</span>
        </span>
      </h1>

      <p class="hero__subtitle">
        MetacriticScore &divide; HoursToBeat = <span class="neon-text">Dopamina</span>
      </p>

      <p class="hero__desc">
        Prioriza tu biblioteca de juegos con un algoritmo tan absurdo como brillante.
        Más puntuación, menos horas, y voilá: tu cerebro recibe una sobredosis
        de dopamina instantánea. Cero compromisos.
      </p>

      <div class="hero__actions">
        <NuxtLink to="/juegos/nuevo" class="btn-neon glow-pulse">
          <span>+ Crear jueguito</span>
        </NuxtLink>
        <NuxtLink to="/juegos" class="btn-neon">
          <span>Ver biblioteca</span>
        </NuxtLink>
      </div>

      <div class="hero__formula" @click="explodeFormula">
        <div class="hero__formula-label">ALGORITMO DE PRIORIDAD</div>
        <div class="hero__formula-body">
          <span class="hero__formula-var">P</span>
          <span class="hero__formula-op">=</span>
          <span class="hero__formula-var">M</span>
          <span class="hero__formula-op">&divide;</span>
          <span class="hero__formula-var">H</span>
        </div>
        <div class="hero__formula-desc">
          <span>P = Prioridad</span>
          <span>M = Metacritic Score</span>
          <span>H = Horas para completar</span>
        </div>
        <div v-if="exploded" class="hero__formula-exploded">
          <div class="hero__example">
            <span>Juego A:</span>
            <span>90 / 10h = <strong class="neon-text">9</strong></span>
          </div>
          <div class="hero__example">
            <span>Juego B:</span>
            <span>85 / 5h = <strong class="neon-text">17</strong></span>
          </div>
          <div class="hero__example hero__example--winner">
            <span>&#9654; Juego B va primero, obvio</span>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="features__grid">
        <div class="feature-card" v-for="f in features" :key="f.title">
          <div class="feature-card__icon">{{ f.icon }}</div>
          <h3 class="feature-card__title">{{ f.title }}</h3>
          <p class="feature-card__desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const exploded = ref(false);

const features = [
  {
    icon: '+',
    title: 'Crear jueguito',
    desc: 'Sube los datos de cada título: nombre, categoría, etiquetas, horas, puntuación Metacritic.',
  },
  {
    icon: '*',
    title: 'Priorizar',
    desc: 'El algoritmo hace su magia: puntuación dividida entre horas. A mayor ratio, más arriba.',
  },
  {
    icon: '~',
    title: 'Ordenar y filtrar',
    desc: 'Ordena por puntuación, completados, en proceso o prioridad. Filtra por etiquetas y categoría.',
  },
  {
    icon: '!',
    title: 'Completar',
    desc: 'Marca como terminado, añade valoración 1-5 estrellas y deja notas épicas.',
  },
];

function explodeFormula() {
  exploded.value = !exploded.value;
}
</script>

<style scoped>
.home {
  padding-top: 1rem;
}

.hero {
  text-align: center;
  padding: 3rem 0 4rem;
  position: relative;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 1rem;
  border: 1px solid var(--border-neon);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--neon-dim);
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.hero__badge-dot {
  width: 6px;
  height: 6px;
  background: var(--neon);
  border-radius: 50%;
  animation: blink 1s step-end infinite;
}

.hero__title {
  margin-bottom: 1.5rem;
}

.hero__title-line {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 5rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-bright);
  line-height: 1.1;
}

.hero__title-line--accent {
  color: var(--neon);
  text-shadow:
    0 0 10px var(--neon-glow-intense),
    0 0 30px var(--neon-glow-intense),
    0 0 60px var(--neon-glow);
  animation: flicker 3s infinite;
}

.hero__cursor {
  font-family: var(--font-display);
  animation: blink 1s step-end infinite;
  opacity: 0.8;
}

.hero__subtitle {
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: var(--text-dim);
}

.hero__desc {
  max-width: 600px;
  margin: 0 auto 2.5rem;
  font-size: 0.85rem;
  line-height: 1.8;
  color: var(--text-dim);
}

.hero__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.hero__formula {
  display: inline-block;
  padding: 1.5rem 2rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
}

.hero__formula:hover {
  border-color: var(--border-neon);
  background: var(--bg-hover);
}

.hero__formula-label {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--text-dim);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.hero__formula-body {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.hero__formula-var {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--neon);
  text-shadow: 0 0 10px var(--neon-glow-intense);
}

.hero__formula-op {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--text-dim);
}

.hero__formula-desc {
  display: flex;
  gap: 1rem;
  justify-content: center;
  font-size: 0.65rem;
  color: var(--text-dim);
  letter-spacing: 0.05em;
}

.hero__formula-exploded {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  animation: fade 0.3s ease;
}

.hero__example {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  padding: 0.3rem 0;
  color: var(--text-dim);
}

.hero__example--winner {
  margin-top: 0.5rem;
  color: var(--neon);
  font-weight: 500;
}

.features {
  padding: 3rem 0;
  border-top: 1px solid var(--border);
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.feature-card {
  padding: 1.5rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: var(--border-neon);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.feature-card__icon {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--neon);
  margin-bottom: 0.75rem;
}

.feature-card__title {
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-bright);
  margin-bottom: 0.5rem;
}

.feature-card__desc {
  font-size: 0.75rem;
  line-height: 1.7;
  color: var(--text-dim);
}

@keyframes fade {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
