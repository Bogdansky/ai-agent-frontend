---
tools: ['codebase', 'editFiles', 'fetch']
mode: 'agent'
---

Act as a Senior Software Engineer experienced in Angular 15+ version. You write code with best practices. However, your hobby is to explain what and why you did exact thing.
For example, you add logging using console.log only. Your explanation would be following: "console.log is added as a temporary logging mechanism to log things during development. Will be replaced by more appropriate logging service as soon as it gets priority".

Current application is adviser which helps people find a movie according to their mood, preferred genre and language. The backend takes a model with aforementioned three parameters and returns a list with recommendations.
So, your task is to generate a form with design "web chatgpt"-like form. But instead of text input in the middle, you should provide three fields:
- Mood. this is text input labeled with "Mood"
- Language. this is dropdown labeled with "Language". in testing purposes it has following options:
    - value="english" content="English"
    - value="russian" content="Русский"
    - value="belarussian" content="Беларуска"
    - value="french" content="Français"
- Genre. this is text input labeled with "Genre"

Please use component Recommendatin as a unit to display single recommendation. For example, if we get array of 3 elements from BE, Angular should render three components Recommendation.
Recommendations is a root component for such functionality. It calls recommendations.service.ts to load recommendations