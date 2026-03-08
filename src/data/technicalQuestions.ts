export interface TechnicalQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation: string;
}

export const technicalQuestionSets: { [key: string]: TechnicalQuestion[] } = {
  Google: [
    {
      id: 1,
      question: "What is the time complexity of searching in a balanced binary search tree (BST)?",
      options: ["o(n)", "o(log n)", "o(n log n)", "o(1)"],
      correctAnswer: 2,
      category: "Data Structures",
      explanation: "A balanced BST halves the search space at each node, giving O(log n) time — similar to binary search."
    },
    {
      id: 2,
      question: "Which traversal of a BST gives sorted order?",
      options: ["Preorder", "Postorder", "Inorder", "Level order"],
      correctAnswer: 3,
      category: "Data Structures",
      explanation: "Inorder traversal visits left → root → right. In a BST this always produces values in ascending sorted order."
    },
    {
      id: 3,
      question: "Which algorithm is best for detecting a cycle in a directed graph?",
      options: ["BFS alone", "DFS + recursion stack", "Heap sort", "Merge Sort"],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "DFS with a recursion stack tracks nodes in the current path. If a visited node is found in the stack, a cycle exists."
    },
    {
      id: 4,
      question: "Which data structure is used in Dijkstra's Algorithm for shortest path?",
      options: ["Queue", "Priority Queue", "Stack", "HashMap"],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Dijkstra's algorithm always processes the node with the smallest known distance next — a min-heap (priority queue) makes this O(log n)."
    },
    {
      id: 5,
      question: "Given an integer array nums and a target k, what is the MOST optimal approach to count continuous subarrays whose sum equals k?",
      options: [
        "Two nested loops — O(n²)",
        "Prefix sum + HashMap — O(n)",
        "Sorting + binary search — O(n log n)",
        "Divide and conquer — O(n log n)"
      ],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Prefix sum + HashMap stores cumulative sums. For each index, check if (currentSum - k) exists in the map — O(n) time and space."
    },
    {
      id: 6,
      question: "What is the time complexity of the optimal greedy solution to find minimum jumps to reach the end?",
      options: ["O(n²)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 3,
      category: "Algorithms",
      explanation: "The greedy approach tracks the farthest reachable index in a single pass, making it O(n) — no nested loops needed."
    },
  ],

  Amazon: [
    {
      id: 1,
      question: "This must be solved WITHOUT division. What is the optimal solution?",
      options: [
        "Prefix product + suffix product",
        "Sorting + two pointers",
        "Sliding window",
        "Divide and conquer",
      ],
      correctAnswer: 1,
      category: "Algorithms",
      explanation: "Product of Array Except Self: compute a prefix product array and a suffix product array, then multiply them. O(n) time, no division."
    },
    {
      id: 2,
      question: "Amazon frequently asks: Which sorting algorithm is used in Java's Arrays.sort() for primitives?",
      options: ["QuickSort", "MergeSort", "Dual-pivot QuickSort", "HeapSort"],
      correctAnswer: 3,
      category: "Algorithms",
      explanation: "Java uses Dual-Pivot QuickSort for primitive arrays (introduced in Java 7). It is faster in practice than classic single-pivot QuickSort."
    },
    {
      id: 3,
      question: "What is the best strategy to maximize area between two lines?",
      options: [
        "Try all pairs",
        "Two pointers from both ends",
        "Dynamic programming",
        "Binary search",
      ],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Container With Most Water: start with the widest pair and move the shorter line inward. Two pointers gives O(n) vs O(n²) brute force."
    },
    {
      id: 4,
      question: "Which data structure does Amazon prefer for LRU Cache implementation?",
      options: ["Array", "Queue", "HashMap + Doubly Linked List", "BST"],
      correctAnswer: 3,
      category: "Data Structures",
      explanation: "HashMap gives O(1) lookup by key; Doubly Linked List gives O(1) insertion/deletion at any position. Together they implement LRU Cache in O(1)."
    },
    {
      id: 5,
      question: "For 'Trapping Rain Water', Amazon expects which solution?",
      options: ["Two pointers approach", "Brute force", "BFS", "DFS"],
      correctAnswer: 1,
      category: "Algorithms",
      explanation: "Two pointers track left max and right max simultaneously. Water trapped at each position = min(leftMax, rightMax) - height[i]. O(n) time, O(1) space."
    },
    {
      id: 6,
      question: "Which algorithm is BEST for 'K closest points to origin'?",
      options: ["Quickselect", "Heap of all points", "BFS", "DP table"],
      correctAnswer: 1,
      category: "Algorithms",
      explanation: "Quickselect partitions the array around a pivot to find the K smallest elements in O(n) average time — better than sorting O(n log n)."
    },
  ],

  Microsoft: [
    {
      id: 1,
      question: "Which technique is used to rotate an n × n matrix 90 degrees clockwise IN-PLACE?",
      options: [
        "Reverse rows only",
        "Transpose + reverse rows",
        "Transpose + reverse columns",
        "Rotate each element directly",
      ],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "To rotate 90° clockwise in-place: first transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row."
    },
    {
      id: 2,
      question: "To set matrix rows & columns to zero WITHOUT extra space, what is the key idea?",
      options: ["Use visited array", "Use HashSet to track zeros", "Use first row & column as markers", "Use recursion"],
      correctAnswer: 3,
      category: "Algorithms",
      explanation: "Use the first row and first column of the matrix itself as flag arrays. This avoids extra O(m+n) space and uses only O(1) extra."
    },
    {
      id: 3,
      question: "What is the optimal solution for 'Longest Valid Parentheses'?",
      options: [
        "Stack",
        "DP",
        "Two-pointer + Stack",
        "All of the above",
      ],
      correctAnswer: 4,
      category: "Algorithms",
      explanation: "Stack, DP, and two-pointer all solve Longest Valid Parentheses optimally in O(n). All three approaches are valid and expected to be known."
    },
    {
      id: 4,
      question: "How do you find the missing number in array 0..n in O(1) space?",
      options: ["Sorting", "HashSet", "XOR of all numbers", "Recursion"],
      correctAnswer: 3,
      category: "Algorithms",
      explanation: "XOR all numbers 0 to n, then XOR all array elements. Duplicate numbers cancel out, leaving the missing number. O(n) time, O(1) space."
    },
    {
      id: 5,
      question: "For 'Clone a Linked List with Random Pointer', the optimal solution uses:",
      options: ["HashMap only", "Interweaving technique", "Recursion", "DFS"],
      correctAnswer: 2,
      category: "Data Structures",
      explanation: "Interweaving inserts cloned nodes between original nodes so random pointers can be set without a HashMap. O(n) time, O(1) extra space."
    },
    {
      id: 6,
      question: "What is the depth limit for recursion in typical Microsoft coding tests?",
      options: ["Hardware-dependent", "1000", "10,000", "Infinite"],
      correctAnswer: 1,
      category: "General CS",
      explanation: "Recursion depth depends on the system stack size, which is hardware and OS dependent. There is no fixed universal limit — deep recursion risks StackOverflow."
    },
  ],

  Apple: [
    {
      id: 1,
      question: "For in-place matrix rotation (90°), what is correct?",
      options: [
        "Flip vertically + transpose",
        "Swap diagonally",
        "Reverse rows only",
        "Reverse columns only",
      ],
      correctAnswer: 1,
      category: "Algorithms",
      explanation: "To rotate 90° clockwise: transpose the matrix then reverse each row. Equivalently: flip vertically then transpose. Both achieve the same result."
    },
    {
      id: 2,
      question: "Apple's system-on-chip interview often asks: Which algorithm is used in CPU scheduling?",
      options: ["First Fit", "Round Robin", "BFS", "Floyd-Warshall"],
      correctAnswer: 2,
      category: "Operating Systems",
      explanation: "Round Robin gives each process a fixed time quantum in cyclic order. It is widely used in CPU scheduling for fairness and time-sharing systems."
    },
    {
      id: 3,
      question: "What is the core data structure behind an Autocomplete system?",
      options: [
        "HashMap",
        "Trie",
        "BST",
        "Graph",
      ],
      correctAnswer: 2,
      category: "Data Structures",
      explanation: "A Trie (prefix tree) stores strings character by character. All words sharing a prefix share the same path, making prefix search O(L) where L is word length."
    },
    {
      id: 4,
      question: "Apple iOS teams often ask: Which traversal is used to serialize a binary tree?",
      options: ["Inorder", "Preorder", "Postorder", "Level order"],
      correctAnswer: 2,
      category: "Data Structures",
      explanation: "Preorder (root → left → right) is used for serialization because the root is recorded first, making it straightforward to reconstruct the tree during deserialization."
    },
    {
      id: 5,
      question: "Which algorithm finds elements appearing more than n/3 times in O(n) time & O(1) space?",
      options: ["Merge sort", "Moore's Voting Algorithm (modified)", "Binary search", "Stack"],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Modified Boyer-Moore Voting tracks at most 2 candidates (since at most 2 elements can appear > n/3 times). Single pass, O(n) time, O(1) space."
    },
    {
      id: 6,
      question: "How does Apple expect you to merge nums2 into nums1?",
      options: ["Compare elements from start", "Compare from the end & fill from back", "Use extra array", "Use priority queue"],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Start from the largest elements at the end of both arrays and place them at the back of nums1. This avoids overwriting unprocessed elements. O(n) time, O(1) space."
    },
  ],

  Netflix: [
    {
      id: 1,
      question: "How do you compute minimum swaps to sort an array of distinct values?",
      options: [
        "Brute force search",
        "Merge sort",
        "Detect cycles in index mapping",
        "BFS",
      ],
      correctAnswer: 3,
      category: "Algorithms",
      explanation: "Map each value to its correct index. Find cycles in this mapping — each cycle of length k needs (k-1) swaps. Sum over all cycles gives minimum total swaps."
    },
    {
      id: 2,
      question: "What is the time complexity of the optimal LIS solution?",
      options: ["O(n²)", "O(n)", "O(n log n) using binary search", "O(log n)"],
      correctAnswer: 3,
      category: "Algorithms",
      explanation: "Patience sorting + binary search maintains a 'tails' array. For each element, binary search finds where it fits. This gives O(n log n) — much better than O(n²) DP."
    },
    {
      id: 3,
      question: "Netflix uses which architecture for recommendations?",
      options: [
        "Decision trees",
        "Collaborative filtering + ranking models",
        "Linear regression",
        "Greedy algorithm",
      ],
      correctAnswer: 2,
      category: "System Design",
      explanation: "Netflix uses collaborative filtering (user-item interactions) combined with ranking models to personalise recommendations at scale."
    },
    {
      id: 4,
      question: "Netflix uses which technique for adaptive video streaming?",
      options: ["MPEG-2 encoding", "Constant Bitrate Streaming", "Adaptive Bitrate (ABR) streaming over HTTP", "UDP broadcast"],
      correctAnswer: 3,
      category: "System Design",
      explanation: "ABR streaming dynamically adjusts video quality based on the viewer's current bandwidth, preventing buffering while maximising quality."
    },
    {
      id: 5,
      question: "For large-scale caching, Netflix uses:",
      options: ["FIFO", "Round Robin", "Distributed cache using EVCache", "LIFO"],
      correctAnswer: 3,
      category: "System Design",
      explanation: "EVCache is Netflix's distributed caching solution built on Memcached. It replicates cache data across availability zones for low-latency access at scale."
    },
    {
      id: 6,
      question: "A microservices-based application should use which communication style?",
      options: ["Tight coupling", "Shared database", "REST/gRPC APIs", "Monolithic calls"],
      correctAnswer: 3,
      category: "System Design",
      explanation: "REST/gRPC APIs keep microservices loosely coupled — each service exposes a well-defined interface and can be deployed, scaled, and updated independently."
    },
  ],

  Meta: [
    {
      id: 1,
      question: "Meta frequently asks: What data structure gives O(1) average for LFU Cache?",
      options: [
        "Heap",
        "HashMap + Min-frequency Linked List",
        "BST",
        "Queue",
      ],
      correctAnswer: 2,
      category: "Data Structures",
      explanation: "LFU Cache uses a HashMap of keys, a HashMap of frequency buckets, and a doubly linked list per frequency. All operations are O(1) average."
    },
    {
      id: 2,
      question: "For 'Course Schedule', Meta expects:",
      options: ["Binary search", "Union-Find", "Topological sorting", "Backtracking"],
      correctAnswer: 3,
      category: "Algorithms",
      explanation: "Course Schedule is cycle detection in a directed graph. Topological sort (Kahn's BFS or DFS-based) detects if a valid ordering exists — i.e., no cycle."
    },
    {
      id: 3,
      question: "What is the most optimal approach to solve 3Sum?",
      options: [
        "Bruteforce triple loops",
        "Sorting + two pointers",
        "Greedy",
        "BFS",
      ],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Sort the array, fix one element, then use two pointers on the rest. Skip duplicates to avoid repeated triplets. O(n²) time — optimal for this problem."
    },
    {
      id: 4,
      question: "Which graph algorithm efficiently finds strongly connected components?",
      options: ["Kruskal's", "Prim's", "Kosaraju's / Tarjan's", "Dijkstra"],
      correctAnswer: 3,
      category: "Algorithms",
      explanation: "Kosaraju's uses two DFS passes (original + transposed graph). Tarjan's uses a single DFS with a stack. Both find SCCs in O(V + E)."
    },
    {
      id: 5,
      question: "Which algorithm is suitable for 'Minimum Window Subsequence'?",
      options: ["DP", "Sliding window + DP", "BFS", "Heap"],
      correctAnswer: 1,
      category: "Algorithms",
      explanation: "Minimum Window Subsequence uses DP to find positions where T appears as a subsequence in S, then tracks the minimum window length. O(|S| × |T|) time."
    },
    {
      id: 6,
      question: "What technique ensures each element appears once in the subarray?",
      options: ["DP", "HashMap + sliding window", "Heap", "Binary search"],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "HashMap tracks the last seen index of each character. The sliding window's left pointer jumps past the previous occurrence when a duplicate is found. O(n) time."
    },
  ],

  Tesla: [
    {
      id: 1,
      question: "This problem is identical to which famous DP variant?",
      options: [
        "Coin change",
        "House Robber",
        "Fibonacci series",
        "Subset sum",
      ],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "The House Robber problem uses DP where you can't pick adjacent elements. State: dp[i] = max(dp[i-1], dp[i-2] + nums[i]). O(n) time, O(1) space."
    },
    {
      id: 2,
      question: "When solving this problem, the final start index is valid ONLY if:",
      options: ["Total gas >= total cost", "First element > cost", "Gas array is sorted", "Greedy picks smallest index"],
      correctAnswer: 1,
      category: "Algorithms",
      explanation: "Gas Station (greedy): if total gas >= total cost, a solution always exists. The valid start is the index after the last point where cumulative sum went negative."
    },
    {
      id: 3,
      question: "For autonomous driving pathfinding, Tesla uses:",
      options: [
        "Dijkstra only",
        "BFS",
        "A* search",
        "Brute force",
      ],
      correctAnswer: 3,
      category: "System Design",
      explanation: "A* search uses a heuristic (estimated distance to goal) to guide pathfinding. It finds optimal paths faster than Dijkstra by prioritising promising directions."
    },
    {
      id: 4,
      question: "What filter is preferred for noise reduction in sensor fusion?",
      options: ["Low-pass filter", "Kalman filter", "High-pass filter", "Moving average"],
      correctAnswer: 2,
      category: "System Design",
      explanation: "The Kalman filter predicts and corrects state estimates using a model of the system. It optimally combines noisy sensor measurements for smooth real-time tracking."
    },
    {
      id: 5,
      question: "Real-time embedded systems require what scheduling?",
      options: ["FIFO", "EDF (Earliest Deadline First)", "Round Robin only", "FCFS"],
      correctAnswer: 2,
      category: "Operating Systems",
      explanation: "EDF scheduling always runs the task with the nearest deadline first. It is provably optimal for preemptive real-time systems when the system is not overloaded."
    },
    {
      id: 6,
      question: "Which neural network is commonly used for object detection?",
      options: ["LSTM", "YOLO (You Only Look Once)", "SVM", "KNN"],
      correctAnswer: 2,
      category: "System Design",
      explanation: "YOLO divides the image into a grid and predicts bounding boxes and class probabilities in a single forward pass, making it fast enough for real-time detection."
    },
  ],

  Spotify: [
    {
      id: 1,
      question: "The most optimal way to group anagrams by signature is:",
      options: [
        "Sort entire list",
        "Hashmap using char frequency array as key",
        "Heap",
        "BFS",
      ],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Use a 26-element char frequency array as the HashMap key. All anagrams produce the same frequency array. O(n × k) time where k is average word length."
    },
    {
      id: 2,
      question: "Which technique solves this efficiently?",
      options: ["DP", "Sliding window + freq count", "Recursion", "Sorting"],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Find All Anagrams in a String: use a fixed-size sliding window with a character frequency count. Compare counts at each position. O(n) time."
    },
    {
      id: 3,
      question: "Audio fingerprinting is based on:",
      options: [
        "HashMap only",
        "Spectrogram + hashing",
        "BFS",
        "Linked List",
      ],
      correctAnswer: 2,
      category: "System Design",
      explanation: "Audio fingerprinting (e.g., Shazam-style) converts audio to a spectrogram, extracts peak frequency pairs, and hashes them for fast matching against a database."
    },
    {
      id: 4,
      question: "Which algorithm is used to shuffle songs fairly?",
      options: ["Fixed random", "Fisher-Yates shuffle", "Bubble sort", "Brute force"],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Fisher-Yates shuffle iterates from the last element to the first, swapping each with a random earlier element. Produces a uniformly random permutation in O(n)."
    },
    {
      id: 5,
      question: "To cluster similar audio tracks:",
      options: ["K-means clustering", "DFS", "BFS", "Brute force"],
      correctAnswer: 1,
      category: "System Design",
      explanation: "K-means groups audio tracks by similarity in feature space (e.g., tempo, energy, spectral features). It iteratively assigns tracks to the nearest cluster centroid."
    },
    {
      id: 6,
      question: "API request-rate limiting uses:",
      options: ["Greedy", "Token bucket", "Backtracking", "Scaling"],
      correctAnswer: 2,
      category: "System Design",
      explanation: "Token bucket allows bursts while enforcing an average rate. Tokens are added at a fixed rate; each request consumes one token. If empty, the request is rejected."
    },
  ],

  IBM: [
    {
      id: 1,
      question: "What is the optimal solution?",
      options: [
        "Create new array",
        "Swap zero with next non-zero using two pointers",
        "Sort array",
        "Use stack",
      ],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Move Zeroes: use two pointers — one scans for non-zero elements and swaps them to the front. O(n) time, O(1) space, maintains relative order."
    },
    {
      id: 2,
      question: "Which traversal method is used?",
      options: ["Row major only", "Z-shape traversal", "BFS", "Iterative boundary shrinking"],
      correctAnswer: 4,
      category: "Algorithms",
      explanation: "Spiral Matrix is solved by iteratively shrinking the boundary (top, bottom, left, right) and collecting elements layer by layer. O(m×n) time."
    },
    {
      id: 3,
      question: "What is ACID in databases?",
      options: [
        "Action, Control, Index, Data",
        "Atomicity, Consistency, Isolation, Durability",
        "Array, Class, Index, Data",
        "None",
      ],
      correctAnswer: 2,
      category: "Databases",
      explanation: "ACID guarantees reliable DB transactions: Atomicity (all or nothing), Consistency (valid state), Isolation (transactions don't interfere), Durability (committed data persists)."
    },
    {
      id: 4,
      question: "Which data structure is best for implementing priority scheduling?",
      options: ["Stack", "Min-heap", "Queue", "HashSet"],
      correctAnswer: 2,
      category: "Data Structures",
      explanation: "A min-heap always gives O(log n) insertion and O(1) peek at the minimum priority element — ideal for always processing the highest-priority task next."
    },
    {
      id: 5,
      question: "Which searching algorithm is most efficient in sorted array?",
      options: ["BFS", "Linear search", "Binary search", "Jump search always"],
      correctAnswer: 3,
      category: "Algorithms",
      explanation: "Binary search repeatedly halves the search space in a sorted array, achieving O(log n) — far better than O(n) linear search."
    },
    {
      id: 6,
      question: "Which OOP principle hides internal details?",
      options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction only"],
      correctAnswer: 3,
      category: "OOP",
      explanation: "Encapsulation bundles data and methods together while restricting direct access to internal state via access modifiers (private/protected). It hides implementation details."
    },
  ],

  Adobe: [
    {
      id: 1,
      question: "You are given an array and multiple queries asking for the sum between indices L and R. Which method is most efficient to answer these queries quickly?",
      options: [
        "Loop through the array for each query and sum values",
        "Precompute prefix sums and answer queries in O(1) time",
        "Sort the array first and then use binary search",
        "Use a stack to store sums",
      ],
      correctAnswer: 2,
      category: "Algorithms",
      explanation: "Prefix sums precompute cumulative totals so any range sum query [L,R] = prefix[R] - prefix[L-1] is answered in O(1) after O(n) preprocessing."
    },
    {
      id: 2,
      question: "You need to design a rate limiter that allows a fixed number of requests per user per minute. Which approach is BEST suited?",
      options: [
        "Use a queue to store all user requests and dequeue every minute",
        "Use a token bucket or sliding window and maintain timestamps",
        "Use a binary search tree to store user request times",
        "Create a thread for each user to monitor request rate"
      ],
      correctAnswer: 2,
      category: "System Design",
      explanation: "Token bucket or sliding window with timestamps is memory-efficient and handles bursts gracefully. Creating threads per user is not scalable at millions of users."
    },
    {
      id: 3,
      question: "To detect duplicate tracks efficiently:",
      options: [
        "HashSet",
        "Stack",
        "Queue",
        "Heap",
      ],
      correctAnswer: 1,
      category: "Data Structures",
      explanation: "A HashSet stores seen elements and checks membership in O(1) average. Insert and lookup are both constant time, making duplicate detection O(n) overall."
    },
    {
      id: 4,
      question: "Which model supports parallel transaction control?",
      options: ["Two-phase locking", "Bubble Sort", "BFS", "Greedy"],
      correctAnswer: 1,
      category: "Databases",
      explanation: "Two-phase locking (2PL) ensures serializability in concurrent transactions. The growing phase acquires locks and the shrinking phase releases them — no new locks after first release."
    },
    {
      id: 5,
      question: "Which data structure is best for implementing priority scheduling?",
      options: ["Stack", "Min-heap", "Queue", "HashSet"],
      correctAnswer: 2,
      category: "Data Structures",
      explanation: "A min-heap always exposes the minimum priority element in O(1) and supports insert/remove in O(log n) — optimal for priority-based task scheduling."
    },
    {
      id: 6,
      question: "What ensures relational integrity in DBMS?",
      options: ["Loops", "Foreign keys", "BFS", "Bit masking"],
      correctAnswer: 2,
      category: "Databases",
      explanation: "Foreign keys enforce referential integrity by ensuring a value in one table matches a primary key in another. They prevent orphaned records and maintain consistency."
    },
  ],
};