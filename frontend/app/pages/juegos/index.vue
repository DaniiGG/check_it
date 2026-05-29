<template>
  <div class="games-page">
    <div class="games-page__header">
      <h1 class="games-page__title">
        <span class="neon-text">#</span> Biblioteca
        <span class="games-page__count">({{ games.length }})</span>
      </h1>
      <NuxtLink to="/juegos/nuevo" class="btn-neon btn-neon--small">
        <span>+ Nuevo</span>
      </NuxtLink>
    </div>

    <GamesFilters
      v-model:search="filters.search"
      v-model:sort="filters.sort"
      v-model:category="filters.category"
      v-model:tag="filters.tag"
      v-model:completed="filters.completed"
      :loading="loading"
      @reset="resetFilters"
    />

    <div v-if="loading" class="games-page__loading">
      <div class="games-page__spinner" />
      <span>Cargando juegos...</span>
    </div>

    <div v-else-if="error" class="games-page__error">
      <span class="games-page__error-icon">!</span>
      <p>{{ error }}</p>
      <button class="btn-neon btn-neon--small" @click="fetchGames">
        <span>Reintentar</span>
      </button>
    </div>

    <TransitionGroup v-else name="list" tag="div" class="games-grid">
      <GameCard
        v-for="game in games"
        :key="game.id"
        :game="game"
        @delete="handleDelete"
        @complete="handleComplete"
      />
    </TransitionGroup>

    <div v-if="!loading && !error && games.length === 0" class="games-page__empty">
      <div class="games-page__empty-icon">[ ]</div>
      <p>No se encontraron juegos</p>
      <NuxtLink to="/juegos/nuevo" class="btn-neon btn-neon--small">
        <span>+ Crear primero</span>
      </NuxtLink>
    </div>

    <Teleport to="body">
      <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
        <div class="modal">
          <div class="modal__icon">!</div>
          <h3 class="modal__title">¿Eliminar juego?</h3>
          <p class="modal__desc">Esta acción no se puede deshacer.</p>
          <div class="modal__actions">
            <button class="btn-neon btn-neon--small" @click="deleteTarget = null">
              <span>Cancelar</span>
            </button>
            <button class="btn-neon btn-neon--small btn-neon--danger" @click="confirmDelete">
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const API = 'http://localhost:3000/api/games';

interface Game {
  id: string;
  name: string;
  category: string;
  tags: string[];
  metacriticScore: number;
  hoursToBeat: number;
  completed: boolean;
  completedAt: string | null;
  completionNotes: string | null;
  rating: number | null;
  createdAt: string;
  priority?: number;
}

const games = ref<Game[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const deleteTarget = ref<Game | null>(null);

const filters = reactive({
  search: '',
  sort: '',
  category: '',
  tag: '',
  completed: '',
});

function resetFilters() {
  filters.search = '';
  filters.sort = '';
  filters.category = '';
  filters.tag = '';
  filters.completed = '';
}

const queryString = computed(() => {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.sort) params.set('sort', filters.sort);
  if (filters.category) params.set('category', filters.category);
  if (filters.tag) params.set('tag', filters.tag);
  if (filters.completed) params.set('completed', filters.completed);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
});

async function fetchGames() {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(`${API}${queryString.value}`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    games.value = await res.json();
  } catch (e: any) {
    error.value = e.message || 'Error al cargar juegos';
    games.value = [];
  } finally {
    loading.value = false;
  }
}

watch(queryString, fetchGames, { immediate: true });

async function handleDelete(game: Game) {
  deleteTarget.value = game;
}

async function confirmDelete() {
  if (!deleteTarget.value) return;
  const game = deleteTarget.value;
  deleteTarget.value = null;
  try {
    const res = await fetch(`${API}/${game.id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error('Error al eliminar');
    games.value = games.value.filter((g) => g.id !== game.id);
  } catch (e: any) {
    error.value = e.message;
  }
}

async function handleComplete(game: Game) {
  try {
    const res = await fetch(`${API}/${game.id}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    if (!res.ok) throw new Error('Error al completar');
    const updated = await res.json();
    const idx = games.value.findIndex((g) => g.id === game.id);
    if (idx !== -1) games.value[idx] = updated;
  } catch (e: any) {
    error.value = e.message;
  }
}
</script>

<style scoped>
.games-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.games-page__title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-bright);
}

.games-page__count {
  font-size: 0.8rem;
  color: var(--text-dim);
}

.games-page__loading,
.games-page__error,
.games-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  border: 1px solid var(--border);
  text-align: center;
  gap: 1rem;
}

.games-page__spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border);
  border-top-color: var(--neon);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.games-page__error-icon,
.games-page__empty-icon {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--neon);
  text-shadow: 0 0 10px var(--neon-glow-intense);
  margin-bottom: 0.5rem;
}

.games-page__error p,
.games-page__empty p {
  font-size: 0.85rem;
  color: var(--text-dim);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  padding: 2rem;
  max-width: 380px;
  width: 90%;
  text-align: center;
}

.modal__icon {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--red);
  margin-bottom: 0.75rem;
}

.modal__title {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.08em;
  color: var(--text-bright);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.modal__desc {
  font-size: 0.8rem;
  color: var(--text-dim);
  margin-bottom: 1.5rem;
}

.modal__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}
</style>
