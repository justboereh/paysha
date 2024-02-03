<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$cn/drawer';
	import { Button } from '$cn/button';
	import { LayoutDashboardIcon, PiggyBankIcon, ReceiptIcon, SettingsIcon } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { mediaQuery } from 'svelte-legos';

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

<header
	class="fixed bottom-0 flex w-full justify-around border-t border-border py-4 text-sm font-semibold text-foreground/50"
>
	<a href={`/dash/${$page.params.book_id}/`} class="flex flex-col items-center">
		<LayoutDashboardIcon />

		Overview
	</a>

	<a href={`/dash/${$page.params.book_id}/income`} class="flex flex-col items-center">
		<PiggyBankIcon />

		Income
	</a>

	<a href={`/dash/${$page.params.book_id}/expense`} class="flex flex-col items-center">
		<ReceiptIcon />

		Expense
	</a>

	<a href={`/dash/${$page.params.book_id}/settings`} class="flex flex-col items-center">
		<SettingsIcon />

		Setting
	</a>
</header>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]}>Edit Profile</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Edit profile</Dialog.Title>
				<Dialog.Description>
					Make changes to your profile here. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]}>Edit Profile</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Edit profile</Drawer.Title>
				<Drawer.Description>
					Make changes to your profile here. Click save when you're done.
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
