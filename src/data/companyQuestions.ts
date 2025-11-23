export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const companyQuestionSets: { [key: string]: Question[] } = {
  Google: [
    {
      id: 1,
      question: "If a train travels 120 km in 2 hours, what is its average speed?",
      options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "What is 15% of 200?",
      options: ["25", "30", "35", "40"],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "If x + 5 = 12, what is x?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "Complete the pattern: 2, 5, 10, 17, 26, ?",
      options: ["35", "37", "40", "42"],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
      options: ["38", "40", "42", "44"],
      correctAnswer: 2
    },
    {
      id: 6,
      question: "If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?",
      options: ["8", "9", "10", "12"],
      correctAnswer: 2
    },
    {
      id: 7,
      question: "A car covers 180 km in 3 hours. How much distance will it cover in 5 hours at the same speed?",
      options: ["280 km", "300 km", "320 km", "340 km"],
      correctAnswer: 1
    },
    {
      id: 8,
      question: "What is the average of 10, 20, 30, 40, and 50?",
      options: ["25", "30", "35", "40"],
      correctAnswer: 1
    },
    {
      id: 9,
      question: "If 2x - 3 = 7, what is the value of x?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2
    },
    {
      id: 10,
      question: "Which word does not belong: Book, Magazine, Newspaper, Television?",
      options: ["Book", "Magazine", "Newspaper", "Television"],
      correctAnswer: 3
    },
    {
      id: 11,
      question: "What is 3/4 of 80?",
      options: ["50", "55", "60", "65"],
      correctAnswer: 2
    },
    {
      id: 12,
      question: "If a product costs $50 after a 10% discount, what was the original price?",
      options: ["$52.50", "$55", "$55.56", "$60"],
      correctAnswer: 2
    },
    {
      id: 13,
      question: "What is the next number: 1, 4, 9, 16, 25, ?",
      options: ["30", "32", "35", "36"],
      correctAnswer: 3
    },
    {
      id: 14,
      question: "A person invests $1000 at 5% simple interest per annum. What is the interest after 2 years?",
      options: ["$50", "$75", "$100", "$150"],
      correctAnswer: 2
    },
    {
      id: 15,
      question: "If the perimeter of a square is 40 cm, what is its area?",
      options: ["80 cm²", "100 cm²", "120 cm²", "160 cm²"],
      correctAnswer: 1
    },
    {
      id: 16,
      question: "Find the odd one out: 3, 5, 11, 14, 17, 21",
      options: ["3", "5", "14", "21"],
      correctAnswer: 2
    },
    {
      id: 17,
      question: "A cistern can be filled in 6 hours but due to a leak, it takes 8 hours. How long will the leak take to empty the full cistern?",
      options: ["20 hours", "22 hours", "24 hours", "26 hours"],
      correctAnswer: 2
    },
    {
      id: 18,
      question: "What is the compound interest on $1000 for 2 years at 10% per annum?",
      options: ["$200", "$210", "$220", "$230"],
      correctAnswer: 1
    },
    {
      id: 19,
      question: "If a:b = 2:3 and b:c = 4:5, what is a:c?",
      options: ["8:15", "2:5", "6:10", "4:9"],
      correctAnswer: 0
    },
    {
      id: 20,
      question: "A man can complete a work in 10 days. Another man can do the same work in 15 days. How long will they take together?",
      options: ["5 days", "6 days", "7 days", "8 days"],
      correctAnswer: 1
    },
    {
      id: 21,
      question: "What is the sum of first 10 natural numbers?",
      options: ["45", "50", "55", "60"],
      correctAnswer: 2
    },
    {
      id: 22,
      question: "If 5 workers can complete a task in 12 days, how many days will 10 workers take?",
      options: ["4 days", "5 days", "6 days", "8 days"],
      correctAnswer: 2
    },
    {
      id: 23,
      question: "What is the probability of getting a head when tossing a fair coin?",
      options: ["0.25", "0.33", "0.5", "0.75"],
      correctAnswer: 2
    },
    {
      id: 24,
      question: "If the cost price is $80 and selling price is $100, what is the profit percentage?",
      options: ["20%", "25%", "30%", "35%"],
      correctAnswer: 1
    },
    {
      id: 25,
      question: "What is the next term in: 5, 10, 20, 40, ?",
      options: ["60", "70", "80", "90"],
      correctAnswer: 2
    },
    {
      id: 26,
      question: "A rectangle has length 12 cm and width 8 cm. What is its perimeter?",
      options: ["36 cm", "40 cm", "44 cm", "48 cm"],
      correctAnswer: 1
    },
    {
      id: 27,
      question: "If 3x + 5 = 20, what is x?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2
    },
    {
      id: 28,
      question: "What is 12² - 10²?",
      options: ["22", "40", "44", "48"],
      correctAnswer: 2
    },
    {
      id: 29,
      question: "A bag contains 5 red and 3 blue balls. What is the probability of drawing a red ball?",
      options: ["3/8", "5/8", "1/2", "2/3"],
      correctAnswer: 1
    },
    {
      id: 30,
      question: "If the area of a circle is 154 cm², what is its radius? (Use π ≈ 22/7)",
      options: ["5 cm", "6 cm", "7 cm", "8 cm"],
      correctAnswer: 2
    }
  ],
  Amazon: [
    {
      id: 1,
      question: "A warehouse has 480 items. If 25% are damaged, how many items are in good condition?",
      options: ["320", "340", "360", "380"],
      correctAnswer: 2
    },
    {
      id: 2,
      question: "If a package weighs 2.5 kg and shipping costs $3 per kg, what is the total shipping cost?",
      options: ["$6.50", "$7.00", "$7.50", "$8.00"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "What is 18% of 250?",
      options: ["40", "42", "45", "48"],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "A customer buys 3 items at $15 each and gets a 10% discount. What is the final price?",
      options: ["$38.50", "$40.50", "$42.00", "$43.50"],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "Complete the sequence: 7, 14, 28, 56, ?",
      options: ["84", "96", "112", "120"],
      correctAnswer: 2
    },
    {
      id: 6,
      question: "If 8 workers can pack 240 boxes in a day, how many boxes can 12 workers pack?",
      options: ["300", "320", "360", "380"],
      correctAnswer: 2
    },
    {
      id: 7,
      question: "What is the average delivery time if orders take 2, 3, 4, 5, and 6 hours?",
      options: ["3 hours", "4 hours", "4.5 hours", "5 hours"],
      correctAnswer: 1
    },
    {
      id: 8,
      question: "If 4y + 8 = 24, what is y?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2
    },
    {
      id: 9,
      question: "A product's price increased from $40 to $50. What is the percentage increase?",
      options: ["20%", "25%", "30%", "35%"],
      correctAnswer: 1
    },
    {
      id: 10,
      question: "What comes next: 3, 9, 27, 81, ?",
      options: ["162", "216", "243", "324"],
      correctAnswer: 2
    },
    {
      id: 11,
      question: "If a:b = 5:3 and b = 15, what is a?",
      options: ["20", "25", "30", "35"],
      correctAnswer: 1
    },
    {
      id: 12,
      question: "A van travels at 60 km/h for 2.5 hours. What distance does it cover?",
      options: ["120 km", "140 km", "150 km", "180 km"],
      correctAnswer: 2
    },
    {
      id: 13,
      question: "What is 2/5 of 125?",
      options: ["45", "50", "55", "60"],
      correctAnswer: 1
    },
    {
      id: 14,
      question: "Find the odd one: Circle, Square, Triangle, Rectangle, Hexagon",
      options: ["Circle", "Square", "Triangle", "Hexagon"],
      correctAnswer: 0
    },
    {
      id: 15,
      question: "If sales increased by 20% and then decreased by 15%, what is the net change?",
      options: ["2% increase", "5% decrease", "2% decrease", "5% increase"],
      correctAnswer: 0
    },
    {
      id: 16,
      question: "What is the sum of 23 + 17 + 45?",
      options: ["75", "80", "85", "90"],
      correctAnswer: 2
    },
    {
      id: 17,
      question: "A box has dimensions 10cm × 8cm × 6cm. What is its volume?",
      options: ["420 cm³", "460 cm³", "480 cm³", "500 cm³"],
      correctAnswer: 2
    },
    {
      id: 18,
      question: "Complete: 5, 8, 13, 20, 29, ?",
      options: ["38", "40", "42", "44"],
      correctAnswer: 1
    },
    {
      id: 19,
      question: "If 30% of a number is 90, what is the number?",
      options: ["270", "280", "300", "320"],
      correctAnswer: 2
    },
    {
      id: 20,
      question: "What is 15² - 12²?",
      options: ["75", "81", "87", "93"],
      correctAnswer: 1
    },
    {
      id: 21,
      question: "A delivery driver covers 40 km in 30 minutes. What is their speed in km/h?",
      options: ["70", "75", "80", "85"],
      correctAnswer: 2
    },
    {
      id: 22,
      question: "If 6 machines produce 180 units in an hour, how many units do 10 machines produce?",
      options: ["280", "300", "320", "340"],
      correctAnswer: 1
    },
    {
      id: 23,
      question: "What is 40% of 75?",
      options: ["25", "28", "30", "32"],
      correctAnswer: 2
    },
    {
      id: 24,
      question: "Find the next number: 2, 4, 8, 16, ?",
      options: ["24", "28", "32", "36"],
      correctAnswer: 2
    },
    {
      id: 25,
      question: "If x - 7 = 15, what is x?",
      options: ["20", "21", "22", "23"],
      correctAnswer: 2
    },
    {
      id: 26,
      question: "What is the probability of rolling a 4 on a standard die?",
      options: ["1/8", "1/6", "1/5", "1/4"],
      correctAnswer: 1
    },
    {
      id: 27,
      question: "A product costs $120 with a 15% tax. What is the final price?",
      options: ["$135", "$138", "$140", "$142"],
      correctAnswer: 1
    },
    {
      id: 28,
      question: "What is the average of 15, 25, 35, and 45?",
      options: ["25", "28", "30", "32"],
      correctAnswer: 2
    },
    {
      id: 29,
      question: "If a rectangle has perimeter 50 cm and length 15 cm, what is its width?",
      options: ["8 cm", "10 cm", "12 cm", "14 cm"],
      correctAnswer: 1
    },
    {
      id: 30,
      question: "Complete: 100, 95, 85, 70, ?",
      options: ["50", "55", "60", "65"],
      correctAnswer: 0
    }
  ],
  Microsoft: [
    {
      id: 1,
      question: "If a binary number 1011 is converted to decimal, what is the result?",
      options: ["9", "10", "11", "12"],
      correctAnswer: 2
    },
    {
      id: 2,
      question: "What is 22% of 350?",
      options: ["75", "77", "79", "81"],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "Complete the logic: A is to B as C is to ?",
      options: ["D", "E", "F", "G"],
      correctAnswer: 0
    },
    {
      id: 4,
      question: "If 3x + 9 = 27, what is x?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2
    },
    {
      id: 5,
      question: "What is the next prime number after 17?",
      options: ["18", "19", "20", "21"],
      correctAnswer: 1
    },
    {
      id: 6,
      question: "A software costs $120 with a 20% discount. What is the sale price?",
      options: ["$90", "$95", "$96", "$100"],
      correctAnswer: 2
    },
    {
      id: 7,
      question: "Complete: 1, 1, 2, 3, 5, 8, ?",
      options: ["11", "12", "13", "14"],
      correctAnswer: 2
    },
    {
      id: 8,
      question: "What is 5/8 of 160?",
      options: ["95", "100", "105", "110"],
      correctAnswer: 1
    },
    {
      id: 9,
      question: "If a server processes 240 requests in 4 minutes, what is the rate per minute?",
      options: ["50", "55", "60", "65"],
      correctAnswer: 2
    },
    {
      id: 10,
      question: "What is the square root of 256?",
      options: ["14", "15", "16", "17"],
      correctAnswer: 2
    },
    {
      id: 11,
      question: "Find the odd one: Java, Python, HTML, C++",
      options: ["Java", "Python", "HTML", "C++"],
      correctAnswer: 2
    },
    {
      id: 12,
      question: "If 7y - 5 = 16, what is y?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1
    },
    {
      id: 13,
      question: "What is 30% of 80 plus 20% of 50?",
      options: ["32", "34", "36", "38"],
      correctAnswer: 1
    },
    {
      id: 14,
      question: "Complete the pattern: 4, 9, 16, 25, ?",
      options: ["30", "32", "34", "36"],
      correctAnswer: 3
    },
    {
      id: 15,
      question: "If a cloud service costs $5 per hour and runs for 6.5 hours, what is the cost?",
      options: ["$30", "$31.50", "$32.50", "$33"],
      correctAnswer: 2
    },
    {
      id: 16,
      question: "What is the average of 12, 18, 24, 30, and 36?",
      options: ["22", "24", "26", "28"],
      correctAnswer: 1
    },
    {
      id: 17,
      question: "If x² = 144, what is x?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2
    },
    {
      id: 18,
      question: "What comes next: 2, 6, 18, 54, ?",
      options: ["108", "126", "162", "216"],
      correctAnswer: 2
    },
    {
      id: 19,
      question: "A project takes 8 hours with 4 developers. How long with 8 developers?",
      options: ["2 hours", "3 hours", "4 hours", "5 hours"],
      correctAnswer: 2
    },
    {
      id: 20,
      question: "What is 18 × 12?",
      options: ["206", "212", "216", "220"],
      correctAnswer: 2
    },
    {
      id: 21,
      question: "If a:b = 4:7 and a = 12, what is b?",
      options: ["18", "21", "24", "28"],
      correctAnswer: 1
    },
    {
      id: 22,
      question: "What is the next number: 3, 7, 15, 31, ?",
      options: ["47", "55", "63", "71"],
      correctAnswer: 2
    },
    {
      id: 23,
      question: "If RAM costs $25 and you buy 4 units with 10% discount, what do you pay?",
      options: ["$85", "$90", "$95", "$100"],
      correctAnswer: 1
    },
    {
      id: 24,
      question: "What is 25% of 25% of 400?",
      options: ["20", "25", "30", "35"],
      correctAnswer: 1
    },
    {
      id: 25,
      question: "Complete: 81, 64, 49, 36, ?",
      options: ["20", "24", "25", "30"],
      correctAnswer: 2
    },
    {
      id: 26,
      question: "If 2x + 2x = 20, what is x?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1
    },
    {
      id: 27,
      question: "What is the cube of 5?",
      options: ["100", "115", "125", "135"],
      correctAnswer: 2
    },
    {
      id: 28,
      question: "A database has 1200 records. If 15% are duplicates, how many unique records?",
      options: ["960", "1000", "1020", "1050"],
      correctAnswer: 2
    },
    {
      id: 29,
      question: "What is 14² + 2²?",
      options: ["196", "200", "204", "208"],
      correctAnswer: 1
    },
    {
      id: 30,
      question: "If bandwidth is 100 Mbps and 40% is used, how much is available?",
      options: ["50 Mbps", "55 Mbps", "60 Mbps", "65 Mbps"],
      correctAnswer: 2
    }
  ]
};

// Fallback to Google questions if company not found
export const getQuestions = (companyName: string): Question[] => {
  return companyQuestionSets[companyName] || companyQuestionSets.Google;
};
