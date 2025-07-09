// src/app/api/chat/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Fungsi untuk menangani request POST ke endpoint ini
export async function POST(request: NextRequest) {
  // 1. Ambil pesan dari body request yang dikirim oleh front-end
  const { message } = await request.json();

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  // 2. Ambil API key dari environment variables (ini aman, tidak terekspos ke klien)
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google API key is not configured" },
      { status: 500 }
    );
  }

  try {
    // 3. Inisialisasi model Google AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Menggunakan model flash yang cepat

    // 4. Konfigurasi prompt untuk membuat AI menjadi seorang ahli kripto
    const prompt = `
      You are "Coin Sage", a friendly and knowledgeable AI assistant for the Watchcoin Portal.
      Your expertise is in cryptocurrency, blockchain, Farcaster, and Web3 technology.
      Always answer concisely and in simple terms, as if explaining to a smart beginner.
      Avoid financial advice. Your goal is to educate and clarify concepts.
      
      User's question: "${message}"
    `;

    // 5. Hasilkan konten dari model AI
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // 6. Kembalikan jawaban dari AI ke front-end
    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Error calling Google AI:", error);
    return NextResponse.json(
      { error: "Failed to get a response from the AI model." },
      { status: 500 }
    );
  }
}
