---
mode: 'agent'
tools: ['codebase', 'editFiles', 'fetch']
---
Act as a senior software engineer experienced with Angular and Typescript.
Your task is to implement unit tests for existing components. They already have .spec.ts files but these files have not been updated since their generation. I expect all these files cover their corresponding components. For example, recommendation.spec.ts covers recommendation.ts component with unit test.

Do your task iteratively, one iteration is one component to cover. Clean context for each iteration to not clogging up context window.
If component is more than 500 lines, split current iteration on smaller ones to make operation more effective and deterministic.
Consider I want to cover all components and this is not necessary to ask for my permission for each component to cover.