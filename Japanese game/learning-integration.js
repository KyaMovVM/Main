/**
 * Интеграция JS игры с системой обучения японскому
 * Загружает слова и кандзи из трекеров и использует их в игре
 */

class LearningIntegration {
    constructor() {
        this.words = [];
        this.kanji = [];
        this.learnedWords = new Set();
        this.learnedKanji = new Set();
    }

    /**
     * Загружает слова из words-tracker.json
     */
    async loadWords() {
        try {
            // В браузере используем fetch, в Node.js - fs
            if (typeof fetch !== 'undefined') {
                const response = await fetch('../../JP/agile/words-tracker.json');
                const data = await response.json();
                this.words = data.words || [];
                console.log(`✅ Загружено ${this.words.length} слов`);
            } else {
                // Node.js окружение
                const fs = require('fs');
                const path = require('path');
                const trackerPath = path.join(__dirname, '../../JP/agile/words-tracker.json');
                const data = JSON.parse(fs.readFileSync(trackerPath, 'utf8'));
                this.words = data.words || [];
            }
        } catch (error) {
            console.warn('⚠️ Не удалось загрузить слова:', error);
            this.words = [];
        }
    }

    /**
     * Загружает кандзи из kanji-tracker.json
     */
    async loadKanji() {
        try {
            if (typeof fetch !== 'undefined') {
                const response = await fetch('../../JP/agile/kanji-tracker.json');
                const data = await response.json();
                this.kanji = data.kanji || [];
                console.log(`✅ Загружено ${this.kanji.length} кандзи`);
            } else {
                const fs = require('fs');
                const path = require('path');
                const trackerPath = path.join(__dirname, '../../JP/agile/kanji-tracker.json');
                const data = JSON.parse(fs.readFileSync(trackerPath, 'utf8'));
                this.kanji = data.kanji || [];
            }
        } catch (error) {
            console.warn('⚠️ Не удалось загрузить кандзи:', error);
            this.kanji = [];
        }
    }

    /**
     * Инициализация - загружает все данные
     */
    async init() {
        await Promise.all([this.loadWords(), this.loadKanji()]);
    }

    /**
     * Получает случайное слово для использования в игре
     * @param {string} level - уровень (N5, N4, SSW)
     * @returns {Object|null} объект слова или null
     */
    getRandomWord(level = null) {
        let filtered = this.words;
        if (level) {
            filtered = this.words.filter(w => w.level === level);
        }
        if (filtered.length === 0) return null;
        return filtered[Math.floor(Math.random() * filtered.length)];
    }

    /**
     * Получает случайный кандзи для использования в игре
     * @param {string} level - уровень (N5, N4)
     * @returns {Object|null} объект кандзи или null
     */
    getRandomKanji(level = null) {
        let filtered = this.kanji;
        if (level) {
            filtered = this.kanji.filter(k => k.level === level);
        }
        if (filtered.length === 0) return null;
        return filtered[Math.floor(Math.random() * filtered.length)];
    }

    /**
     * Проверяет, содержит ли текст изученные слова/кандзи
     * @param {string} text - текст для проверки
     * @returns {Object} информация о найденных словах и кандзи
     */
    analyzeText(text) {
        const foundWords = [];
        const foundKanji = [];

        // Проверяем слова
        this.words.forEach(word => {
            if (text.includes(word.word) || text.includes(word.reading)) {
                foundWords.push(word);
            }
        });

        // Проверяем кандзи
        this.kanji.forEach(kanji => {
            if (text.includes(kanji.kanji)) {
                foundKanji.push(kanji);
            }
        });

        return {
            words: foundWords,
            kanji: foundKanji,
            total: foundWords.length + foundKanji.length
        };
    }

    /**
     * Экранирует HTML для предотвращения XSS атак
     * @param {string} text - текст для экранирования
     * @returns {string} экранированный текст
     */
    escapeHtml(text) {
        if (text == null) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * Создаёт подсказку для диалога (показывает переводы изученных слов)
     * @param {string} dialogue - текст диалога
     * @returns {string} HTML с подсказками
     */
    createHint(dialogue) {
        const analysis = this.analyzeText(dialogue);
        if (analysis.total === 0) return '';

        let hint = '<div class="learning-hint">';
        hint += '<strong>📚 Изученные слова:</strong><br>';

        analysis.words.forEach(word => {
            const escapedWord = this.escapeHtml(word.word || '');
            const escapedReading = this.escapeHtml(word.reading || '');
            const escapedMeaning = this.escapeHtml(word.meaning || '');
            hint += `<span class="word-hint">${escapedWord} (${escapedReading}) - ${escapedMeaning}</span><br>`;
        });

        analysis.kanji.forEach(kanji => {
            const escapedKanji = this.escapeHtml(kanji.kanji || '');
            const escapedMeaning = this.escapeHtml(kanji.meaning || '');
            hint += `<span class="kanji-hint">${escapedKanji} - ${escapedMeaning}</span><br>`;
        });

        hint += '</div>';
        return hint;
    }

    /**
     * Генерирует диалог с использованием изученных слов
     * @param {number} wordCount - количество слов для использования
     * @returns {string} сгенерированный диалог
     */
    generateDialogueWithLearnedWords(wordCount = 3) {
        const selectedWords = [];
        const availableWords = this.words.filter(w => w.status === 'mastered' || w.status === 'reviewing');
        
        for (let i = 0; i < Math.min(wordCount, availableWords.length); i++) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            selectedWords.push(availableWords[randomIndex]);
        }

        // Простой генератор (можно улучшить)
        if (selectedWords.length === 0) {
            return 'こんにちは。';
        }

        // Пример: используем первое слово в простом предложении
        const word = selectedWords[0];
        return `${word.word}は${word.meaning}です。`;
    }

    /**
     * Отмечает слово как использованное в игре
     * @param {string} wordId - ID слова
     */
    markWordUsed(wordId) {
        this.learnedWords.add(wordId);
    }

    /**
     * Получает статистику использования слов в игре
     * @returns {Object} статистика
     */
    getUsageStats() {
        return {
            totalWords: this.words.length,
            usedWords: this.learnedWords.size,
            totalKanji: this.kanji.length,
            usedKanji: this.learnedKanji.size
        };
    }
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LearningIntegration;
}

// Глобальный доступ в браузере
if (typeof window !== 'undefined') {
    window.LearningIntegration = LearningIntegration;
}

