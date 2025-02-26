<script lang="ts">
    import Registration from "./templates/registration.svelte";
    import { fade, fly } from 'svelte/transition';
    import { pageTransition } from '$lib/stores';
</script>

<div in:fly={$pageTransition} out:fade>
  <Registration />
</div>
