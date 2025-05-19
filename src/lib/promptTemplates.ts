// Template untuk bagian tujuan kotbah
export const purposeTemplate = `
TUJUAN KOTBAH:
1. Menyampaikan satu kebenaran utama tentang "{topic}"
2. Mendorong perubahan spiritual/perilaku yang konkret
3. Mengaitkan dengan tantangan kontemporer yang relevan
`;

// Template untuk bagian penelitian Alkitab
export const bibleResearchTemplate = `
PENELITIAN ALKITAB:
1. Identifikasi 7-10 ayat utama yang mendukung tema
2. Perhatikan pola atau kata kunci yang berulang di ayat-ayat tersebut
3. Sertakan kisah/tokoh Alkitab yang mendemonstrasikan tema ini
`;

// Template untuk bagian struktur kotbah
export const sermonStructureTemplate = `
STRUKTUR KOTBAH:
Ikuti struktur {structure} dengan detail sebagai berikut:

1. Judul yang menarik dan menangkap esensi pesan
   - Gunakan judul yang singkat, mudah diingat, dan memicu keingintahuan

2. Daftar ayat-ayat utama yang akan digunakan
   - Sertakan referensi lengkap (kitab, pasal, ayat)

3. Pendahuluan dengan "hook" yang sesuai:
   - Untuk topical: Pertanyaan reflektif atau pernyataan yang merangsang pemikiran
   - Untuk exegesis: Pertanyaan tentang makna tersembunyi teks
   - Untuk narrative: Narasi dramatis yang mengundang pendengar masuk ke dalam cerita
   - Untuk expository: Kutipan langsung dari teks yang menantang
   - Untuk textual: Sorotan frasa spesifik dalam ayat

4. Definisi dan klarifikasi:
   - Apa yang BUKAN tema ini (menghilangkan kesalahpahaman)
   - Apa yang SESUNGGUHNYA tema ini (definisi positif)
   - Paradoks atau ketegangan dalam tema ini (jika ada)

5. 3-4 poin utama yang mengikuti pola struktur:
   - Setiap poin harus memiliki judul yang jelas dan mudah diingat
   - Setiap poin harus didukung ayat-ayat Alkitab yang relevan
   - Setiap poin harus menyertakan penjelasan singkat tentang teks
   - Setiap poin harus menyertakan ilustrasi yang sesuai dengan jenis struktur
   - Gunakan transisi yang efektif antar poin
`;

// Template untuk bagian aplikasi praktis
export const applicationTemplate = `
6. Aplikasi praktis yang disesuaikan untuk audiens {audience}:
   - Aplikasi bagi individu
   - Aplikasi dalam keluarga
   - Aplikasi dalam komunitas gereja
   - Aplikasi di tempat kerja/sekolah/masyarakat
`;

// Template untuk bagian call to action
export const callToActionTemplate = `
7. Panggilan untuk respons:
   - Sertakan pertanyaan reflektif untuk perenungan
   - Ajakan untuk komitmen spesifik
   - Doa penutup yang meminta pertolongan Tuhan
`;

// Template untuk format outline kotbah
export const formatTemplate = `
Format outline kotbah dalam format markdown dengan heading dan bullet point yang jelas.
`;

// Template untuk instruksi tambahan dari user
export const customInstructionsTemplate = `
INSTRUKSI TAMBAHAN:
{customInstructions}
`;

// Template untuk hook berdasarkan struktur
export const hookTemplates = {
  topical:
    "Pertanyaan reflektif atau pernyataan yang merangsang pemikiran tentang {topic}",
  exegesis: "Pertanyaan tentang makna tersembunyi dari {bibleVerse}",
  narrative: "Narasi dramatis yang mengundang pendengar masuk ke dalam cerita",
  expository: "Kutipan langsung dari {bibleVerse} yang menantang",
  textual: "Sorotan frasa spesifik dalam {bibleVerse}",
};

// Template untuk aplikasi berdasarkan audience
export const applicationTemplates = {
  general: `
  - Aplikasi untuk orang dewasa dalam kehidupan sehari-hari
  - Aplikasi dalam konteks keluarga
  - Aplikasi dalam pekerjaan dan masyarakat
  `,
  youth: `
  - Aplikasi untuk kehidupan sekolah/kampus
  - Aplikasi dalam hubungan dengan teman sebaya
  - Aplikasi dalam penggunaan teknologi dan media sosial
  `,
};
