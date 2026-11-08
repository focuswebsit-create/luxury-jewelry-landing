# אם הסקיל לא מופיע ב־GitHub

הסקיל אמור להופיע בדיוק בנתיב:

`.claude/skills/luxury-box-reveal/SKILL.md`

אם GitHub Browser לא העלה תיקיות מוסתרות, Claude עדיין יכול לבנות לפי `CLAUDE.md` והפרומפט. אפשר לתת לו את ההודעה:

```text
The project skill may be missing. Please create the exact directory
.claude/skills/luxury-box-reveal/ and the file SKILL.md.
Use this YAML frontmatter:
---
name: luxury-box-reveal
description: Build and QA accessible, mobile-first luxury jewelry landing pages with premium interactive box-opening reveals.
---
Then create concise skill instructions for the four-state box interaction,
physical hinges/layering, accessible touch/keyboard controls, responsive
mobile design, reduced motion, performance, testing and honest demo content.
Keep the skill tracked in Git. Consult CLAUDE.md and docs/ before coding.
```

לא צריך MCP או להתקין סקילים ממקורות חיצוניים.
