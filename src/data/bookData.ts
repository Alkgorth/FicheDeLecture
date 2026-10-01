// utils/search.ts
export type BookData = {
  id: string;
  userAvatar: string;
  userName: string;
  rating: number;
  bookImage: string;
  bookTitle: string;
  author: string;
  genres: string[];
  comment: string;
};

// Minuscules + suppression des accents + apostrophes typographiques normalisées
export const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, "'")
    .trim();

export const searchBooks = (books: BookData[], query: string): BookData[] => {
  const q = normalize(query);
  if (!q) return books;

  // Chaque mot saisi doit être présent dans le titre ou l'auteur
  const terms = q.split(/\s+/);

  return books.filter((book) => {
    const haystack = normalize(`${book.bookTitle} ${book.author}`);
    return terms.every((term) => haystack.includes(term));
  });
};
