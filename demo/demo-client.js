// ── DEMO CLIENT NAME ENGINE ──
// Reads demoClientName from localStorage and injects it everywhere
(function() {
    const DEFAULT = 'Votre Agence';
    const name = localStorage.getItem('demoClientName') || DEFAULT;
    const industry = localStorage.getItem('demoIndustry') || 'location';

    window.DEMO_CLIENT_NAME = name;
    window.DEMO_INDUSTRY = industry;

    function inject() {
        // Update all .demo-client-name spans
        document.querySelectorAll('.demo-client-name').forEach(el => {
            el.textContent = name;
        });
        // Update all .demo-client-industry spans
        document.querySelectorAll('.demo-client-industry').forEach(el => {
            el.textContent = industry;
        });
        // Update page title
        const title = document.title;
        document.title = title.replace(/Votre Agence/g, name);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();
