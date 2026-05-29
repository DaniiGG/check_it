<template>
  <div class="game-card" :class="{ 'game-card--completed': game.completed }">
    <div class="game-card__header">
      <div class="game-card__info">
        <h3 class="game-card__name">{{ game.name }}</h3>
        <div class="game-card__meta">
          <span class="game-card__category">{{ game.category }}</span>
          <span class="game-card__separator">|</span>
          <span class="game-card__score">{{ game.metacriticScore }}</span>
          <span class="game-card__separator">|</span>
          <span class="game-card__hours">{{ game.hoursToBeat }}h</span>
          <span v-if="game.priority" class="game-card__separator">|</span>
          <span v-if="game.priority" class="game-card__priority neon-text">
            P: {{ game.priority.toFixed(1) }}
          </span>
        </div>
      </div>
      <div class="game-card__status">
        <span v-if="game.completed" class="game-card__badge game-card__badge--done" title="Completado">
          &#10003;
        </span>
        <span v-else class="game-card__badge game-card__badge--pending" title="En proceso">
          ~
        </span>
      </div>
    </div>

    <div v-if="game.tags && game.tags.length" class="game-card__tags">
      <span v-for="tag in game.tags" :key="tag" class="game-card__tag">#{{ tag }}</span>
    </div>

    <div v-if="game.completed && game.completionNotes" class="game-card__notes">
      <span class="game-card__notes-label">NOTAS:</span>
      {{ game.completionNotes }}
    </div>

    <div v-if="game.completed && game.rating" class="game-card__rating">
      <span v-for="i in 5" :key="i" class="game-card__star" :class="{ 'game-card__star--filled': i <= game.rating }">
        &#9733;
      </span>
    </div>

    <div class="game-card__actions">
      <NuxtLink :to="`/juegos/edicion/${game.id}`" class="btn-neon btn-neon--small">
        <span>~ Editar</span>
      </NuxtLink>
      <button v-if="!game.completed" class="btn-neon btn-neon--small" @click="$emit('complete', game)">
        <span>&#10003; Completar</span>
      </button>
      <button class="btn-neon btn-neon--small btn-neon--danger" @click="$emit('delete', game)">
        <span>X Borrar</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  game: any
}>();

defineEmits<{
  delete: [game: any];
  complete: [game: any];
}>();
</script>

<style scoped>
.game-card {
  border: 1px solid var(--border);
  background: var(--bg-card);
  padding: 1.25rem;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}

.game-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: var(--neon);
  opacity: 0;
  transition: opacity 0.25s;
}

.game-card:hover {
  border-color: var(--border-neon);
  background: var(--bg-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.game-card:hover::before {
  opacity: 1;
}

.game-card--completed {
  opacity: 0.7;
}

.game-card--completed::before {
  background: var(--text-dim);
  opacity: 0.5;
}

.game-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.game-card__name {
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  color: var(--text-bright);
  text-transform: uppercase;
  margin-bottom: 0.4rem;
  line-height: 1.3;
}

.game-card__meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  color: var(--text-dim);
  flex-wrap: wrap;
}

.game-card__category {
  color: var(--neon-dim);
}

.game-card__score {
  color: var(--yellow);
}

.game-card__hours {
  color: var(--text);
}

.game-card__priority {
  font-weight: 700;
  font-size: 0.75rem;
}

.game-card__separator {
  opacity: 0.3;
}

.game-card__status {
  flex-shrink: 0;
}

.game-card__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-family: var(--font-display);
  font-size: 0.8rem;
  border-radius: 50%;
}

.game-card__badge--done {
  background: var(--neon);
  color: var(--bg);
}

.game-card__badge--pending {
  border: 1px solid var(--border-neon);
  color: var(--neon-dim);
}

.game-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.game-card__tag {
  padding: 0.15rem 0.5rem;
  font-size: 0.6rem;
  border: 1px solid var(--border);
  color: var(--text-dim);
  letter-spacing: 0.03em;
  transition: all 0.2s;
}

.game-card__tag:hover {
  border-color: var(--border-neon);
  color: var(--neon-dim);
}

.game-card__notes {
  font-size: 0.75rem;
  color: var(--text-dim);
  padding: 0.5rem;
  border-left: 2px solid var(--border-neon);
  margin-bottom: 0.75rem;
  background: rgba(0, 255, 65, 0.02);
}

.game-card__notes-label {
  color: var(--neon-dim);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
}

.game-card__rating {
  display: flex;
  gap: 0.2rem;
  margin-bottom: 0.75rem;
}

.game-card__star {
  color: var(--border);
  font-size: 0.9rem;
}

.game-card__star--filled {
  color: var(--yellow);
  text-shadow: 0 0 6px rgba(255, 208, 0, 0.4);
}

.game-card__actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>