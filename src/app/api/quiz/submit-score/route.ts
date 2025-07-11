// src/app/api/quiz/submit-score/route.ts

// ... (semua kode di atas tetap sama) ...

      // b. Cek apakah pengguna sudah menyelesaikan quest ini MINGGU INI.
      // Logika baru yang lebih akurat
      const today = new Date();
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))); // Mulai dari Senin
      firstDayOfWeek.setHours(0, 0, 0, 0);

      const { data: existingCompletion, error: checkError } = await supabase
          .from('user_quest_completions')
          .select('id', { count: 'exact' }) // Hanya butuh hitungannya
          .eq('user_fid', userFid)
          .eq('quest_id', questData.id)
          .gte('completed_at', firstDayOfWeek.toISOString()) // Cek dari awal minggu ini
          .limit(1);

      if (checkError) {
        console.error("Error checking for existing quest completion:", checkError);
      } else if (existingCompletion?.length === 0) { // Jika hitungannya 0, berarti belum selesai minggu ini
        // c. Jika belum ada, catat penyelesaian quest!
        // ... sisa kodenya sudah benar ...
      }
// ...
