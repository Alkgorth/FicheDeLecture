import "@/global.css";

// Familles de polices
export const FontFamilies = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
} as const;

export const Fonts = {
  mono: "monospace",
} as const;

// Taille de texte
export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

// Poids de police
export const Typography = {
  title: {
    fontFamily: FontFamilies.bold,
    fontSize: FontSizes.xxl,
  },

  subtitle: {
    fontFamily: FontFamilies.semiBold,
    fontSize: FontSizes.lg,
  },

  body: {
    fontFamily: FontFamilies.regular,
    fontSize: FontSizes.md,
  },

  caption: {
    fontFamily: FontFamilies.medium,
    fontSize: FontSizes.sm,
  },

  button: {
    fontFamily: FontFamilies.semiBold,
    fontSize: FontSizes.md,
  },
} as const;