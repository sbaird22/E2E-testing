# Tech Quiz - End-to-End & Component Testing with Cypress

## 📌 Project Overview  
Tech Quiz is a **React + TypeScript** application that allows users to take a quiz on various tech-related topics. The application includes:  
- A **quiz component** that fetches random questions from an API.  
- A **scoring system** that tracks correct answers.  
- A **restart feature** that allows users to retake the quiz.  
- **Cypress component & end-to-end tests** ensuring stability.  

## 🚀 Getting Started  

### Prerequisites  
Ensure you have the following installed on your system:  
- **Node.js** (Latest LTS recommended)  
- **npm** (Included with Node.js)  

### Installation  
Clone this repository and navigate into the project folder:  
```sh
git clone [(https://github.com/sbaird22/E2E-testing)]
cd tech-quiz
npm install
npm run dev
npm run test:component
npm run test:e2e
npm run cypress

🔍 Project Features Tested
✅ Displays Start Quiz button on page load
✅ Fetches questions from API on quiz start
✅ Moves to the next question when an answer is clicked
✅ Displays the final score when the quiz is completed
✅ Allows restarting the quiz after completion
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

💡 Credits
Development & Code: @du
Testing & Debugging: @Shane Baird
walktrhough video: https://drive.google.com/file/d/1r11PvPEJD1xlM1WUucWvqZFow1rFrvSv/view


