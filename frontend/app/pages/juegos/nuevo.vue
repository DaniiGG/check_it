<template>
  <div class="form-page">
    <div class="form-page__header">
      <h1 class="form-page__title">
        <span class="neon-text">+</span> Crear jueguito
      </h1>
    </div>
    <GameForm :game="null" @submit="handleCreate" />
  </div>
</template>

<script setup lang="ts">
const API = 'http://localhost:3000/api/games';
const router = useRouter();

async function handleCreate(data: any) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error al crear juego');
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
</style>
