<script lang="ts">
	import SvgLogo from '$lib/components/svg/logo.svelte';
	import { Button } from '$cn/button';
	import { InfoCircled, Person, Exit, DotsVertical, Gear } from 'radix-icons-svelte';
	import * as Dropdown from '$cn/dropdown-menu';
</script>

<header class="flex items-center justify-center p-4">
	<div class="flex items-center justify-end">
		<a href="/dash" class="h-8">
			<SvgLogo />
		</a>
	</div>

	<div class="flex-grow"></div>

	<div class="flex gap-1">
		<Dropdown.Root>
			<Dropdown.Trigger>
				<Button variant="ghost" size="icon">
					<DotsVertical />
				</Button>
			</Dropdown.Trigger>

			<Dropdown.Content>
				<Dropdown.Item>
					<Gear class="mr-2" /> Settings
				</Dropdown.Item>

				<Dropdown.Item>
					<InfoCircled class="mr-2" /> About
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown.Root>

		<Dropdown.Root>
			<Dropdown.Trigger>
				<Button variant="ghost" size="icon">
					<Person />
				</Button>
			</Dropdown.Trigger>

			<Dropdown.Content>
				<Dropdown.Item class="text-destructive hover:text-destructive">
					<Exit class="mr-2" /> Log out
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown.Root>
	</div>
</header>
