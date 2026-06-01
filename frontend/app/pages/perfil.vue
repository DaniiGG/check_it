<template>
  <div class="profile-page">
    <div class="profile-page__card">
      <div class="profile-page__glow" />
      <h1 class="profile-page__title">
        <span class="profile-page__accent cyan-text">//</span> Perfil
      </h1>

      <div v-if="loading" class="profile-page__loading">
        <div class="spinner" />
        <span>Cargando perfil...</span>
      </div>

      <template v-else-if="user">
        <div class="profile-page__info">
          <div class="profile-page__field">
            <span class="profile-page__field-label">Alias</span>
            <span class="profile-page__field-value">{{ user.alias }}</span>
          </div>
          <div class="profile-page__field">
            <span class="profile-page__field-label">Email</span>
            <span class="profile-page__field-value">{{ user.email }}</span>
          </div>
        </div>

        <button class="btn-neon btn-neon--danger profile-page__logout" @click="handleLogout">
          <span>Cerrar sesión</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, loading, logout, fetchProfile } = useAuth()

onMounted(async () => {
  await fetchProfile()
})

function handleLogout() {
  logout()
}
</script>

<style scoped>
.profile-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
  padding: 3rem 1rem;
  animation: fadeIn 0.4s ease;
}

.profile-page__card {
  width: 100%;
  max-width: 480px;
  padding: 2.5rem;
  background: var(--bg-card-solid);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}

.profile-page__glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyan), transparent);
  opacity: 0.5;
}

.profile-page__title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-bright);
  margin-bottom: 2rem;
}

.profile-page__accent {
  font-weight: 900;
}

.profile-page__info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.profile-page__field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.profile-page__field-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  font-family: var(--font-display);
}

.profile-page__field-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-bright);
}

.profile-page__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
  color: var(--text-dim);
  font-size: 0.85rem;
  font-weight: 500;
}

.profile-page__logout {
  width: 100%;
  justify-content: center;
}

.spinner {
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
