<template>
  <div class="auth-page">
    <div class="auth-page__card">
      <div class="auth-page__glow" />
      <h1 class="auth-page__title">
        <span class="auth-page__accent neon-text">//</span> Login
      </h1>
      <p class="auth-page__subtitle">Iniciá sesión para acceder a tu biblioteca</p>

      <div v-if="error" class="auth-page__error">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin" class="auth-page__form">
        <div class="auth-page__field">
          <label class="auth-page__label" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="auth-page__input"
            placeholder="tu@email.com"
            required
            autocomplete="email"
          />
        </div>

        <div class="auth-page__field">
          <label class="auth-page__label" for="password">Contraseña</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="auth-page__input"
            placeholder="Tu contraseña"
            required
            autocomplete="current-password"
          />
        </div>

        <button type="submit" class="btn-neon auth-page__submit" :disabled="loading">
          <span>{{ loading ? 'Ingresando...' : 'Entrar' }}</span>
        </button>
      </form>

      <p class="auth-page__footer">
        ¿No tenés cuenta?
        <NuxtLink to="/registro" class="auth-page__link">Registrate</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login, loading, isAuthenticated } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const error = ref<string | null>(null)

async function handleLogin() {
  error.value = null
  if (!form.email || !form.password) {
    error.value = 'Completá todos los campos'
    return
  }

  try {
    await login(form.email, form.password)
    router.push('/juegos')
  } catch (e: any) {
    error.value = e.message || 'Error al iniciar sesión'
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem 1rem;
  animation: fadeIn 0.4s ease;
}

.auth-page__card {
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  background: var(--bg-card-solid);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}

.auth-page__glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--neon), transparent);
  opacity: 0.5;
}

.auth-page__title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-bright);
  margin-bottom: 0.35rem;
}

.auth-page__accent {
  font-weight: 900;
}

.auth-page__subtitle {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-dim);
  margin-bottom: 2rem;
}

.auth-page__error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.9rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 59, 92, 0.3);
  border-radius: var(--radius-sm);
  background: rgba(255, 59, 92, 0.05);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--red);
}

.auth-page__form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.auth-page__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.auth-page__label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  font-family: var(--font-display);
}

.auth-page__input {
  padding: 0.6rem 0.8rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: var(--font-body);
  transition: all 0.2s;
  outline: none;
}

.auth-page__input:focus {
  border-color: var(--border-neon-active);
  box-shadow: 0 0 0 3px var(--neon-glow);
}

.auth-page__input::placeholder {
  color: var(--text-dim);
  opacity: 0.4;
}

.auth-page__submit {
  margin-top: 0.3rem;
  width: 100%;
  justify-content: center;
}

.auth-page__footer {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-dim);
  text-align: center;
}

.auth-page__link {
  color: var(--cyan);
  font-weight: 600;
}

.auth-page__link:hover {
  text-shadow: 0 0 10px var(--cyan-glow);
}
</style>
