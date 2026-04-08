import { Platform } from "react-native";
import config from "../../game.config.json";

const gameConfig = {
  get teammatesCount(): number {
    return Platform.OS === "web"
      ? config.teammates.web
      : config.teammates.mobile;
  },

  get timedModeDurationSeconds(): number {
    return Platform.OS === "web"
      ? config.timedModeDurationSeconds.web
      : config.timedModeDurationSeconds.mobile;
  },

  get maxRoundsCount(): number {
    return Platform.OS === "web"
      ? config.maxRounds.web
      : config.maxRounds.mobile;
  },

  correctGuessDelay: config.correctGuessDelay,
  incorrectGuessDelay: config.incorrectGuessDelay,
};

export default gameConfig;
