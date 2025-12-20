// Game initialization with learning integration
let learningIntegration;

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize learning integration
    learningIntegration = new LearningIntegration();
    try {
        await learningIntegration.init();
        updateStats();
    } catch (error) {
        console.warn('Learning integration not available:', error);
    }

    // Render initial scene
    game.render();
    updateLearningHints();

    // Setup button listeners
    document.getElementById('nextBtn').addEventListener('click', () => {
        game.nextScene();
        game.render();
        updateLearningHints();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        game.previousScene();
        game.render();
        updateLearningHints();
    });

    document.getElementById('menuBtn').addEventListener('click', () => {
        // Reset to first scene
        game.currentScene = 0;
        game.history = [];
        game.render();
        updateLearningHints();
    });

    document.getElementById('statsBtn').addEventListener('click', () => {
        const panel = document.getElementById('statsPanel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        updateStats();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            game.nextScene();
            game.render();
            updateLearningHints();
        } else if (e.key === 'ArrowLeft') {
            game.previousScene();
            game.render();
            updateLearningHints();
        }
    });
});

/**
 * Обновляет подсказки для изученных слов/кандзи в текущем диалоге
 */
function updateLearningHints() {
    if (!learningIntegration) return;

    const scene = game.getCurrentScene();
    if (!scene || !scene.dialogue) return;

    const hintContainer = document.getElementById('learningHint');
    const hint = learningIntegration.createHint(scene.dialogue);
    hintContainer.innerHTML = hint;
}

/**
 * Обновляет статистику в панели
 */
function updateStats() {
    if (!learningIntegration) return;

    const stats = learningIntegration.getUsageStats();
    document.getElementById('wordsCount').textContent = stats.totalWords;
    document.getElementById('kanjiCount').textContent = stats.totalKanji;
    document.getElementById('usedCount').textContent = stats.usedWords + stats.usedKanji;
}

console.log('Visual Novel Engine loaded with Learning Integration');
