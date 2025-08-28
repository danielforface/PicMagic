# Pixshop - AI Photo Editor & Creator

![Pixshop](https://img.shields.io/badge/Pixshop-AI_Photo_Editor-blue?style=for-the-badge&logo=react)

Pixshop is a powerful, web-based photo editing and generation application that leverages the Google Gemini API to provide an intuitive yet advanced creative suite. Users can perform professional-grade edits using simple text prompts or create entirely new images from their imagination.

## ✨ Features

Pixshop is packed with features designed for both casual users and creative professionals.

### 1. AI-Powered Image Generation
- **Text-to-Image Creation:** Generate stunning, high-quality images from simple text descriptions.
- **Prompt Enhancer:** Automatically improve your basic ideas into rich, detailed prompts for superior results using AI.
- **Style & Focus Presets:** Quickly guide the AI with a wide variety of pre-defined styles (e.g., *Photorealistic, Anime, Cinematic, Cyberpunk*) and focus areas (*Character Focus, Rich Environment*) to achieve the perfect aesthetic.

### 2. Advanced AI Editing Suite
The core of Pixshop is its multi-tab editing interface:
- **📍 Precise Retouching:** Click any point on your image and describe your edit. The AI performs localized changes like removing objects, changing the color of an item, or adding new elements with seamless blending.
- **🎨 Creative Filters:** Instantly transform the mood of your photos with AI-powered filters. Choose from presets like *Synthwave* or *Lomo*, or describe your own unique style.
- **☀️ Professional Adjustments:** Apply global enhancements with ease. Use prompts to achieve effects like "blur the background," "add golden hour lighting," or "enhance details" across the entire image.
- **✂️ Standard Crop Tool:** A classic, easy-to-use cropping tool with support for freeform, 1:1, and 16:9 aspect ratios.

### 3. Non-Destructive Workflow
- **History Tracking:** Every edit is a new step in the history.
- **Undo/Redo:** Easily navigate back and forth through your changes.
- **Compare View:** Press and hold the "Compare" button to instantly view the original, unedited image.
- **Reset:** Revert all changes and go back to the original image with a single click.

### 4. Intuitive User Experience
- **Sleek Interface:** A modern, dark-themed UI with an animated space background for an immersive creative session.
- **Drag & Drop:** Easily upload images by dragging them onto the application window.
- **Download Your Work:** Save your final creation to your device in high quality.
- **Responsive Design:** Works smoothly across different screen sizes.

## 🤖 How It Works

Pixshop harnesses the power of multiple Google Gemini models to achieve its results:

- **Image Generation:** The `imagen-4.0-generate-001` model is used for generating new images from text prompts.
- **Image Editing, Filters & Adjustments:** The multi-modal `gemini-2.5-flash-image-preview` model is the powerhouse behind all image-based editing tasks. By providing the original image along with a carefully engineered text prompt (which includes user input and contextual instructions), the model returns a fully modified image.
- **Prompt Enhancement:** The `gemini-2.5-flash` model is used for its text-generation capabilities to rewrite and enrich user prompts for the image generation feature.

## 🛠️ Technology Stack

- **Frontend:** React, TypeScript
- **AI:** Google Gemini API (`@google/genai`)
- **Styling:** Tailwind CSS
- **Image Manipulation:** `react-image-crop`, HTML Canvas API

## 🚀 Getting Started

To run Pixshop locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd pixshop
    ```

2.  **Install dependencies:**
    *This project uses `esm.sh` for on-the-fly module loading, so no traditional `npm install` is needed for the listed dependencies. Ensure you have a local server to serve the `index.html` file.*

3.  **Set up your Environment Variable:**
    The application requires a Google Gemini API key. It must be available as `process.env.API_KEY`. How you set this will depend on your local development server setup.

4.  **Serve the application:**
    Use a simple local server to serve the `index.html` file. For example, using Python:
    ```bash
    python -m http.server
    ```
    Or using a tool like `live-server`.

5.  **Open in your browser:**
    Navigate to `http://localhost:<port>` to start using the application.
