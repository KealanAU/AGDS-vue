import { inject } from 'vue';
export const DROPDOWN_MENU_KEY = Symbol('DropdownMenu');
export function useDropdownMenuContext() {
    const ctx = inject(DROPDOWN_MENU_KEY);
    if (!ctx)
        throw new Error('useDropdownMenuContext must be called within AGDSDropdownMenu');
    return ctx;
}
