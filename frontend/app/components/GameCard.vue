<template>
  <div class="game-card" :class="{ 'game-card--completed': game.completed }">
    <div class="game-card__glow" />
    <div class="game-card__body">
      <div class="game-card__header">
        <div class="game-card__info">
          <h3 class="game-card__name">{{ game.name }}</h3>
          <div class="game-card__meta">
            <span class="game-card__pill game-card__pill--cat">{{ game.category }}</span>
            <span class="game-card__score">
              <span class="game-card__score-val">{{ game.metacriticScore }}</span>
              <span class="game-card__score-label">MC</span>
            </span>
            <span class="game-card__hours">{{ game.hoursToBeat }}<span class="game-card__hours-unit">h</span></span>
          </div>
        </div>
        <div class="game-card__status">
          <span v-if="game.completed" class="game-card__badge game-card__badge--done">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <span v-else class="game-card__badge game-card__badge--pending">
            <span class="game-card__badge-dot" />
          </span>
        </div>
      </div>

      <div class="game-card__priority-row">
        <div class="game-card__priority">
          <span class="game-card__priority-label">PRIORIDAD</span>
          <span class="game-card__priority-value neon-text">{{ (game.priority || game.metacriticScore / game.hoursToBeat).toFixed(1) }}</span>
        </div>
        <div class="game-card__priority-bar">
          <div class="game-card__priority-fill" :style="{ width: priorityPercent + '%' }" />
        </div>
      </div>

      <div v-if="game.tags && game.tags.length" class="game-card__tags">
        <span v-for="tag in game.tags" :key="tag" class="game-card__tag">#{{ tag }}</span>
      </div>

      <div v-if="game.completed && game.completionNotes" class="game-card__notes">
        {{ game.completionNotes }}
      </div>

      <div v-if="game.completed && game.rating" class="game-card__rating">
        <span v-for="i in 5" :key="i" class="game-card__star" :class="{ 'game-card__star--filled': i <= game.rating }">
          ★
        </span>
      </div>

      <div class="game-card__actions">
        <NuxtLink :to="`/juegos/edicion/${game.id}`" class="btn-neon btn-neon--small">
          <span>Editar</span>
        </NuxtLink>
        <button v-if="!game.completed" class="btn-neon btn-neon--small" @click="$emit('complete', game)">
          <span>Completar</span>
        </button>
        <button class="btn-neon btn-neon--small btn-neon--danger" @click="$emit('delete', game)">
          <span>Borrar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  game: any
}>()

defineEmits<{
  delete: [game: any]
  complete: [game: any]
}>()

const priorityPercent = computed(() => {
  const priority = props.game.priority || props.game.metacriticScore / props.game.hoursToBeat
  return Math.min(100, (priority / 20) * 100)
})
</script>

<style scoped>
.game-card {
  position: relative;
  background: var(--bg-card-solid);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
}

.game-card__glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--neon), transparent);
  opacity: 0;
  transition: opacity 0.4s;
}

.game-card:hover .game-card__glow {
  opacity: 0.6;
}

.game-card:hover {
  border-color: var(--border-neon-active);
  transform: translateY(-3px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 40px var(--neon-glow);
}

.game-card--completed {
  opacity: 0.65;
}

.game-card--completed:hover {
  opacity: 0.85;
}

.game-card--completed .game-card__glow {
  background: linear-gradient(90deg, transparent, var(--text-dim), transparent);
}

.game-card__body {
  padding: 1.2rem;
  position: relative;
  z-index: 1;
}

.game-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.game-card__name {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-bright);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.game-card__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.game-card__pill {
  padding: 0.15rem 0.5rem;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 20px;
  border: 1px solid var(--border);
  color: var(--text-dim);
}

.game-card__pill--cat {
  color: var(--cyan);
  border-color: var(--border-cyan);
}

.game-card__score {
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
}

.game-card__score-val {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 900;
  color: var(--yellow);
}

.game-card__score-label {
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-dim);
}

.game-card__hours {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text);
}

.game-card__hours-unit {
  font-size: 0.5rem;
  color: var(--text-dim);
  margin-left: 1px;
}

.game-card__status {
  flex-shrink: 0;
}

.game-card__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.3s;
}

.game-card__badge--done {
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid var(--border-neon-active);
  color: var(--neon);
}

.game-card__badge--pending {
  border: 1px solid var(--border-light);
}

.game-card__badge-dot {
  width: 6px;
  height: 6px;
  background: var(--neon);
  border-radius: 50%;
  animation: blink 2s step-end infinite;
}

.game-card__priority-row {
  margin-bottom: 0.75rem;
}

.game-card__priority {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}

.game-card__priority-label {
  font-family: var(--font-display);
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-dim);
}

.game-card__priority-value {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 900;
}

.game-card__priority-bar {
  height: 2px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.game-card__priority-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--neon), var(--cyan));
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.game-card:hover .game-card__priority-fill {
  box-shadow: 0 0 8px var(--neon-glow-intense);
}

.game-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
}

.game-card__tag {
  padding: 0.1rem 0.45rem;
  font-size: 0.6rem;
  font-weight: 600;
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--text-dim);
  letter-spacing: 0.02em;
  transition: all 0.2s;
}

.game-card__tag:hover {
  border-color: var(--border-neon);
  color: var(--neon-dim);
}

.game-card__notes {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--text-dim);
  padding: 0.5rem 0.6rem;
  margin-bottom: 0.75rem;
  border-left: 2px solid var(--border-neon);
  background: rgba(0, 255, 65, 0.02);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  line-height: 1.5;
}

.game-card__rating {
  display: flex;
  gap: 0.15rem;
  margin-bottom: 0.75rem;
}

.game-card__star {
  font-size: 0.85rem;
  color: var(--border);
  transition: all 0.2s;
}

.game-card__star--filled {
  color: var(--yellow);
  text-shadow: 0 0 6px rgba(255, 208, 0, 0.3);
}

.game-card__actions {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
</style>
