# Complete Guide: Next.js + Google Gemini API Translation Chatbot
## Step-by-Step Tutorial (0 to 100%)

---

## 📋 Project Overview
**Project Name:** Multilingual Translation Chatbot  
**Tech Stack:** Next.js, Google Gemini API, React, Tailwind CSS  
**Features:**
- User enters text in English
- Gemini API translates to Marathi and Hindi
- Clean, interactive chatbot UI
- Real-time responses

---

## ✅ Prerequisites
Before starting, ensure you have:
- **Node.js** (v16 or higher) - Download from https://nodejs.org/
- **npm** or **yarn** - Comes with Node.js
- **Git** - Download from https://git-scm.com/
- **Google Account** - For accessing Gemini API
- **Code Editor** - VSCode recommended (https://code.visualstudio.com/)
- **Basic JavaScript/React Knowledge**

### Verify Installation
Run these commands in your terminal:
```bash
node --version
npm --version
git --version
```

---

## 🎯 PHASE 1: Getting Gemini API Key

### Step 1.1: Go to Google AI Studio
1. Open browser and navigate to: **https://aistudio.google.com/**
2. Sign in with your Google Account
3. Accept the terms and conditions

### Step 1.2: Create API Key
1. Click on **"Get API Key"** in the left sidebar
2. Click **"Create API Key"** button
3. Choose **"Create API Key in new project"** or use existing project
4. Your API key will be generated automatically
5. Copy the API key (you'll need this later!)
6. **Keep this key SECRET** - never commit to GitHub

### Step 1.3: Enable Gemini API
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Enable the Gemini API (it should be auto-enabled)
3. You can use the free tier to test

---

## 🚀 PHASE 2: Setting Up Next.js Project

### Step 2.1: Create Next.js Application
Open your terminal and run:

```bash
npx create-next-app@latest translation-chatbot
```

When prompted, select these options:
- **Would you like to use TypeScript?** → `No` (for simplicity, but you can choose Yes)
- **Would you like to use ESLint?** → `Yes`
- **Would you like to use Tailwind CSS?** → `Yes` (for styling)
- **Would you like to use `src/` directory?** → `Yes`
- **Would you like to use App Router?** → `Yes`
- **Would you like to customize the default import alias?** → `No`

### Step 2.2: Navigate to Project
```bash
cd translation-chatbot
```

### Step 2.3: Install Required Dependencies
```bash
npm install @google/generative-ai
```

This installs the official Google Gemini SDK for JavaScript.

### Step 2.4: Verify Installation
```bash
npm run dev
```

You should see:
```
> Local:        http://localhost:3000
```

Open http://localhost:3000 in your browser. You should see the Next.js welcome page.

**Stop the server with `Ctrl + C`** when done testing.

---

## 🔐 PHASE 3: Setting Up Environment Variables

### Step 3.1: Create .env.local File
In the root of your project (same level as `package.json`), create a file named `.env.local`

```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the API key you copied from Google AI Studio.

### Step 3.2: Add to .gitignore
Open `.gitignore` file and ensure `.env.local` is there (it usually is by default):
```
.env.local
```

This ensures your API key is never committed to GitHub.

### ⚠️ Important Security Notes:
- Using `NEXT_PUBLIC_` prefix exposes the key to frontend (acceptable for public free tier)
- For production apps, use a backend proxy to hide the API key
- Never share your API key publicly

---

## 💻 PHASE 4: Understanding Project Structure

```
translation-chatbot/
├── src/
│   ├── app/
│   │   ├── page.js          ← Main page (home)
│   │   ├── layout.js        ← Global layout
│   │   ├── api/
│   │   │   └── translate/
│   │   │       └── route.js ← Backend API endpoint (we'll create)
│   │   └── globals.css      ← Global styles
│   ├── components/          ← Reusable React components (we'll create)
│   └── lib/                 ← Utility functions (we'll create)
├── public/                  ← Static assets
├── .env.local              ← Environment variables (created)
├── package.json
├── tailwind.config.js      ← Tailwind configuration
└── README.md
```

---

## 🎨 PHASE 5: Building the Backend API

### Step 5.1: Create API Route
Create a new file: `src/app/api/translate/route.js`

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Translate the following text into Marathi and Hindi. 
    
Original Text: "${text}"

Please provide the response in this exact format:
MARATHI: [translated text in marathi]
HINDI: [translated text in hindi]

Only provide the translations, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Parse the response
    const lines = responseText.split("\n").filter(line => line.trim());
    let marathi = "";
    let hindi = "";

    lines.forEach(line => {
      if (line.includes("MARATHI:")) {
        marathi = line.replace("MARATHI:", "").trim();
      }
      if (line.includes("HINDI:")) {
        hindi = line.replace("HINDI:", "").trim();
      }
    });

    return new Response(
      JSON.stringify({
        original: text,
        marathi,
        hindi,
        success: true
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Translation failed",
        details: error.message
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
```

**What this does:**
- Accepts POST requests with `text` parameter
- Sends prompt to Gemini API to translate text
- Returns translations in structured JSON format

---

## 🖼️ PHASE 6: Building the Frontend UI

### Step 6.1: Create ChatMessage Component
Create file: `src/components/ChatMessage.js`

```javascript
export default function ChatMessage({ message, isUser }) {
  return (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-4 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        {isUser ? (
          <p className="font-semibold mb-2">English:</p>
        ) : (
          <>
            <div className="mb-3 pb-3 border-b border-gray-400">
              <p className="font-semibold text-sm mb-1">🇮🇳 Marathi:</p>
              <p className="text-sm">{message.marathi}</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">🇮🇳 Hindi:</p>
              <p className="text-sm">{message.hindi}</p>
            </div>
          </>
        )}
        {isUser && <p className="text-sm">{message}</p>}
      </div>
    </div>
  );
}
```

**What this does:**
- Displays user messages on the right (blue)
- Displays translated responses on the left (gray)
- Shows both Marathi and Hindi translations

### Step 6.2: Create InputForm Component
Create file: `src/components/InputForm.js`

```javascript
'use client';

import { useState } from 'react';

export default function InputForm({ onSubmit, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to translate..."
        disabled={isLoading}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
      >
        {isLoading ? 'Translating...' : 'Send'}
      </button>
    </form>
  );
}
```

**What this does:**
- Input field for users to enter text
- Submit button that calls the parent's onSubmit function
- Shows loading state while translating

---

## 📱 PHASE 7: Building the Main Page

### Step 7.1: Update Main Page
Replace contents of `src/app/page.js`:

```javascript
'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from '@/components/ChatMessage';
import InputForm from '@/components/InputForm';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (text) => {
    // Add user message
    setMessages(prev => [...prev, { text, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (data.success) {
        // Add AI response
        setMessages(prev => [...prev, {
          marathi: data.marathi,
          hindi: data.hindi,
          isUser: false
        }]);
      } else {
        setMessages(prev => [...prev, {
          text: `Error: ${data.error}`,
          isUser: false
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        text: `Error: ${error.message}`,
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto h-screen flex flex-col p-4">
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-md p-6 mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🌐 Translation Chatbot
          </h1>
          <p className="text-gray-600">
            Enter text to translate it to Marathi & Hindi using AI
          </p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p className="text-lg mb-2">👋 Welcome to Translation Chatbot</p>
                <p className="text-sm">
                  Start by entering text you want to translate
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <ChatMessage
                  key={idx}
                  message={msg.isUser ? msg.text : msg}
                  isUser={msg.isUser}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-lg shadow-md p-4">
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
```

**Key Features:**
- `useState` manages messages (chat history)
- `useRef` and `useEffect` for auto-scrolling to latest message
- `handleSubmit` sends text to backend API
- Displays messages in real-time
- Error handling built-in

---

## 🎨 PHASE 8: Styling (Optional Enhancement)

### Step 8.1: Update Global Styles
Add to `src/app/globals.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Source Sans Pro',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

---

## ▶️ PHASE 9: Running & Testing the Project

### Step 9.1: Start Development Server
```bash
npm run dev
```

You should see:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

### Step 9.2: Open in Browser
- Go to http://localhost:3000
- You should see the chatbot interface

### Step 9.3: Test the Chatbot
1. Type a sentence in English (e.g., "Hello, how are you today?")
2. Click "Send"
3. Wait for Gemini API to translate
4. You should see translations in Marathi and Hindi

### Example Test Cases:
- "What is your name?" → Marathi & Hindi translations
- "I love coding" → Marathi & Hindi translations
- "Good morning" → Marathi & Hindi translations

---

## 🐛 PHASE 10: Troubleshooting Guide

### Issue 1: "API Key not found"
**Solution:**
- Check if `.env.local` file exists in root directory
- Verify the key is copied correctly
- Restart the dev server: `npm run dev`

### Issue 2: "CORS Error"
**Solution:**
- You're calling API correctly through `/api/translate` (same origin)
- This error shouldn't happen in this setup

### Issue 3: "Translation returns empty"
**Solution:**
- The Gemini API might be rate-limited (free tier has limits)
- Wait a few seconds and try again
- Check browser console for error messages

### Issue 4: "Text input not working"
**Solution:**
- Ensure component has `'use client'` directive (shown in code)
- Clear browser cache and refresh

### Debug Tips:
- Open **Developer Tools** (F12) → Console tab to see errors
- Check Network tab to see API requests/responses
- Check terminal for server-side errors

---

## 📦 PHASE 11: Building for Production

### Step 11.1: Build the Project
```bash
npm run build
```

This creates an optimized production build.

### Step 11.2: Start Production Server
```bash
npm start
```

### Step 11.3: Deploy (Optional)
Popular options:
- **Vercel** (Recommended - by Next.js creators)
  1. Create account at https://vercel.com
  2. Connect your GitHub repo
  3. Add `.env.local` environment variable in dashboard
  4. Deploy with one click

- **Netlify**
  1. Build the project locally
  2. Deploy the `.next` folder

- **Docker** (Advanced)
  1. Create Dockerfile
  2. Deploy to AWS, DigitalOcean, etc.

---

## 🚀 PHASE 12: Enhancement Ideas (Next Steps)

After completing the basic project, try adding:

1. **Copy to Clipboard**
   - Add button to copy Marathi/Hindi translations

2. **Language Selection**
   - Let users choose which languages to translate to

3. **Chat History**
   - Save conversations to localStorage or database

4. **User Authentication**
   - Add login/signup with NextAuth.js

5. **Dark Mode**
   - Toggle between light and dark theme

6. **Text-to-Speech**
   - Play audio of translations

7. **Database**
   - Store translations in MongoDB or PostgreSQL

8. **API Rate Limiting**
   - Prevent abuse of API

9. **Typing Indicators**
   - Show "AI is typing..." message

10. **Multiple Languages**
    - Expand to more languages beyond Marathi/Hindi

---

## 📚 Important Concepts You've Learned

### 1. **Next.js App Router**
- `app/` folder structure
- File-based routing
- Server vs Client components

### 2. **API Routes**
- Creating backend endpoints with `route.js`
- Handling POST requests
- Error handling

### 3. **React Hooks**
- `useState` for state management
- `useRef` for direct DOM access
- `useEffect` for side effects

### 4. **Environment Variables**
- `.env.local` for secrets
- `NEXT_PUBLIC_` prefix for frontend access

### 5. **Tailwind CSS**
- Utility-first CSS framework
- Responsive design
- Component styling

### 6. **AI Integration**
- Google Gemini API usage
- Prompt engineering
- Error handling

---

## 🎓 Best Practices You Should Follow

### Code Organization
```
✅ Keep components small and reusable
✅ Use meaningful variable names
✅ Add comments for complex logic
✅ Separate concerns (UI, logic, API)
```

### Security
```
✅ Never expose API keys in frontend code (use .env.local)
✅ Validate user input on backend
✅ Handle errors gracefully
✅ Use HTTPS in production
```

### Performance
```
✅ Use 'use client' only when needed
✅ Lazy load components
✅ Optimize images
✅ Cache API responses when possible
```

### UX/UI
```
✅ Show loading states
✅ Clear error messages
✅ Auto-scroll to latest messages
✅ Responsive design for all devices
```

---

## 📞 Getting Help

### Resources:
- **Next.js Docs:** https://nextjs.org/docs
- **Google Gemini API Docs:** https://ai.google.dev/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Stack Overflow:** Tag your questions with `next.js`, `google-generative-ai`

### Common Questions:

**Q: Can I use this for production?**
A: Yes, but consider security measures like backend proxy for API key.

**Q: How many requests can I make?**
A: Google Gemini free tier has generous limits. Check pricing page for details.

**Q: Can I add more languages?**
A: Yes, modify the prompt in `route.js` to include more languages.

**Q: How do I handle different users?**
A: Add authentication and store user sessions in database.

---

## ✅ Checklist: Complete Project Verification

- [ ] Node.js installed (v16+)
- [ ] Gemini API key obtained
- [ ] Next.js project created
- [ ] `.env.local` file created with API key
- [ ] `@google/generative-ai` package installed
- [ ] `/api/translate/route.js` created
- [ ] `ChatMessage.js` component created
- [ ] `InputForm.js` component created
- [ ] `page.js` updated with main logic
- [ ] Dev server runs without errors
- [ ] Chatbot translates English to Marathi and Hindi
- [ ] No API key exposed in code
- [ ] App is responsive on mobile devices

---

## 🎉 Congratulations!

You've successfully built a full-stack AI-powered translation chatbot! 

This project teaches you:
✅ Next.js fundamentals  
✅ API integration  
✅ React hooks and state management  
✅ Environment configuration  
✅ Error handling  
✅ Responsive UI design  

**Next Challenge:** Add database storage to remember past translations!

---

**Last Updated:** 2026  
**Questions?** Refer to the respective documentation or search for specific error messages.
