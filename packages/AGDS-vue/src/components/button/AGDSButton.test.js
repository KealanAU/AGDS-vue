import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import { runAxe } from '../../test/a11y';
import AusGovButton from './AusGovButton.vue';
// jsdom has no computed styles, so colour-contrast checks will always fail.
// Disable that rule globally for all component tests — contrast is verified
// visually against the WCAG 2.2 AA requirement in the design token docs.
const AXE_OPTS = {
    rules: { 'color-contrast': { enabled: false } },
};
// ─── Helpers ─────────────────────────────────────────────────────────────────
function renderButton(props = {}, slot = 'Submit') {
    return render(AusGovButton, {
        props,
        slots: { default: slot },
    });
}
// ─── Rendering ───────────────────────────────────────────────────────────────
describe('AusGovButton — rendering', () => {
    it('renders a <button> element', () => {
        const { getByRole } = renderButton();
        expect(getByRole('button')).toBeTruthy();
    });
    it('renders slot content', () => {
        const { getByText } = renderButton({}, 'Apply now');
        expect(getByText('Apply now')).toBeTruthy();
    });
    it('renders slot HTML content', () => {
        const { getByText } = render(AusGovButton, {
            slots: { default: '<strong>Bold label</strong>' },
        });
        expect(getByText('Bold label')).toBeTruthy();
    });
});
// ─── Props: variant ───────────────────────────────────────────────────────────
describe('AusGovButton — variant prop', () => {
    it('defaults to primary variant', () => {
        const { getByRole } = renderButton();
        expect(getByRole('button').className).toContain('ausgov-button--primary');
    });
    it.each(['primary', 'secondary', 'tertiary'])('applies ausgov-button--%s class for variant="%s"', (variant) => {
        const { getByRole } = renderButton({ variant });
        expect(getByRole('button').className).toContain(`ausgov-button--${variant}`);
    });
});
// ─── Props: size ──────────────────────────────────────────────────────────────
describe('AusGovButton — size prop', () => {
    it('defaults to md size', () => {
        const { getByRole } = renderButton();
        expect(getByRole('button').className).toContain('ausgov-button--md');
    });
    it.each(['sm', 'md', 'lg'])('applies ausgov-button--%s class for size="%s"', (size) => {
        const { getByRole } = renderButton({ size });
        expect(getByRole('button').className).toContain(`ausgov-button--${size}`);
    });
});
// ─── Props: type ──────────────────────────────────────────────────────────────
describe('AusGovButton — type prop', () => {
    it('defaults to type="button"', () => {
        const { getByRole } = renderButton();
        expect(getByRole('button').getAttribute('type')).toBe('button');
    });
    it.each(['button', 'submit', 'reset'])('sets type="%s" on the native element', (type) => {
        const { getByRole } = renderButton({ type });
        expect(getByRole('button').getAttribute('type')).toBe(type);
    });
});
// ─── Props: disabled ──────────────────────────────────────────────────────────
describe('AusGovButton — disabled prop', () => {
    it('is not disabled by default', () => {
        const { getByRole } = renderButton();
        expect(getByRole('button').disabled).toBe(false);
    });
    it('sets the native disabled attribute when disabled=true', () => {
        const { getByRole } = renderButton({ disabled: true });
        expect(getByRole('button').disabled).toBe(true);
    });
    it('sets aria-disabled="true" when disabled', () => {
        const { getByRole } = renderButton({ disabled: true });
        expect(getByRole('button').getAttribute('aria-disabled')).toBe('true');
    });
    it('does not set aria-disabled when not disabled', () => {
        const { getByRole } = renderButton();
        expect(getByRole('button').getAttribute('aria-disabled')).toBeNull();
    });
    it('applies ausgov-button--disabled class when disabled', () => {
        const { getByRole } = renderButton({ disabled: true });
        expect(getByRole('button').className).toContain('ausgov-button--disabled');
    });
});
// ─── Props: loading ───────────────────────────────────────────────────────────
describe('AusGovButton — loading prop', () => {
    it('is not loading by default', () => {
        const { queryByRole } = renderButton();
        // No spinner in DOM
        expect(queryByRole('button').querySelector('.ausgov-button__spinner')).toBeNull();
    });
    it('renders spinner when loading=true', () => {
        const { getByRole } = renderButton({ loading: true });
        const spinner = getByRole('button').querySelector('.ausgov-button__spinner');
        expect(spinner).toBeTruthy();
    });
    it('spinner has aria-hidden="true" so screen readers ignore it', () => {
        const { getByRole } = renderButton({ loading: true });
        const spinner = getByRole('button').querySelector('.ausgov-button__spinner');
        expect(spinner?.getAttribute('aria-hidden')).toBe('true');
    });
    it('sets native disabled when loading', () => {
        const { getByRole } = renderButton({ loading: true });
        expect(getByRole('button').disabled).toBe(true);
    });
    it('sets aria-busy="true" when loading', () => {
        const { getByRole } = renderButton({ loading: true });
        expect(getByRole('button').getAttribute('aria-busy')).toBe('true');
    });
    it('does not set aria-busy when not loading', () => {
        const { getByRole } = renderButton();
        expect(getByRole('button').getAttribute('aria-busy')).toBeNull();
    });
    it('applies ausgov-button--loading class when loading', () => {
        const { getByRole } = renderButton({ loading: true });
        expect(getByRole('button').className).toContain('ausgov-button--loading');
    });
});
// ─── Events ───────────────────────────────────────────────────────────────────
describe('AusGovButton — click event', () => {
    it('emits click when clicked in default state', async () => {
        const { getByRole, emitted } = renderButton();
        await fireEvent.click(getByRole('button'));
        expect(emitted().click).toHaveLength(1);
    });
    it('emits click with the MouseEvent payload', async () => {
        const { getByRole, emitted } = renderButton();
        await fireEvent.click(getByRole('button'));
        expect(emitted().click[0][0]).toBeInstanceOf(MouseEvent);
    });
    it('does not emit click when disabled', async () => {
        const { getByRole, emitted } = renderButton({ disabled: true });
        await fireEvent.click(getByRole('button'));
        expect(emitted().click).toBeUndefined();
    });
    it('does not emit click when loading', async () => {
        const { getByRole, emitted } = renderButton({ loading: true });
        await fireEvent.click(getByRole('button'));
        expect(emitted().click).toBeUndefined();
    });
});
// ─── Accessibility: axe-core ──────────────────────────────────────────────────
describe('AusGovButton — axe accessibility', () => {
    it('has no violations in default (primary, md) state', async () => {
        const { container } = renderButton();
        await runAxe(container, AXE_OPTS);
    });
    it('has no violations when variant=secondary', async () => {
        const { container } = renderButton({ variant: 'secondary' });
        await runAxe(container, AXE_OPTS);
    });
    it('has no violations when variant=tertiary', async () => {
        const { container } = renderButton({ variant: 'tertiary' });
        await runAxe(container, AXE_OPTS);
    });
    it('has no violations when size=sm', async () => {
        const { container } = renderButton({ size: 'sm' });
        await runAxe(container, AXE_OPTS);
    });
    it('has no violations when size=lg', async () => {
        const { container } = renderButton({ size: 'lg' });
        await runAxe(container, AXE_OPTS);
    });
    it('has no violations when disabled=true', async () => {
        const { container } = renderButton({ disabled: true });
        await runAxe(container, AXE_OPTS);
    });
    it('has no violations when loading=true', async () => {
        const { container } = renderButton({ loading: true });
        await runAxe(container, AXE_OPTS);
    });
    it('has no violations for type=submit', async () => {
        const { container } = renderButton({ type: 'submit' });
        await runAxe(container, AXE_OPTS);
    });
    it('has a violation when the button has no accessible name', async () => {
        // Verify our a11y helper correctly catches real violations.
        const { container } = render(AusGovButton, { slots: { default: '' } });
        await expect(runAxe(container, AXE_OPTS)).rejects.toThrow('axe-core found');
    });
});
