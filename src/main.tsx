import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./styles/global.scss";
import Topics from "./Topics.tsx";
import Test from "./Test.tsx";
import Past from "./Past.tsx";
import Developer from "./Developer.tsx";
import NotFound from "./NotFound.tsx";
import QuizProvider from "./context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QuizProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="topics" element={<Topics />} />
          <Route path="test" element={<Test />} />
          <Route path="past" element={<Past />} />
          <Route path="developer" element={<Developer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QuizProvider>
    </BrowserRouter>
  </StrictMode>,
);
