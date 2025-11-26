# Employee Task Management System

A full-stack application built with **Spring Boot, MySQL, HTML, CSS, and JavaScript** that enables organizations to manage employees and assign tasks efficiently. 
The system supports department-wise task assignment, task tracking, employee management, and progress monitoring — all through a simple and intuitive UI.

---

## 🚀 Tech Stack Used

| Layer | Technology |
|------|------------|
| Backend | Java, Spring Boot, Spring Data JPA |
| Database | MySQL |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Build Tool | Maven |
| API Style | RESTful APIs |
| Server | Embedded Tomcat |

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```bash

git clone https://github.com/YOUR_USERNAME/employee-task-management.git
cd employee-task-management

2️⃣ Configure MySQL Database

Create a database:
```bash
CREATE DATABASE employe_task_management;


Update src/main/resources/application.properties with your MySQL credentials:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/employe_task_management
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

### 3️⃣ Run the Application
```bash
mvn spring-boot:run


Backend starts on:

http://localhost:8080/

###4️⃣ Access Frontend

Open index.html (located in /src/main/resources/static) in any browser.
