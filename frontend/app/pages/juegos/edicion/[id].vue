<template>
  <div class="form-page">
    <div class="form-page__header">
      <h1 class="form-page__title">
        <span class="neon-text">~</span> Editar jueguito
      </h1>
      <p class="form-page__sub" v-if="game">Editando: {{ game.name }}</p>
    </div>
    <div v-if="loading" class="form-page__loading">
      <div class="games-page__spinner" />
      <span>Cargando juego...</span>
    </div>
    <div v-else-if="error" class="form-page__error">
      <span>!</span>
      <p>{{ error }}</p>
      <NuxtLink to="/juegos" class="btn-neon btn-neon--small"><span>Volver</span></NuxtLink>
    </div>
    <GameForm v-else :key="game?.id" :game="game" @submit="handleUpdate" />
  </div>
</template>

<script setup lang="ts">
const API = 'http://localhost:3000/api/games';
const route = useRoute();
const router = useRouter();

const game = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const res = await fetch(`${API}/${route.params.id}`);
    if (!res.ok) throw new Error('Juego no encontrado');
    game.value = await res.json();
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

async function handleUpdate(data: any) {
  const res = await fetch(`${API}/${route.params.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error al actualizar');
  }
  router.push('/juegos');
}
</script>

<style scoped>
.form-page__header {
  margin-bottom: 2rem;
}
.form-page__title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-bright);
}
.form-page__sub {
  font-size: 0.8rem;
  color: var(--text-dim);
  margin-top: 0.3rem;
}
.form-page__loading,
.form-page__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 2rem;
  border: 1px solid var(--border);
  text-align: center;
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
</style>