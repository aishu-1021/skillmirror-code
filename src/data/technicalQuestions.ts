export interface TechnicalQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option
}
export const technicalQuestionSets: { [key: string]: TechnicalQuestion[] } = {
  Google: [
    {
      id: 1,
      question: "What is the time complexity of searching in a balanced binary search tree (BST)?",
      options: ["o(n)", "o(log n)", "o(n log n)", "o(1)"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "Which traversal of a BST gives sorted order?",
      options: ["Preorder", "Postorder", "Inorder", " Level order"],
      correctAnswer: 3,
    },
    {
      id: 3,
      question: "Which algorithm is best for detecting a cycle in a directed graph?",
      options: ["BFS alone", " DFS + recursion stack", "Heap sort", "Merge Sort"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "Which data structure is used in Dijkstra’s Algorithm for shortest path?",
      options: [" Queue"," Priority Queue", "Stack"," HashMap",],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "Given an integer array nums and a target k, what is the MOST optimal approach to count continuous subarrays whose sum equals k?",
      options: [
          " Two nested loops — O(n²)",
           " Prefix sum + HashMap — O(n)",
            " Sorting + binary search — O(n log n)",
             "Divide and conquer — O(n log n)"
             ],
      correctAnswer: 2,
    },
   {
      id: 6,
      question: "What is the time complexity of the optimal greedy solution to find minimum jumps to reach the end?",
      options: ["O(n²)", " O(log n)", " O(n)", " O(n log n)"],
      correctAnswer: 3,
    },
  ],

 Amazon: [
    {
      id: 1,
      question: "This must be solved WITHOUT division. What is the optimal solution?",
      options: [
        "Prefix product + suffix product",
        " Sorting + two pointers",
        "Sliding window",
        "Divide and conquer",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Amazon frequently asks: Which sorting algorithm is used in Java’s Arrays.sort() for primitives?",
      options: ["QuickSort", "MergeSort", "Dual-pivot QuickSort", "HeapSort"],
      correctAnswer: 3,
    },
    {
      id: 3,
      question: "What is the best strategy to maximize area between two lines?",
      options: [
        " Try all pairs",
        "Two pointers from both ends",
        "Dynamic programming",
        " Binary search",
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "Which data structure does Amazon prefer for LRU Cache implementation?",
      options: ["Array", "Queue", "HashMap + Doubly Linked List", " BST"],
      correctAnswer: 3,
    },
    {
      id: 5,
      question: "For “Trapping Rain Water”, Amazon expects which solution?",
      options: ["Two pointers approach", "Brute force", " BFS", "  DFS"],
      correctAnswer: 1,
    },
    {
      id: 6,
      question: "Which algorithm is BEST for \"K closest points to origin\"?",
      options: ["Quickselect", " Heap of all points", " BFS", " DP table"],
      correctAnswer: 1,
    },
  ],

 Microsoft: [
    {
      id: 1,
      question: "Which technique is used to rotate an n × n matrix 90 degrees clockwise IN-PLACE?",
      options: [
        "Reverse rows only",
        " Transpose + reverse rows",
        " Transpose + reverse columns",
        " Transpose + reverse columns",
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "To set matrix rows & columns to zero WITHOUT extra space, what is the key idea?",
      options: [" Use visited array", "Use HashSet to track zeros", "Use first row & column as markers", "Use recursion"],
      correctAnswer: 3,
    },
    {
      id: 3,
      question: "What is the optimal solution for “Longest Valid Parentheses”?",
      options: [
        " Stack",
        "DP",
        "Two-pointer + Stack",
        " All of the above",
      ],
      correctAnswer: 4,
    },
    {
      id: 4,
      question: "How do you find the missing number in array 0..n in O(1) space?",
      options: [" Sorting", " HashSet", "XOR of all numbers", " Recursion"],
      correctAnswer: 3,
    },
    {
      id: 5,
      question: "For “Clone a Linked List with Random Pointer”, the optimal solution uses:",
      options: [" HashMap only", "Interweaving technique", "  Recursion", "  DFS"],
      correctAnswer: 2,
    },
    {
      id: 6,
      question: "What is the depth limit for recursion in typical Microsoft coding tests?",
      options: ["Hardware-dependent", " 1000", " 10,000", "  Infinite"],
      correctAnswer: 1,
    },
  ],

 Apple: [
     {
       id: 1,
       question: "For in-place matrix rotation (90°), what is correct",
       options: [
         " Flip vertically + transpose",
         " Swap diagonally",
         "Reverse rows only",
         " Reverse columns only",
       ],
       correctAnswer: 1,
     },
     {
       id: 2,
       question: "Apple’s system-on-chip interview often asks: Which algorithm is used in CPU scheduling?",
       options: ["First Fit", "Round Robin", "BFS", "Floyd-Warshall"],
       correctAnswer: 2,
     },
     {
       id: 3,
       question: "What is the core data structure behind an Autocomplete system?",
       options: [
         " HashMap",
         " Trie",
         "BST",
         " Graph",
       ],
       correctAnswer: 2,
     },
     {
       id: 4,
       question: "Apple iOS teams often ask: Which traversal is used to serialize a binary tree?",
       options: ["Inorder", "Preorder", "Postorder", " Level order"],
       correctAnswer: 2,
     },
     {
       id: 5,
       question: "Which algorithm finds elements appearing more than n/3 times in O(n) time & O(1) space?",
       options: ["Merge sort", "Moore’s Voting Algorithm (modified)", " Binary search", " Stack"],
       correctAnswer: 2,
     },
     {
       id: 6,
       question: "How does Apple expect you to merge nums2 into nums1?",
       options: ["Compare elements from start", " Compare from the end & fill from back", " Use extra array", "Use priority queue"],
       correctAnswer: 2,
     },
   ],

  Netflix: [
       {
         id: 1,
         question: "How do you compute minimum swaps to sort an array of distinct values?",
         options: [
           " Brute force search",
           " Merge sort",
           "Detect cycles in index mapping",
           " BFS",
         ],
         correctAnswer: 3,
       },
       {
         id: 2,
         question: "What is the time complexity of the optimal LIS solution?",
         options: ["O(n²)", "O(n)", " O(n log n) using binary search", " O(log n) "],
         correctAnswer: 3,
       },
       {
         id: 3,
         question: "Netflix uses which architecture for recommendations?",
         options: [
           " Decision trees",
           " Collaborative filtering + ranking models",
           "Linear regression",
           " Greedy algorithm",
         ],
         correctAnswer: 2,
       },
       {
         id: 4,
         question: "Netflix uses which technique for adaptive video streaming?",
         options: [" MPEG-2 encoding", "Constant Bitrate Streaming", "Adaptive Bitrate (ABR) streaming over HTTP", " UDP broadcas"],
         correctAnswer: 3,
       },
       {
         id: 5,
         question: "3. For large-scale caching, Netflix uses:",
         options: [" FIFO", "Round Robin", "  Distributed cache using EVCache", "  LIFO"],
         correctAnswer: 3,
       },
       {
         id: 6,
         question: "A microservices-based application should use which communication style?",
         options: ["Tight coupling", "  Shared database", "REST/gRPC APIs", " Monolithic calls"],
         correctAnswer: 3,
       },
   ],

  Meta: [
       {
         id: 1,
         question: "Meta frequently asks: What data structure gives O(1) average for LFU Cache?",
         options: [
           " Heap",
           " HashMap + Min-frequency Linked List",
           " BST",
           "  Queue",
         ],
         correctAnswer: 2,
       },
       {
         id: 2,
         question: "For “Course Schedule”, Meta expects:",
         options: ["Binary search", "Union-Find", "Topological sorting", "Backtracking"],
         correctAnswer: 3,
       },
       {
         id: 3,
         question: "What is the most optimal approach to solve 3Sum?",
         options: [
           " Bruteforce triple loops",
           " Sorting + two pointers",
           "Greedy",
           " BFS",
         ],
         correctAnswer: 2,
       },
       {
         id: 4,
         question: "Which graph algorithm efficiently finds strongly connected components?",
         options: ["Kruskal’s", "Prim’s", "Kosaraju's / Tarjan's", " Dijkstra"],
         correctAnswer: 3,
       },
       {
         id: 5,
         question: " Which algorithm is suitable for \"Minimum Window Subsequence\"?",
         options: [" DP", "Sliding window + DP", " BFS", " . Heap"],
         correctAnswer: 1,
       },
       {
         id: 6,
         question: "What technique ensures each element appears once in the subarray?",
         options: [" DP", " HashMap + sliding window", " Heap", " Binary search"],
         correctAnswer: 2,
       },
   ],

 Tesla: [
      {
        id: 1,
        question: "This problem is identical to which famous DP variant?",
        options: [
          " Coin change",
          " House Robber",
          " Fibonacci series",
          " Subset sum",
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "When solving this problem, the final start index is valid ONLY if:",
        options: ["Total gas >= total cost", "First element > cost", " Gas array is sorted", "Greedy picks smallest index"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "For autonomous driving pathfinding, Tesla uses:",
        options: [
          " Dijkstra only",
          " BFS",
          " A* search",
          " Brute force",
        ],
        correctAnswer: 3,
      },
      {
        id: 4,
        question: "What filter is preferred for noise reduction in sensor fusion?",
        options: ["Low-pass filter", " Kalman filter", "High-pass filter", "Moving average"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "Real-time embedded systems require what scheduling?",
        options: [" FIFO", "EDF (Earliest Deadline First)", " Round Robin only", " FCFS"],
        correctAnswer: 2,
      },
      {
        id: 6,
        question: "Which neural network is commonly used for object detection?",
        options: ["LSTM", " YOLO (You Only Look Once)", " SVM", "KNN"],
        correctAnswer: 2,
      },
  ],


 Spotify: [
      {
        id: 1,
        question: "The most optimal way to group anagrams by signature is:",
        options: [
          " Sort entire list",
          " Hashmap using char frequency array as key",
          "Heap",
          " BFS",
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "Which technique solves this efficiently?",
        options: [" DP", "Sliding window + freq count", "Recursion", "Sorting"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "Audio fingerprinting is based on:",
        options: [
          " HashMap only",
          " Spectrogram + hashing",
          "BFS",
          "  Linked List",
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: "Which algorithm is used to shuffle songs fairly?",
        options: [" Fixed randomr", ". Fisher-Yates shuffle", ". Bubble sort", " Brute force"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "To cluster similar audio tracks:",
        options: [" K-means clustering", "DFS", " BFS", "  Brute force"],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: "API request-rate limiting uses:",
        options: [" Greedy", "  Token bucket", " Backtracking", "Scaling"],
        correctAnswer: 2,
      },
  ],

 IBM: [
      {
        id: 1,
        question: "What is the optimal solution?",
        options: [
          "  Create new array",
          " Swap zero with next non-zero using two pointers",
          " Sort array",
          " Use stack",
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "Which traversal method is used?",
        options: ["Row major only", " Z-shape traversal", "BFS", " Iterative boundary shrinking"],
        correctAnswer: 4,
      },
      {
        id: 3,
        question: "What is ACID in databases?",
        options: [
          " Action, Control, Index, Data",
          " Atomicity, Consistency, Isolation, Durability",
          "Array, Class, Index, Data",
          " None",
        ],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: "Which data structure is best for implementing priority scheduling?",
        options: ["Stack", "Min-heap", "Queue", "  HashSet"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "Which searching algorithm is most efficient in sorted array?",
        options: [" BFS", "Linear search", " Binary search", " Jump search always"],
        correctAnswer: 3,
      },
      {
        id: 6,
        question: "Which OOP principle hides internal details?",
        options: ["Inheritance", "Polymorphism", " Encapsulation", " Abstraction only"],
        correctAnswer: 3,
      },
  ],


 Adobe: [
       {
         id: 1,
         question: "You are given an array and multiple queries asking for the sum between indices L and R. Which method is most efficient to answer these queries quickly?",
         options: [
           " Loop through the array for each query and sum values",
           " Precompute prefix sums and answer queries in O(1) time",
           " Sort the array first and then use binary search",
           " Use a stack to store sums",
         ],
         correctAnswer: 2,
       },
       {
         id: 2,
         question: "You need to design a rate limiter that allows a fixed number of requests per user per minute. Which approach is BEST suited?",
         options: [
             "Use a queue to store all user requests and dequeue every minute",
              " Use a token bucket or sliding window and maintain timestamps",
              "Use a binary search tree to store user request times",
               " Create a thread for each user to monitor request rate"
               ],
         correctAnswer: 2,
       },
       {
         id: 3,
         question: "To detect duplicate tracks efficiently:",
         options: [
           "  HashSet",
           " Stack",
           " Queue",
           "Heap",
         ],
         correctAnswer: 1,
       },
       {
         id: 4,
         question: "Which model supports parallel transaction control?",
         options: ["Two-phase locking", "Bubble Sort", "BFS", "Greedy"],
         correctAnswer: 1,
       },
       {
         id: 5,
         question: "Which data structure is best for implementing priority scheduling?",
         options: ["  Stack", "Min-heap", " Queue", " HashSet"],
         correctAnswer: 2,
       },
       {
         id: 6,
         question: "What ensures relational integrity in DBMS?",
         options: [" Loops", " Foreign keys", " BFS", "  Bit masking"],
         correctAnswer: 2,
       },
   ],
};