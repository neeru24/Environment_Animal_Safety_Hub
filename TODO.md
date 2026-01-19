# Font Size Changer Feature Implementation

## Tasks
- [x] Create `frontend/js/global/font-size-changer.js` module for font size adjustments with localStorage persistence and accessibility
- [x] Update `frontend/components/navbar.html` to add font size increase/decrease buttons next to theme toggle
- [x] Update `frontend/css/style.css` to use CSS variable (--base-font-size) for dynamic font size adjustment
- [x] Ensure font-size-changer.js is loaded in HTML pages
- [x] Test font size changer functionality across pages
- [x] Ensure accessibility compliance (keyboard navigation, screen reader support)

# User Progress Tracking for Quizzes Feature Implementation

## Tasks
- [ ] Extend `frontend/assets/data/quiz-data.json` with progress metadata structure (e.g., object for user progress: current index, answers, score, time)
- [ ] Update `frontend/css/components/quiz.css` to add progress bar styling (`.progress-bar`, `.progress-fill` with animations and responsive design)
- [ ] Modify `frontend/js/pages/quizzes/quiz.js` to add localStorage functions (saveProgress, loadProgress)
- [ ] Update `startQuiz()` in `quiz.js` to check for existing progress and allow resuming
- [ ] Add progress bar element to the quiz screen in `quiz.js`
- [ ] Add "Resume Quiz" button to the start screen in `quiz.js` if saved progress is detected
- [ ] Update `loadQuestion()` in `quiz.js` to update progress bar
- [ ] Save progress on each answer selection in `quiz.js`
- [ ] Test saving/loading progress across browser sessions
- [ ] Verify progress bar updates correctly during quiz
- [ ] Ensure "Resume Quiz" functionality works seamlessly
