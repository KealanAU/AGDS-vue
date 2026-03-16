import { inject } from 'vue';
export const APP_LAYOUT_KEY = Symbol('AppLayout');
export function useAppLayoutContext() {
    const ctx = inject(APP_LAYOUT_KEY);
    if (!ctx)
        throw new Error('useAppLayoutContext must be called within AusGovAppLayout');
    return ctx;
}
