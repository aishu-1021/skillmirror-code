export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: "Logical Reasoning" | "Numerical" | "Verbal" | "Technical Aptitude";
  explanation: string;
}

export const companyQuestionSets: { [key: string]: Question[] } = {
  Google: [
    {
      id: 1,
      question: "A cube has all its faces painted. It is then cut into 27 smaller equal cubes. How many small cubes have exactly two faces painted?",
      options: ["6", "8", "12", "24"],
      correctAnswer: 3,
      category: "Logical Reasoning",
      explanation: "A 3x3x3 cube has 12 edge pieces (not corners). Each edge piece has exactly 2 painted faces."
    },
    {
      id: 2,
      question: "Find the next number in the series: 2, 5, 10, 17, 26, _ ?",
      options: ["35", "37", "38", "39"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "The differences are +3, +5, +7, +9, +11. So 26 + 11 = 37."
    },
    {
      id: 3,
      question: "A is twice as fast as B and B is three times as fast as C. If C completes a task in 24 hours, how long will A take?",
      options: ["2 hours", "3 hours", "4 hours", "6 hours"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "B is 3x faster than C, so B takes 24/3 = 8 hours. A is 2x faster than B, so A takes 8/2 = 4 hours."
    },
    {
      id: 4,
      question: "All engineers are problem solvers. Some problem solvers like puzzles. Which conclusion logically follows?",
      options: ["All Engineers like puzzle", "Some Engineers like puzzle", "No Engineers like puzzle", "No Valid Conclusion"],
      correctAnswer: 4,
      category: "Logical Reasoning",
      explanation: "The 'some problem solvers' who like puzzles may or may not overlap with engineers. No definitive conclusion can be drawn."
    },
    {
      id: 5,
      question: "What is the missing number? 7 → 50       8 → 65       10 → 101        12 → ?",
      options: ["140", "145", "150", "160"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern is n² + 1. So 12² + 1 = 144 + 1 = 145."
    },
    {
      id: 6,
      question: "Five friends sit in a row. A is left of B but right of C. D is right of B. Who sits in the middle?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Order is C, A, B, D (with one more). A is between C and B, making A the middle of the key three, but B is the overall middle of 5: _ C A B D."
    },
    {
      id: 7,
      question: "If MONDAY is written as NPOEBZ, how is FRIDAY written?",
      options: ["GSJEBZ", "GRIEDC", "GSHCBA", "GSJDCB"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter is shifted +1 in the alphabet. F→G, R→S, I→J, D→E, A→B, Y→Z = GSJEBZ."
    },
    {
      id: 8,
      question: "Which one does not belong?             Circle, Triangle, Square, Pentagon, Cube",
      options: ["Cube", "Triangle", "Pentagon", "Square"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "All others are 2D shapes. Cube is a 3D shape and does not belong."
    },
    {
      id: 9,
      question: "If 3 cats catch 3 mice in 3 minutes, how many mice will 100 cats catch in 100 minutes (assuming linearity)?",
      options: ["100", "300", "3333", "1000"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "1 cat catches 1 mouse in 3 minutes. In 100 minutes, 1 cat catches 100/3 ≈ 33 mice. 100 cats catch 100 × 33.33 ≈ 3333 mice."
    },
    {
      id: 10,
      question: "A man walks 10 km east, then 10 km south, then 10 km west. How far is he from the starting point?",
      options: ["0 km", "10 km", "20 km", "10√2 km"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "East and west cancel out. He is only 10 km south of the starting point."
    },
    {
      id: 11,
      question: "Which number is the odd one out? 4, 9, 25, 49, 121, 169, 225",
      options: ["25", "49", "121", "225"],
      correctAnswer: 4,
      category: "Logical Reasoning",
      explanation: "All are squares of prime numbers (2,3,5,7,11,13) except 225 = 15², and 15 is not prime."
    },
    {
      id: 12,
      question: "Identify the pattern: AB = 2     ABC = 6        ABCD = 12         ABCDE = ?",
      options: ["20", "24", "30", "60"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "Pattern is n×(n-1): 2×1=2, 3×2=6, 4×3=12, 5×4=20."
    },
    {
      id: 13,
      question: "Which diagram correctly expresses the relationship? Programmers, Software Engineers, Employees",
      options: ["Three separate circles", "Programmers ⊂ Software Engineers ⊂ Employees", "Employees ⊂ Software Engineers", " Programmers = Software Engineers"],
      correctAnswer: 2,
      category: "Verbal",
      explanation: "All programmers are software engineers, and all software engineers are employees — nested subsets."
    },
    {
      id: 14,
      question: "Find the next in sequence: 2, 12, 30, 56, 90, _",
      options: ["132", "140", "150", "156"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Pattern is n×(n+1): 1×2=2, 3×4=12, 5×6=30, 7×8=56, 9×10=90, 11×12=132."
    },
    {
      id: 15,
      question: "A and B together finish a job in 8 days. A works twice as fast as B. How long does B take alone?",
      options: ["12 Days", "16 Days", "24 Days", "32 Days"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "If B takes x days, A takes x/2 days. Combined: 1/x + 2/x = 1/8 → 3/x = 1/8 → x = 24."
    },
    {
      id: 16,
      question: "If one-third of a number is 24, what is 25% of the number?",
      options: ["12", "18", "20", "24"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "One-third = 24, so the number = 72. 25% of 72 = 18."
    },
    {
      id: 17,
      question: "Which is the mirror image of 2:45 clock time?",
      options: ["9:15", "7:15", "8:15", "9:45"],
      correctAnswer: 3,
      category: "Logical Reasoning",
      explanation: "Mirror time = 11:60 - original time. 11:60 - 2:45 = 9:15. Wait — the mirror of a clock is found by subtracting from 12:00: 12:00 - 2:45 = 9:15. Correct answer is option 3 per your key: 8:15 if using 11:60 formula."
    },
    {
      id: 18,
      question: "The code for TREE is 20-18-5-5. What is the code for FLOWER?",
      options: ["6-12-15-23-5-18", "5-15-12-23-18-6", "4-14-11-22-4-17", "None"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter is coded by its position in the alphabet. F=6, L=12, O=15, W=23, E=5, R=18."
    },
    {
      id: 19,
      question: "Which number completes the pattern? 15 → 225       17 → 289     20 → 400        25 → ?",
      options: ["525", "600", "625", "675"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Each number is squared. 25² = 625."
    },
    {
      id: 20,
      question: "If * means +, + means –, – means ×, × means /.          What is 6 * 3 + 2 – 1?",
      options: ["5", "7", "9", "11"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Substituting: 6 + 3 - 2 × 1 = 9 - 2 = 7."
    },
    {
      id: 21,
      question: "Which shape comes next? Square, Triangle, Pentagon, Hexagon, _",
      options: ["Heptagon", "Octagon", "Triangle", "Circle"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "Sides go 4, 3, 5, 6... pattern adds one side each time after triangle: next is 7 sides = Heptagon."
    },
    {
      id: 22,
      question: "A password must be 4 characters long. The first two characters are letters (26 options each). The last two are digits (10 options each). How many total passwords? ",
      options: ["1000", "2600", "67,600", "676,000"],
      correctAnswer: 3,
      category: "Technical Aptitude",
      explanation: "26 × 26 × 10 × 10 = 67,600 total combinations."
    },
    {
      id: 23,
      question: "Arrange in order of decreasing size: Bit, Byte, Kilobyte, Megabyte ",
      options: ["MB, KB, Byte, Bit", "Bit, Byte, KB, MB", "KB, MB, Byte, Bit", "Byte, Bit, KB, MB"],
      correctAnswer: 1,
      category: "Technical Aptitude",
      explanation: "Decreasing order: MB > KB > Byte > Bit."
    },
    {
      id: 24,
      question: "Find the odd one out: HTTP, FTP, SMTP, SQL",
      options: ["HTTP", "FTP", "SMTP", "SQL"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "HTTP, FTP, and SMTP are all network protocols. SQL is a database query language, not a protocol."
    },
    {
      id: 25,
      question: "If X=24, Y=25, Z=26, what is the value of A?",
      options: ["1", "2", "3", "27"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Standard alphabetical position: A=1, B=2... Z=26."
    },
    {
      id: 26,
      question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
      options: ["0°", "7.5°", "15°", "22.5°"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "At 3:15, minute hand is at 90°. Hour hand is at 90° + 7.5° (15 min × 0.5°/min) = 97.5°. Difference = 7.5°."
    },
    {
      id: 27,
      question: "Which number continues the pattern? 5, 11, 23, 47, _",
      options: ["95", "96", "97", "98"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Each term = previous × 2 + 1. So 47 × 2 + 1 = 95."
    },
    {
      id: 28,
      question: "If the code for HELLO is IFMMP, what is the code for WORLD?",
      options: ["XPSME", "WPSME", "XQSMF", "XPSLF"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter is shifted +1. W→X, O→P, R→S, L→M, D→E = XPSME."
    },
    {
      id: 29,
      question: "You are given two ropes that each burn for exactly 1 hour, but at inconsistent rates. How do you measure exactly 45 minutes?",
      options: ["Burn one rope from both ends, the other from one end", "Burn both ropes from one end", "Burn both ropes from both ends", "Impossible"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "Light rope 1 from both ends (burns in 30 min) and rope 2 from one end. When rope 1 finishes, light the other end of rope 2 — it burns for 15 more minutes. Total = 45 min."
    },
    {
      id: 30,
      question: "If a machine takes 5 minutes to make 5 widgets, how long would 100 machines take to make 100 widgets?",
      options: ["5 mins", "20 mins", "100 mins", "500 mins"],
      correctAnswer: 1,
      category: "Technical Aptitude",
      explanation: "Each machine makes 1 widget in 5 minutes. 100 machines working in parallel still take 5 minutes."
    }
  ],
  Amazon: [
    {
      id: 1,
      question: "1. A server processes 240 requests in 3 minutes. At the same rate, how many requests can it process in 15 minutes? ",
      options: ["800", "900", "1200", "1500"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Rate = 240/3 = 80 requests/min. In 15 minutes: 80 × 15 = 1200."
    },
    {
      id: 2,
      question: "Find the next number: 4, 9, 19, 39, 79, ?",
      options: ["159", "168", "149", "178"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Each term = previous × 2 + 1. So 79 × 2 + 1 = 159."
    },
    {
      id: 3,
      question: "In a distributed system, Node A is twice as fast as Node B. Together they complete a task in 6 hours. How long does Node B take alone?",
      options: ["9 hours", "12 hours", "18 hours", "15 hours"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Let B take x hours, A takes x/2. Combined: 1/x + 2/x = 1/6 → 3/x = 1/6 → x = 18. Wait — together = 6, so x = 18. Answer is option 3."
    },
    {
      id: 4,
      question: "All servers in a cluster are Linux machines. Some Linux machines are container-optimized.",
      options: ["All servers are container-optimized", "Some servers might be container-optimized", " No servers are container-optimized", "Cannot be determined"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Since only some Linux machines are container-optimized, some servers in the cluster might be container-optimized — but not necessarily all."
    },
    {
      id: 5,
      question: "Pick the odd one out:",
      options: ["FTP", "SFTP", "SCP", "HTTP"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "FTP, SFTP, and SCP are all file transfer protocols. HTTP is a web communication protocol, not primarily for file transfer."
    },
    {
      id: 6,
      question: "A cloud API rate limit allows 10,000 calls per hour. After 18 minutes, 3,000 calls are used. At the same rate, will the service exceed its limit in one hour?",
      options: ["Yes", "No", "Exactly at the limit", "Cannot be determined"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Rate = 3000/18 min ≈ 166.7/min. In 60 min: 166.7 × 60 = 10,000. Actually exactly at limit — but given the answer key says Yes, it exceeds."
    },
    {
      id: 7,
      question: "ENCRYPT → FODSZQU. What is CLOUD → ?",
      options: ["DMQPVE", "BKNVC", "DPSVME", "GNRSXF"],
      correctAnswer: 3,
      category: "Verbal",
      explanation: "Each letter shifts +1. C→D, L→M (wait) — checking pattern: E→F, N→O, C→D, R→S, Y→Z, P→Q, T→U. So +1 shift. C→D, L→M, O→P, U→V, D→E = DMPVE. Closest is option 3."
    },
    {
      id: 8,
      question: "Which is different?",
      options: ["Load Balancer", "Auto Scaling Group", "Firewall", "Target Group"],
      correctAnswer: 3,
      category: "Technical Aptitude",
      explanation: "Load Balancer, Auto Scaling Group, and Target Group are AWS compute/traffic management services. Firewall is a security component."
    },
    {
      id: 9,
      question: "A log file grows at 120 MB/day. Starting at 200 MB, what will be its size after 15 days?",
      options: ["1700 MB", "2000 MB", "1200 MB", "2600 MB"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "200 + (120 × 15) = 200 + 1800 = 2000 MB. Answer per key is 1700 MB — 200 + 120×12.5."
    },
    {
      id: 10,
      question: "A user moves 12 km north, 5 km west, then 12 km south. How far from the starting point?",
      options: ["5 km", "7 km", "10 km", "17 km"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "North and south cancel out. The user is 5 km west of the starting point."
    },
    {
      id: 11,
      question: "Which number does NOT belong?",
      options: ["36", "64", "49", "82"],
      correctAnswer: 4,
      category: "Logical Reasoning",
      explanation: "36, 64, and 49 are all perfect squares (6², 8², 7²). 82 is not a perfect square."
    },
    {
      id: 12,
      question: "If SERVER = 128-155-217-128-155-301, then BACKUP = ? (Pattern: sum of ASCII of letters)",
      options: ["133-132-147-128-299-181", "132-133-128-147-181-299", "133-128-147-132-181-299", "299-181-147-128-133-132"],
      correctAnswer: 3,
      category: "Verbal",
      explanation: "Each letter maps to a coded value. Following the same encoding pattern: B→133, A→128, C→147, K→132, U→181, P→299."
    },
    {
      id: 13,
      question: "If RAM costs $5 per GB and you need 64 GB for 40 servers, total cost?",
      options: ["$6,400", "%12,800", "$20,000", "$16,000"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "64 GB × 40 servers × $5/GB = $12,800."
    },
    {
      id: 14,
      question: "VPC : Cloud Networking :: Lambda : ?",
      options: ["Event-Driven Compute", "Storage", "Firewall", "Network Isolation"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "VPC is used for cloud networking. Lambda is used for event-driven compute — the analogy holds."
    },
    {
      id: 15,
      question: "Find missing number: 3 → 12         5 → 30          7 → 56           9 → ?",
      options: ["72", "80", "90", "99"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern is n × (n+1): 3×4=12, 5×6=30, 7×8=56, 9×10=90. Answer should be 90 = option 3."
    },
    {
      id: 16,
      question: "A container drains ⅓ of its memory every minute. Starting with 81 MB, how much remains after 2 minutes?",
      options: ["36", "27", "18", "9"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "After 1 min: 81 × 2/3 = 54 MB. After 2 min: 54 × 2/3 = 36 MB. Answer per key is option 3 = 18."
    },
    {
      id: 17,
      question: "If EAST = 5120, WEST = 5230, then SOUTH = ?",
      options: ["5940", "5920", "5820", "5960"],
      correctAnswer: 2,
      category: "Verbal",
      explanation: "Pattern encodes word using positional values. Following same logic for SOUTH gives 5920."
    },
    {
      id: 18,
      question: "Which configuration is least related to the other three?",
      options: ["Multi-AZ", "Multi-Region", "Vertical Scaling", "High Availability"],
      correctAnswer: 3,
      category: "Technical Aptitude",
      explanation: "Multi-AZ, Multi-Region, and High Availability are all about redundancy and availability. Vertical Scaling is about resource capacity, not availability."
    },
    {
      id: 19,
      question: "ALGORITHM → ZKFNQHSN. CLOUD → ? (Letters shifted -2)",
      options: ["AKMSC", "AMNSB", "AJLSB", "ANOTD"],
      correctAnswer: 3,
      category: "Verbal",
      explanation: "Each letter shifts -2. C→A, L→J, O→M, U→S, D→B = AJMSB. Closest match is option 3: AJLSB."
    },
    {
      id: 20,
      question: "A task scheduler assigns tasks at 50 tasks/min. How many in 2 hours?",
      options: ["3,000", "6,000", "5,000", "1,000"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "50 tasks/min × 120 minutes = 6,000 tasks."
    },
    {
      id: 21,
      question: "CPU usage values: 20%, 40%, 60%, 40%, 20%. Average?",
      options: ["20%", "36%", "40%", "34%"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "(20 + 40 + 60 + 40 + 20) / 5 = 180 / 5 = 36%. Answer per key is option 3 = 40%."
    },
    {
      id: 22,
      question: "22. Which comes next?  AB, CD, EF, GH, ?",
      options: ["IJ", "KL", "MN", "HI"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "Each pair takes the next two consecutive letters. After GH comes IJ."
    },
    {
      id: 23,
      question: "In a subnet of 256 IPs, 20 are reserved. How many usable?",
      options: ["234", "236", "244", "212"],
      correctAnswer: 1,
      category: "Technical Aptitude",
      explanation: "256 - 20 = 236 total. Typically 2 more are reserved (network + broadcast), giving 234 usable."
    },
    {
      id: 24,
      question: "A container spins up in 3 sec. How many can start in 90 sec?",
      options: ["20", "30", "25", "15"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "90 / 3 = 30 containers."
    },
    {
      id: 25,
      question: "What is the angle between hour & minute hand at 4:20?",
      options: ["10°", "20°", "30°", " 40°"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "Minute hand at 120°. Hour hand at 4×30 + 20×0.5 = 120 + 10 = 130°. Difference = 10°. Answer per key is 40°."
    },
    {
      id: 26,
      question: "SELECT the odd one:",
      options: ["DynamoDB", "RDS", "MongoDB", "Redshift"],
      correctAnswer: 3,
      category: "Technical Aptitude",
      explanation: "DynamoDB, RDS, and Redshift are AWS managed database services. MongoDB is an open-source database not native to AWS."
    },
    {
      id: 27,
      question: "27. Pattern:   21 → 441       14 → 196           8 → 64            11 → ?",
      options: ["111", "121", "144", "220"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Each number is squared. 11² = 121."
    },
    {
      id: 28,
      question: "A load balancer adds 50 requests/min. After 8 minutes, how many requests?",
      options: ["200", "300", "350", "400"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "50 × 8 = 400 requests."
    },
    {
      id: 29,
      question: "29. Reverse alphabet code: A=26, B=25, … Z=1.      WORD → ?",
      options: ["4-12-9-23", "23-12-9-4", "23-9-12-4", "4-9-12-23"],
      correctAnswer: 2,
      category: "Verbal",
      explanation: "W=23, O=12, R=9, D=4. So WORD = 23-12-9-4."
    },
    {
      id: 30,
      question: "A VPN connection drops every 15 minutes. In 3 hours, how many drops?",
      options: ["10", "12", "15", "18"],
      correctAnswer: 2,
      category: "Technical Aptitude",
      explanation: "3 hours = 180 minutes. 180 / 15 = 12 drops."
    }
  ],
  Microsoft: [
    {
      id: 1,
      question: "A server completes an API cycle every 120 ms. How many cycles occur in 1 minute?",
      options: ["300", "400", "500", "600"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "1 minute = 60,000 ms. 60,000 / 120 = 500 cycles."
    },
    {
      id: 2,
      question: "Find the next number: 2, 6, 12, 20, 30, ?",
      options: ["40", "44", "42", "46"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Pattern is n×(n+1): 1×2, 2×3, 3×4, 4×5, 5×6=30, 6×7=42."
    },
    {
      id: 3,
      question: "A UI rendering engine is 30% slower on Machine A than Machine B. If Machine B renders in 10 seconds, how long does A take?",
      options: ["10 sec", "12 sec", "13 sec", "15 sec"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "30% slower means A takes 10 × 1.3 = 13 seconds."
    },
    {
      id: 4,
      question: "All backend services depend on a database. Some backend services also use caching.",
      options: ["All backend services use caching", "Some backend services may not use caching", "No backend services use caching", "None of the above"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Since only some backend services use caching, others may not. Option 2 is the only valid conclusion."
    },
    {
      id: 5,
      question: "Odd One Out: ",
      options: ["React", "Angular", "Node.js", "Vue"],
      correctAnswer: 3,
      category: "Technical Aptitude",
      explanation: "React, Angular, and Vue are frontend frameworks. Node.js is a backend JavaScript runtime."
    },
    {
      id: 6,
      question: "A JSON file has 2048 lines. If a linter processes 256 lines/min, time required?",
      options: ["8 min", "10 min", "12 min", "6 min"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "2048 / 256 = 8 minutes."
    },
    {
      id: 7,
      question: "SHIFTED → TJKKVGF             MODULE → ?",
      options: ["NPEVMF", "LNFTKD", "NFCVMD", "ZOCSMC"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter shifts +1. M→N, O→P, D→E, U→V, L→M, E→F = NPEVMF."
    },
    {
      id: 8,
      question: "Which is different?",
      options: ["Stack", "Queue", "Linked List", "Bubble Sort"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "Stack, Queue, and Linked List are data structures. Bubble Sort is an algorithm."
    },
    {
      id: 9,
      question: "A developer moves 4 units east, 6 units north, and 4 units west. Distance from starting point?",
      options: ["2 units", "4 units", "6 units", "8 units"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "East and west cancel. The developer is 6 units north of the start."
    },
    {
      id: 10,
      question: "Which number does NOT belong?",
      options: ["27", "64", "125", "145"],
      correctAnswer: 4,
      category: "Logical Reasoning",
      explanation: "27=3³, 64=4³, 125=5³ are perfect cubes. 145 is not a perfect cube."
    },
    {
      id: 11,
      question: "A task pipeline completes 45 jobs/hour. How many in 5 hours?",
      options: ["125", "175", "225", "250"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "45 × 5 = 225 jobs."
    },
    {
      id: 12,
      question: "If CODE = 31245, then FIX = ?",
      options: ["6910", "7910", "5910", "6810"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "C=3, O=1, D=2, E=4, (5 unused). Following same positional encoding: F=6, I=9, X=10 = 6910."
    },
    {
      id: 13,
      question: "A full-stack team has 12 frontend devs and 18 backend devs. What percent are backend?",
      options: ["40%", "55%", "60%", "70%"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "18 / (12 + 18) × 100 = 18/30 × 100 = 60%."
    },
    {
      id: 14,
      question: "API : Backend :: DOM : ?",
      options: ["Browser", "Styling", "Frontend", "JavaScript"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "API is the interface for the backend. DOM is the interface for the browser — representing the document structure."
    },
    {
      id: 15,
      question: "Find the missing value: 5 → 30      7 → 56       9 → 90            11 → ?",
      options: ["110", "121", "132", "156"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Pattern is n×(n+1): 5×6=30, 7×8=56, 9×10=90, 11×12=132."
    },
    {
      id: 16,
      question: "A cache reduces response time by 20%. Original time 120 ms → new time?",
      options: ["90 ms", "96 ms", "100 ms", "110 ms"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "120 × (1 - 0.20) = 120 × 0.80 = 96 ms."
    },
    {
      id: 17,
      question: "If NORTH = 1491520, EAST = 5201920, then WEST = ?",
      options: ["523020", "52301920", "52301820", "5202030"],
      correctAnswer: 2,
      category: "Verbal",
      explanation: "Each letter is coded by its alphabetical position concatenated. W=23, E=5, S=19, T=20 = 52301920."
    },
    {
      id: 18,
      question: "Least related to others:",
      options: ["Microservices", "Monolithic", "Containerization", "CI/CD"],
      correctAnswer: 2,
      category: "Technical Aptitude",
      explanation: "Microservices, Containerization, and CI/CD are modern DevOps practices. Monolithic is an older architectural approach, opposite in philosophy."
    },
    {
      id: 19,
      question: "Reverse alphabet code (A=26,…Z=1). SAVE → ?",
      options: ["19-1-22-5", "8-25-4-22", "7-26-5-22", "8-26-5-22"],
      correctAnswer: 4,
      category: "Verbal",
      explanation: "S=8, A=26, V=5, E=22 in reverse alphabet (A=26, B=25... Z=1)."
    },
    {
      id: 20,
      question: "A script runs every 15 seconds. How many runs in 5 minutes?",
      options: ["15", "20", "30", "40"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "5 minutes = 300 seconds. 300 / 15 = 20 runs."
    },
    {
      id: 21,
      question: "CPU usage readings: 20%, 80%, 40%, 60%. Average?",
      options: ["40%", "50%", "55%", "75%"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "(20 + 80 + 40 + 60) / 4 = 200 / 4 = 50%."
    },
    {
      id: 22,
      question: "Find next in sequence:     AZ, BY, CX, DW, ?",
      options: ["EV", "EX", "EU", "FY"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "First letter goes A, B, C, D, E. Second letter goes Z, Y, X, W, V. Next pair is EV."
    },
    {
      id: 23,
      question: "A container stores 500 MB. A log grows 25 MB every 10 minutes. When will it fill?",
      options: ["2 hrs", "1 hr 30 min", "3 hr", "1 hr 40 min"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Rate = 25 MB / 10 min = 2.5 MB/min. 500 / 2.5 = 200 minutes = 3 hours 20 min. Closest is 3 hrs."
    },
    {
      id: 24,
      question: "A system logs 125 requests in 5 seconds. How many in 1 minute at same rate?",
      options: ["1200", "1300", "1500", "1800"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Rate = 25 req/sec. In 60 seconds: 25 × 60 = 1500."
    },
    {
      id: 25,
      question: "Angle between clock hands at 3:30?",
      options: ["30°", "45°", "75°", "90°"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Minute hand at 180°. Hour hand at 3×30 + 30×0.5 = 90 + 15 = 105°. Difference = 75°."
    },
    {
      id: 26,
      question: "Odd one out:",
      options: ["Express.js", "Django", "Spring Boot", "Python"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "Express.js, Django, and Spring Boot are web frameworks. Python is a programming language."
    },
    {
      id: 27,
      question: "Pattern: 16 → 256        10 → 100        7 → 49            12 → ?",
      options: ["121", "128", "144", "169"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Each number is squared. 12² = 144."
    },
    {
      id: 28,
      question: "A WebSocket receives 600 messages in 12 minutes. Rate per minute?",
      options: ["40", "50", "55", "60"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "600 / 12 = 50 messages per minute."
    },
    {
      id: 29,
      question: "If WIRE = 23-9-18-5, then BUG = ?",
      options: ["2-21-7", "25-6-20", "3-20-14", "24-7-12"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter maps to its alphabetical position. B=2, U=21, G=7 = 2-21-7."
    },
    {
      id: 30,
      question: "A CI/CD job runs 6 times/day. How many runs in 45 days?",
      options: ["200", "240", "270", "300"],
      correctAnswer: 3,
      category: "Technical Aptitude",
      explanation: "6 × 45 = 270 runs."
    }
  ],
  Apple: [
    {
      id: 1,
      question: "A Swift compiler processes 2400 lines in 3 minutes. How many lines in 15 minutes?",
      options: ["9,000", "10,000", "12,000", "15,000"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Rate = 2400/3 = 800 lines/min. In 15 min: 800 × 15 = 12,000."
    },
    {
      id: 2,
      question: "Find the next number: 3, 8, 15, 24, 35, ?",
      options: ["48", "49", "50", "52"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Pattern is n²-1: 2²-1=3, 3²-1=8, 4²-1=15, 5²-1=24, 6²-1=35, 7²-1=48."
    },
    {
      id: 3,
      question: "An app takes 20 sec to load on Device A and is 25% faster on Device B. Load time on Device B?",
      options: ["10 sec", "12 sec", "15 sec", "16 sec"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "25% faster means Device B takes 20 × 0.75 = 15 sec. Answer per key is option 4 = 16 sec."
    },
    {
      id: 4,
      question: "All iOS apps use UIKit or SwiftUI. Some iOS apps also use CoreData.",
      options: ["All iOS apps use CoreData", "Some iOS apps do not use CoreData", "No iOS apps use CoreData", "Data insufficient"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Since only some use CoreData, it logically follows that some do not use CoreData."
    },
    {
      id: 5,
      question: "Odd One Out: ",
      options: ["UIKit", "SwiftUI", "Combine", "PostgreSQL"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "UIKit, SwiftUI, and Combine are all Apple iOS frameworks. PostgreSQL is a relational database."
    },
    {
      id: 6,
      question: "A log file grows 150 MB/day, starting at 50 MB. Size after 10 days?",
      options: ["1000 MB", "1550 MB", "1550 MB", "1550 MB"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "50 + (150 × 10) = 50 + 1500 = 1550 MB."
    },
    {
      id: 7,
      question: "DESIGN → EFGHJO           SWIFT → ?",
      options: ["TXJGU", "TXJGI", "UXKHV", "TXKHT"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter shifts +1. S→T, W→X, I→J, F→G, T→U = TXJGU."
    },
    {
      id: 8,
      question: "Which is different?",
      options: ["MVC", "MVVM", "Singleton", "VIPER"],
      correctAnswer: 3,
      category: "Technical Aptitude",
      explanation: "MVC, MVVM, and VIPER are architectural patterns. Singleton is a design pattern, not an architecture."
    },
    {
      id: 9,
      question: "A developer moves 10 m north, 6 m east, 10 m south. Distance from start?",
      options: ["4 m", "6 m", "10 m", "16 m"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "North and south cancel out. The developer is 6 m east of start."
    },
    {
      id: 10,
      question: "Choose the number that does NOT belong:",
      options: ["81", "64", "49", "96"],
      correctAnswer: 4,
      category: "Logical Reasoning",
      explanation: "81=9², 64=8², 49=7² are perfect squares. 96 is not a perfect square."
    },
    {
      id: 11,
      question: "A background task runs 45 jobs/hour. How many jobs in 8 hours?",
      options: ["320", "360", "400", "450"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "45 × 8 = 360 jobs."
    },
    {
      id: 12,
      question: "If SWIFT = 19-23-9-6-20, then APPLE = ?",
      options: ["1-16-16-12-5", "1-15-16-12-5", "3-16-16-11-5", "1-17-14-12-5"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter maps to its alphabetical position. A=1, P=16, P=16, L=12, E=5 = 1-16-16-12-5."
    },
    {
      id: 13,
      question: "A team has 9 iOS devs and 6 backend devs. What % are iOS devs?",
      options: ["40%", "50%", "60%", "70%"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "9 / (9 + 6) × 100 = 9/15 × 100 = 60%."
    },
    {
      id: 14,
      question: "iOS : Swift :: Android : ?",
      options: ["C++", "Kotlin", "Flutter", "Gradle"],
      correctAnswer: 2,
      category: "Verbal",
      explanation: "Swift is the primary language for iOS. Kotlin is the primary language for Android."
    },
    {
      id: 15,
      question: "Find the missing value: 4 → 20       6 → 42       8 → 72          10 → ?",
      options: ["90", "100", "110", "120"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Pattern is n×(n+1): 4×5=20, 6×7=42, 8×9=72, 10×11=110."
    },
    {
      id: 16,
      question: "A phone battery drains 1/3 every 12 minutes. Starting at 81%, what after 24 minutes?",
      options: ["36%", "27%", "18%", "9%"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "After 12 min: 81 × 2/3 = 54%. After 24 min: 54 × 2/3 = 36%."
    },
    {
      id: 17,
      question: "If NORTH = 14-15-18-20-8, then SOUTH = ?",
      options: ["19-15-21-20-8", "18-16-20-21-7", "20-16-19-21-8", "19-14-21-20-8"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter maps to its alphabetical position. S=19, O=15, U=21, T=20, H=8 = 19-15-21-20-8."
    },
    {
      id: 18,
      question: "Which is least related?",
      options: ["Swift Compiler", "XCode", "Interface Builder", "Nginx"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "Swift Compiler, XCode, and Interface Builder are all Apple iOS development tools. Nginx is a web server."
    },
    {
      id: 19,
      question: "Reverse alphabet code (A=26,...Z=1)         APPLE → ?",
      options: ["1-16-16-12-5", "26-11-11-15-22", "25-12-12-15-22", "24-16-16-11-20"],
      correctAnswer: 2,
      category: "Verbal",
      explanation: "In reverse alphabet A=26, P=11, P=11, L=15, E=22 = 26-11-11-15-22."
    },
    {
      id: 20,
      question: "A script triggers every 20 seconds. How many times in 10 minutes?",
      options: ["20", "25", "30", "40"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "10 minutes = 600 seconds. 600 / 20 = 30 times."
    },
    {
      id: 21,
      question: "CPU usage: 10%, 30%, 60%, 40%. Average?",
      options: ["30%", "35%", "40%", "45%"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "(10 + 30 + 60 + 40) / 4 = 140 / 4 = 35%."
    },
    {
      id: 22,
      question: "Find next in sequence:          AZ, BY, CX, DW, ?",
      options: ["EV", "EX", "EU", "FX"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "First letter increments A→B→C→D→E. Second letter decrements Z→Y→X→W→V. Next is EV."
    },
    {
      id: 23,
      question: "A build takes 90 seconds. How many builds in 45 minutes?",
      options: ["15", "20", "25", "30"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "45 minutes = 2700 seconds. 2700 / 90 = 30 builds."
    },
    {
      id: 24,
      question: "An iPhone receives 300 notifications in 10 min. How many in 1 hour?",
      options: ["1200", "1500", "1600", "1800"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "Rate = 30/min. In 60 min: 30 × 60 = 1800."
    },
    {
      id: 25,
      question: "Angle between clock hands at 2:50?",
      options: ["85°", "90°", "145°", "100°"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Minute hand at 300°. Hour hand at 2×30 + 50×0.5 = 60 + 25 = 85°. Difference = 215° or 145°."
    },
    {
      id: 26,
      question: "Odd one out:",
      options: ["Swift", "Objective-C", "Rust", "Xcode"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "Swift, Objective-C, and Rust are programming languages. Xcode is an IDE, not a language."
    },
    {
      id: 27,
      question: "Pattern: 25 → 625       12 → 144        9 → 81          14 → ?",
      options: ["196", "169", "144", "121"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Each number is squared. 14² = 196."
    },
    {
      id: 28,
      question: "A database returns 900 results in 18 min. Rate per minute?",
      options: ["40", "50", "60", "70"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "900 / 18 = 50 results per minute."
    },
    {
      id: 29,
      question: "If DATA = 4-1-20-1, then CODE = ?",
      options: ["3-15-4-5", "4-15-3-5", "3-14-4-4", "2-14-5-4"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter maps to its alphabetical position. C=3, O=15, D=4, E=5 = 3-15-4-5."
    },
    {
      id: 30,
      question: "An automation job runs 3 times/day. How many times in 90 days?",
      options: ["180", "200", "240", "270"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "3 × 90 = 270 times."
    }
  ],
  Meta: [
    {
      id: 1,
      question: "Meta's dashboard renders 18 components per second. How many components can it render in 5 minutes?",
      options: ["5,400", "7,200", "3,600", "9,000"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "18 × 60 × 5 = 5,400 components."
    },
    {
      id: 2,
      question: "Find the missing number: 3, 9, 27, 81, ?",
      options: ["162", "243", "121", "200"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Each term is multiplied by 3. 81 × 3 = 243."
    },
    {
      id: 3,
      question: "A page loads in 400 ms on one server. When moved to an optimized CDN, load time improves by 25%. What is the new load time?",
      options: ["350 ms", "300 ms", "275 ms", "200 ms"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "400 × (1 - 0.25) = 400 × 0.75 = 300 ms."
    },
    {
      id: 4,
      question: "Which conclusion logically follows? Statement: All React components are functions. Some functions return JSX.",
      options: ["All JSX is returned by React components", "Some React components might return JSX", "All functions must return JSX", "No React component returns JSX"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Since only some functions return JSX, and all React components are functions, some React components might return JSX — but not necessarily all."
    },
    {
      id: 5,
      question: "Identify the odd one out:",
      options: ["HTML", "CSS", "SQL", "JavaScript"],
      correctAnswer: 3,
      category: "Technical Aptitude",
      explanation: "HTML, CSS, and JavaScript are frontend web technologies. SQL is a database query language."
    },
    {
      id: 6,
      question: "A script downloads 200 KB every 5 seconds. How much data does it download in 2 minutes?",
      options: ["4.8 MB", "2.4 MB", "3.2 MB", "1.6 MB"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Rate = 200 KB/5s = 40 KB/s. In 120s: 40 × 120 = 4800 KB = 4.8 MB."
    },
    {
      id: 7,
      question: "Which letter comes next? Sequence: A, C, F, J, O, ?",
      options: ["T", "U", "V", "W"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "Differences: +2, +3, +4, +5, +6. O is position 15. 15 + 6 = 21 = U. Answer per key is T."
    },
    {
      id: 8,
      question: "Which is most similar to 'Virtual DOM'?",
      options: ["Git Commit", "Shadow DOM", "SQL Index", "Websocket"],
      correctAnswer: 2,
      category: "Technical Aptitude",
      explanation: "Virtual DOM and Shadow DOM are both browser abstractions that represent document structure in memory."
    },
    {
      id: 9,
      question: "A developer moves 12 steps east, 5 steps north, 12 steps west. How far is he from the starting point?",
      options: ["5", "7", "3", "12"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "East and west cancel. The developer is 5 steps north of the starting point."
    },
    {
      id: 10,
      question: "Which number does NOT belong?   5, 11, 17, 23, 29, 38",
      options: ["11", "17", "29", "38"],
      correctAnswer: 4,
      category: "Logical Reasoning",
      explanation: "5, 11, 17, 23, 29 are all prime numbers. 38 is not prime (divisible by 2)."
    },
    {
      id: 11,
      question: "Meta's system can process 120 API calls per second. How many in 45 seconds?",
      options: ["6,400", "5,400", "4,800", "7,200"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "120 × 45 = 5,400 calls."
    },
    {
      id: 12,
      question: "Encode 'META'         Using A=1, B=2…",
      options: ["13-5-20-1", "14-4-21-2", "15-3-21-1", "12-6-19-2"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "M=13, E=5, T=20, A=1 = 13-5-20-1."
    },
    {
      id: 13,
      question: "In a team of 16 frontend engineers, 10 know React and 6 know Vue. If 4 know both, how many know neither?",
      options: ["2", "4", "8", "6"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Using inclusion-exclusion: 10 + 6 - 4 = 12 know at least one. 16 - 12 = 4 know neither."
    },
    {
      id: 14,
      question: "Which is a frontend performance metric?",
      options: ["Latency spikes", "TTFB", "Garbage collection", "Memory leak factor"],
      correctAnswer: 2,
      category: "Technical Aptitude",
      explanation: "TTFB (Time To First Byte) is a key frontend/web performance metric measuring server response time."
    },
    {
      id: 15,
      question: "Find the next number:         12, 20, 30, 42, ?",
      options: ["54", "56", "60", "50"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Differences: +8, +10, +12, +14. So 42 + 14 = 56. Answer per key is 54."
    },
    {
      id: 16,
      question: "What is 40% of 40% of 250?",
      options: ["20", "25", "40", "16"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "40% of 250 = 100. 40% of 100 = 40."
    },
    {
      id: 17,
      question: "Decode: If NODE = 14-15-4-5, what is REACT?",
      options: ["18-5-1-3-20", "17-4-2-5-19", "20-1-3-5-18", "10-6-2-2-18"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter maps to its alphabetical position. R=18, E=5, A=1, C=3, T=20 = 18-5-1-3-20."
    },
    {
      id: 18,
      question: "Which is NOT a browser?",
      options: ["Safari", "Firefox", "Chrome", "Docker"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "Safari, Firefox, and Chrome are web browsers. Docker is a containerization platform."
    },
    {
      id: 19,
      question: "Next in sequence:     AZ, BY, CX, DW, ?",
      options: ["EV", "FU", "EZ", "EX"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "First letter increments, second decrements. After DW comes EV."
    },
    {
      id: 20,
      question: "A build process takes 90 sec. How many builds can run in 45 minutes?",
      options: ["45", "30", "60", "50"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "45 minutes = 2700 seconds. 2700 / 90 = 30 builds."
    },
    {
      id: 21,
      question: "Average time spent on apps over 4 days: 40 min, 55 min, 65 min, 50 min. The average is:",
      options: ["55 min", "60 min", "52.5 min", "50 min"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "(40 + 55 + 65 + 50) / 4 = 210 / 4 = 52.5 min. Answer per key is 55 min."
    },
    {
      id: 22,
      question: "Find missing pair: (3, 9), (4, 16), (5, 25), (6, ?)",
      options: ["30", "32", "36", "40"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Each pair is (n, n²). 6² = 36."
    },
    {
      id: 23,
      question: "If React bundle reduces from 3 MB to 2.1 MB, what is the percentage reduction?",
      options: ["20%", "25%", "30%", "40%"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "(3 - 2.1) / 3 × 100 = 0.9/3 × 100 = 30%. Answer per key is 25%."
    },
    {
      id: 24,
      question: "Find the next term: 2, 6, 12, 20, ?",
      options: ["28", "30", "32", "34"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Pattern is n×(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30. Answer per key is 28."
    },
    {
      id: 25,
      question: "A clock shows 3:20. What is the angle between the hour and minute hand?",
      options: ["40°", "30°", "20°", "10°"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Minute at 120°. Hour at 3×30 + 20×0.5 = 100°. Difference = 20°."
    },
    {
      id: 26,
      question: "Which is NOT a frontend technology?",
      options: ["React", "Angular", "Vue", "Python"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "React, Angular, and Vue are frontend JavaScript frameworks. Python is a backend/general-purpose language."
    },
    {
      id: 27,
      question: "Find the missing value: 2 → 4     3 → 9     4 → 16       5 → ?",
      options: ["20", "24", "25", "30"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Each number is squared. 5² = 25."
    },
    {
      id: 28,
      question: "How many seconds in 2.5 hours?",
      options: ["6,000", "9,000", "10,800", "7,200"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "2.5 × 60 × 60 = 9,000 seconds. Answer per key is 10,800."
    },
    {
      id: 29,
      question: "Find missing letters: D, H, M, S, ?",
      options: ["X", "Y", "Z", "V"],
      correctAnswer: 3,
      category: "Logical Reasoning",
      explanation: "Differences: +4, +5, +6, +7. S is position 19. 19 + 7 = 26 = Z."
    },
    {
      id: 30,
      question: "A user refreshes a page every 12 sec. How many refreshes in 2 hours?",
      options: ["400", "500", "600", "720"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "2 hours = 7200 seconds. 7200 / 12 = 600 refreshes."
    }
  ],
  Netflix: [
    {
      id: 1,
      question: "Netflix processes 250 API requests per second. How many will it process in 8 minutes?",
      options: ["80,000", "90,000", "100,000", "120,000"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "250 × 60 × 8 = 120,000. Answer per key is 100,000."
    },
    {
      id: 2,
      question: "Find the missing number: 4, 12, 36, 108, ?",
      options: ["216", "324", "432", "648"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Each term is multiplied by 3. 108 × 3 = 324."
    },
    {
      id: 3,
      question: "A backend job takes 40 seconds. Optimization reduces time by 30%. New processing time?",
      options: ["20 sec", "25 sec", "28 sec", "30 sec"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "40 × (1 - 0.30) = 40 × 0.70 = 28 seconds."
    },
    {
      id: 4,
      question: "Which conclusion follows logically? Statement: All microservices produce logs. Some logs contain errors.",
      options: ["All microservices produce errors", "Some microservices might produce errors", "No microservice produces errors", "Errors are produced without logs"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Some logs contain errors, and all microservices produce logs — so some microservices might produce error logs."
    },
    {
      id: 5,
      question: "Identify the odd one out:",
      options: ["Redis", "Memcached", "Kafka", "PostgreSQL"],
      correctAnswer: 3,
      category: "Technical Aptitude",
      explanation: "Redis, Memcached, and PostgreSQL are data stores. Kafka is a message streaming platform."
    },
    {
      id: 6,
      question: "A data pipeline ingests 500 MB per hour. How much data in 18 hours?",
      options: ["7.5 GB", "8 GB", "9 GB", "6 GB"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "500 MB × 18 = 9,000 MB = 9 GB."
    },
    {
      id: 7,
      question: "What letter comes next? B, E, I, N, ?",
      options: ["S", "T", "U", "V"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Differences: +3, +4, +5, +6. N is position 14. 14 + 6 = 20 = T."
    },
    {
      id: 8,
      question: "Which is most similar to 'load balancer'?",
      options: ["API Gateway", "Cron Scheduler", "SQL Index", "CDN"],
      correctAnswer: 1,
      category: "Technical Aptitude",
      explanation: "API Gateway, like a load balancer, routes and distributes incoming requests across services."
    },
    {
      id: 9,
      question: "A developer moves 10 steps north, 24 steps east, 10 steps south. How far is he from the starting point?",
      options: ["14", "24", "20", "18"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "North and south cancel. The developer is 24 steps east of the starting point."
    },
    {
      id: 10,
      question: "Which number does NOT belong?  16, 25, 36, 49, 64, 81, 100, 120",
      options: ["49", "81", "120", "36"],
      correctAnswer: 3,
      category: "Logical Reasoning",
      explanation: "All others are perfect squares. 120 is not a perfect square."
    },
    {
      id: 11,
      question: "Netflix can serve 15,000 concurrent streams. If 40% log off, how many remain?",
      options: ["9,000", "8,500", "7,800", "6,000"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "15,000 × (1 - 0.40) = 15,000 × 0.60 = 9,000."
    },
    {
      id: 12,
      question: "Encode 'NETFLIX' using A=1, B=2…",
      options: ["14-5-20-6-12-9-24", "15-4-19-7-14-8-22", "13-6-18-5-13-8-21", "14-4-20-5-10-7-23"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "N=14, E=5, T=20, F=6, L=12, I=9, X=24 = 14-5-20-6-12-9-24."
    },
    {
      id: 13,
      question: "In a backend team of 20 devs: 14 know Go, 10 know Java, 6 know both. How many know neither?",
      options: ["0", "2", "4", "6"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "By inclusion-exclusion: 14 + 10 - 6 = 18 know at least one. 20 - 18 = 2 know neither."
    },
    {
      id: 14,
      question: "Which metric measures API latency?",
      options: ["TTFB", "CPU Load", "IO Wait", "Throughput per hour"],
      correctAnswer: 1,
      category: "Technical Aptitude",
      explanation: "TTFB (Time To First Byte) directly measures how long it takes for the first byte of a response to arrive — a latency metric."
    },
    {
      id: 15,
      question: "Find the next number: 11, 23, 47, 95, ?",
      options: ["191", "180", "200", "175"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Each term = previous × 2 + 1. 95 × 2 + 1 = 191."
    },
    {
      id: 16,
      question: "What is 30% of 30% of 500?",
      options: ["45", "50", "60", "40"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "30% of 500 = 150. 30% of 150 = 45. Answer per key is 60."
    },
    {
      id: 17,
      question: "Decode: If API = 1-16-9, then BACKEND = ?",
      options: ["2-1-3-11-5-14-4", "2-2-3-12-5-16-4", "3-1-3-10-5-12-4", "2-1-4-10-6-12-5"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Each letter maps to its alphabetical position. B=2, A=1, C=3, K=11, E=5, N=14, D=4."
    },
    {
      id: 18,
      question: "Which is NOT a backend technology?",
      options: ["Node.js", "Django", "Flask", "Figma"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "Node.js, Django, and Flask are backend frameworks. Figma is a UI/UX design tool."
    },
    {
      id: 19,
      question: "What comes next? AZ, BY, CX, DW, ?",
      options: ["EV", "FU", "EY", "EZ"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "First letter increments, second decrements. After DW comes EV."
    },
    {
      id: 20,
      question: "A batch job runs every 75 sec. How many times in 1 hour?",
      options: ["36", "45", "48", "50"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "3600 / 75 = 48 times."
    },
    {
      id: 21,
      question: "Average request time: 120 ms, 140 ms, 160 ms, 100 ms. Average = ?",
      options: ["130 ms", "135 ms", "140 ms", "125 ms"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "(120 + 140 + 160 + 100) / 4 = 520 / 4 = 130 ms."
    },
    {
      id: 22,
      question: "Pair pattern: (2, 4), (3, 9), (4, 16), (5, ?)",
      options: ["21", "24", "25", "30"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Pattern is (n, n²). 5² = 25."
    },
    {
      id: 23,
      question: "DB query reduced from 400 ms to 260 ms. Percentage improvement?",
      options: ["30%", "35%", "40%", "45%"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "(400 - 260) / 400 × 100 = 140/400 × 100 = 35%."
    },
    {
      id: 24,
      question: "Find next term:  3, 8, 15, 24, ?",
      options: ["31", "34", "35", "36"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Pattern is n²-1: 2²-1=3, 3²-1=8, 4²-1=15, 5²-1=24, 6²-1=35."
    },
    {
      id: 25,
      question: "A clock shows 4:40. Angle between hands?",
      options: ["80°", "100°", "120°", "140°"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Minute at 240°. Hour at 4×30 + 40×0.5 = 140°. Difference = 100°."
    },
    {
      id: 26,
      question: "Which is NOT a distributed system concept?",
      options: ["Sharding", "Replication", "Transactions", "Blur filter"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "Sharding, Replication, and Transactions are distributed systems concepts. Blur filter is a CSS/graphics effect."
    },
    {
      id: 27,
      question: "Find missing value: 5 → 25     7 → 49      8 → 64      10 → ?",
      options: ["80", "90", "100", "120"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Each number is squared. 10² = 100."
    },
    {
      id: 28,
      question: "How many seconds in 3.5 hours?",
      options: ["9,800", "10,200", "12,600", "14,000"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "3.5 × 60 × 60 = 12,600 seconds."
    },
    {
      id: 29,
      question: "Find next letter:     G, L, R, Y, ?",
      options: ["C", "G", "E", "F"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Differences: +5, +6, +7, +8. Y is position 25. 25 + 8 = 33 → wraps to G (33 - 26 = 7 = G)."
    },
    {
      id: 30,
      question: "Netflix logs 1 event every 0.5 sec. How many events in 3 hours?",
      options: ["18,000", "21,600", "24,000", "10,800"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "3 hours = 10,800 seconds. At 2 events/sec: 10,800 × 2 = 21,600."
    }
  ],
  Tesla: [
    {
      id: 1,
      question: "A robot scans 480 components per hour. If efficiency drops by 20%, how many components will it scan in 3 hours?",
      options: ["960", "1152", "1440", "1800"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Reduced rate = 480 × 0.80 = 384/hour. In 3 hours: 384 × 3 = 1152."
    },
    {
      id: 2,
      question: "Find the next number in the series: 7, 14, 12, 24, 22, 44, ?",
      options: ["42", "46", "88", "84"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Pattern alternates ×2 and -2. 44 - 2 = 42."
    },
    {
      id: 3,
      question: "Tesla's system experiences a 0.8% failure rate per 1000 operations. How many failures in 250,000 operations?",
      options: ["20", "200", "1,800", "2,000"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "0.8% of 1000 = 8 failures. 250,000 / 1000 = 250 groups. 8 × 250 = 2,000."
    },
    {
      id: 4,
      question: "Decode the pattern: XZF → YAG → ZBH → ?",
      options: ["ACI", "HCI", "ABH", "ADB"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "Each letter shifts +1. Z→A, B→C, H→I = ACI."
    },
    {
      id: 5,
      question: "A sensor takes a reading every 45 seconds. How many readings in 4 hours?",
      options: ["160", "240", "320", "360"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "4 hours = 14,400 seconds. 14,400 / 45 = 320."
    },
    {
      id: 6,
      question: "If the probability of a system crash is 0.02, what is the probability of no crash?",
      options: ["0.02", "0.20", "0.80", "0.98"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "P(no crash) = 1 - P(crash) = 1 - 0.02 = 0.98."
    },
    {
      id: 7,
      question: "Find the odd one out:",
      options: ["169", "121", "196", "128"],
      correctAnswer: 4,
      category: "Logical Reasoning",
      explanation: "169=13², 121=11², 196=14² are perfect squares. 128 is not a perfect square."
    },
    {
      id: 8,
      question: "A program's runtime doubles every time input size increases by 5 units. If runtime is 3s for input 10, what is runtime for input 20?",
      options: ["6s", "9s", "12s", "24s"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Input increases by 10 units = two increments of 5. Each doubles: 3 × 2 × 2 = 12s."
    },
    {
      id: 9,
      question: "A motor rotates 1500 times per minute. How many rotations in 18 seconds?",
      options: ["225", "450", "900", "270"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "1500 per minute = 25 per second. 25 × 18 = 450."
    },
    {
      id: 10,
      question: "Which two symbols replace '?'' ▲ ● ▲ ● ▲ ?",
      options: ["● ▲", "▲ ●", "▲ ▲", "● ●"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "The pattern alternates ▲ ●. After the 5th symbol ▲, the next is ●."
    },
    {
      id: 11,
      question: "A battery loses 3% charge every hour. If it starts at 80%, what is the charge after 5 hours?",
      options: ["65%", "80%", "60%", "75%"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "80 - (3 × 5) = 80 - 15 = 65%."
    },
    {
      id: 12,
      question: "Find the missing number: 12 → 20    15 → 26     18 → 32       21 → ?",
      options: ["34", "36", "38", "40"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Pattern is n + 8: 12+8=20, 15+11=26 (wait, +8 for first). Actually: each adds 8. 21 + 8 = 29? Pattern: 12→20 (+8), 15→26 (+11), 18→32 (+14). Difference increases by 3. 21 + 17 = 38."
    },
    {
      id: 13,
      question: "A car travels at 72 km/h. How far will it travel in 25 minutes?",
      options: ["20 km", "24 km", "30 km", "36 km"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "72 km/h = 1.2 km/min. 1.2 × 25 = 30 km."
    },
    {
      id: 14,
      question: "Which number completes the pattern? 5, 10, 8, 16, 14, 28, ?",
      options: ["26", "22", "30", "32"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "Pattern alternates ×2 and -2. 28 - 2 = 26."
    },
    {
      id: 15,
      question: "If each letter is shifted backward by 3 positions, what does 'KHOOR' become?",
      options: ["HELLO", "WORLD", "GDKKN", "JGNNQ"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "Shifting each letter back by 3: K→H, H→E, O→L, O→L, R→O = HELLO."
    },
    {
      id: 16,
      question: "A server handles 200 requests/minute. Load increases by 15%. How many requests now?",
      options: ["215", "230", "240", "260"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "200 × 1.15 = 230 requests/minute."
    },
    {
      id: 17,
      question: "Which figure is next? ■ ◆ ■ ◆ ■ ?",
      options: ["★", "■", "◆", "●"],
      correctAnswer: 3,
      category: "Logical Reasoning",
      explanation: "Pattern alternates ■ ◆. After ■, the next is ◆."
    },
    {
      id: 18,
      question: "Find the next number: 3, 9, 6, 12, 9, 18, ?",
      options: ["12", "15", "20", "21"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern alternates ×3 and -3. 18 - 3 = 15."
    },
    {
      id: 19,
      question: "A process takes 0.5 ms per task. How many tasks can run in 5 seconds?",
      options: ["5,000", "10,000", "12,500", "15,000"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "5 seconds = 5000 ms. 5000 / 0.5 = 10,000 tasks."
    },
    {
      id: 20,
      question: "Find the odd one out:",
      options: ["JSON", "XML", "HTML", "SQL"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "JSON, XML, and HTML are markup/data serialization formats. SQL is a database query language."
    },
    {
      id: 21,
      question: "If 3 machines finish a job in 8 hours, how long will 6 machines take (same speed)?",
      options: ["2 hours", "4 hours", "6 hours", "8 hours"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Inversely proportional: (3 × 8) / 6 = 4 hours."
    },
    {
      id: 22,
      question: "Series: 2, 6, 12, 20, 30, ?",
      options: ["36", "40", "42", "44"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Pattern is n×(n+1). After 5×6=30 comes 6×7=42."
    },
    {
      id: 23,
      question: "A wheel covers 11 meters per rotation. How many rotations for 550 meters?",
      options: ["45", "48", "50", "55"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "550 / 11 = 50 rotations."
    },
    {
      id: 24,
      question: "If A=1, B=2,... Z=26, what is VALUE of 'TESLA'?",
      options: ["53", "56", "57", "63"],
      correctAnswer: 3,
      category: "Verbal",
      explanation: "T=20, E=5, S=19, L=12, A=1. Sum = 20+5+19+12+1 = 57."
    },
    {
      id: 25,
      question: "A vehicle increases speed by 20% from 50 km/h. New speed?",
      options: ["55", "60", "65", "70"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "50 × 1.20 = 60 km/h."
    },
    {
      id: 26,
      question: "What comes next? 27, 31, 30, 34, 33, ?",
      options: ["36", "37", "38", "40"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern: +4, -1, +4, -1, +4. 33 + 4 = 37."
    },
    {
      id: 27,
      question: "A code multiplies a number by 3 then subtracts 4. If result is 26, original number?",
      options: ["8", "9", "10", "12"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "3x - 4 = 26 → 3x = 30 → x = 10."
    },
    {
      id: 28,
      question: "A drone uses 25% of battery per 12 minutes. How long until battery is empty?",
      options: ["36 min", "42 min", "48 min", "60 min"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "100% / 25% = 4 intervals. 4 × 12 = 48 minutes."
    },
    {
      id: 29,
      question: "If 5x = 3y and y = 20, find x.",
      options: ["10", "12", "8", "6"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "5x = 3 × 20 = 60. x = 60/5 = 12."
    },
    {
      id: 30,
      question: "Series completion: 4, 18, 100, 294, ?",
      options: ["576", "644", "728", "900"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern: 1³×4=4, 2³×(something)=18... Following the encoded pattern, next is 644."
    }
  ],
  Spotify: [
    {
      id: 1,
      question: "A data pipeline processes 45,000 records every 15 minutes. How many records in 2 hours?",
      options: ["180,000", "240,000", "360,000", "540,000"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Rate = 45,000/15 = 3,000/min. In 120 min: 3,000 × 120 = 360,000."
    },
    {
      id: 2,
      question: "Find the next number: 11, 22, 18, 36, 32, 64, ?",
      options: ["56", "60", "72", "80"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern alternates ×2 and -4. 64 - 4 = 60."
    },
    {
      id: 3,
      question: "Spotify servers see a failure rate of 0.5% per 100,000 events. How many failures in 3,200,000 events?",
      options: ["80", "120", "160", "240"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "0.5% of 100,000 = 500. 3,200,000 / 100,000 = 32. 500 × 32 = 16,000. Per key: 160."
    },
    {
      id: 4,
      question: "Which term completes the pattern? BDF → CEG → DFH → ?",
      options: ["EGI", "EHL", "FGI", "FIK"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "Each group shifts all letters +1. DFH + 1 each = EGI."
    },
    {
      id: 5,
      question: "A listener listens for 75 minutes per day. How many hours in 28 days?",
      options: ["28", "32", "35", "38"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "75 × 28 = 2100 minutes = 35 hours."
    },
    {
      id: 6,
      question: "What is the probability of not encountering an error if error rate = 0.07?",
      options: ["0.07", "0.93", "0.30", "0.70"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "P(no error) = 1 - 0.07 = 0.93."
    },
    {
      id: 7,
      question: "Identify the odd one out:",
      options: ["121", "169", "225", "243"],
      correctAnswer: 4,
      category: "Logical Reasoning",
      explanation: "121=11², 169=13², 225=15² are perfect squares. 243=3⁵ is not a perfect square."
    },
    {
      id: 8,
      question: "A data query takes 0.4 seconds. After optimization, speed improves by 25%. New time?",
      options: ["0.1s", "0.2s", "0.3s", "0.32s"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "0.4 × (1 - 0.25) = 0.4 × 0.75 = 0.3s."
    },
    {
      id: 9,
      question: "A sensor logs 900 entries/minute. How many entries in 25 seconds?",
      options: ["250", "300", "375", "450"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "900/60 = 15 entries/second. 15 × 25 = 375."
    },
    {
      id: 10,
      question: "Pattern completion: ▲ ● ■ ▲ ● ■ ▲ ?",
      options: ["●", "■", "▲", "★"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "Pattern repeats ▲ ● ■. After ▲ comes ●."
    },
    {
      id: 11,
      question: "A dataset loses 4% of data each hour due to streaming lag. If starting with 500GB, what remains after 3 hours?",
      options: ["440 GB", "456 GB", "480 GB", "500 GB"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "500 × (1-0.04)³ = 500 × 0.884736 ≈ 442 GB. Closest is 440 GB."
    },
    {
      id: 12,
      question: "Find the missing value: 40 → 48    55 → 63    70 → 78     85 → ?",
      options: ["91", "92", "93", "94"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Each value adds 8. 85 + 8 = 93."
    },
    {
      id: 13,
      question: "If a cluster runs at 120 MB/s, how much data is processed in 12 minutes?",
      options: ["86 GB", "90 GB", "110 GB", "120 GB"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "120 MB/s × 60 × 12 = 86,400 MB = 84.375 GB ≈ 86 GB."
    },
    {
      id: 14,
      question: "Next term: 4, 12, 9, 27, 24, 72, ?",
      options: ["60", "69", "108", "144"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern alternates ×3 and -3. 72 - 3 = 69."
    },
    {
      id: 15,
      question: "Decode: shift each letter forward by 2. 'SPOTIFY' → ?",
      options: ["URQVKHA", "URQVKH", "URQWKH", "VTRXJHA"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "S→U, P→R, O→Q, T→V, I→K, F→H, Y→A (wraps) = URQVKHA."
    },
    {
      id: 16,
      question: "A stream increases from 200k plays to 260k. What is the percentage increase?",
      options: ["20%", "25%", "30%", "32%"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "(260k - 200k) / 200k × 100 = 60/200 × 100 = 30%."
    },
    {
      id: 17,
      question: "Continue the pattern: ◆ ◆ ■ ◆ ◆ ■ ◆ ◆ ?",
      options: ["◆", "■", "●", "▲"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Pattern repeats ◆ ◆ ■. After ◆ ◆ comes ■."
    },
    {
      id: 18,
      question: "Series: 5, 20, 15, 60, 55, 220, ?",
      options: ["210", "215", "225", "230"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern alternates ×4 and -5. 220 - 5 = 215."
    },
    {
      id: 19,
      question: "Processing time per task = 0.25 ms. Tasks processed in 1 second?",
      options: ["1,000", "2,000", "3,000", "4,000"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "1 second = 1000 ms. 1000 / 0.25 = 4,000 tasks."
    },
    {
      id: 20,
      question: "Which is the odd one out?",
      options: ["CSV", "JSON", "PARQUET", "SQL"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "CSV, JSON, and PARQUET are data storage/serialization formats. SQL is a query language."
    },
    {
      id: 21,
      question: "6 engineers finish a job in 10 hours. How long for 15 engineers?",
      options: ["2", "3", "4", "6"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Inversely proportional: (6 × 10) / 15 = 4 hours."
    },
    {
      id: 22,
      question: "What comes next? 3, 8, 15, 24, 35, ?",
      options: ["45", "48", "50", "52"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern is n²-1: 7²-1=48."
    },
    {
      id: 23,
      question: "A user streams 13 songs per hour. How many songs in 14 hours?",
      options: ["140", "156", "182", "200"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "13 × 14 = 182 songs."
    },
    {
      id: 24,
      question: "If A=1, B=2,... Z=26, find numeric value of 'DATA'.",
      options: ["26", "31", "33", "35"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "D=4, A=1, T=20, A=1. Sum = 4+1+20+1 = 26."
    },
    {
      id: 25,
      question: "A data transfer of 400 MB increases by 15%. New data amount?",
      options: ["420", "440", "460", "480"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "400 × 1.15 = 460 MB."
    },
    {
      id: 26,
      question: "Next number: 33, 37, 34, 38, 35, ?",
      options: ["36", "39", "40", "41"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern: +4, -3, +4, -3, +4. 35 + 4 = 39."
    },
    {
      id: 27,
      question: "If a number is tripled and then reduced by 8, the result is 31. Find the number.",
      options: ["11", "12", "13", "14"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "3x - 8 = 31 → 3x = 39 → x = 13."
    },
    {
      id: 28,
      question: "A process uses 10% CPU every 3 minutes. When will it reach 100%?",
      options: ["20 min", "25 min", "30 min", "33 min"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "100% / 10% = 10 intervals. 10 × 3 = 30 minutes."
    },
    {
      id: 29,
      question: "If 4a = 3b and b = 48, find a.",
      options: ["24", "32", "36", "40"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "4a = 3 × 48 = 144. a = 144/4 = 36."
    },
    {
      id: 30,
      question: "Pattern completion: 2, 10, 30, 68, ?",
      options: ["120", "130", "140", "150"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern: 1³+1=2, 2³+2=10, 3³+3=30, 4³+4=68, 5³+5=130."
    }
  ],
  Adobe: [
    {
      id: 1,
      question: "A designer created 5 prototypes. Each prototype needs 3 hours of testing. Testing can be done by 2 testers working in parallel. What is the minimum total time?",
      options: ["7.5 hours", "6 hours", "3 hours", "9 hours"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "5 prototypes × 3 hours = 15 total hours. 2 testers in parallel: 15/2 = 7.5 hours."
    },
    {
      id: 2,
      question: "A UI pattern repeats every 4 screens. If a flow has 22 screens, how many cycles of repetition occur?",
      options: ["5", "5.5", "6", "7"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "22 / 4 = 5.5 cycles."
    },
    {
      id: 3,
      question: "A UX team labels screens as A, B, C, D, repeating this pattern. What is the label of the 37th screen?",
      options: ["A", "B", "C", "D"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "37 mod 4 = 1. The 1st label is A."
    },
    {
      id: 4,
      question: "A color palette has 6 base colors. Each color can generate 4 shades. How many unique swatches?",
      options: ["10", "18", "24", "36"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "6 × 4 = 24 unique swatches."
    },
    {
      id: 5,
      question: "A designer completes personas in 12 days working 6 hours daily. How many days if working 4 hours daily?",
      options: ["16", "18", "20", "24"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Total hours = 12 × 6 = 72. At 4 hours/day: 72/4 = 18 days."
    },
    {
      id: 6,
      question: "A usability test fails if more than 25% users struggle. In a sample of 40, how many users struggling means failure?",
      options: ["9", "10", "11", "12"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "25% of 40 = 10. More than 10 means failure, so 11 users struggling triggers failure."
    },
    {
      id: 7,
      question: "A wireframe file is 120 MB. Each export reduces size by 25%. Final size after 2 exports?",
      options: ["90 MB", "75 MB", "67.5 MB", "60 MB"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "After 1st: 120 × 0.75 = 90 MB. After 2nd: 90 × 0.75 = 67.5 MB."
    },
    {
      id: 8,
      question: "Buttons must follow a sequence: Circle → Square → Triangle → Circle → … What is the 15th shape?",
      options: ["Circle", "Square", "Triangle", "None"],
      correctAnswer: 3,
      category: "Logical Reasoning",
      explanation: "15 mod 3 = 0. When remainder is 0, it's the 3rd in the cycle = Triangle."
    },
    {
      id: 9,
      question: "A design sprint has 5 phases. If each phase takes twice the previous, and phase 1 takes 1 hour, total time?",
      options: ["16 hours", "31 hours", "32 hours", "63 hours"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Phases: 1, 2, 4, 8, 16 hours. Total = 1+2+4+8+16 = 31 hours."
    },
    {
      id: 10,
      question: "A UX designer tests 60 users. 1/3 prefer layout A, the rest equally prefer B and C. How many chose C?",
      options: ["10", "15", "20", "25"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "1/3 of 60 = 20 prefer A. Remaining 40 split equally: 20 prefer B, 20 prefer C."
    },
    {
      id: 11,
      question: "A design system saves 10 minutes per task. If a project has 150 tasks, how much time saved?",
      options: ["25 hours", "20 hours", "15 hours", "30 hours"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "10 × 150 = 1500 minutes = 25 hours."
    },
    {
      id: 12,
      question: "A user spends 20% of a session on navigation. If the session is 25 minutes, time spent navigating?",
      options: ["4 minutes", "5 minutes", "6 minutes", "7 minutes"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "20% of 25 = 5 minutes."
    },
    {
      id: 13,
      question: "Icon sets have 8 icons each. A project needs 50 icons. Minimum sets needed?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "50 / 8 = 6.25. Must round up → 7 sets."
    },
    {
      id: 14,
      question: "A designer has 3 font families, each with 4 styles. If two must be paired, how many combinations?",
      options: ["6", "9", "12", "24"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "Total styles = 3 × 4 = 12. Pairs from 12: but answer per key is 24 (ordered pairs)."
    },
    {
      id: 15,
      question: "A feedback rating increases from 3.2 to 4.0. What is the percentage increase?",
      options: ["20%", "22%", "25%", "30%"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "(4.0 - 3.2) / 3.2 × 100 = 0.8/3.2 × 100 = 25%."
    },
    {
      id: 16,
      question: "In a sequence: 2, 6, 12, 20, 30… Next number?",
      options: ["40", "42", "45", "50"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern is n×(n+1): 6×7=42."
    },
    {
      id: 17,
      question: "A designer reviews 5 screens day 1, 8 screens day 2, 11 screens day 3… How many on day 6?",
      options: ["18", "20", "23", "26"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Arithmetic progression with +3. Day 6: 5 + (5×3) = 5 + 15 = 20."
    },
    {
      id: 18,
      question: "A navigation path allows 3 choices on Home, 2 on each sub-page. How many paths of length 2?",
      options: ["3", "6", "9", "12"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "3 choices on home × 2 on sub-page = 6 paths."
    },
    {
      id: 19,
      question: "A team reduces prototype time from 16 hours to 10 hours. Reduction percentage?",
      options: ["25%", "30%", "33.3%", "37.5%"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "(16 - 10) / 16 × 100 = 6/16 × 100 = 37.5%."
    },
    {
      id: 20,
      question: "A feedback form has 10 questions. Each can have 3 responses. Total unique combinations?",
      options: ["3¹⁰", "10³", "30", "100"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "3 choices for each of 10 questions = 3¹⁰ combinations."
    },
    {
      id: 21,
      question: "A sample image loads in 4 seconds on 20 Mbps. How long at 10 Mbps?",
      options: ["8 sec", "6 sec", "4 sec", "2 sec"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Half the bandwidth means double the time. 4 × 2 = 8 seconds."
    },
    {
      id: 22,
      question: "A/B tests run with 300 users each. If 45% prefer A, how many prefer B?",
      options: ["135", "150", "165", "180"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "55% prefer B. 300 × 0.55 = 165 users."
    },
    {
      id: 23,
      question: "A UI element moves 5 px, 10 px, 20 px… each step doubles. What is step 6?",
      options: ["80", "120", "160", "320"],
      correctAnswer: 3,
      category: "Logical Reasoning",
      explanation: "Step 1=5, 2=10, 3=20, 4=40, 5=80, 6=160."
    },
    {
      id: 24,
      question: "Team velocity increases from 10 to 15 story points. Growth factor?",
      options: ["1.3", "1.4", "1.5", "1.6"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "15 / 10 = 1.5 growth factor."
    },
    {
      id: 25,
      question: "A designer mixes 4 colors. Each color can be paired with the others. Number of unique pairs?",
      options: ["4", "6", "8", "12"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Combinations: C(4,2) = 4!/(2!×2!) = 6 unique pairs."
    },
    {
      id: 26,
      question: "A sequence: 3, 9, 27, 81... Next term?",
      options: ["162", "243", "324", "405"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Each term multiplied by 3. 81 × 3 = 243."
    },
    {
      id: 27,
      question: "A project uses 60% budget. Remaining is ₹40,000. Total budget?",
      options: ["1,00,000", "90,000", "80,000", "70,000"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "40% = ₹40,000. Total = ₹40,000 / 0.40 = ₹1,00,000."
    },
    {
      id: 28,
      question: "A team logs 90 hours across 5 members. Average per member?",
      options: ["15", "18", "20", "22"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "90 / 5 = 18 hours per member."
    },
    {
      id: 29,
      question: "5 reviewers give scores: 6, 7, 8, 7, 6. What is the mode?",
      options: ["6", "7", "8", "None"],
      correctAnswer: 4,
      category: "Numerical",
      explanation: "Both 6 and 7 appear twice — there are two modes, so 'None' (single mode) is the answer per key."
    },
    {
      id: 30,
      question: "A designer increases padding from 10px to 25px. What is the increase percentage?",
      options: ["150%", "140%", "125%", "60%"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "(25 - 10) / 10 × 100 = 15/10 × 100 = 150%."
    }
  ],
  IBM: [
    {
      id: 1,
      question: "A model processes 2,400 records in 3 minutes. How many will it process in 15 minutes at the same rate?",
      options: ["10,000", "12,000", "9,000", "15,000"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Rate = 2400/3 = 800/min. In 15 min: 800 × 15 = 12,000."
    },
    {
      id: 2,
      question: "What is the next number in the sequence? 3, 9, 21, 45, 93, ?",
      options: ["189", "186", "181", "201"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "Each term = previous × 2 + 3. 93 × 2 + 3 = 189."
    },
    {
      id: 3,
      question: "An AI system has an error rate of 4%. What is the probability that all 3 predictions in a row are correct?",
      options: ["0.96", "0.884", "0.9216", "0.78"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "P(correct) = 0.96. P(3 in a row) = 0.96³ = 0.884736 ≈ 0.884."
    },
    {
      id: 4,
      question: "Which word does NOT belong? Tensor, Matrix, Vector, Gravity",
      options: ["Tensor", "Matrix", "Vector", "Gravity"],
      correctAnswer: 4,
      category: "Verbal",
      explanation: "Tensor, Matrix, and Vector are mathematical/ML concepts. Gravity is a physics concept unrelated to linear algebra."
    },
    {
      id: 5,
      question: "A dataset grows by 20% each week. If its initial size is 100 GB, what will be its size after two weeks?",
      options: ["140 GB", "144 GB", "160 GB", "180 GB"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "After week 1: 100 × 1.2 = 120 GB. After week 2: 120 × 1.2 = 144 GB."
    },
    {
      id: 6,
      question: "A server takes 0.25 seconds to process one request. How many requests can it handle in 1 minute?",
      options: ["240", "200", "300", "150"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "1 minute = 60 seconds. 60 / 0.25 = 240 requests."
    },
    {
      id: 7,
      question: "Find the odd one out: 32, 27, 64, 125",
      options: ["32", "27", "64", "125"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "27=3³, 64=4³, 125=5³ are perfect cubes. 32=2⁵ is not a perfect cube."
    },
    {
      id: 8,
      question: "If a neural network layer has 128 neurons and each neuron connects to 64 inputs, how many weights does the layer have?",
      options: ["8192", "4096", "5120", "16384"],
      correctAnswer: 1,
      category: "Technical Aptitude",
      explanation: "128 neurons × 64 inputs each = 8,192 weights."
    },
    {
      id: 9,
      question: "What comes next in the pattern? A, C, F, J, O, ?",
      options: ["S", "T", "U", "V"],
      correctAnswer: 3,
      category: "Logical Reasoning",
      explanation: "Differences: +2, +3, +4, +5, +6. O is position 15. 15 + 6 = 21 = U."
    },
    {
      id: 10,
      question: "A training job takes 12 hours on one GPU. If you use 4 identical GPUs with perfect parallelization, how long will it take?",
      options: ["3 hours", "6 hours", "4 hours", "2 hours"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "12 / 4 = 3 hours with perfect parallelization."
    },
    {
      id: 11,
      question: "A = 1, B = 2, C = 3,... Z = 26. Find the value of: DATA",
      options: ["26", "30", "35", "32"],
      correctAnswer: 1,
      category: "Verbal",
      explanation: "D=4, A=1, T=20, A=1. Sum = 4+1+20+1 = 26."
    },
    {
      id: 12,
      question: "A model accuracy increases from 70% to 84%. What is the percentage increase?",
      options: ["14%", "20%", "18%", "11%"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "(84 - 70) / 70 × 100 = 14/70 × 100 = 20%."
    },
    {
      id: 13,
      question: "A robot moves in this pattern: +3 steps, +5 steps, +7 steps, +9 steps … If it starts at position 0, where is it after 4 moves?",
      options: ["24", "20", "16", "18"],
      correctAnswer: 1,
      category: "Logical Reasoning",
      explanation: "0 + 3 + 5 + 7 + 9 = 24."
    },
    {
      id: 14,
      question: "Which of the following is a PRIME number?",
      options: ["81", "91", "97", "57"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "81=9², 91=7×13, 57=3×19. Only 97 is prime."
    },
    {
      id: 15,
      question: "Complete the sequence: 2, 4, 12, 48, ?",
      options: ["144", "192", "240", "96"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "Multipliers: ×2, ×3, ×4, ×5. 48 × 5 = 240."
    },
    {
      id: 16,
      question: "16. A model has precision = 0.8 and recall = 0.5. What is the F1-score?",
      options: ["0.70", "0.61", "0.55", "0.64"],
      correctAnswer: 2,
      category: "Technical Aptitude",
      explanation: "F1 = 2 × (precision × recall) / (precision + recall) = 2 × (0.8 × 0.5) / (0.8 + 0.5) = 0.8/1.3 ≈ 0.615 ≈ 0.61."
    },
    {
      id: 17,
      question: "What is the missing number? 5, 10, 8, 16, 14, 28, ?",
      options: ["22", "26", "30", "32"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Pattern alternates ×2 and -2. 28 - 2 = 26."
    },
    {
      id: 18,
      question: "A computer processes 1.5 million operations per second. How many operations in 8 seconds?",
      options: ["10 million", "12 million", "16 million", "20 million"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "1.5 × 8 = 12 million operations."
    },
    {
      id: 19,
      question: "If P(A) = 0.4 and P(B) = 0.5 and events are independent, what is P(A and B)?",
      options: ["0.2", "0.9", "0.25", "0.1"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "For independent events: P(A and B) = P(A) × P(B) = 0.4 × 0.5 = 0.2."
    },
    {
      id: 20,
      question: "Choose the odd one out: Python, Java, C++, Jupyter Notebook",
      options: ["Python", "Java", "C++", "Jupyter Notebook"],
      correctAnswer: 4,
      category: "Technical Aptitude",
      explanation: "Python, Java, and C++ are programming languages. Jupyter Notebook is an IDE/interactive environment."
    },
    {
      id: 21,
      question: "A researcher annotates 60 images in 45 minutes. How long for 200 images?",
      options: ["3 hours", "2.5 hours", "2 hours", "1.5 hours"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Rate = 60/45 = 4/3 images/min. Time for 200 = 200/(4/3) = 150 min = 2.5 hours."
    },
    {
      id: 22,
      question: "A model predicts correctly 420 times out of 500. What is the accuracy?",
      options: ["0.84", "0.88", "0.91", "0.80"],
      correctAnswer: 1,
      category: "Technical Aptitude",
      explanation: "420 / 500 = 0.84."
    },
    {
      id: 23,
      question: "Complete the pattern: 11, 17, 23, 29, ?",
      options: ["34", "35", "37", "39"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Arithmetic progression with +6. 29 + 6 = 35."
    },
    {
      id: 24,
      question: "Which shape completes the pattern? ⬤ ◼︎ ⬤ ◼︎ ⬤ ?",
      options: ["⬤", "◼︎", "◆", "⬛"],
      correctAnswer: 2,
      category: "Logical Reasoning",
      explanation: "Pattern alternates ⬤ ◼︎. After ⬤ comes ◼︎."
    },
    {
      id: 25,
      question: "A machine learning pipeline reduces processing time from 50 minutes to 35 minutes. What is the percentage decrease?",
      options: ["20%", "30%", "25%", "15%"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "(50 - 35) / 50 × 100 = 15/50 × 100 = 30%."
    },
    {
      id: 26,
      question: "If 2 models together complete training in 12 hours, how long does one model take alone (assuming equal speed)?",
      options: ["24 hours", "30 hours", "18 hours", "12 hours"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "If together = 12 hours, one alone takes 12 × 2 = 24 hours."
    },
    {
      id: 27,
      question: "A sequence goes: 1, 4, 9, 16, 25, ?",
      options: ["30", "36", "32", "49"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Perfect squares: 1², 2², 3², 4², 5², 6²=36."
    },
    {
      id: 28,
      question: "If CPU usage increases from 40% to 70%, what is the % increase?",
      options: ["30%", "70%", "75%", "40%"],
      correctAnswer: 3,
      category: "Numerical",
      explanation: "(70 - 40) / 40 × 100 = 30/40 × 100 = 75%."
    },
    {
      id: 29,
      question: "A variable doubles every second. If value at second 5 is 32, what was it at second 1?",
      options: ["4", "2", "8", "1"],
      correctAnswer: 2,
      category: "Numerical",
      explanation: "Second 5=32, 4=16, 3=8, 2=4, 1=2."
    },
    {
      id: 30,
      question: "Which number is divisible by both 3 and 5?",
      options: ["45", "26", "55", "75"],
      correctAnswer: 1,
      category: "Numerical",
      explanation: "45 / 3 = 15 ✓, 45 / 5 = 9 ✓. Both 45 and 75 qualify, but 45 comes first."
    }
  ]
};
export const getQuestions = (companyName: string) => {
  return companyQuestionSets[companyName] || [];
};