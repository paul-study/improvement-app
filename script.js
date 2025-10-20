// Data Storage
const AppData = {
    affirmations: [],
    goals: [],
    achievements: [],
    skills: [],
    habits: [],
    exercisesCompleted: 0,
    lastVisit: null
};

// Affirmations Database
const defaultAffirmations = [
    "I am capable of achieving my goals",
    "I grow stronger with every challenge I face",
    "I choose to focus on what I can control",
    "I am worthy of success and happiness",
    "I embrace change as an opportunity for growth",
    "I trust myself to make good decisions",
    "I am becoming the best version of myself",
    "I have the power to create positive change",
    "I am resilient and can overcome any obstacle",
    "I deserve to invest time in my personal growth",
    "I am committed to continuous improvement",
    "I celebrate my progress, no matter how small",
    "I am focused, determined, and unstoppable",
    "I learn from my mistakes and keep moving forward",
    "I am in control of my thoughts and emotions"
];

// Motivational Quotes Database
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" }
];

// Exercise Templates
const exercises = {
    meditation: {
        title: "5-Minute Mindfulness Meditation",
        duration: 300,
        instructions: [
            "Find a comfortable seated position",
            "Close your eyes and take 3 deep breaths",
            "Focus on your natural breathing",
            "When your mind wanders, gently return to your breath",
            "Notice sensations in your body without judgment",
            "Continue for 5 minutes"
        ]
    },
    journaling: {
        title: "Gratitude Journaling",
        duration: 600,
        instructions: [
            "Write down 3 things you're grateful for today",
            "Describe one positive experience from your day",
            "Note one thing you learned today",
            "Write about one person who made your day better",
            "Set an intention for tomorrow"
        ]
    },
    movement: {
        title: "Quick Energizing Workout",
        duration: 600,
        instructions: [
            "20 Jumping Jacks - Get your heart rate up",
            "15 Push-ups - Build upper body strength",
            "20 Squats - Strengthen your legs",
            "30-second Plank - Core stability",
            "15 Lunges (each leg) - Balance and strength",
            "Repeat 2-3 times, rest as needed"
        ]
    },
    focus: {
        title: "Pomodoro Focus Session",
        duration: 1500,
        instructions: [
            "Choose one task to focus on",
            "Remove all distractions (phone, notifications)",
            "Set a timer for 25 minutes",
            "Work with complete focus until timer ends",
            "Take a 5-minute break",
            "Repeat as needed"
        ]
    },
    breathing: {
        title: "Box Breathing Exercise",
        duration: 300,
        instructions: [
            "Breathe in through your nose for 4 counts",
            "Hold your breath for 4 counts",
            "Exhale through your mouth for 4 counts",
            "Hold empty for 4 counts",
            "Repeat for 5 minutes",
            "Notice the calming effect on your body"
        ]
    },
    visualization: {
        title: "Future Self Visualization",
        duration: 600,
        instructions: [
            "Close your eyes and relax your body",
            "Imagine yourself 1 year from now",
            "What have you accomplished?",
            "How do you feel? What do you look like?",
            "What habits have you built?",
            "Feel the emotions of achieving your goals",
            "Open your eyes and write down what you saw"
        ]
    }
};

// Initialize App
function initApp() {
    loadData();
    updateStreak();
    getNewAffirmation();
    getNewQuote();
    renderGoals();
    renderAchievements();
    renderSkills();
    renderHabits();
    renderMyAffirmations();
    updateStats();
}

// Local Storage Functions
function saveData() {
    localStorage.setItem('lifeLiftData', JSON.stringify(AppData));
}

function loadData() {
    const saved = localStorage.getItem('lifeLiftData');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(AppData, parsed);
    }
}

// Scroll Function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Affirmations
function getNewAffirmation() {
    const allAffirmations = [...defaultAffirmations, ...AppData.affirmations];
    const randomAffirmation = allAffirmations[Math.floor(Math.random() * allAffirmations.length)];
    document.getElementById('current-affirmation').textContent = randomAffirmation;
}

function addCustomAffirmation() {
    const input = document.getElementById('custom-affirmation-input');
    const text = input.value.trim();
    
    if (text) {
        AppData.affirmations.push(text);
        saveData();
        renderMyAffirmations();
        input.value = '';
    }
}

function renderMyAffirmations() {
    const container = document.getElementById('my-affirmations');
    if (AppData.affirmations.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = '<h3>My Custom Affirmations</h3>';
    AppData.affirmations.forEach((affirmation, index) => {
        const div = document.createElement('div');
        div.className = 'affirmation-item';
        div.innerHTML = `
            <span>${affirmation}</span>
            <button class="delete-btn" onclick="deleteAffirmation(${index})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function deleteAffirmation(index) {
    AppData.affirmations.splice(index, 1);
    saveData();
    renderMyAffirmations();
}

// Quotes
function getNewQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.querySelector('.quote-text').textContent = quote.text;
    document.querySelector('.quote-author').textContent = `- ${quote.author}`;
}

// Exercises
function startExercise(type) {
    const exercise = exercises[type];
    const modal = document.getElementById('exercise-modal');
    const content = document.getElementById('exercise-content');
    
    let instructionsHTML = '<ul>';
    exercise.instructions.forEach(instruction => {
        instructionsHTML += `<li>${instruction}</li>`;
    });
    instructionsHTML += '</ul>';
    
    content.innerHTML = `
        <h2>${exercise.title}</h2>
        <div class="timer-display" id="timer-display">${formatTime(exercise.duration)}</div>
        ${instructionsHTML}
        <div class="timer-controls">
            <button class="btn-primary" onclick="startTimer(${exercise.duration})">Start</button>
            <button class="btn-secondary" onclick="closeExerciseModal()">Close</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

let timerInterval;
function startTimer(duration) {
    let timeLeft = duration;
    const display = document.getElementById('timer-display');
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        display.textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            display.textContent = "Complete! 🎉";
            AppData.exercisesCompleted++;
            saveData();
            updateStats();
        }
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function closeExerciseModal() {
    clearInterval(timerInterval);
    document.getElementById('exercise-modal').style.display = 'none';
}

// Goals
function addGoal() {
    const title = document.getElementById('goal-title').value.trim();
    const category = document.getElementById('goal-category').value;
    const deadline = document.getElementById('goal-deadline').value;
    
    if (!title) return;
    
    const goal = {
        id: Date.now(),
        title,
        category,
        deadline,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    AppData.goals.push(goal);
    saveData();
    renderGoals();
    updateStats();
    
    document.getElementById('goal-title').value = '';
    document.getElementById('goal-deadline').value = '';
}

function renderGoals() {
    const container = document.getElementById('goals-list');
    
    if (AppData.goals.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No goals yet. Set your first goal above!</p>';
        return;
    }
    
    container.innerHTML = '';
    AppData.goals.forEach((goal, index) => {
        const div = document.createElement('div');
        div.className = `goal-item ${goal.completed ? 'completed' : ''}`;
        
        const deadlineText = goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'No deadline';
        
        div.innerHTML = `
            <input type="checkbox" class="goal-checkbox" ${goal.completed ? 'checked' : ''} 
                   onchange="toggleGoal(${index})">
            <div class="goal-info">
                <div class="goal-title">${goal.title}</div>
                <div class="goal-meta">Due: ${deadlineText}</div>
            </div>
            <span class="category-badge category-${goal.category}">${goal.category}</span>
            <button class="delete-btn" onclick="deleteGoal(${index})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function toggleGoal(index) {
    AppData.goals[index].completed = !AppData.goals[index].completed;
    saveData();
    renderGoals();
    updateStats();
}

function deleteGoal(index) {
    AppData.goals.splice(index, 1);
    saveData();
    renderGoals();
    updateStats();
}

// Achievements
function addAchievement() {
    const input = document.getElementById('achievement-text');
    const text = input.value.trim();
    
    if (!text) return;
    
    const achievement = {
        id: Date.now(),
        text,
        date: new Date().toISOString()
    };
    
    AppData.achievements.push(achievement);
    saveData();
    renderAchievements();
    input.value = '';
}

function renderAchievements() {
    const container = document.getElementById('achievements-list');
    
    if (AppData.achievements.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = '';
    AppData.achievements.slice().reverse().forEach((achievement, index) => {
        const div = document.createElement('div');
        div.className = 'achievement-item fade-in';
        
        const date = new Date(achievement.date).toLocaleDateString();
        
        div.innerHTML = `
            <div>
                <div class="achievement-text">🏆 ${achievement.text}</div>
                <div class="achievement-date">${date}</div>
            </div>
            <button class="delete-btn" onclick="deleteAchievement(${AppData.achievements.length - 1 - index})">Delete</button>
        `;
        container.appendChild(div);
    });
}

function deleteAchievement(index) {
    AppData.achievements.splice(index, 1);
    saveData();
    renderAchievements();
}

// Skills
function addSkill() {
    const name = document.getElementById('skill-name').value.trim();
    const level = document.getElementById('skill-level').value;
    
    if (!name) return;
    
    const skill = {
        id: Date.now(),
        name,
        level,
        progress: 0,
        practiceCount: 0
    };
    
    AppData.skills.push(skill);
    saveData();
    renderSkills();
    
    document.getElementById('skill-name').value = '';
}

function quickAddSkill(skillName) {
    document.getElementById('skill-name').value = skillName;
    document.getElementById('skill-level').value = 'beginner';
    addSkill();
}

function renderSkills() {
    const container = document.getElementById('skills-list');
    
    if (AppData.skills.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No skills tracked yet. Add one above!</p>';
        return;
    }
    
    container.innerHTML = '';
    AppData.skills.forEach((skill, index) => {
        const div = document.createElement('div');
        div.className = 'skill-item fade-in';
        
        div.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level-badge level-${skill.level}">${skill.level}</span>
            </div>
            <div class="skill-progress">
                <div class="skill-progress-bar" style="width: ${skill.progress}%"></div>
            </div>
            <div class="skill-stats">Practice sessions: ${skill.practiceCount} | Progress: ${skill.progress}%</div>
            <div class="skill-actions">
                <button class="btn-small btn-practice" onclick="practiceSkill(${index})">Practice</button>
                <button class="btn-small delete-btn" onclick="deleteSkill(${index})">Delete</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function practiceSkill(index) {
    const skill = AppData.skills[index];
    skill.practiceCount++;
    skill.progress = Math.min(100, skill.progress + 5);
    
    saveData();
    renderSkills();
}

function deleteSkill(index) {
    AppData.skills.splice(index, 1);
    saveData();
    renderSkills();
}

// Habits
function addHabit() {
    const name = document.getElementById('habit-name').value.trim();
    
    if (!name) return;
    
    const habit = {
        id: Date.now(),
        name,
        startDate: new Date().toISOString(),
        completedDays: []
    };
    
    AppData.habits.push(habit);
    saveData();
    renderHabits();
    
    document.getElementById('habit-name').value = '';
}

function renderHabits() {
    const container = document.getElementById('habits-list');
    
    if (AppData.habits.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No habits yet. Start your first 30-day challenge!</p>';
        return;
    }
    
    container.innerHTML = '';
    AppData.habits.forEach((habit, index) => {
        const div = document.createElement('div');
        div.className = 'habit-item fade-in';
        
        const calendarHTML = generateHabitCalendar(habit, index);
        const completedCount = habit.completedDays.length;
        const percentage = Math.round((completedCount / 30) * 100);
        
        div.innerHTML = `
            <div class="habit-name">${habit.name}</div>
            <div class="habit-calendar">${calendarHTML}</div>
            <div class="habit-stats">
                ${completedCount}/30 days completed (${percentage}%)
                <button class="delete-btn" style="float: right;" onclick="deleteHabit(${index})">Delete</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function generateHabitCalendar(habit, habitIndex) {
    let html = '';
    for (let i = 1; i <= 30; i++) {
        const isCompleted = habit.completedDays.includes(i);
        html += `<div class="day-cell ${isCompleted ? 'completed' : ''}" 
                      onclick="toggleHabitDay(${habitIndex}, ${i})">${i}</div>`;
    }
    return html;
}

function toggleHabitDay(habitIndex, day) {
    const habit = AppData.habits[habitIndex];
    const index = habit.completedDays.indexOf(day);
    
    if (index > -1) {
        habit.completedDays.splice(index, 1);
    } else {
        habit.completedDays.push(day);
    }
    
    saveData();
    renderHabits();
    updateStreak();
}

function deleteHabit(index) {
    AppData.habits.splice(index, 1);
    saveData();
    renderHabits();
}

// Stats
function updateStats() {
    document.getElementById('total-goals').textContent = AppData.goals.length;
    document.getElementById('completed-goals').textContent = AppData.goals.filter(g => g.completed).length;
    document.getElementById('exercises-completed').textContent = AppData.exercisesCompleted;
}

function updateStreak() {
    // Calculate streak based on habit completion
    let maxStreak = 0;
    AppData.habits.forEach(habit => {
        const sorted = habit.completedDays.sort((a, b) => a - b);
        let currentStreak = 0;
        let tempStreak = 1;
        
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] === sorted[i - 1] + 1) {
                tempStreak++;
            } else {
                currentStreak = Math.max(currentStreak, tempStreak);
                tempStreak = 1;
            }
        }
        currentStreak = Math.max(currentStreak, tempStreak);
        maxStreak = Math.max(maxStreak, currentStreak);
    });
    
    document.getElementById('streak-days').textContent = maxStreak;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('exercise-modal');
    if (event.target === modal) {
        closeExerciseModal();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initApp);
