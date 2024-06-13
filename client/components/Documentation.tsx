import React from "react";

const Documentation = () => {
  const containerStyle = {
    backgroundColor: "#f8f9fa", // Light grey background for the container
    padding: "20px",
    borderRadius: "10px",
  };

  const mainHeader = {
    backgroundColor: "#4682b4", // Steel blue background for the main header
    color: "white",
    padding: "10px",
    borderRadius: "5px",
  };
  const headerStyle = {
    backgroundColor: "#343a40", // Dark grey background for the headers
    color: "#ffffff", // White text color for the headers
    padding: "10px",
    borderRadius: "5px",
  };

  const contentStyle = {
    backgroundColor: "#ffffff", // White background for the content
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
    textAlign: "justify",
  };

  return (
    <>
      <div className="container fs-5" style={containerStyle}>
        <h1 style={mainHeader} className="text-center">
          LabAssist: Lab Management System
        </h1>
        <br />
        <h3>Table of Contents:</h3>
        <ul style={contentStyle}>
          <li>
            1.{" "}
            <a href="#introduction" className="text-decoration-none">
              Introduction
            </a>
          </li>
          <li>
            2.{" "}
            <a href="#features" className="text-decoration-none">
              Features
            </a>
          </li>
          <li>
            3.{" "}
            <a href="#sysreq" className="text-decoration-none">
              System Requirements
            </a>
          </li>
          <li>
            4.{" "}
            <a href="#installation" className="text-decoration-none">
              Installation Guidelines
            </a>
          </li>
          <li>
            5.{" "}
            <a href="#usage" className="text-decoration-none">
              Usage
            </a>
          </li>
          <li>
            6.{" "}
            <a href="#api" className="text-decoration-none">
              API Endpoints
            </a>
          </li>
          <li>
            7.{" "}
            <a href="#tech" className="text-decoration-none">
              Technology Stack
            </a>
          </li>
          <li>
            8.{" "}
            <a href="#conclusion" className="text-decoration-none">
              Conclusion
            </a>
          </li>
          <li>
            9.{" "}
            <a href="#contact" className="text-decoration-none">
              Contact
            </a>
          </li>
        </ul>

        <div id="introduction">
          <h2 className="text-center" style={headerStyle}>
            1. Introduction
          </h2>
          <p style={contentStyle}>
            <span className="fw-bold">LabAssist</span> is an innovative lab
            management system designed to streamline the process of requesting
            and managing laboratory instruments. This system enables students to
            easily request lab instruments, which teachers can then approve or
            deny. Additionally, lab instructors can update and maintain the lab
            inventory, ensuring that all data is accurate and up-to-date. By
            leveraging the MERN stack (MongoDB, Express, React, Node.js),
            LabAssist ensures a seamless integration of all components, offering
            a cohesive and efficient solution for laboratory management. This
            system not only enhances the user experience for students and
            teachers but also brings about a significant reduction in
            administrative workload and paper usage, promoting a greener and
            more organized laboratory environment.
          </p>
        </div>
        <div id="features">
          <h2 style={headerStyle} className="text-center">
            2. Features
          </h2>
          <ul style={contentStyle}>
            <li>
              <span className="fw-bold">User Management:</span> Role-based
              permissions and authentication protocols for secure user access.
            </li>
            <li>
              <span className="fw-bold">Inventory Management:</span> Real-time
              updates and automated restocking alerts for lab supplies and
              equipment.
            </li>
            <li>
              <span className="fw-bold">Collaboration Tools:</span> Integrated
              messaging and file-sharing for seamless communication among lab
              members.
            </li>
            <li>
              <span className="fw-bold">Data Analytics:</span> Generation of
              insightful reports and data visualizations.
            </li>
            <li>
              <span className="fw-bold">Scheduling:</span> Efficient management
              of lab schedules with easy booking for equipment and facilities.
            </li>
          </ul>
        </div>

        <div id="sysreq">
          <h2 style={headerStyle} className="text-center">
            3. System Requirements
          </h2>
          <ul style={contentStyle}>
            <li>
              <span className="fw-bold">Node.js:</span> v14.x or later
            </li>
            <li>
              <span className="fw-bold">MongoDB:</span> v4.x or later
            </li>
            <li>
              <span className="fw-bold">React:</span> v17.x or later
            </li>
            <li>
              <span className="fw-bold">NPM:</span> v6.x or later
            </li>
          </ul>
        </div>

        <div id="installation">
          <h2 style={headerStyle} className="text-center">
            4. Installation
          </h2>
          <ul style={contentStyle}>
            <li>
              <span className="fw-bold">1. Create a react app:</span> To create
              and run our React application, follow these steps:
              <ul>
                <li>
                  i. Create with Vite:{" "}
                  <span className="fw-bold">npm create vite</span>
                </li>
                <li>
                  ii. Set the project name and then the framework{" "}
                  <span className="fw-bold">React</span>
                </li>
                <li>
                  iii. Select the variant{" "}
                  <span className="fw-bold">TypeScript</span>
                </li>
                <li>
                  Now go to the React app and run{" "}
                  <span className="fw-bold">npm install</span> and after
                  completing the installation, run{" "}
                  <span className="fw-bold">npm run dev</span>
                </li>
              </ul>
            </li>
            <li>
              {" "}
              <span className="fw-bold">
                2. Required modules in the project:
              </span>{" "}
              To develop the project, we installed several react modules for
              working perfectly:
              <ul>
                <li>
                  <span className="fw-bold">npm i zod@latest</span>: Form data
                  validation
                </li>
                <li>
                  <span className="fw-bold">npm i bootstrap@latest</span>: For
                  responsive CSS design
                </li>
                <li>
                  <span className="fw-bold">npm i axios@latest</span>: For API
                  calling in the frontend
                </li>
                <li>
                  <span className="fw-bold">npm i gsap@latest</span>: For
                  applying animations
                </li>
                <li></li>
              </ul>
            </li>
          </ul>
          <p>
            Also there are some common modules like{" "}
            <span className="fw-bold">react-router-dom, react-icons</span> etc.
            To handle the backend, we have implemented{" "}
            <span className="fw-bold">
              express, nodemailer, cors middleware
            </span>{" "}
            etc.
          </p>
        </div>

        <div id="usage">
          <h2 style={headerStyle} className="text-center">
            5. Usage
          </h2>
          <p style={contentStyle}>
            Once the project setup is ready, the server and the client will run
            in the different ports. You can run the application on{" "}
            <span className="fw-bold">localhost:5173</span>. After performing
            Sign up and log in, you will be able to use the features of our{" "}
            <span>LabAssist</span> application.
          </p>
        </div>

        <div id="api">
          <h2 style={headerStyle} className="text-center">
            6. API Endpoints
          </h2>
          <div style={contentStyle}>
            <h4>1. Authentication</h4>
            <ul>
              <li>
                <span className="fw-bold">POST /signup/saveusers:</span> Save
                user informations initially
              </li>
              <li>
                <span className="fw-bold">POST /signup/sendotp:</span> Send OTP
                for verification
              </li>
              <li>
                <span className="fw-bold">POST /users/register:</span>{" "}
                Successfully register a new user
              </li>
              <li>
                <span className="fw-bold">POST /users/login:</span> Authenticate
                an existing user
              </li>
            </ul>

            <h4>2. Inventory Management</h4>
            <ul>
              <li>
                <span className="fw-bold">GET /api/inventory:</span> Read and
                show inventory data in the page
              </li>
              <li>
                <span className="fw-bold">POST /api/inventory/create:</span>{" "}
                Create a new item in the inventory
              </li>
              <li>
                <span className="fw-bold">
                  PUT /api/inventory/update/#product_id:
                </span>{" "}
                Update an existing data in the inventory
              </li>
              <li>
                <span className="fw-bold">
                  DELETE /api/inventory/delete/#product_id:
                </span>{" "}
                Delete an item from the inventory
              </li>
            </ul>
          </div>
        </div>

        <div id="tech">
          <h2 style={headerStyle} className="text-center">
            7. Technology Stack
          </h2>
          <ul style={contentStyle}>
            <li>
              <span className="fw-bold">Frontend: </span>React, Bootstrap
            </li>
            <li>
              <span className="fw-bold">Backend: </span>Node.js, Express
            </li>
            <li>
              <span className="fw-bold">Database: </span>MongoDB
            </li>
            <li>
              <span className="fw-bold">Authentication: </span>JSON Web Tokens
              (JWT)
            </li>
          </ul>
        </div>

        <div id="conclusion">
          <h2 style={headerStyle} className="text-center">
            8. Conclusion
          </h2>
          <p style={contentStyle}>
            LabAssist is a cutting-edge laboratory management system that
            streamlines instrument requests, approvals, and inventory
            management. By leveraging the MERN stack, it enhances efficiency,
            reduces paperwork, and promotes a greener laboratory environment.
            LabAssist stands as a beacon of innovation, revolutionizing
            laboratory operations for a more seamless and sustainable future.
          </p>
        </div>
      </div>
      <footer className="footer" id="contact">
        <div className="footer-content">
          <h3>LabAssist: Lab Management System</h3>
          <p>
            This site is developed for the use of education purpose. With the
            hard effort of 3 students from 3rd batch of IRE Department of BDU,
            the site is ready to serve its purpose.{" "}
          </p>
        </div>
        <div className="contact">
          <p>Phone no: 01641578822</p>
          <p>Email: 2001011@bdu.ac.bd</p>
        </div>
        <div className="footer-bottom">
          <p>
            copyright &copy;2023 <a href="#">LabAssist</a>{" "}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Documentation;
