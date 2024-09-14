const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };


  async function run() {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Job Position: Full Stack Developer, Job Description: React,Nodejs, Years of Experience: 6 years depends on this info please give me 5 interview questions with answers in json format ..give question and answers as field in json\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"question\": \"Describe your experience working with React.js. Can you elaborate on specific projects where you utilized React components, state management, and routing?\",\n    \"answer\": \"I've been using React.js for the past 4 years and have built several complex web applications. For example, in my previous role at [Company Name], I developed a [Project Name] application that heavily relied on React components for its user interface. We used Redux for state management to handle complex data flows and React Router for navigating between different sections of the application. I'm also familiar with [Specific React Libraries/Frameworks] and have successfully implemented them in various projects.\"\n  },\n  {\n    \"question\": \"Explain the differences between Node.js and a traditional server-side language like PHP or Java. When would you choose Node.js over these alternatives?\",\n    \"answer\": \"Node.js is a JavaScript runtime environment, making it a server-side language built on Google Chrome's V8 JavaScript engine. Unlike traditional server-side languages like PHP or Java, Node.js is asynchronous and event-driven, allowing it to handle many concurrent connections efficiently. It's particularly beneficial for real-time applications like chat applications, streaming services, and APIs that require fast responses and high scalability. I would choose Node.js over other languages when building applications that require: \\n\\n* High-performance, real-time interactions\\n* Scalability and handling a large number of concurrent connections\\n* A consistent JavaScript stack across the frontend and backend\"\n  },\n  {\n    \"question\": \"What are the different ways to handle state management in a React application? Describe a situation where you would choose one approach over another.\",\n    \"answer\": \"There are several ways to manage state in React applications. Some common approaches include:\\n\\n* **Local State:** Simple applications with limited state can use component-level state, managed using the `useState` hook.\\n* **Context API:** This approach provides a way to share state across multiple components without passing props down the component tree. It's suitable for scenarios where a small set of data needs to be accessed globally.\\n* **Redux:** For large and complex applications with intricate state management, Redux provides a predictable and centralized state store. It's ideal for managing complex data flows and ensuring data consistency across the application.\\n\\nI would choose Redux over other approaches when dealing with applications that require a complex state structure, multiple components interacting with the same data, and a need for predictable data flow. For simpler applications with local state requirements, using component-level state or the Context API might be sufficient.\"\n  },\n  {\n    \"question\": \"Describe your approach to testing in a full-stack development environment. What tools and techniques do you use to ensure code quality and functionality?\",\n    \"answer\": \"I believe comprehensive testing is crucial for delivering high-quality software. My approach to testing in a full-stack environment involves a combination of unit, integration, and end-to-end testing. For unit testing, I use tools like Jest for both frontend and backend code, focusing on individual components or functions. For integration testing, I utilize tools like Supertest to test how different parts of the application interact with each other. Finally, for end-to-end testing, I use tools like Cypress to simulate user interactions and verify the application's functionality from the user's perspective. This multi-layered approach ensures thorough testing coverage and helps identify potential issues early in the development cycle.\"\n  },\n  {\n    \"question\": \"How do you stay updated with the latest trends and technologies in the ever-evolving world of web development? Share any specific resources you use to keep your skills sharp.\",\n    \"answer\": \"I actively seek opportunities to stay updated with the latest trends and technologies in web development. I subscribe to industry newsletters like [Newsletter Name] and follow influential developers and communities on platforms like [Social Media Platform]. I also participate in online learning platforms like [Platform Name] to explore new technologies and deepen my existing knowledge. I believe continuous learning is essential for staying ahead in this dynamic field.\"\n  }\n]\n``` \n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
//   run();