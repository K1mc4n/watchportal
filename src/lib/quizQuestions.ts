// src/lib/quizQuestions.ts
export const weeklyQuestions = [
  { id: 1, questionText: "What is the core concept behind the $SECONDS token supply?", options: ["It decreases over time", "It's a fixed supply", "It grows by 1 token per second"] },
  { id: 2, questionText: "What was the approximate starting supply of $SECONDS?", options: ["~10 million", "~45 million", "~100 million"] },
  { id: 3, questionText: "What percentage of the initial supply is locked in liquidity?", options: ["50%", "75%", "90%"] },
  { id: 4, questionText: "According to the initial pricing, how many $SECONDS equal 1 $DEGEN?", options: ["1", "10", "100"] },
  { id: 5, questionText: "How much can you mint in a single transaction?", options: ["A fixed amount of 1,000", "An amount equal to your current holdings", "10% of your current holdings"] },
  { id: 6, questionText: "What happens to unclaimed $SECONDS from a previous minting period?", options: ["They are burned forever", "They are returned to the treasury", "They remain available for the next minting opportunity"] },
  { id: 7, questionText: "How long after the token deployment does minting begin?", options: ["Immediately", "24 hours", "Exactly one week"] },
  { id: 8, questionText: "What is the primary factor that determines your minting frequency?", options: ["Your wallet age", "The number of Farcaster followers you have", "The amount of $SECONDS you hold"] },
  { id: 9, questionText: "How many $SECONDS do you need to hold to be able to mint every DAY?", options: ["60", "3,600", "86,400"] },
  { id: 10, questionText: "If you hold 604,800 $SECONDS, how often are you eligible to mint?", options: ["Every Minute", "Every Hour", "Every Day"] },
  { id: 11, questionText: "What is the minimum holding requirement to mint every SECOND?", options: ["2,592,000", "31,536,000", "It's not possible"] },
  { id: 12, questionText: "True or False: Holding 60 $SECONDS allows you to mint every Week.", options: ["True", "False"] },
  { id: 13, questionText: "To mint every Week, how many $SECONDS must you hold?", options: ["604,800", "86,400", "3,600"] },
  { id: 14, questionText: "The tier to 'Mint every Minute' requires holding the number of seconds in a...?", options: ["Day", "Week", "Month"] },
  { id: 15, questionText: "What does the 'WW' tier, representing the number of seconds in a WEEK, allow you to do?", options: ["Mint every Day", "Mint every Hour", "Mint every Week"] },
  { id: 16, questionText: "Which of these holding amounts has the LEAST frequent minting interval?", options: ["60 SECONDS", "3,600 SECONDS", "86,400 SECONDS"] },
  { id: 17, questionText: "If the price of $DEGEN is $0.02, what is the initial price of one $SECONDS token?", options: ["$0.02", "$0.002", "$0.0002"] },
  { id: 18, questionText: "The starting supply of $SECONDS is based on the time elapsed since which token's launch?", options: ["$SECONDS", "$WARP", "$DEGEN"] },
  { id: 19, questionText: "Holding 3,600 $SECONDS (the amount per HOUR) allows you to mint how often?", options: ["Every Hour", "Every Week", "Every Day"] },
  { id: 20, questionText: "True or False: The more $SECONDS you hold, the more frequently you can mint.", options: ["True", "False"] }
];

export const correctAnswers = new Map<number, number>([
  [1, 2], [2, 1], [3, 2], [4, 2], [5, 1], [6, 2], [7, 2], [8, 2], [9, 2], [10, 1],
  [11, 1], [12, 1], [13, 2], [14, 2], [15, 1], [16, 0], [17, 2], [18, 2], [19, 1], [20, 0]
]);
