# AI-SYSTEM-MAP — Pygmalion Field

> Карта системы для AI-агентов.  
> Field — фронтенд / поле присутствия.

---

## Репозитории

| Репозиторий | Роль | GitHub |
|---|---|---|
| `-Pygmalion-` | Основной backend + Canon Layer | `TVOY1000/-Pygmalion-` |
| `pygmalion-landing` | Landing + Docker-стек + Canon mirror | `rasvet7535/pygmalion-landing` |
| `pygmalion-field` | Frontend / поле присутствия | `rasvet7535/pygmalion-field` |
| `notebooklm-mcp` | Мост к NotebookLM | `rasvet7535/notebooklm-mcp` |

## Canon Layer

**SSOT:** `backend/core/canon/` в `-Pygmalion-` / `pygmalion-landing`  
**Версия:** `phase1-stable-2026.05`  
**Импорт:** `const Canon = require('./core/canon');`

Ключевые константы:
- Эмиссия: 3–13 У.Е./день
- Silence: 19:55–20:00 UTC
- Burn: 24h (active) / 28h (impulse)
- Триады: T1(1-3), T2(4-6), T3(7-9), T4(10-12), T5(21)

*Версия: phase1-stable-2026.05*
