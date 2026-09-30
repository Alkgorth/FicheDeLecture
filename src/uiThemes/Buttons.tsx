import { Colors } from "./Colors";

export const Buttons = {
  primary:{
    borderRadius: 12,
    padding: 12,
    backgroundColor: Colors.light.buttonBg,
  },
  secondary:{
    borderRadius: 12,
    padding: 10,
    backgroundColor: Colors.light.mainBg,
    borderColor:Colors.light.buttonBg,
    borderWidth:2,
  }
} as const;
