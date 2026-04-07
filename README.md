# 🌐 Gemini Multilingual Translator

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

A premium, high-performance translation chatbot powered by Google's Gemini AI. This application specializes in instant, accurate translations from English to Marathi and Hindi, featuring a state-of-the-art glassmorphic user interface.

---

## ✨ Key Features

- **🚀 Real-time Translation**: Instant English to Marathi & Hindi translation with a single prompt.
- **🤖 Powered by Gemini Flash**: Utilizes the latest Gemini 2.0 Flash model for blazing-fast and context-aware responses.
- **✨ Premium UI/UX**:
  - **Glassmorphism**: Elegant transparent cards with backdrop blur effects.
  - **Geometric Background**: Dynamic, modern background patterns.
  - **Smooth Animations**: Subtle micro-interactions and transitions for a premium feel.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.
- **🛡️ Secure Implementation**: API keys managed securely via environment variables and server-side route handlers.

---

## 🛠️ Technology Stack

| Layer         | Technology                            |
| ------------- | ------------------------------------- |
| **Framework** | Next.js 15 (App Router)               |
| **Language**  | React (JavaScript)                    |
| **Styling**   | Tailwind CSS 4.0 & Custom CSS Modules |
| **AI Engine** | Google Generative AI (Gemini Flash)   |
| **Icons**     | React Icons (FaGlobeAmericas, etc.)   |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **Gemini API Key**: Obtain one from the [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/multilingual-translation-chatbot.git
   cd multilingual-translation-chatbot
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Gemini API Key:

   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

5. **Access the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── api/translate/   # Next.js API Route handler for Gemini
│   │   ├── layout.js        # Global layout & fonts
│   │   ├── page.js          # Main Chat UI
│   │   └── globals.css      # Core styling & design system
│   ├── components/
│   │   ├── ChatMessage.js   # Chat bubble components
│   │   └── InputForm.js     # Translation input & submit logic
├── public/                  # Static assets
└── package.json             # Component & dependencies
```

---

## 🎨 Design Philosophy

This project prioritizes **Visual Excellence**. By combining Tailwind's utility-first approach with custom CSS for glassmorphism, we've created an interface that feels alive and premium. Every interaction is designed to be intuitive, ensuring a seamless user experience from input to translated output.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">Made with ❤️ by KUNAL</p>
