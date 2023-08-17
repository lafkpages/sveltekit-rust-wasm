<script lang="ts">
  import wasm from '$lib/wasm'
</script>

<button
  on:click={() => {
    wasm.greet('world')
  }}>Click me</button
>
