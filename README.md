# 🧠 AI Code Explainer (Monaco Editor Integration)

This project integrates AI directly into a code editor (Monaco Editor).  
When you **select a word or snippet** and click on the **🤖 Ask AI** button, it calls an AI model (currently OpenAI via Azure Inference) and displays the explanation **inline inside the editor**.  

Future scope:  
- Support **Ollama** models (local inference, no API costs).  
- Build a **VS Code extension** for seamless developer workflows.  

---

## 🚀 Features
- Select text in the code editor → click **Ask AI** → get inline AI explanation.
- AI response displayed in a **tooltip** (short version) or **modal** (full explanation).
- Smooth UI with Monaco Editor, tooltips, modals, and loading animations.
- Redux state management for async requests (loading, success, failure).
- Currently supports **Azure OpenAI Inference API**.
- Scalable to other providers (Gemini, Ollama, etc.).

---

## 🛠 Tech Stack
**Frontend**  
- ⚛️ React.js  
- 📝 Monaco Editor (browser-based code editor)  
- 🎨 CSS-in-JS (inline styles + custom animations)  
- 🗂 Redux Toolkit (state management)  

**Backend**  
- 🟦 Node.js + Express.js  
- 🔗 Azure Inference API (OpenAI GPT-4.1)  
- 🔐 dotenv for environment variables  

**Planned / Future**  
- 🐙 Ollama for local model inference  
- 🧩 VS Code Extension API for native integration  
- 🌐 Multi-provider support (OpenAI, Gemini, Anthropic, etc.)  

---

## 📂 Project Structure
- `/frontend` → React app with Monaco Editor & Redux integration  
- `/frontend/components/MonacoEditor.js` → Main editor + AI tooltip & modal  
- `/frontend/components/TooltipOverlay.js` → Floating "Ask AI" button  
- `/frontend/features/textSlice.js` → Redux slice for AI state management  
- `/backend/services/openaiService.js` → Calls Azure Inference API (OpenAI models)  
- `/backend/routes/receiveText.js` → Backend endpoint for handling AI requests  

---

## 📖 How It Works
1. User selects code/text inside Monaco Editor.  
2. Tooltip **🤖 Ask AI** button appears → click it.  
3. Selected text sent to **backend**.  
4. Backend calls **Azure Inference API (OpenAI GPT-4.1)**.  
5. AI explanation returned → displayed inline in **tooltip** (short version).  
6. User can expand to **modal** for full explanation.  

---

## ⚠️ Notes
- Requires **Azure AI Inference Token** (or OpenAI API key if switched).  
- Currently uses `openai/gpt-4.1` via `@azure-rest/ai-inference`.  
- **Free-tier OpenAI APIs may be limited** → consider Ollama for local inference.  
- Works only inside **browser Monaco Editor** for now; VS Code extension planned.  

---

## 🛠️ Setup
### 1️⃣ Backend
```bash
cd backend
npm install



