## 📌 Employee Task Management System

A simple and efficient web-based application to manage employees, assign tasks, and track task progress.  
Built using **Spring Boot, MySQL, HTML, CSS, and JavaScript**.

---

## 🚀 Features

✔️ Add, view, and delete employees  
✔️ Assign tasks to employees  
✔️ Edit and delete assigned tasks  
✔️ Search employees by name, email, department, or role  
✔️ Filter employees by department  
✔️ View tasks by department and sort by status  
✔️ Clean and user-friendly UI  

---

## 🛠️ Tech Stack Used

| Layer | Technology |
|------|------------|
| Backend | Java, Spring Boot, Spring Web, Spring Data JPA |
| Database | MySQL |
| Frontend | HTML, CSS, JavaScript |
| ORM | Hibernate |
| Server | Embedded Tomcat |
| API Style | RESTful APIs |
| Build Tool | Maven |

---

## 📂 Project Structure

```text
/src
  └── main
      ├── java/com.employee.taskmanagement
      │     ├── controller
      │     ├── model
      │     ├── repository
      │     ├── service
      │     └── EmployeTaskManagementApplication.java
      └── resources
            ├── static (Frontend HTML/CSS/JS files)
            ├── templates (not used)
            └── application.properties

```
---

## 🧰 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/bhanuchandanisetti-lgtm/Employee-Task-Management.git
cd Employee-Task-Management
```
* * *

### 2️⃣ Configure MySQL Database

Create a database:
```bash
CREATE DATABASE employe_task_management;
```
Update `src/main/resources/application.properties` with your MySQL credentials:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/employe_task_management
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
* * *

### 3️⃣ Run the Application
```bash
mvn spring-boot:run
```
Backend starts at:
```text
http://localhost:8080/
```
* * *

### 4️⃣ Access the Frontend

Open the main page:

`src/main/resources/static/index.html`

Right-click → **Open in browser**  
From there, navigate through:

*   Add Employee
    
*   Assign Task
    
*   View Employees
    
*   View Tasks
