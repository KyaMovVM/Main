# Architecture

## Visual Novel Engine

Visual Novel engine is a JavaScript-based system for creating interactive fiction.

### Key Components

1. **VisualNovel Class** - Main engine
   - Manages scenes
   - Tracks history
   - Handles scene transitions
   - Renders to DOM

2. **Scenes** - Story nodes
   - Background
   - Character
   - Dialogue
   - Choices (branches)

3. **UI** - HTML Interface
   - Game screen
   - Dialogue box
   - Choice buttons
   - Navigation controls

## Story Structure

```
Scene 0 (Start)
├─ Choice 1 → Scene 1 → Scene 3 (Good Path)
└─ Choice 2 → Scene 2 → Scene 4 (Class Path)
             └─ Can return to Scene 0
```

## Data Flow

```
User Input
    ↓
Choice Handler
    ↓
Next Scene Calculation
    ↓
History Update
    ↓
DOM Render
    ↓
Display Update
```

## Extending

To add new scenes, use:

```javascript
game.addScene({
    id: 'scene_X',
    background: 'description',
    character: 'emoji',
    characterName: 'Name',
    dialogue: 'Text',
    choices: [
        { text: 'Option', nextScene: 'scene_Y' }
    ]
});
```
