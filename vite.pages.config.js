import { defineConfig } from 'vite';

/**
 * Static build of the landing page for GitHub Pages.
 * `base: './'` makes asset URLs relative, so the site works both on
 * https://<user>.github.io/<repo>/ and on a custom domain.
 */
export default defineConfig({
    root: 'resources/landing',
    base: './',
    publicDir: false,
    build: {
        outDir: '../../dist',
        emptyOutDir: true,
    },
});
