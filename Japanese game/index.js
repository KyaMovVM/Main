// Game initialization
document.addEventListener('DOMContentLoaded', () => {
    // Render initial scene
    game.render();

    // Setup button listeners
    document.getElementById('nextBtn').addEventListener('click', () => {
        game.nextScene();
        game.render();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        game.previousScene();
        game.render();
    });

    document.getElementById('menuBtn').addEventListener('click', () => {
        // Reset to first scene
        game.currentScene = 0;
        game.history = [];
        game.render();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            game.nextScene();
            game.render();
        } else if (e.key === 'ArrowLeft') {
            game.previousScene();
            game.render();
        }
    });
});

console.log('Visual Novel Engine loaded');
