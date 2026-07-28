import { RoleProfile } from "@/types";

export interface RoleItem {
  id: string;
  title: string;
  category: string;
  expected_experience: string;
  profile: RoleProfile;
}

export const ROLES_LIST: RoleItem[] = [
  {
    id: "Software Engineer",
    title: "Software Engineer",
    category: "Core Engineering",
    expected_experience: "1-3 Years",
    profile: {
      title: "Software Engineer",
      category: "Core Engineering",
      required_skills: ["Data Structures & Algorithms", "Java", "Python", "OOP", "DBMS", "Operating Systems", "SQL", "REST APIs", "Git"],
      preferred_skills: ["Docker", "AWS", "CI/CD", "System Design", "Unit Testing", "Redis", "Kafka"],
      nice_to_have: ["Kubernetes", "GraphQL", "Microservices", "Terraform"],
      expected_projects: ["Distributed Key-Value Store", "E-Commerce Microservices Platform", "Real-Time Chat Application"],
      expected_experience_level: "1-3 Years",
      expected_technologies: ["Java", "Python", "PostgreSQL", "Docker", "Git", "Spring Boot", "FastAPI"],
      ats_keywords: ["algorithms", "object-oriented programming", "database design", "restful api", "git", "unit testing"]
    }
  },
  {
    id: "Frontend Developer",
    title: "Frontend Developer",
    category: "Web & UI",
    expected_experience: "1-3 Years",
    profile: {
      title: "Frontend Developer",
      category: "Web & UI",
      required_skills: ["React", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "REST APIs", "Git", "State Management"],
      preferred_skills: ["Next.js", "SSR/SSG", "Web Performance", "Accessibility (WCAG)", "Jest/RTL", "Cypress"],
      nice_to_have: ["GraphQL", "Three.js", "WebSockets", "PWA"],
      expected_projects: ["Design System Component Library", "Interactive Analytics Dashboard", "SaaS Landing Page"],
      expected_experience_level: "1-3 Years",
      expected_technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
      ats_keywords: ["react.js", "typescript", "frontend architecture", "responsive design", "web performance", "state management"]
    }
  },
  {
    id: "Backend Developer",
    title: "Backend Developer",
    category: "Core Engineering",
    expected_experience: "2-4 Years",
    profile: {
      title: "Backend Developer",
      category: "Core Engineering",
      required_skills: ["Node.js / Python / Java", "SQL & Database Design", "RESTful APIs", "ORM", "Git", "Authentication (JWT/OAuth)"],
      preferred_skills: ["Docker", "Redis Caching", "Message Queues (RabbitMQ/Kafka)", "System Design", "Microservices"],
      nice_to_have: ["Kubernetes", "gRPC", "Elasticsearch"],
      expected_projects: ["High-Throughput API Gateway", "Asynchronous Worker Queue", "Distributed File Service"],
      expected_experience_level: "2-4 Years",
      expected_technologies: ["Node.js", "Express", "Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
      ats_keywords: ["backend development", "api design", "database optimization", "microservices", "sql", "caching"]
    }
  },
  {
    id: "Full Stack Developer",
    title: "Full Stack Developer",
    category: "Web & UI",
    expected_experience: "2-4 Years",
    profile: {
      title: "Full Stack Developer",
      category: "Web & UI",
      required_skills: ["React / Next.js", "Node.js / Express / FastAPI", "TypeScript", "SQL / MongoDB", "REST APIs", "Git"],
      preferred_skills: ["Docker", "AWS / Vercel", "Tailwind CSS", "Redis", "CI/CD", "Testing (Jest/PyTest)"],
      nice_to_have: ["GraphQL", "WebSockets", "Microservices"],
      expected_projects: ["Full-Stack SaaS Platform", "Real-Time Workspace", "Applicant Tracking System"],
      expected_experience_level: "2-4 Years",
      expected_technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Docker"],
      ats_keywords: ["full stack", "frontend", "backend", "web development", "typescript", "database", "api integration"]
    }
  },
  {
    id: "Java Developer",
    title: "Java Developer",
    category: "Enterprise",
    expected_experience: "2-5 Years",
    profile: {
      title: "Java Developer",
      category: "Enterprise",
      required_skills: ["Java 17+", "Spring Boot", "Spring Data JPA / Hibernate", "REST APIs", "SQL", "Maven / Gradle", "OOP"],
      preferred_skills: ["Microservices", "Docker", "Kafka", "JUnit / Mockito", "Redis", "Spring Security"],
      nice_to_have: ["Kubernetes", "AWS", "gRPC"],
      expected_projects: ["Spring Boot E-Commerce System", "Banking Transaction Engine", "JWT RBAC API"],
      expected_experience_level: "2-5 Years",
      expected_technologies: ["Java", "Spring Boot", "Hibernate", "PostgreSQL", "Docker", "Kafka"],
      ats_keywords: ["java", "spring boot", "jpa", "hibernate", "enterprise applications", "microservices"]
    }
  },
  {
    id: "Python Developer",
    title: "Python Developer",
    category: "Core Engineering",
    expected_experience: "1-3 Years",
    profile: {
      title: "Python Developer",
      category: "Core Engineering",
      required_skills: ["Python 3.10+", "FastAPI / Django / Flask", "PostgreSQL / MySQL", "REST APIs", "Git", "Asyncio"],
      preferred_skills: ["Docker", "Celery / Redis", "PyTest", "SQLAlchemy", "Pandas"],
      nice_to_have: ["AWS", "GraphQL", "Web Scraping (Playwright/Scrapy)"],
      expected_projects: ["FastAPI Asynchronous Pipeline", "Django SaaS Backend", "Automated Web Scraping Engine"],
      expected_experience_level: "1-3 Years",
      expected_technologies: ["Python", "FastAPI", "Django", "PostgreSQL", "Redis", "Docker", "PyTest"],
      ats_keywords: ["python", "django", "fastapi", "rest api", "asynchronous programming", "orm", "pytest"]
    }
  },
  {
    id: "AI Engineer",
    title: "AI Engineer",
    category: "AI & Data",
    expected_experience: "2-4 Years",
    profile: {
      title: "AI Engineer",
      category: "AI & Data",
      required_skills: ["Python", "PyTorch / TensorFlow", "LLMs & Prompt Engineering", "Vector Databases (Chroma/Qdrant)", "RAG Architecture", "LangChain"],
      preferred_skills: ["MLOps", "Docker", "HuggingFace Transformers", "Fine-Tuning (LoRA)", "FastAPI"],
      nice_to_have: ["vLLM / Ollama", "DeepSpeed", "LangGraph"],
      expected_projects: ["Multimodal RAG Knowledge Engine", "Autonomous LLM Agent Swarm", "Domain Fine-Tuned Assistant"],
      expected_experience_level: "2-4 Years",
      expected_technologies: ["Python", "PyTorch", "HuggingFace", "LangChain", "FastAPI", "ChromaDB", "Docker"],
      ats_keywords: ["artificial intelligence", "large language models", "rag", "vector database", "prompt engineering", "langchain"]
    }
  },
  {
    id: "Machine Learning Engineer",
    title: "Machine Learning Engineer",
    category: "AI & Data",
    expected_experience: "2-4 Years",
    profile: {
      title: "Machine Learning Engineer",
      category: "AI & Data",
      required_skills: ["Python", "Scikit-Learn", "PyTorch / TensorFlow", "Pandas & NumPy", "Feature Engineering", "Model Validation", "SQL"],
      preferred_skills: ["MLflow", "MLOps Pipelines", "Docker", "Airflow", "FastAPI", "XGBoost"],
      nice_to_have: ["ONNX Runtime", "TRT", "Spark"],
      expected_projects: ["Predictive Maintenance Pipeline", "Customer Churn Prediction API", "Object Detection System"],
      expected_experience_level: "2-4 Years",
      expected_technologies: ["Python", "PyTorch", "Scikit-Learn", "Pandas", "MLflow", "FastAPI", "Docker"],
      ats_keywords: ["machine learning", "supervised learning", "model deployment", "feature engineering", "mlops", "pytorch"]
    }
  },
  {
    id: "Data Scientist",
    title: "Data Scientist",
    category: "AI & Data",
    expected_experience: "2-4 Years",
    profile: {
      title: "Data Scientist",
      category: "AI & Data",
      required_skills: ["Python / R", "SQL & Complex Queries", "Statistical Analysis", "Pandas / NumPy", "Data Visualization", "Scikit-Learn"],
      preferred_skills: ["Tableau / PowerBI", "A/B Testing", "XGBoost", "BigQuery / Snowflake"],
      nice_to_have: ["Deep Learning", "NLP", "Time Series Forecasting"],
      expected_projects: ["Customer LTV Segmentation", "E-Commerce A/B Impact Analysis", "Financial Risk Forecasting"],
      expected_experience_level: "2-4 Years",
      expected_technologies: ["Python", "SQL", "Pandas", "Scikit-Learn", "Matplotlib", "Tableau"],
      ats_keywords: ["data science", "statistical modeling", "sql", "exploratory data analysis", "hypothesis testing", "predictive modeling"]
    }
  },
  {
    id: "DevOps Engineer",
    title: "DevOps Engineer",
    category: "Infrastructure",
    expected_experience: "2-5 Years",
    profile: {
      title: "DevOps Engineer",
      category: "Infrastructure",
      required_skills: ["Linux Admin", "Docker", "Kubernetes", "CI/CD (GitHub Actions / GitLab)", "Terraform", "Bash / Python"],
      preferred_skills: ["AWS / GCP", "Prometheus & Grafana", "Ansible", "Helm"],
      nice_to_have: ["ArgoCD", "Istio", "Trivy"],
      expected_projects: ["Zero-Downtime Kubernetes Pipeline", "Multi-Region Cloud Infrastructure with Terraform", "Automated Microservice CI/CD"],
      expected_experience_level: "2-5 Years",
      expected_technologies: ["Docker", "Kubernetes", "Terraform", "AWS", "GitHub Actions", "Prometheus", "Grafana"],
      ats_keywords: ["devops", "kubernetes", "docker", "ci/cd", "terraform", "cloud infrastructure", "linux"]
    }
  },
  {
    id: "Cloud Engineer",
    title: "Cloud Engineer",
    category: "Infrastructure",
    expected_experience: "2-5 Years",
    profile: {
      title: "Cloud Engineer",
      category: "Infrastructure",
      required_skills: ["AWS / GCP / Azure", "IAM & Cloud Security", "Networking (VPC, Subnets, Route53)", "Terraform", "Docker", "Python / Bash"],
      preferred_skills: ["Serverless (Lambda)", "Kubernetes (EKS)", "CloudWatch", "Cost Optimization"],
      nice_to_have: ["AWS Solutions Architect", "FinOps"],
      expected_projects: ["High-Availability AWS VPC Architecture", "Serverless Data Pipeline", "Cloud Migration Strategy"],
      expected_experience_level: "2-5 Years",
      expected_technologies: ["AWS", "Terraform", "Docker", "Python", "Linux", "Kubernetes"],
      ats_keywords: ["cloud engineer", "aws", "terraform", "cloud architecture", "vpc", "iam", "serverless"]
    }
  },
  {
    id: "Cyber Security Engineer",
    title: "Cyber Security Engineer",
    category: "Infrastructure",
    expected_experience: "2-5 Years",
    profile: {
      title: "Cyber Security Engineer",
      category: "Infrastructure",
      required_skills: ["Network Security", "Penetration Testing", "Vulnerability Assessment & OWASP", "Linux/Windows Security", "Python Scripting", "SIEM (Splunk)"],
      preferred_skills: ["Cryptography", "Incident Response", "IAM", "Docker Security"],
      nice_to_have: ["CEH / OSCP", "Reverse Engineering"],
      expected_projects: ["Automated OWASP Scanner", "Network Intrusion Detection System", "SIEM Log Aggregator"],
      expected_experience_level: "2-5 Years",
      expected_technologies: ["Linux", "Python", "Wireshark", "Burp Suite", "Splunk", "Nmap"],
      ats_keywords: ["cyber security", "penetration testing", "vulnerability assessment", "owasp", "network security", "siem"]
    }
  },
  {
    id: "Android Developer",
    title: "Android Developer",
    category: "Mobile",
    expected_experience: "2-4 Years",
    profile: {
      title: "Android Developer",
      category: "Mobile",
      required_skills: ["Kotlin", "Android SDK", "Jetpack Compose", "MVVM", "Coroutines & Flow", "Retrofit", "Room DB"],
      preferred_skills: ["Hilt DI", "JUnit / Espresso", "Fastlane", "Google Play Release"],
      nice_to_have: ["KMP", "Android NDK"],
      expected_projects: ["Jetpack Compose Fitness Tracker", "Offline-First News Reader", "E-Commerce App"],
      expected_experience_level: "2-4 Years",
      expected_technologies: ["Kotlin", "Android SDK", "Jetpack Compose", "Retrofit", "Room", "Hilt"],
      ats_keywords: ["android developer", "kotlin", "jetpack compose", "mvvm", "android sdk", "coroutines"]
    }
  },
  {
    id: "iOS Developer",
    title: "iOS Developer",
    category: "Mobile",
    expected_experience: "2-4 Years",
    profile: {
      title: "iOS Developer",
      category: "Mobile",
      required_skills: ["Swift", "iOS SDK", "SwiftUI / UIKit", "MVVM", "Combine / Async-Await", "CoreData / SwiftData"],
      preferred_skills: ["XCTest", "Fastlane", "App Store Guidelines"],
      nice_to_have: ["CoreML", "ARKit"],
      expected_projects: ["SwiftUI Social Media App", "Offline Task Manager with SwiftData", "Fintech Dashboard"],
      expected_experience_level: "2-4 Years",
      expected_technologies: ["Swift", "SwiftUI", "UIKit", "Xcode", "CoreData", "Combine"],
      ats_keywords: ["ios developer", "swift", "swiftui", "uikit", "ios sdk", "combine", "xcode"]
    }
  },
  {
    id: "QA Engineer",
    title: "QA Engineer",
    category: "Quality & Testing",
    expected_experience: "1-3 Years",
    profile: {
      title: "QA Engineer",
      category: "Quality & Testing",
      required_skills: ["STLC", "Test Case Design", "Manual Testing", "Jira", "API Testing (Postman)", "SQL Queries"],
      preferred_skills: ["Selenium / Cypress / Playwright", "Python / JS", "Regression & Smoke Testing"],
      nice_to_have: ["JMeter", "Appium"],
      expected_projects: ["SaaS Platform Test Plan", "Automated Cypress Web E2E Suite", "API Automation with Postman"],
      expected_experience_level: "1-3 Years",
      expected_technologies: ["Jira", "Postman", "Selenium", "Cypress", "Python", "SQL"],
      ats_keywords: ["qa engineer", "quality assurance", "test cases", "manual testing", "bug tracking", "api testing"]
    }
  },
  {
    id: "SDET",
    title: "SDET",
    category: "Quality & Testing",
    expected_experience: "2-5 Years",
    profile: {
      title: "SDET",
      category: "Quality & Testing",
      required_skills: ["Java / Python", "Automation Architecture (Selenium / Playwright)", "API Automation (RestAssured/PyTest)", "Data Structures", "CI/CD Integration"],
      preferred_skills: ["Dockerized Testing", "JMeter / Locust", "BDD Cucumber"],
      nice_to_have: ["Appium", "Chaos Engineering"],
      expected_projects: ["Scalable Parallel Test Framework", "CI/CD Integrated API Test Pipeline", "Visual Regression Suite"],
      expected_experience_level: "2-5 Years",
      expected_technologies: ["Python", "Java", "Playwright", "Selenium", "PyTest", "Docker"],
      ats_keywords: ["sdet", "test automation", "framework development", "selenium", "playwright", "api automation"]
    }
  },
  {
    id: "Product Manager",
    title: "Product Manager",
    category: "Product & Business",
    expected_experience: "2-5 Years",
    profile: {
      title: "Product Manager",
      category: "Product & Business",
      required_skills: ["Product Lifecycle", "User Story Mapping & PRD", "Product Analytics (Mixpanel)", "Agile / Scrum", "Wireframing", "RICE Prioritization"],
      preferred_skills: ["SQL for Analysis", "A/B Testing Design", "Linear / Jira"],
      nice_to_have: ["Growth Hacking", "Monetization Strategy"],
      expected_projects: ["End-to-End Product Launch", "Onboarding Funnel Optimization", "Data-Driven Feature Deprecation"],
      expected_experience_level: "2-5 Years",
      expected_technologies: ["Jira", "Linear", "Mixpanel", "Figma", "SQL", "Notion"],
      ats_keywords: ["product manager", "prd", "user stories", "roadmap", "agile", "scrum", "product analytics"]
    }
  },
  {
    id: "Business Analyst",
    title: "Business Analyst",
    category: "Product & Business",
    expected_experience: "2-4 Years",
    profile: {
      title: "Business Analyst",
      category: "Product & Business",
      required_skills: ["Requirements Gathering (BRD/FRD)", "BPMN Process Modeling", "SQL Queries", "Data Viz (PowerBI / Tableau)", "Stakeholder Management"],
      preferred_skills: ["Python", "Gap Analysis", "Financial Basics"],
      nice_to_have: ["CBAP Certification", "Salesforce"],
      expected_projects: ["Enterprise Process Automation Analysis", "Executive Revenue Metrics Dashboard", "Vendor Selection Matrix"],
      expected_experience_level: "2-4 Years",
      expected_technologies: ["SQL", "Excel", "PowerBI", "Tableau", "Jira", "Visio"],
      ats_keywords: ["business analyst", "brd", "requirements gathering", "sql", "bpmn", "data analysis"]
    }
  },
  {
    id: "UI UX Designer",
    title: "UI UX Designer",
    category: "Design",
    expected_experience: "2-4 Years",
    profile: {
      title: "UI UX Designer",
      category: "Design",
      required_skills: ["Figma", "User Research & Usability Testing", "Wireframing & Prototyping", "Design Systems", "Visual Design", "Information Architecture"],
      preferred_skills: ["Design Tokens & Handoff", "WCAG Accessibility", "HTML/CSS Basics"],
      nice_to_have: ["Framer", "3D Spline"],
      expected_projects: ["Dark/Light Design System", "Mobile Banking App Redesign", "High-Fidelity Interactive Prototype"],
      expected_experience_level: "2-4 Years",
      expected_technologies: ["Figma", "Framer", "Lottie", "Adobe CC", "Miro"],
      ats_keywords: ["ui ux designer", "figma", "prototyping", "wireframing", "user research", "design system"]
    }
  },
  {
    id: "System Engineer",
    title: "System Engineer",
    category: "Infrastructure",
    expected_experience: "2-5 Years",
    profile: {
      title: "System Engineer",
      category: "Infrastructure",
      required_skills: ["Linux / Windows Admin", "Networking (TCP/IP, DNS, VPN)", "Shell Scripting (Bash / PowerShell)", "Virtualization (VMware/KVM)"],
      preferred_skills: ["Ansible", "Active Directory", "Zabbix / Prometheus"],
      nice_to_have: ["RHCE", "SAN/NAS Storage"],
      expected_projects: ["HA Linux Server Cluster", "Automated Ansible Infrastructure", "Active Directory SSO"],
      expected_experience_level: "2-5 Years",
      expected_technologies: ["Linux", "Bash", "PowerShell", "VMware", "Ansible", "Nginx"],
      ats_keywords: ["systems engineer", "linux administration", "networking", "bash scripting", "virtualization"]
    }
  },
  {
    id: "Embedded Engineer",
    title: "Embedded Engineer",
    category: "Hardware & Embedded",
    expected_experience: "2-5 Years",
    profile: {
      title: "Embedded Engineer",
      category: "Hardware & Embedded",
      required_skills: ["C / C++", "Microcontrollers (STM32, ESP32)", "Protocols (UART, SPI, I2C, CAN)", "FreeRTOS", "Logic Analyzers"],
      preferred_skills: ["Embedded Linux", "KiCAD PCB Design", "Low Power Tuning"],
      nice_to_have: ["IoT MQTT", "BLE"],
      expected_projects: ["FreeRTOS Multi-Sensor IoT Node", "STM32 CAN Bus Reader", "Custom KiCAD PCB with ESP32"],
      expected_experience_level: "2-5 Years",
      expected_technologies: ["C", "C++", "FreeRTOS", "STM32CubeIDE", "KiCAD", "GDB"],
      ats_keywords: ["embedded engineer", "c", "c++", "microcontroller", "rtos", "freertos", "i2c", "spi"]
    }
  },
  {
    id: "Data Engineer",
    title: "Data Engineer",
    category: "AI & Data",
    expected_experience: "2-5 Years",
    profile: {
      title: "Data Engineer",
      category: "AI & Data",
      required_skills: ["Python / Scala", "Advanced SQL", "Data Warehousing (Snowflake/BigQuery)", "ETL/ELT Architecture", "Apache Spark", "Airflow"],
      preferred_skills: ["Dimensional Modeling", "dbt", "Kafka", "Docker"],
      nice_to_have: ["Delta Lake", "Terraform"],
      expected_projects: ["Real-Time Spark & Kafka Pipeline", "Snowflake Data Warehouse with dbt", "Airflow Orchestration Engine"],
      expected_experience_level: "2-5 Years",
      expected_technologies: ["Python", "SQL", "Spark", "Airflow", "Snowflake", "dbt", "Kafka"],
      ats_keywords: ["data engineer", "etl pipeline", "apache spark", "airflow", "sql", "data warehouse"]
    }
  },
  {
    id: "Blockchain Developer",
    title: "Blockchain Developer",
    category: "Core Engineering",
    expected_experience: "2-4 Years",
    profile: {
      title: "Blockchain Developer",
      category: "Core Engineering",
      required_skills: ["Solidity / Rust", "Smart Contracts & Security", "EVM / Ethereum", "Web3.js / Ethers.js", "Hardhat / Foundry"],
      preferred_skills: ["DeFi AMM Math", "Slither Auditing", "IPFS Storage"],
      nice_to_have: ["zk-SNARKs", "L2 Rollups"],
      expected_projects: ["Decentralized Vault Protocol", "ERC-721A NFT Marketplace", "Solana Anchor Orderbook"],
      expected_experience_level: "2-4 Years",
      expected_technologies: ["Solidity", "TypeScript", "Ethers.js", "Hardhat", "Foundry", "Rust"],
      ats_keywords: ["blockchain developer", "smart contracts", "solidity", "web3", "ethers.js", "hardhat"]
    }
  },
  {
    id: "Game Developer",
    title: "Game Developer",
    category: "Core Engineering",
    expected_experience: "2-5 Years",
    profile: {
      title: "Game Developer",
      category: "Core Engineering",
      required_skills: ["C++ / C#", "Unreal Engine / Unity", "Game Physics & Linear Algebra", "Object Pooling & Optimization", "Shaders (HLSL)"],
      preferred_skills: ["Multiplayer Networking", "NavMesh AI", "Graphics Pipelines"],
      nice_to_have: ["VR/AR", "Custom Compute Shader"],
      expected_projects: ["3D Action RPG Mechanics", "Multiplayer Shooter System in Unity", "Procedural Dungeon Generation"],
      expected_experience_level: "2-5 Years",
      expected_technologies: ["C++", "C#", "Unreal Engine", "Unity", "HLSL", "Git"],
      ats_keywords: ["game developer", "unity", "unreal engine", "c++", "c#", "game physics", "gameplay programming"]
    }
  }
];
