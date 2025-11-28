KyaMovVM: Можно сразу добавить ссылки на Git репозитории? Чтобы скачав Workspace мы видели сразу 2 репазитория у других.

Workspace: Sure, here's a proposed directory structure for a project app:


Create Workspace...

KyaMovVM: Что-то странное предлагаешь и неполное

GitHub Copilot: Коротко — да, можно, но VS Code workspace не хранит удалённые URL напрямую. Рекомендуемые варианты (коротко) и готовые фрагменты:

Варианты
- Лучший вариант — сделать submodules в корне (git submodule). Тогда при клоне с --recurse-submodules и в workspace будут видны обе папки.
- Альтернатива — добавить скрипт setup (clone_repos.sh) и README с командами git clone.
- Также обновить Main.code-workspace, чтобы он включал папки субмодулей (пути относительные).

Примеры файлов, которые можно добавить.

````json
{
	"folders": [
		{
			"path": "."
		},
		{
			"path": "main-app-repo"
		},
		{
			"path": "wiki-repo"
		}
	],
	"settings": {}
}
````

````ini
[submodule "main-app-repo"]
	path = main-app-repo
	url = git@gitea.example.com:org/main-app-repo.git

[submodule "wiki-repo"]
	path = wiki-repo
	url = git@gitea.example.com:org/wiki-repo.git
````

````bash
#!/usr/bin/env bash
# Clone or init/update submodules
set -e
if [ -f .gitmodules ]; then
  git submodule update --init --recursive
else
  # fallback — замените URL на реальные
  [ -d main-app-repo ] || git clone git@gitea.example.com:org/main-app-repo.git main-app-repo
  [ -d wiki-repo ]     || git clone git@gitea.example.com:org/wiki-repo.git wiki-repo
fi
echo "Готово. Откройте Main.code-workspace в VS Code."
````

````markdown
# Как открыть workspace с двумя репозиториями

Рекомендуемый способ:
1. Клонировать этот репозиторий:
   git clone --recurse-submodules git@gitea.example.com:org/Main.git
2. Открыть Main.code-workspace в VS Code.

Если вы не используете submodules:
1. Запустить scripts/clone_repos.sh
2. Открыть Main.code-workspace
````

Нужен ли создать эти файлы прямо сейчас и указать реальные URL репозиториев?

KyaMovVM: Давай с подсказкой и не меняй имена папок, чтобы не сломалась структура. Ведь проект хранится в gitea 2 repos как Main and Main.wiki

GitHub Copilot: Можно — оставив имена папок как есть (Main и Main.wiki). Предлагаю добавить submodule (рекомендуемый способ) + утилиту на случай, если кто-то не использует submodules. Набор файлов и команды ниже — готово к добавлению в репозиторий Main.

Коротко:
- Не переименовывать папки.
- Сделать Main.wiki submodule внутри Main (путь Main.wiki).
- Обновить Main.code-workspace, добавить скрипт для клона/инициализации и README-инструкцию.

Файлы:

````json
[submodule "Main.wiki"]
	path = Main.wiki
	url = git@gitea.example.com:org/Main.wiki.git
````

````json
{
	"folders": [
		{
			"path": "."
		},
		{
			"path": "Main.wiki"
		}
	],
	"settings": {}
}
````

````bash
#!/usr/bin/env bash
# Инициализация submodule или fallback-клон. Не менять имена папок.
set -e
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ -f .gitmodules ]; then
  echo "Инициализируем и обновляем submodules..."
  git submodule update --init --recursive
else
  echo ".gitmodules не найден. Попытка клона по URL (замените на реальные адреса в скрипте)."
  [ -d Main.wiki ] || git clone git@gitea.example.com:org/Main.wiki.git Main.wiki
fi

echo "Готово. Откройте Main.code-workspace в VS Code."
````

````markdown
# Workspace с двумя репозиториями (Main и Main.wiki)

Рекомендуемый способ (поддерживает корректное отображение обеих папок в VS Code):
1. Клонировать репозиторий и сразу подтянуть submodules:
   git clone --recurse-submodules git@gitea.example.com:org/Main.git
2. Открыть Main/Main.code-workspace в VS Code.

Если вы уже клонировали без submodules:
1. В корне репо выполнить:
   git submodule update --init --recursive
   или
   ./scripts/clone_repos.sh

Важно: не менять имена папок — в workspace используются "Main" и "Main.wiki".
````

Короткие команды для настройки (в Main):
- Добавить submodule (локально, затем push):
  git submodule add git@gitea.example.com:org/Main.wiki.git Main.wiki
  git add .gitmodules Main.wiki
  git commit -m "Add Main.wiki as submodule"
  git push

Нужны ли реальные URL для .gitmodules и скрипта — подставлю их и создам файлы в репозитории.