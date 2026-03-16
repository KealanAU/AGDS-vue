import { cleanup } from '@testing-library/vue';
import { afterEach } from 'vitest';
// Unmount and clean up the DOM after every test
afterEach(() => {
    cleanup();
});
