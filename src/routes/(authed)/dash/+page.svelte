<script lang="ts">
	import Header from './header.svelte';
	import * as Dialog from '$cn/dialog';
	import * as Drawer from '$cn/drawer';
	import * as Form from '$cn/form';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Dashboard, Cube, Plus } from 'radix-icons-svelte';
	import { Button } from '$cn/button';
	import { crossfade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { pushState } from '$app/navigation';
	import { mediaQuery } from 'svelte-legos';
	import { formSchema, type FormSchema } from './schema';
	import type { Form as FormT, FormOptions } from 'formsnap';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<FormSchema>;

	const formOptions: FormOptions<FormSchema> = {
		validators: formSchema,
		onSubmit: () => {},
		onError: () => {}
	};

	const tabs = [
		{ icon: Dashboard, label: 'overview' },
		{ icon: Cube, label: 'shared' }
	];
	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');

	$: tab = ($page.state as { tab?: string }).tab || 'overview';
	$: title = tab.at(0)?.toUpperCase() + tab.slice(1);
</script>

<svelte:head>
	<title>{title} - Paysha</title>
</svelte:head>

<Header />

<div class="p-4">
	<div class="mx-auto flex max-w-7xl justify-between">
		<div>
			{#each tabs as { icon, label }, i}
				{@const active = tab === label}

				<Button
					variant="ghost"
					class={cn(!active && 'hover:underline', 'relative justify-start hover:bg-transparent')}
					data-sveltekit-noscroll
					on:click={() => pushState('/dash', { tab: label })}
				>
					{#if active}
						<div
							class="absolute inset-0 rounded-md bg-secondary"
							in:send={{ key: 'active-sidebar-tab' }}
							out:receive={{ key: 'active-sidebar-tab' }}
						/>
					{/if}

					<div class="relative flex items-center gap-2 capitalize">
						<svelte:component this={icon} />

						{label}
					</div>
				</Button>
			{/each}
		</div>

		{#if $isDesktop}
			<Dialog.Root bind:open>
				<Dialog.Trigger asChild let:builder>
					<Button builders={[builder]}>
						<Plus class="mr-2" />

						New
					</Button>
				</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Create new book</Dialog.Title>
						<Dialog.Description>
							Create a new book to start tracking your expenses and income.
						</Dialog.Description>
					</Dialog.Header>

					<Form.Root options={formOptions} schema={formSchema} {form} let:config>
						<Form.Field {config} name="name">
							<Form.Item>
								<Form.Label for="name">Name</Form.Label>
								<Input id="name" />
								<Form.Description />
								<Form.Validation />
							</Form.Item>
						</Form.Field>
					</Form.Root>
				</Dialog.Content>
			</Dialog.Root>
		{:else}
			<Drawer.Root bind:open shouldScaleBackground>
				<Drawer.Trigger asChild let:builder>
					<Button builders={[builder]}>
						<Plus class="mr-2" />

						New
					</Button>
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header class="text-left">
						<Drawer.Title>Create new book</Drawer.Title>
						<Drawer.Description>
							Create a new book to start tracking your expenses and income.
						</Drawer.Description>
					</Drawer.Header>

					<Drawer.Footer class="pt-2">
						<Drawer.Close asChild let:builder>
							<Button variant="outline" builders={[builder]}>Cancel</Button>
						</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		{/if}
	</div>
</div>
