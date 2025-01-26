<x-filament-panels::page>
    <form wire:submit="create" class="space-y-4">
        {{ $this->form }}

        <x-filament::button type="submit">
            Blacklist User(s)
        </x-filament::button>
    </form>

    <x-filament-actions::modals />
</x-filament-panels::page>
