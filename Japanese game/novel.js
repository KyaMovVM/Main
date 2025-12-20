// Visual Novel Engine
class VisualNovel {
    constructor() {
        this.currentScene = 0;
        this.scenes = [];
        this.history = [];
    }

    addScene(scene) {
        this.scenes.push(scene);
    }

    getCurrentScene() {
        return this.scenes[this.currentScene] || null;
    }

    nextScene(choiceIndex = 0) {
        const scene = this.getCurrentScene();
        if (!scene) return;

        // Save to history
        this.history.push(this.currentScene);

        if (scene.choices && scene.choices[choiceIndex]) {
            const nextSceneId = scene.choices[choiceIndex].nextScene;
            this.currentScene = this.scenes.findIndex(s => s.id === nextSceneId);
        } else {
            this.currentScene++;
        }
    }

    previousScene() {
        if (this.history.length > 0) {
            this.currentScene = this.history.pop();
        }
    }

    render() {
        const scene = this.getCurrentScene();
        if (!scene) return;

        // Update background
        document.getElementById('background').textContent = scene.background || '[Background]';

        // Update character
        document.getElementById('characters').textContent = scene.character || '[Character]';

        // Update dialogue
        document.getElementById('characterName').textContent = scene.characterName || 'Narrator';
        document.getElementById('dialogueText').textContent = scene.dialogue || '';

        // Update choices
        const choicesContainer = document.getElementById('choices');
        choicesContainer.innerHTML = '';

        if (scene.choices && scene.choices.length > 0) {
            scene.choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = choice.text;
                btn.onclick = () => {
                    this.nextScene(index);
                    this.render();
                };
                choicesContainer.appendChild(btn);
            });
        }
    }
}

// Create game instance
const game = new VisualNovel();

// Add demo scenes
game.addScene({
    id: 'scene_0',
    background: '🏫 School Classroom',
    character: '👧 Character',
    characterName: 'Yuki',
    dialogue: 'Good morning! This is a Visual Novel demo. Choose your path.',
    choices: [
        { text: 'Talk to her', nextScene: 'scene_1' },
        { text: 'Ignore her', nextScene: 'scene_2' }
    ]
});

game.addScene({
    id: 'scene_1',
    background: '🏫 School Classroom',
    character: '👧 Smiling Character',
    characterName: 'Yuki',
    dialogue: 'Oh, you decided to talk to me! That\'s great!',
    choices: [
        { text: 'Ask about her day', nextScene: 'scene_3' },
        { text: 'Go to next class', nextScene: 'scene_4' }
    ]
});

game.addScene({
    id: 'scene_2',
    background: '🏫 School Corridor',
    character: '😢 Sad Character',
    characterName: 'Yuki',
    dialogue: 'Oh... I see. Maybe another time then.',
    choices: [
        { text: 'Go to next class', nextScene: 'scene_4' },
        { text: 'Come back', nextScene: 'scene_0' }
    ]
});

game.addScene({
    id: 'scene_3',
    background: '☀️ School Rooftop',
    character: '😊 Happy Character',
    characterName: 'Yuki',
    dialogue: 'My day was wonderful, especially after talking to you!',
    choices: [
        { text: 'Continue', nextScene: 'scene_5' }
    ]
});

game.addScene({
    id: 'scene_4',
    background: '📚 Classroom',
    character: '👨 Teacher',
    characterName: 'Teacher',
    dialogue: 'Welcome to class everyone! Today we will learn about JavaScript.',
    choices: [
        { text: 'Pay attention', nextScene: 'scene_5' },
        { text: 'Sleep', nextScene: 'scene_6' }
    ]
});

game.addScene({
    id: 'scene_5',
    background: '🌅 School After School',
    character: '',
    characterName: 'Narrator',
    dialogue: 'Good ending! You made the right choices and the story came to a good conclusion.',
    choices: [
        { text: 'Start Over', nextScene: 'scene_0' }
    ]
});

game.addScene({
    id: 'scene_6',
    background: '📚 Classroom',
    character: '😠 Angry Teacher',
    characterName: 'Teacher',
    dialogue: 'You! Wake up! How dare you sleep in my class!',
    choices: [
        { text: 'Start Over', nextScene: 'scene_0' }
    ]
});
