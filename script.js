
const navigation = document.getElementById("navigation");
const content = document.getElementById("content");
const RETURN_PAGE_KEY = "skillup-return-page";

const isCourseDocument =
    window.location.pathname.split("/").pop() === "course.html";
    const PROGRESS_KEY = "skillup-course-progress-v1";

let currentCourse = "";
let currentLessonIndex = 0;
let completedLessons = loadProgress();

// ========================================
// 1. COURSE LESSON DATA — 60 LESSONS
// ========================================

const courses = {
    "web-development": {
        title: "Web Development",
        description: "Learn to build websites using HTML, CSS, and JavaScript.",
        lessons: [
            {
                title: "Introduction to Web Development",
                explanation: "Web development is the process of creating websites and web applications. Frontend development builds the part users see. Backend development handles server logic, accounts, and data. Full-stack developers work with both.",
                example: "A shopping website uses HTML for product information, CSS for its appearance, JavaScript for interactive buttons, and a backend to manage orders.",
                code: '<h1>Welcome to SkillUp!</h1>\n<p>Start learning web development.</p>',
                practice: "Explain the difference between frontend and backend development."
            },
            {
                title: "HTML Document Structure",
                explanation: "HTML stands for HyperText Markup Language. Elements are written using tags. A standard HTML document includes a doctype, html, head, and body. The head contains metadata; the body contains visible page content.",
                example: "Use headings for titles, paragraphs for text, and links to connect pages.",
                code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>My Website</title>\n</head>\n<body>\n  <h1>Hello!</h1>\n  <p>My first webpage.</p>\n</body>\n</html>',
                practice: "Create a page with a title, one heading, and two paragraphs."
            },
            {
                title: "HTML Links, Images and Lists",
                explanation: "The anchor element creates links, img displays images, and ul or ol creates lists. Use meaningful alt text for images to support accessibility. Links should have useful descriptions.",
                example: "A course page can link to lesson pages and show a list of topics.",
                code: '<a href="courses.html">View Courses</a>\n<img src="book.jpg" alt="Open textbook">\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>',
                practice: "Create a list of three subjects and a link to another HTML page."
            },
            {
                title: "HTML Forms and Semantic Elements",
                explanation: "Forms collect information through input, label, select, and button elements. Semantic elements such as header, nav, main, section, and footer explain the purpose of page regions and improve accessibility.",
                example: "A signup form can collect a user's name and email address.",
                code: '<form>\n  <label for="email">Email</label>\n  <input id="email" type="email" required>\n  <button type="submit">Sign Up</button>\n</form>',
                practice: "Build a form with a name field, an email field, and a submit button."
            },
            {
                title: "Introduction to CSS",
                explanation: "CSS stands for Cascading Style Sheets. It controls colors, typography, spacing, borders, and layout. Selectors target HTML elements. Properties describe the styles applied to those elements.",
                example: "A website can use a consistent color and font for all its headings.",
                code: 'body {\n  font-family: Arial, sans-serif;\n  background: #faf9ff;\n}\nh1 {\n  color: #7257e8;\n}',
                practice: "Style a heading with a purple color and center alignment."
            },
            {
                title: "CSS Box Model and Layout",
                explanation: "Every element has content, padding, border, and margin. Flexbox helps align items along a row or column. CSS Grid is useful for two-dimensional layouts such as course card grids.",
                example: "A course grid can use repeat and minmax to create responsive columns.",
                code: '.course-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}\n.course-card {\n  padding: 20px;\n  border: 1px solid #eee;\n  border-radius: 12px;\n}',
                practice: "Create three cards with equal spacing using CSS Grid."
            },
            {
                title: "Responsive Web Design",
                explanation: "Responsive design makes pages usable on phones, tablets, and desktops. Flexible widths, responsive images, and media queries help content adapt to the screen. The viewport meta tag is important for mobile layouts.",
                example: "On a small screen, a three-column grid can become one column.",
                code: '@media (max-width: 700px) {\n  .course-grid {\n    grid-template-columns: 1fr;\n  }\n}',
                practice: "Make your course cards display in one column below 700px."
            },
            {
                title: "JavaScript Fundamentals",
                explanation: "JavaScript adds behavior to web pages. Variables store values, functions group reusable instructions, and conditions choose which instructions run. Use const by default and let when reassignment is needed.",
                example: "A button can display a welcome message when clicked.",
                code: 'const student = "Learner";\nfunction greet(name) {\n  return "Welcome, " + name + "!";\n}\nconsole.log(greet(student));',
                practice: "Write a function that accepts a name and returns a greeting."
            },
            {
                title: "DOM Events and Interactivity",
                explanation: "The Document Object Model represents a page as objects JavaScript can access. querySelector finds elements, textContent changes text, and addEventListener responds to events such as clicks and form submissions.",
                example: "A button can update a message without reloading the page.",
                code: 'document.querySelector("#myButton")\n  .addEventListener("click", () => {\n    document.querySelector("#message").textContent = "Button clicked!";\n  });',
                practice: "Create a button that changes a paragraph when clicked."
            },
            {
                title: "Build and Test a Mini Website",
                explanation: "A good website project combines semantic HTML, organized CSS, and JavaScript interactions. Test links, forms, mobile layouts, keyboard access, and browser console errors. Keep files organized and use version control as your project grows.",
                example: "Create a student portfolio with an introduction, projects, skills, and contact form.",
                code: '<!-- Example project structure -->\nindex.html\nstyle.css\nscript.js',
                practice: "Build a small portfolio and test it on both desktop and mobile."
            }
        ]
    },

    "artificial-intelligence": {
        title: "Artificial Intelligence",
        description: "Understand AI, machine learning, neural networks, and responsible AI.",
        lessons: [
            {
                title: "What Is Artificial Intelligence?",
                explanation: "Artificial Intelligence (AI) is a field of computing that develops systems capable of tasks associated with human intelligence, such as recognizing patterns, understanding language, and making predictions. AI systems vary in their abilities and limitations.",
                example: "A spam filter classifies incoming messages as likely spam or not spam.",
                code: 'Input: "Congratulations! Claim your prize."\nAI task: classify the message\nOutput: possibly spam',
                practice: "Name three everyday applications that use AI and explain their purpose."
            },
            {
                title: "Types and Applications of AI",
                explanation: "Narrow AI performs particular tasks, such as translation or image recognition. General AI describes a hypothetical system with broad human-like abilities. AI can support healthcare, education, agriculture, transport, and business.",
                example: "A navigation app can estimate traffic and suggest a faster route.",
                code: 'Problem: predict traffic\nInput: past traffic + current road data\nOutput: estimated travel time',
                practice: "Choose one industry and describe two useful AI applications."
            },
            {
                title: "Data and Features",
                explanation: "Machine learning systems learn patterns from data. A dataset contains examples; features describe those examples, and labels provide target answers in supervised learning. Poor-quality, incomplete, or unrepresentative data can produce unreliable results.",
                example: "To predict house prices, features might include area, location, and number of bedrooms.",
                code: 'features = ["area", "bedrooms", "location"]\ntarget = "house_price"',
                practice: "List five features that might help predict student exam performance."
            },
            {
                title: "Introduction to Machine Learning",
                explanation: "Machine learning is a branch of AI in which algorithms learn patterns from examples. Supervised learning uses labelled data; unsupervised learning looks for structure without target labels; reinforcement learning learns through actions and rewards.",
                example: "A model trained on labelled flower images may learn to classify new flower images.",
                code: 'Training examples -> Learning algorithm\nLearning algorithm -> Trained model\nNew input -> Prediction',
                practice: "Identify which learning type fits spam detection with labelled emails."
            },
            {
                title: "Supervised Learning",
                explanation: "Supervised learning uses input-output examples. Classification predicts categories, such as pass or fail. Regression predicts numerical values, such as temperature or house price. Training and evaluation data should be separated.",
                example: "A model can use past house sales to estimate the price of a new house.",
                code: 'Classification: email -> spam / not spam\nRegression: house details -> price',
                practice: "Classify these tasks as classification or regression: disease category, rainfall amount."
            },
            {
                title: "Unsupervised Learning",
                explanation: "Unsupervised learning searches for patterns in data without labelled target answers. Clustering groups similar items, while dimensionality reduction summarizes data using fewer variables. The resulting groups need meaningful interpretation.",
                example: "A shop might group customers according to purchasing patterns.",
                code: 'Customer records -> Clustering algorithm\nOutput -> Groups of similar customers',
                practice: "Describe how a college could group students by learning preferences without predefined labels."
            },
            {
                title: "Neural Networks",
                explanation: "Artificial neural networks contain connected units arranged in layers. Weights and biases influence each unit's output. During training, optimization adjusts these parameters to reduce prediction error. Neural networks often need substantial data and computing resources.",
                example: "A network trained on labelled pictures can learn patterns associated with cats and dogs.",
                code: 'Input layer -> Hidden layer(s) -> Output layer',
                practice: "Explain the purpose of input, hidden, and output layers."
            },
            {
                title: "Deep Learning and Generative AI",
                explanation: "Deep learning uses neural networks with multiple layers. Generative AI produces new content such as text, images, audio, or code based on learned patterns. Generated answers can be incorrect, so important information should be verified.",
                example: "A text assistant can draft an email, but a person should check names, facts, and tone before sending it.",
                code: 'Prompt -> Generative model -> Draft output -> Human review',
                practice: "Give two benefits and two risks of generative AI."
            },
            {
                title: "Evaluating AI Models",
                explanation: "A model must be tested on data it did not train on. Accuracy measures the fraction of correct predictions. Precision measures how many positive predictions were correct, while recall measures how many actual positives were found. The appropriate metric depends on the problem.",
                example: "In screening for a serious disease, missing a real case may be more costly than investigating a false alarm.",
                code: 'Accuracy = correct predictions / all predictions',
                practice: "Why might accuracy alone be misleading when one class is very rare?"
            },
            {
                title: "Responsible AI and Mini Project",
                explanation: "Responsible AI considers privacy, fairness, transparency, safety, and accountability. Models can reproduce biases in training data. Collect only necessary data, protect it, test across groups, and provide human oversight for consequential decisions.",
                example: "A student project could classify recyclable materials from images while documenting its limitations.",
                code: 'Project steps:\n1. Define the problem\n2. Gather appropriate data\n3. Train and test\n4. Review errors and bias\n5. Document limitations',
                practice: "Plan a small AI project and identify its data, evaluation method, and two possible risks."
            }
        ]
    },

    "data-science": {
        title: "Data Science",
        description: "Learn data preparation, analysis, statistics, and visualization.",
        lessons: [
            {
                title: "Introduction to Data Science",
                explanation: "Data science combines statistics, programming, domain knowledge, and communication to extract useful insights from data. A typical workflow defines a question, collects data, cleans it, analyzes it, communicates results, and evaluates the outcome.",
                example: "A college can analyze attendance records to identify patterns and plan student support.",
                code: 'Question -> Collect -> Clean -> Analyze -> Communicate',
                practice: "Choose a real-world question that could be answered using data."
            },
            {
                title: "Types of Data",
                explanation: "Data can be structured, semi-structured, or unstructured. Numerical data may be discrete or continuous. Categorical data describes groups, such as department or color. Understanding data types helps determine appropriate calculations and visualizations.",
                example: "Age in completed years is discrete; height is typically treated as continuous.",
                code: 'Numerical: marks, height, temperature\nCategorical: branch, city, product type',
                practice: "Identify the data type of phone number, marks, height, and blood group."
            },
            {
                title: "Collecting and Understanding Data",
                explanation: "Data may come from surveys, databases, sensors, experiments, or public datasets. Consider relevance, accuracy, consent, privacy, sampling, and collection bias. Data dictionaries explain column meanings and units.",
                example: "A student survey should avoid collecting unnecessary personal information.",
                code: 'Dataset columns:\nstudent_id, attendance_percent, marks',
                practice: "Design three useful columns for analyzing library usage."
            },
            {
                title: "Data Cleaning",
                explanation: "Data cleaning identifies missing values, duplicates, inconsistent formats, and impossible values. A missing value should not automatically be replaced with zero; the correct treatment depends on what is missing and why.",
                example: "Standardize city names so that 'Vijayawada' and accidental spelling variations are handled consistently.",
                code: 'Before: ["Python", " python ", "PYTHON"]\nAfter:  ["python", "python", "python"]',
                practice: "List four data-quality problems you would check before analysis."
            },
            {
                title: "Descriptive Statistics",
                explanation: "The mean is the arithmetic average; the median is the middle sorted value; the mode is the most frequent value. Range describes maximum minus minimum. Variance and standard deviation describe spread around the mean.",
                example: "For marks 10, 20, and 90, the mean is 40 but the median is 20, showing how an extreme value affects the mean.",
                code: 'Mean = sum of values / number of values\nRange = maximum - minimum',
                practice: "Calculate the mean, median, and range for 4, 6, 8, 12, 20."
            },
            {
                title: "Introduction to Python for Data",
                explanation: "Python is widely used for data analysis. Lists store sequences, dictionaries map keys to values, and libraries such as pandas provide tools for working with tables. Readable variable names make analysis easier to maintain.",
                example: "A list of marks can be summarized before being stored in a dataframe.",
                code: 'marks = [70, 85, 90]\nmean_mark = sum(marks) / len(marks)\nprint(mean_mark)',
                practice: "Write Python code that calculates the average of five numbers."
            },
            {
                title: "Exploring Data with Tables",
                explanation: "Tabular analysis compares rows and columns, filters records, groups categories, and calculates summaries. In pandas, a DataFrame represents a table. Inspect column types and summary statistics before interpreting results.",
                example: "Group sales by product category to identify which category has the highest total sales.",
                code: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "item": ["Pen", "Book", "Pen"],\n    "sales": [20, 100, 30]\n})\nprint(df.groupby("item")["sales"].sum())',
                practice: "Describe how you would find the highest-selling product from a sales table."
            },
            {
                title: "Data Visualization",
                explanation: "Charts make patterns easier to understand. Bar charts compare categories, line charts show changes over time, histograms show numerical distributions, and scatter plots show relationships between two numerical variables. Use clear labels and appropriate scales.",
                example: "A line chart can display monthly attendance changes during a semester.",
                code: 'Chart choice:\nCategories -> Bar chart\nTime trend -> Line chart\nDistribution -> Histogram',
                practice: "Choose a suitable chart for comparing five subjects' average marks."
            },
            {
                title: "Correlation and Interpretation",
                explanation: "Correlation measures the direction and strength of a relationship between variables. A positive association means values tend to increase together; a negative association means one tends to decrease as the other increases. Correlation alone does not prove causation.",
                example: "Students who study longer may earn higher marks, but prior knowledge and study methods can also matter.",
                code: 'Association does not automatically mean causation.',
                practice: "Explain why ice cream sales and swimming incidents may rise together without one directly causing the other."
            },
            {
                title: "Data Science Mini Project",
                explanation: "A good analysis begins with a clear question and ends with an honest conclusion. Document cleaning decisions, choose appropriate statistics and charts, explain uncertainty, and avoid claims unsupported by the data.",
                example: "Analyze monthly personal expenses, categorize spending, chart trends, and suggest a realistic budget.",
                code: 'Question -> Dataset -> Cleaning -> Analysis\n-> Charts -> Findings -> Limitations',
                practice: "Plan a student-performance analysis and list its question, data columns, chart, and possible limitation."
            }
        ]
    },

    "ui-ux-design": {
        title: "UI/UX Design",
        description: "Design accessible, useful, and attractive digital experiences.",
        lessons: [
            {
                title: "Introduction to UI and UX",
                explanation: "UI means User Interface: the visual and interactive elements of a product. UX means User Experience: how useful, understandable, efficient, and satisfying the product is for users. Good visual design supports a good experience but does not replace usability.",
                example: "A beautiful signup screen is still frustrating if users cannot understand its password requirements.",
                code: 'UI: buttons, typography, colors\nUX: task completion, clarity, user satisfaction',
                practice: "Describe one example of poor UX in an app you have used."
            },
            {
                title: "Understanding Users",
                explanation: "Design starts by learning about users, their goals, context, and difficulties. Interviews, surveys, observation, and usability tests reveal different kinds of evidence. Avoid assuming that your own preferences represent every user.",
                example: "Interview students to learn what makes finding course material difficult.",
                code: 'User research -> Needs -> Design decisions -> Testing',
                practice: "Write five interview questions for students using a learning website."
            },
            {
                title: "Personas and User Journeys",
                explanation: "A persona is a research-informed summary of a user group, not a stereotype. A user journey maps the steps a person takes toward a goal and highlights frustrations, questions, and opportunities for improvement.",
                example: "A first-year student journey might include discovering a course, comparing it, enrolling, and opening the first lesson.",
                code: 'Goal: Start a course\nSteps: Find -> Compare -> Select -> Learn',
                practice: "Create a simple journey for a user signing up to SkillUp."
            },
            {
                title: "Information Architecture",
                explanation: "Information architecture organizes content so people can find it. Clear labels, meaningful categories, and consistent navigation reduce confusion. A sitemap shows page relationships; card sorting can help reveal how users group information.",
                example: "Grouping courses under subjects can make a learning catalogue easier to browse.",
                code: 'Home\n├── Courses\n├── About\n├── Contact\n└── Account',
                practice: "Design a simple sitemap for a college learning portal."
            },
            {
                title: "Wireframes and Layout",
                explanation: "Wireframes are simplified layouts that focus on structure and content hierarchy rather than polished visuals. They help teams test page organization early, before spending time on detailed styling.",
                example: "A course-page wireframe might show the title, course description, lesson list, and progress indicator.",
                code: '[Header]\n[Course title and description]\n[Progress bar]\n[Lesson list]\n[Footer]',
                practice: "Sketch a wireframe for a course details page."
            },
            {
                title: "Color, Typography and Visual Hierarchy",
                explanation: "Visual hierarchy guides attention using size, weight, contrast, spacing, and placement. Colors should be consistent and provide sufficient contrast. Typography should be readable at common screen sizes.",
                example: "A prominent primary button helps users recognize the main action on a signup page.",
                code: 'Primary action: strong contrast\nHeading: clear hierarchy\nBody: comfortable line spacing',
                practice: "Choose a heading font size, body font size, and primary color for a mobile screen."
            },
            {
                title: "Prototyping and Interaction",
                explanation: "A prototype simulates how a design works. Low-fidelity prototypes are quick sketches; high-fidelity prototypes resemble the final product. Prototypes help test navigation, form behavior, and task flow before implementation.",
                example: "Create a clickable prototype that moves from a course card to a lesson screen.",
                code: 'Course card -> Course details -> Lesson -> Completion',
                practice: "Outline a four-screen prototype for starting and completing a lesson."
            },
            {
                title: "Accessibility and Inclusive Design",
                explanation: "Accessible interfaces support people with different abilities and contexts. Use keyboard-accessible controls, meaningful labels, alt text, visible focus indicators, sufficient contrast, and clear error messages. Do not communicate important information through color alone.",
                example: "A form error should explain the problem in text rather than only turning a field red.",
                code: '<label for="email">Email address</label>\n<input id="email" type="email" required>',
                practice: "Identify three accessibility improvements for a login form."
            },
            {
                title: "Usability Testing",
                explanation: "Usability testing asks representative users to complete realistic tasks while a researcher observes where they struggle. Focus on behavior and evidence rather than defending the design. Fix high-impact problems and test again.",
                example: "Ask a student to find and start a Python lesson without giving step-by-step instructions.",
                code: 'Task -> Observe -> Record issues -> Improve -> Retest',
                practice: "Write three tasks you would use to test a learning website."
            },
            {
                title: "UI/UX Mini Project",
                explanation: "A design project should connect research, structure, visuals, interaction, and testing. Explain the user problem, show key screens, record feedback, and describe changes made from that feedback.",
                example: "Design a mobile course dashboard that shows progress, recommended lessons, and completed courses.",
                code: 'Research -> Persona -> Wireframe -> Prototype\n-> Usability test -> Final design',
                practice: "Plan a course dashboard redesign and define how you will measure whether it is easier to use."
            }
        ]
    },

    "python-programming": {
        title: "Python Programming",
        description: "Learn Python fundamentals through examples and practice.",
        lessons: [
            {
                title: "Introduction to Python",
                explanation: "Python is a high-level programming language known for readable syntax. It is used in automation, web development, data analysis, AI, and scripting. Python programs can be run in a terminal, editor, or notebook.",
                example: "A first program prints a message to the screen.",
                code: 'print("Hello, SkillUp!")',
                practice: "Write a program that prints your name and your favorite subject."
            },
            {
                title: "Variables and Data Types",
                explanation: "Variables refer to values. Common types include int for integers, float for decimal numbers, str for text, and bool for True or False. Python is dynamically typed, so a variable does not need a declared type.",
                example: "Store a student's name and marks in separate variables.",
                code: 'name = "Anu"\nmarks = 87\npercentage = 87.5\nis_enrolled = True\nprint(name, marks)',
                practice: "Create variables for your name, age, percentage, and enrollment status."
            },
            {
                title: "Operators and Expressions",
                explanation: "Arithmetic operators include +, -, *, /, //, %, and **. Comparison operators compare values, while logical operators and, or, and not combine conditions. Operator precedence affects how expressions are evaluated.",
                example: "The remainder operator can check whether a number is divisible by two.",
                code: 'number = 8\nprint(number % 2 == 0)\nprint(2 ** 3)',
                practice: "Write expressions to calculate the area of a rectangle and test whether a number is even."
            },
            {
                title: "Conditions and Decisions",
                explanation: "if, elif, and else choose which block runs based on conditions. Indentation defines Python blocks. Conditions often use comparison operators such as ==, !=, <, and >=.",
                example: "A program can classify a mark as pass or fail according to a chosen threshold.",
                code: 'marks = 72\nif marks >= 40:\n    print("Pass")\nelse:\n    print("Try again")',
                practice: "Write a program that prints whether a number is positive, negative, or zero."
            },
            {
                title: "Loops",
                explanation: "A for loop iterates over items in a sequence; a while loop repeats while a condition is true. Use range to generate a sequence of integers. Ensure while loops can eventually stop.",
                example: "A loop can print numbers from one to five.",
                code: 'for number in range(1, 6):\n    print(number)',
                practice: "Print the multiplication table of a number using a loop."
            },
            {
                title: "Lists, Tuples and Dictionaries",
                explanation: "Lists are ordered and mutable; tuples are ordered and immutable; dictionaries map keys to values. Indexing accesses sequence positions, and loops can process collections. Choose the structure that fits your data.",
                example: "A dictionary can store a student's name and marks.",
                code: 'marks = [75, 80, 92]\nstudent = {"name": "Anu", "marks": 92}\nprint(marks[0])\nprint(student["name"])',
                practice: "Create a list of five subjects and a dictionary with your name and branch."
            },
            {
                title: "Functions and Scope",
                explanation: "Functions group reusable instructions. Parameters receive inputs, return sends a result back, and local variables generally exist within their function. Clear functions make code easier to test and maintain.",
                example: "A function can calculate the area of a rectangle for different inputs.",
                code: 'def area(length, width):\n    return length * width\n\nprint(area(5, 3))',
                practice: "Write a function that accepts two numbers and returns their sum."
            },
            {
                title: "Strings and File Handling",
                explanation: "Strings support methods such as lower, upper, strip, and split. Files can be opened with open; using a with block closes the file automatically. Choose the appropriate encoding and handle file errors when needed.",
                example: "Read a text file line by line or write a simple note to a file.",
                code: 'message = "  Hello Python  "\nprint(message.strip().lower())\n\nwith open("notes.txt", "w", encoding="utf-8") as file:\n    file.write("Learning Python")',
                practice: "Write code that removes extra spaces from a string and converts it to lowercase."
            },
            {
                title: "Exceptions and Modules",
                explanation: "Exceptions report errors that occur while a program runs. try and except allow selected errors to be handled. Modules organize reusable code; import makes module functionality available. Avoid catching every error without understanding it.",
                example: "Convert user input to a number while handling invalid text.",
                code: 'try:\n    number = int("25")\n    print(number)\nexcept ValueError:\n    print("Please provide a whole number")',
                practice: "Write a program that safely converts a text value to an integer."
            },
            {
                title: "Python Mini Project",
                explanation: "A useful beginner project combines variables, conditions, loops, collections, and functions. Break the problem into smaller tasks, test normal and unusual inputs, and use meaningful names. Improve the program after trying it.",
                example: "Build a simple quiz that asks three questions, checks answers, and calculates a score.",
                code: 'questions = [\n    ("What is 2 + 2? ", "4"),\n    ("Python uses indentation? ", "yes")\n]\nscore = 0\nfor question, answer in questions:\n    if input(question).strip().lower() == answer:\n        score += 1\nprint("Score:", score, "out of", len(questions))',
                practice: "Build a calculator, quiz, or expense tracker using at least three Python concepts."
            }
        ]
    },

    "cloud-computing": {
        title: "Cloud Computing",
        description: "Understand cloud services, deployment, storage, and security.",
        lessons: [
            {
                title: "Introduction to Cloud Computing",
                explanation: "Cloud computing provides computing resources such as servers, storage, databases, and networking over a network. It allows users to obtain resources when needed without purchasing and maintaining every physical machine themselves.",
                example: "A website can run on a cloud server instead of a computer kept in an office.",
                code: 'User -> Internet -> Cloud service -> Application',
                practice: "Explain two advantages of cloud computing for a small business."
            },
            {
                title: "Cloud Deployment Models",
                explanation: "A public cloud provides services to many customers through a provider. A private cloud is dedicated to an organization. A hybrid cloud combines private infrastructure and public cloud resources. The appropriate model depends on control, cost, compliance, and workload.",
                example: "An organization may keep sensitive systems in a private environment while using public cloud resources for variable demand.",
                code: 'Public cloud: shared provider infrastructure\nPrivate cloud: dedicated environment\nHybrid cloud: combination',
                practice: "Compare public and private clouds using one benefit and one trade-off each."
            },
            {
                title: "IaaS, PaaS and SaaS",
                explanation: "Infrastructure as a Service provides resources such as virtual machines and networks. Platform as a Service provides a managed environment for building and deploying applications. Software as a Service delivers a complete application to users.",
                example: "Renting a virtual machine resembles IaaS; using a managed application platform resembles PaaS; using webmail resembles SaaS.",
                code: 'IaaS -> Manage more infrastructure\nPaaS -> Focus on application code\nSaaS -> Use a finished application',
                practice: "Classify a virtual server, managed app platform, and online document editor."
            },
            {
                title: "Virtualization and Containers",
                explanation: "Virtualization lets multiple virtual machines run on physical hardware using a hypervisor. Containers package an application and its dependencies while sharing the host operating system kernel. They provide different isolation and resource-management approaches.",
                example: "A development team may use containers to run an application consistently across environments.",
                code: 'Physical machine -> Hypervisor -> Virtual machines\nHost operating system -> Container runtime -> Containers',
                practice: "Describe one difference between a virtual machine and a container."
            },
            {
                title: "Cloud Storage and Databases",
                explanation: "Object storage stores data as objects, block storage provides disk-like volumes, and file storage organizes data into folders and files. Databases store structured or flexible records. Select a service based on access patterns, durability, performance, and cost.",
                example: "A learning website may store course images in object storage and user records in a database.",
                code: 'Images and documents -> Object storage\nApplication records -> Database\nServer disk -> Block storage',
                practice: "Choose a suitable storage type for website images and explain your choice."
            },
            {
                title: "Cloud Networking",
                explanation: "Cloud networking connects services using virtual networks, subnets, routing, firewalls, and load balancers. Public access should be limited to resources that need it. Private application and database components can be separated from public-facing services.",
                example: "A public web server can receive internet traffic while a database accepts connections only from the application tier.",
                code: 'Internet -> Load balancer -> Web application -> Private database',
                practice: "Draw a simple network for a website and identify which component should be private."
            },
            {
                title: "Scaling and Reliability",
                explanation: "Vertical scaling increases the resources of a machine; horizontal scaling adds more instances. Load balancing distributes traffic. Backups, redundancy, health checks, and recovery plans help reduce downtime, although no design can guarantee zero failures.",
                example: "An online course website may add application instances during enrollment periods.",
                code: 'Traffic increases -> Add instances -> Load balance requests',
                practice: "Explain the difference between vertical and horizontal scaling."
            },
            {
                title: "Cloud Security and Identity",
                explanation: "Cloud security includes identity and access management, encryption, network controls, logging, patching, and backups. Apply least privilege: each user or service should receive only the permissions it needs. Protect credentials and never publish secret keys.",
                example: "A student project should use a restricted service identity instead of an administrator account for every task.",
                code: 'Secure access:\n1. Strong authentication\n2. Least privilege\n3. Encryption\n4. Monitoring',
                practice: "List four steps that help protect a cloud-hosted application."
            },
            {
                title: "Cloud Deployment and Monitoring",
                explanation: "Deployment moves an application into an environment where users can access it. Monitoring tracks metrics, logs, availability, and errors. Automated deployments and rollback plans can reduce manual mistakes. Test configuration and security before going live.",
                example: "A team deploys a website, checks error logs, and monitors response times after release.",
                code: 'Code -> Build -> Test -> Deploy -> Monitor',
                practice: "Describe three checks to perform after deploying a website."
            },
            {
                title: "Cloud Mini Project and Cost Management",
                explanation: "Cloud projects should estimate costs, choose appropriate resource sizes, set budgets and alerts, protect data, and shut down unused resources. A small demonstration can use a static website or a simple application with documented architecture and security decisions.",
                example: "Deploy a portfolio site, enable HTTPS, configure access correctly, and record the resources used.",
                code: 'Project checklist:\n- Choose a service\n- Deploy the application\n- Enable secure access\n- Monitor usage\n- Review cost and cleanup',
                practice: "Plan a small cloud-hosted student website and list its resources, security controls, and cost checks."
            }
        ]
    }
};

// ========================================
// 2. PROGRESS STORAGE
// ========================================

function loadProgress() {
    try {
        const saved = localStorage.getItem(PROGRESS_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch (error) {
        console.warn("Could not read saved course progress.", error);
        return {};
    }
}

function saveProgress() {
    try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(completedLessons));
    } catch (error) {
        console.warn("Could not save course progress.", error);
    }
}

function getCompletedSet(courseId) {
    if (!Array.isArray(completedLessons[courseId])) {
        completedLessons[courseId] = [];
    }

    return completedLessons[courseId];
}

function isLessonComplete(courseId, index) {
    return getCompletedSet(courseId).includes(index);
}

function completedCount(courseId) {
    return getCompletedSet(courseId).length;
}

// ========================================
// 3. PAGE LOADING
// ========================================

async function loadPage(page, category = "") {
    try {
        const allowedPages = [
            "home", "courses", "about", "contact", "login", "signup"
        ];

        if (!allowedPages.includes(page)) {
            page = "home";
        }

        const response = await fetch(`${page}.html`);

        if (!response.ok) {
            throw new Error(`${page}.html could not be loaded`);
        }

        content.innerHTML = await response.text();

        document.querySelectorAll("[data-page]").forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.page === page &&
                !link.closest(".dropdown-menu")
            );
        });

        if (page === "courses" && category) {
            const heading = content.querySelector(".page-heading h1");

            if (heading) {
                heading.innerHTML = `${category} <span>Courses</span>`;
            }

            content.querySelectorAll(".course-card").forEach(card => {
                const title = card.querySelector("h2")?.textContent || "";

                card.hidden = !title.toLowerCase().includes(
                    category.toLowerCase()
                );
            });
        }

        currentCourse = "";
        currentLessonIndex = 0;

        document.getElementById("coursesMenu")?.classList.remove("show");
        document.getElementById("coursesToggle")?.setAttribute(
            "aria-expanded", "false"
        );
        document.getElementById("navLinks")?.classList.remove("show");
        document.getElementById("menuBtn")?.setAttribute(
            "aria-expanded", "false"
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        console.error(error);

        content.innerHTML = `
            <section class="content-page">
                <h1>Oops! This page could not load.</h1>
                <p>
                    Check that the HTML files are in the same folder
                    and that you're running the project with Live Server.
                </p>
                <button class="start-btn" data-page="home">
                    Return Home
                </button>
            </section>`;
    }
}


async function connectFiles() {
    try {
        const response = await fetch("navigation.html");

        if (!response.ok) {
            throw new Error("navigation.html could not be loaded");
        }

        navigation.innerHTML = await response.text();

        // If this is course.html, load the selected course
        if (isCourseDocument) {
            const params = new URLSearchParams(window.location.search);
            const courseId = params.get("course");

            await loadPage("courses");

            if (courses[courseId]) {
                openCourse(courseId);
            } else {
                const message = document.getElementById("courseMessage");

                if (message) {
                    message.textContent =
                        "Course not found. Please return to all courses.";
                }
            }

            return;
        }

        // If returning from course.html, open the courses page
        const params = new URLSearchParams(window.location.search);
        const requestedPage = params.get("page") || "home";

        await loadPage(requestedPage);
    } catch (error) {
        console.error(error);

        content.innerHTML = `
            <section class="content-page">
                <h1>SkillUp could not connect its files.</h1>
                <p>
                    Open index.html with VS Code Live Server and check
                    that navigation.html is in the same folder.
                </p>
            </section>`;
    }
}


// ========================================
// 4. OPEN A COURSE
// ========================================

function openCourse(courseId) {
    const course = courses[courseId];
    const courseSection = document.getElementById("courseLearning");

    if (!course || !courseSection) {
        console.error("Course or learning section was not found.");
        return;
    }

    currentCourse = courseId;
    currentLessonIndex = 0;

    const grid = document.getElementById("courseGrid");
    if (grid) {
        grid.hidden = true;
    }

    const message = document.getElementById("courseMessage");
    if (message) {
        message.textContent = "";
    }

    courseSection.hidden = false;

    document.getElementById("learningCourseTitle").textContent = course.title;
    document.getElementById("learningCourseDescription").textContent =
        course.description;

    renderLesson();

    courseSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ========================================
// 5. RENDER A LESSON
// ========================================

function renderLesson() {
    const course = courses[currentCourse];
    if (!course) return;

    const lesson = course.lessons[currentLessonIndex];
    const total = course.lessons.length;
    const complete = isLessonComplete(currentCourse, currentLessonIndex);

    const lessonContent = document.getElementById("courseLessonContent");
    if (!lessonContent) return;

    const safeCode = escapeHTML(lesson.code);

    lessonContent.innerHTML = `
        <article class="lesson-card">
            <p class="section-label">
                ${escapeHTML(course.title)} · LESSON ${currentLessonIndex + 1}
            </p>

            <h2>${escapeHTML(lesson.title)}</h2>

            <h3>📘 Explanation</h3>
            <p>${escapeHTML(lesson.explanation)}</p>

            <h3>💡 Practical Example</h3>
            <p>${escapeHTML(lesson.example)}</p>

            <h3>💻 Example Code / Workflow</h3>
            <pre><code>${safeCode}</code></pre>

            <h3>✍️ Practice Question</h3>
            <p>${escapeHTML(lesson.practice)}</p>
        </article>
    `;

    const previousButton = document.getElementById("previousLesson");
    const nextButton = document.getElementById("nextLesson");
    const counter = document.getElementById("lessonCounter");
    const completeCheckbox = document.getElementById("markLessonComplete");
    const finishButton = document.getElementById("finishCourse");
    const feedback = document.getElementById("lessonFeedback");

    if (previousButton) {
        previousButton.disabled = currentLessonIndex === 0;
    }

    if (nextButton) {
        nextButton.disabled = currentLessonIndex === total - 1;
    }

    if (counter) {
        counter.textContent = `Lesson ${currentLessonIndex + 1} of ${total}`;
    }

    if (completeCheckbox) {
        completeCheckbox.checked = complete;
    }

    if (feedback) {
        feedback.textContent = complete
            ? "✓ You have completed this lesson."
            : "";
    }

    if (finishButton) {
        finishButton.hidden = currentLessonIndex !== total - 1;
        finishButton.textContent = completedCount(currentCourse) === total
            ? "Course Completed ✓"
            : "Complete Course ✓";
    }

    updateProgress();
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

// ========================================
// 6. UPDATE PROGRESS
// ========================================

function updateProgress() {
    if (!currentCourse) return;

    const course = courses[currentCourse];
    const total = course.lessons.length;
    const done = completedCount(currentCourse);
    const percentage = Math.round((done / total) * 100);

    const progressText = document.getElementById("progressText");
    const progressPercentage = document.getElementById("progressPercentage");
    const progressFill = document.getElementById("courseProgressFill");
    const progressTrack = document.getElementById("courseProgressTrack");
    const finishButton = document.getElementById("finishCourse");

    if (progressText) {
        progressText.textContent = `${done} of ${total} lessons completed`;
    }

    if (progressPercentage) {
        progressPercentage.textContent = `${percentage}%`;
    }

    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    if (progressTrack) {
        progressTrack.setAttribute("aria-valuenow", String(percentage));
    }

    if (finishButton && done === total) {
        finishButton.textContent = "Course Completed ✓";
    }
}

// ========================================
// 7. MARK A LESSON COMPLETE
// ========================================

function setLessonComplete(complete) {
    if (!currentCourse) return;

    const completed = getCompletedSet(currentCourse);
    const alreadyComplete = completed.includes(currentLessonIndex);

    if (complete && !alreadyComplete) {
        completed.push(currentLessonIndex);
    } else if (!complete && alreadyComplete) {
        completedLessons[currentCourse] = completed.filter(
            index => index !== currentLessonIndex
        );
    }

    saveProgress();
    updateProgress();

    const feedback = document.getElementById("lessonFeedback");

    if (feedback) {
        feedback.textContent = complete
            ? "✓ Lesson marked as complete. Your progress has been saved."
            : "Lesson marked as incomplete.";
    }

    const finishButton = document.getElementById("finishCourse");

    if (finishButton && currentCourse) {
        finishButton.textContent =
            completedCount(currentCourse) === courses[currentCourse].lessons.length
                ? "Course Completed ✓"
                : "Complete Course ✓";
    }
}

// ========================================
// 8. PREVIOUS / NEXT LESSON
// ========================================

function goToLesson(direction) {
    if (!currentCourse) return;

    const total = courses[currentCourse].lessons.length;
    const nextIndex = currentLessonIndex + direction;

    if (nextIndex < 0 || nextIndex >= total) return;

    currentLessonIndex = nextIndex;
    renderLesson();

    document.getElementById("courseLessonContent")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function finishCurrentCourse() {
    if (!currentCourse) return;

    const course = courses[currentCourse];
    const done = completedCount(currentCourse);
    const feedback = document.getElementById("lessonFeedback");

    if (done === course.lessons.length) {
        if (feedback) {
            feedback.textContent =
                `🎉 Congratulations! You completed ${course.title}.`;
        }
    } else if (feedback) {
        feedback.textContent =
            `You've completed ${done} of ${course.lessons.length} lessons. Finish the remaining lessons to complete this course.`;
    }
}

function returnToCourses() {
    const courseSection = document.getElementById("courseLearning");
    const grid = document.getElementById("courseGrid");

    if (courseSection) {
        courseSection.hidden = true;
    }

    if (grid) {
        grid.hidden = false;
    }

    currentCourse = "";
    currentLessonIndex = 0;

    content.querySelectorAll(".course-card").forEach(card => {
        card.hidden = false;
    });

    document.getElementById("courseMessage")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

// ========================================
// 9. NAVIGATION AND LEARNING EVENTS
// ========================================

document.addEventListener("click", event => {
    const pageLink = event.target.closest("[data-page]");

    if (pageLink) {
    event.preventDefault();

    const page = pageLink.dataset.page;
    const category = pageLink.dataset.category || "";

    if (isCourseDocument) {
        window.location.href =
            `index.html?page=${encodeURIComponent(page)}`;
    } else {
        loadPage(page, category);
    }

    return;
}

    const coursesToggle = event.target.closest("#coursesToggle");

    if (coursesToggle) {
        const menu = document.getElementById("coursesMenu");

        if (menu) {
            const isOpen = menu.classList.toggle("show");
            coursesToggle.setAttribute("aria-expanded", String(isOpen));
        }
        return;
    }

    const menuButton = event.target.closest("#menuBtn");

    if (menuButton) {
        const nav = document.getElementById("navLinks");

        if (nav) {
            const isOpen = nav.classList.toggle("show");
            menuButton.setAttribute("aria-expanded", String(isOpen));
        }
        return;
    }

    // Start any of the six courses
    // Start a course on the separate course.html page
const startButton = event.target.closest("[data-open-course]");

if (startButton) {
    const courseId = startButton.dataset.openCourse;

    if (courses[courseId]) {
        sessionStorage.setItem("skillup-return-page", "courses");

        window.location.href =
            `course.html?course=${encodeURIComponent(courseId)}`;
    }

    return;
}

    // Previous lesson
    if (event.target.closest("#previousLesson")) {
        goToLesson(-1);
        return;
    }

    // Next lesson
    if (event.target.closest("#nextLesson")) {
        goToLesson(1);
        return;
    }

    // Return to all course cards
    if (event.target.closest("#backToCourses")) {
        returnToCourses();
        return;
    }

    // Finish-course button
    if (event.target.closest("#finishCourse")) {
        finishCurrentCourse();
        return;
    }

    // Support older course buttons, if any remain
    const oldCourseButton = event.target.closest("[data-course]");

    if (oldCourseButton) {
        const message = document.getElementById("courseMessage");

        if (message) {
            message.textContent =
                `${oldCourseButton.dataset.course} selected.`;
        }
    }
});

// Checkbox change event
document.addEventListener("change", event => {
    if (event.target.id === "markLessonComplete") {
        setLessonComplete(event.target.checked);
    }
});

// ========================================
// 10. EXISTING DEMO FORMS — PRESERVED
// ========================================

document.addEventListener("submit", event => {
    const form = event.target;

    if (form.id === "contactForm") {
        event.preventDefault();

        const feedback = document.getElementById("contactFeedback");

        if (feedback) {
            feedback.textContent =
                "Thank you! The form works in this demo, but your message has not been sent to a server.";
        }

        form.reset();
    }

    if (form.id === "loginForm") {
        event.preventDefault();

        const feedback = document.getElementById("loginFeedback");

        if (feedback) {
            feedback.textContent =
                "Your form is working! Real login requires a backend and account authentication.";
        }
    }

    if (form.id === "signupForm") {
        event.preventDefault();

        const password = form.elements.password?.value;
        const confirmPassword = form.elements.confirmPassword?.value;
        const feedback = document.getElementById("signupFeedback");

        if (password !== confirmPassword) {
            if (feedback) {
                feedback.textContent =
                    "Passwords do not match. Please try again.";
            }
            return;
        }

        if (feedback) {
            feedback.textContent =
                "Your form is working! Account creation requires a backend.";
        }
    }
});

// ========================================
// 11. START SKILLUP
// ========================================

connectFiles();
// ===================================
// SKILLUP DARK / LIGHT MODE
// ===================================

const THEME_KEY = "skillup-theme";

function updateThemeToggle() {
    const toggle = document.getElementById("themeToggle");

    function updateThemeToggle() {
    const toggle = document.getElementById("themeToggle");

    if (!toggle) return;

    const isDark = document.body.classList.contains("dark-mode");
    const icon = isDark ? "☀️" : "🌙";

    // Update only when the icon actually needs changing
    if (toggle.textContent !== icon) {
        toggle.textContent = icon;
    }

    toggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggle();
}

// Restore saved theme
applyTheme(localStorage.getItem(THEME_KEY) || "light");

// Event delegation works even when navigation.html loads dynamically
document.addEventListener("click", function (event) {
    const toggle = event.target.closest("#themeToggle");

    if (!toggle) return;

    const isDark = document.body.classList.contains("dark-mode");

    applyTheme(isDark ? "light" : "dark");
});

// Update the icon when the separate navigation is inserted
const themeObserver = new MutationObserver(updateThemeToggle);

themeObserver.observe(document.body, {
    childList: true,
    subtree: true
});

updateThemeToggle();