{{-- The landing page lives in resources/landing/index.html so the same markup is published to GitHub Pages. --}}
{!! str_replace(
    '<script type="module" src="./main.js"></script>',
    Vite::withEntryPoints(['resources/landing/main.js'])->toHtml(),
    file_get_contents(resource_path('landing/index.html')),
) !!}
