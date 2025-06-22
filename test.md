flowchart TD
    A[User Interaction] --> B{Which Button?}
    
    B -->|New Game| C[Create Practice Game]
    B -->|Daily Word #X| D[Load Daily Game]
    
    C --> E[Generate Random Word]
    C --> F[Switch to Practice Mode]
    C --> G[Clear Previous Practice]
    
    D --> H[Check Daily Progress]
    D --> I[Switch to Daily Mode]
    D --> J[Load/Resume Daily State]
    
    E --> K[Save New Practice Progress]
    F --> K
    G --> K
    
    H --> L[Show Daily Results/Progress]
    I --> L
    J --> L
    
    style C fill:#ccffcc,stroke:#00aa00
    style D fill:#ccffcc,stroke:#00aa00