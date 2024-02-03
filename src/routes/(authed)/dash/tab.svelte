<script lang="ts">
	import { Button } from '$cn/button';
	import { crossfade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	const tabs = [
		{
			href: '/dash/',
			label: 'Overview'
		},
		{
			href: '/dash/shared',
			label: 'Shared'
		}
	];
	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<div class="p-4">
	<div class="mx-auto max-w-7xl">
		{#each tabs as { href, label }, i}
			{@const active = $page.url.pathname === href}

			<Button
				{href}
				variant="ghost"
				class={cn(!active && 'hover:underline', 'relative justify-start hover:bg-transparent')}
				data-sveltekit-noscroll
			>
				{#if active}
					<div
						class="absolute inset-0 rounded-md bg-muted"
						in:send={{ key: 'active-sidebar-tab' }}
						out:receive={{ key: 'active-sidebar-tab' }}
					/>
				{/if}

				<div class="relative">
					{label}
				</div>
			</Button>
		{/each}
	</div>
</div>
