<template>
  <div class="game-form">
    <div v-if="submitError" class="game-form__error-banner">
      <span>!</span> {{ submitError }}
    </div>

    <form @submit.prevent="handleSubmit" class="game-form__body">
      <div class="game-form__field">
        <label class="game-form__label" for="name">Nombre</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="game-form__input"
          placeholder="ej. Elden Ring"
          required
          maxlength="200"
        />
      </div>

      <div class="game-form__field">
        <label class="game-form__label" for="category">Categoría</label>
        <input
          id="category"
          v-model="form.category"
          type="text"
          class="game-form__input"
          placeholder="ej. RPG, Shooter, Puzzle..."
          required
          maxlength="100"
        />
      </div>

      <div class="game-form__field">
        <label class="game-form__label" for="tags">Etiquetas</label>
        <input
          id="tags"
          v-model="tagsInput"
          type="text"
          class="game-form__input"
          placeholder="acción, aventura, mundo abierto"
          @keydown.enter.prevent
        />
        <p class="game-form__hint">Separa con comas</p>
        <div v-if="form.tags.length" class="game-form__tag-list">
          <span v-for="(tag, i) in form.tags" :key="i" class="game-form__tag">
            #{{ tag }}
            <button type="button" class="game-form__tag-remove" @click="removeTag(i)">x</button>
          </span>
        </div>
      </div>

      <div class="game-form__row">
        <div class="game-form__field">
          <label class="game-form__label" for="metacriticScore">
            Metacritic
          </label>
          <input
            id="metacriticScore"
            v-model.number="form.metacriticScore"
            type="number"
            class="game-form__input"
            min="0"
            max="100"
            required
          />
        </div>
        <div class="game-form__field">
          <label class="game-form__label" for="hoursToBeat">
            Horas
          </label>
          <input
            id="hoursToBeat"
            v-model.number="form.hoursToBeat"
            type="number"
            step="0.5"
            min="0.1"
            class="game-form__input"
            required
          />
        </div>
      </div>

      <div class="game-form__actions">
        <NuxtLink to="/juegos" class="btn-neon btn-neon--small">
          <span>Cancelar</span>
        </NuxtLink>
        <button type="submit" class="btn-neon" :disabled="submitting">
          <span>{{ submitting ? 'Guardando...' : isEdit ? '~ Guardar' : '+ Crear' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  game: any | null;
}>();

const emit = defineEmits<{
  submit: [data: any];
}>();

const isEdit = computed(() => !!props.game);

const form = reactive({
  name: props.game?.name || '',
  category: props.game?.category || '',
  tags: props.game?.tags || [],
  metacriticScore: props.game?.metacriticScore ?? 80,
  hoursToBeat: props.game?.hoursToBeat ?? 10,
});

const tagsInput = ref(props.game?.tags?.join(', ') || '');
const submitting = ref(false);
const submitError = ref<string | null>(null);

watch(tagsInput, (val) => {
  form.tags = val
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
});

function removeTag(index: number) {
  form.tags.splice(index, 1);
  tagsInput.value = form.tags.join(', ');
}

async function handleSubmit() {
  submitting.value = true;
  submitError.value = null;
  try {
    emit('submit', {
      name: form.name,
      category: form.category,
      tags: form.tags,
      metacriticScore: form.metacriticScore,
      hoursToBeat: form.hoursToBeat,
    });
  } catch (e: any) {
    submitError.value = e.message || 'Error al guardar';
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.game-form {
  max-width: 560px;
}

.game-form__error-banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--red);
  background: rgba(255, 51, 85, 0.05);
  font-size: 0.8rem;
  color: var(--red);
}

.game-form__body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.game-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.game-form__label {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.game-form__input {
  padding: 0.6rem 0.8rem;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.85rem;
  font-family: var(--font-mono);
  transition: all 0.2s;
  outline: none;
}

.game-form__input:focus {
  border-color: var(--neon);
  box-shadow: 0 0 8px var(--neon-glow);
}

.game-form__input::placeholder {
  color: #333;
}

.game-form__hint {
  font-size: 0.65rem;
  color: var(--text-dim);
}

.game-form__tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.game-form__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0.5rem;
  font-size: 0.65rem;
  border: 1px solid var(--border-neon);
  color: var(--neon-dim);
}

.game-form__tag-remove {
  background: none;
  border: none;
  color: var(--red);
  font-size: 0.7rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.game-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.game-form__actions {
  display: flex;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

@media (max-width: 480px) {
  .game-form__row {
    grid-template-columns: 1fr;
  }
}
</style>