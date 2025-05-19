import axios from "axios";
import { SermonFormData } from "@/types";
import {
  purposeTemplate,
  bibleResearchTemplate,
  sermonStructureTemplate,
  formatTemplate,
  customInstructionsTemplate,
  applicationTemplate,
  callToActionTemplate,
  // Saat ini tidak digunakan, tetapi dapat digunakan untuk pengembangan lebih lanjut
  // hookTemplates,
  // applicationTemplates,
} from "./promptTemplates";

const API_URL =
  process.env.MISTRAL_API_URL || "https://api.mistral.ai/v1/chat/completions";
const API_KEY = process.env.MISTRAL_API_KEY;

// Define the structure descriptions
const structureDescriptions = {
  topical:
    "Fokus pada tema tertentu (misal: kasih, pengampunan) yang didukung oleh multi-ayat dari berbagai kitab. Struktur: (1) Pendahuluan dengan hook berupa pertanyaan reflektif atau pernyataan yang merangsang pemikiran, (2) Definisi dan klarifikasi tema, (3) 3-4 poin utama dengan ayat-ayat pendukung dari berbagai kitab, (4) Ilustrasi personal/kontemporer untuk setiap poin, (5) Aplikasi praktis dalam berbagai konteks kehidupan, (6) Panggilan untuk respons dengan pertanyaan reflektif dan komitmen spesifik.",
  exegesis:
    "Analisis mendalam satu teks Alkitab dengan pendalaman bahasa asli, konteks historis, dan struktur sastra. Struktur: (1) Pendahuluan dengan hook berupa pertanyaan tentang makna tersembunyi teks, (2) Penjelasan konteks historis dan latar belakang teks, (3) Analisis kata-kata kunci dalam bahasa Yunani/Ibrani, (4) Eksplorasi implikasi teologis, (5) Ilustrasi dari konteks sejarah atau budaya, (6) Aplikasi kontemporer yang menjembatani gap antara teks kuno dan kehidupan modern, (7) Panggilan untuk merespons kebenaran dengan pertanyaan 'Bagaimana jika...?'",
  narrative:
    "Bercerita dengan alur yang menarik (konflik, klimaks, resolusi) berdasarkan kisah Alkitab. Struktur: (1) Hook berupa narasi dramatis yang mengundang pendengar masuk ke dalam cerita, (2) Penggambaran latar, karakter, dan konflik dalam kisah, (3) Pendalaman dialog dan momen-momen kunci dalam narasi, (4) Klimaks cerita dengan penekanan pada pelajaran spiritual, (5) Ilustrasi visual dan deskriptif yang membuat cerita hidup, (6) Aplikasi dengan mengidentifikasi diri dalam karakter cerita, (7) Panggilan untuk 'menulis bab berikutnya' dalam kehidupan pribadi.",
  expository:
    "Menjelaskan satu perikop secara sistematis (ayat demi ayat) dengan pendekatan holistik. Struktur: (1) Pendahuluan dengan hook berupa kutipan langsung dari teks yang menantang, (2) Penjelajahan lintas Testament untuk menunjukkan kontinuitas tema, (3) Pembagian perikop menjadi bagian-bagian logis, (4) Analisis mendalam setiap bagian dengan metode 5W+1H, (5) Ilustrasi berupa data atau kisah yang memperkuat penafsiran, (6) Aplikasi praktis yang menunjukkan relevansi abadi dari prinsip alkitabiah, (7) Panggilan untuk tindakan dengan antitesis (kontras) yang jelas.",
  textual:
    "Menjelaskan satu ayat kunci dengan pendalaman makna dan implikasi. Struktur: (1) Pendahuluan dengan hook berupa sorotan frasa spesifik dalam ayat, (2) Definisi dan klarifikasi konsep utama dalam ayat, (3) Penjelasan simbol, metafora, atau konsep teologis, (4) Komparasi dengan ayat-ayat lain yang menggunakan konsep serupa, (5) Ilustrasi berupa perbandingan budaya atau analogi modern, (6) Aplikasi dengan triplet (kelompok tiga) untuk penekanan, (7) Penutup dengan paradoks spiritual yang memperdalam pemahaman.",
};

// Define the audience descriptions
const audienceDescriptions = {
  general:
    "Dewasa dan keluarga dari semua usia dalam jemaat gereja umum. Perlu aplikasi praktis yang relevan dengan kehidupan sehari-hari, pekerjaan, keluarga, dan masyarakat.",
  youth:
    "Remaja dan dewasa muda, usia 13-25 tahun. Perlu aplikasi yang relevan dengan kehidupan sekolah/kampus, pencarian identitas, hubungan dengan teman sebaya, dan penggunaan teknologi.",
};

export async function generateSermon(formData: SermonFormData) {
  try {
    const { topic, bibleVerse, structure, audience } = formData;

    // Fungsi untuk mengganti placeholder dalam template
    const replacePlaceholders = (template: string) => {
      return template
        .replace(/{topic}/g, topic)
        .replace(/{bibleVerse}/g, bibleVerse || "ayat yang relevan")
        .replace(/{structure}/g, structure)
        .replace(/{audience}/g, audience);
    };

    // Catatan: Fungsi-fungsi ini dapat digunakan untuk menyesuaikan prompt lebih lanjut
    // misalnya untuk menambahkan hook atau aplikasi khusus berdasarkan struktur dan audience
    /*
    const getHook = () => {
      const hookTemplate = hookTemplates[structure];
      return replacePlaceholders(hookTemplate);
    };

    const getApplication = () => {
      const applicationTemplate = applicationTemplates[audience];
      return replacePlaceholders(applicationTemplate);
    };
    */

    // Membuat prompt dengan template yang sudah dimodulasi
    const basePrompt = `
Generate a sermon outline on the topic: "${topic}"
${bibleVerse ? `Based on the Bible verse: ${bibleVerse}` : ""}
Sermon structure: ${structure} (${structureDescriptions[structure]})
Target audience: ${audience} (${audienceDescriptions[audience]})
Gunakan Alkitab terjemahan dari LAI (Lembaga Alkitab Indonesia)
`;

    // Menggabungkan bagian prompt berdasarkan opsi kustomisasi
    const customOptions = formData.customPromptOptions || {
      includePurpose: true,
      includeBibleResearch: true,
      includeApplications: true,
      includeCallToAction: true,
    };

    // Membangun prompt berdasarkan opsi yang dipilih
    let finalPrompt = basePrompt;

    // Menambahkan bagian tujuan kotbah jika dipilih
    if (customOptions.includePurpose !== false) {
      finalPrompt += replacePlaceholders(purposeTemplate);
    }

    // Menambahkan bagian penelitian Alkitab jika dipilih
    if (customOptions.includeBibleResearch !== false) {
      finalPrompt += replacePlaceholders(bibleResearchTemplate);
    }

    // Selalu sertakan struktur kotbah
    finalPrompt += replacePlaceholders(sermonStructureTemplate);

    // Menambahkan bagian aplikasi praktis jika dipilih
    if (customOptions.includeApplications !== false) {
      finalPrompt += replacePlaceholders(applicationTemplate);
    }

    // Menambahkan bagian call to action jika dipilih
    if (customOptions.includeCallToAction !== false) {
      finalPrompt += replacePlaceholders(callToActionTemplate);
    }

    // Menambahkan instruksi kustom jika ada
    if (customOptions.customInstructions) {
      const customInstructions = replacePlaceholders(
        customInstructionsTemplate.replace(
          /{customInstructions}/g,
          customOptions.customInstructions
        )
      );
      finalPrompt += customInstructions;
    }

    // Selalu sertakan format
    finalPrompt += replacePlaceholders(formatTemplate);

    // Prompt final
    const prompt = finalPrompt;

    // Make the API request to Mistral AI
    const response = await axios.post(
      API_URL,
      {
        model: "mistral-large-latest", // You can change this to any model supported by Mistral AI
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // Extract the generated sermon from the response
    const generatedContent = response.data.choices[0].message.content;

    return {
      content: generatedContent,
    };
  } catch (error) {
    console.error("Error generating sermon:", error);
    return {
      content: "",
      error: "Failed to generate sermon. Please try again later.",
    };
  }
}
