/******************************
 * CONFIG & GLOBAL STATE
 ******************************/
const BASE_URL = "http://localhost:8080/api";

let cachedEmployeeViews = [];    // Employees + tasks (View page)
let cachedDeptEmployees = [];    // Employees filtered by department
let cachedTasks = [];            // Tasks for view-task page
let taskCache = {};              // For editing tasks
let assignEmpId = null;          // Employee currently selected for task assigning


/******************************
 * UI HELPER FUNCTIONS
 ******************************/
function showMessage(text, isError = false) {
    const el = document.getElementById("message");
    if (!el) return;
    el.textContent = text;
    el.className = isError ? "error" : "success";
}


/******************************
 * EMPLOYEE: ADD EMPLOYEE
 ******************************/
async function addEmployee(event) {
    event.preventDefault();

    const body = {
        name: empName.value.trim(),
        email: empEmail.value.trim(),
        department: empDept.value.trim(),
        role: empRole.value.trim()
    };

    try {
        const res = await fetch(`${BASE_URL}/employees`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!res.ok) throw new Error();

        showMessage("Employee added successfully!");
        empName.value = empEmail.value = empDept.value = empRole.value = "";
    } catch {
        showMessage("Error adding employee", true);
    }
}


/******************************
 * VIEW EMPLOYEES & TASKS
 ******************************/
async function loadEmployeesAndTasks() {
    showMessage("");
    cachedEmployeeViews = [];
    taskCache = {};

    try {
        const empRes = await fetch(`${BASE_URL}/employees`);
        const employees = await empRes.json();

        for (const emp of employees) {
            const tRes = await fetch(`${BASE_URL}/tasks/employee/${emp.id}`);
            const tasks = tRes.ok ? await tRes.json() : [];
            tasks.forEach(t => taskCache[t.id] = t);

            cachedEmployeeViews.push({ employee: emp, tasks });
        }

        populateEmployeeDeptDropdown(employees);
        renderEmployeesTable(cachedEmployeeViews);

        if (!employees.length) showMessage("No employees found.");
    } catch {
        showMessage("Error loading employees", true);
    }
}

function renderEmployeesTable(data) {
    const tbody = employeeTableBody;
    tbody.innerHTML = "";

    data.sort((a, b) => a.employee.id - b.employee.id);

    let displayId = 1;
    data.forEach(({ employee, tasks }) => {
        let html = "<ul>";

        tasks.forEach(t => {
            html += `
                <li>
                    <b>${t.title}</b> - ${t.status}
                    <button onclick="editTask(${t.id})" class="edit-btn">Edit</button>
                    <button onclick="deleteTask(${t.id})" class="delete-btn">Delete</button>
                </li>`;
        });

        html += "</ul>";

        tbody.innerHTML += `
            <tr>
                <td>${displayId++}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.role}</td>
                <td>${html}</td>
                <td><button class="delete-btn" onclick="deleteEmployee(${employee.id})">Delete Employee</button></td>
            </tr>`;
    });
}

function filterEmployeesTable() {
    const q = employeeSearch.value.toLowerCase();
    renderEmployeesTable(
        cachedEmployeeViews.filter(({ employee }) =>
            [employee.name, employee.email, employee.department, employee.role]
                .some(val => val.toLowerCase().includes(q))
        )
    );
}

async function deleteEmployee(id) {
    if (!confirm("Delete employee & their tasks?")) return;

    try {
        await fetch(`${BASE_URL}/employees/${id}`, { method: "DELETE" });
        showMessage("Employee deleted");
        loadEmployeesAndTasks();
    } catch {
        showMessage("Error deleting employee", true);
    }
}


/******************************
 * TASK MANAGEMENT
 ******************************/
async function deleteTask(id) {
    if (!confirm("Delete task?")) return;

    try {
        await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });
        showMessage("Task deleted");
        loadEmployeesAndTasks();
    } catch {
        showMessage("Error deleting task", true);
    }
}

async function editTask(id) {
    const task = taskCache[id];
    if (!task) return alert("Refresh & try again");

    const title = prompt("Task title:", task.title);
    if (title === null) return;

    const desc = prompt("Description:", task.description);
    if (desc === null) return;

    const status = prompt("Status (Pending / In-progress / Completed):", task.status);
    if (status === null) return;

    const body = { title: title.trim(), description: desc.trim(), status: status.trim() };

    try {
        await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
        });

        showMessage("Task updated");
        loadEmployeesAndTasks();
    } catch {
        showMessage("Error updating task", true);
    }
}


/******************************
 * ASSIGN TASK FLOW
 * 1. Load departments
 * 2. Load employees in dept
 * 3. Assign task
 ******************************/
async function loadDepartments() {
    const res = await fetch(`${BASE_URL}/employees`);
    const emps = await res.json();

    const departments = [...new Set(emps.map(e => e.department))];
    deptList.innerHTML = "";

    departments.forEach(d => {
        const li = document.createElement("li");
        li.textContent = d;
        li.onclick = () => location.href = `task-employees.html?dept=${encodeURIComponent(d)}`;
        deptList.appendChild(li);
    });
}

function filterDepartments() {
    const q = deptSearch.value.toLowerCase();
    document.querySelectorAll("#deptList li").forEach(li =>
        li.style.display = li.textContent.toLowerCase().includes(q) ? "block" : "none"
    );
}

async function loadEmployeesForDepartment() {
    const dept = new URLSearchParams(location.search).get("dept");
    const res = await fetch(`${BASE_URL}/employees`);
    const all = await res.json();

    cachedDeptEmployees = all.filter(e => e.department === dept);
    renderDeptEmployeesTable(cachedDeptEmployees);

    deptTitle.textContent = `Department: ${dept}`;
}

function renderDeptEmployeesTable(list) {
    deptEmpTableBody.innerHTML = list.map(e => `
        <tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.role}</td>
            <td><button class="emp-btn" onclick="goToAssignTask(${e.id})">Assign Task</button></td>
        </tr>`).join("");
}

function goToAssignTask(id) {
    location.href = `assign-task.html?empId=${id}`;
}

function initAssignTaskPage() {
    assignEmpId = new URLSearchParams(location.search).get("empId");
    assignEmpId ? loadSelectedEmployee(assignEmpId) : showMessage("No employee selected", true);
}

async function loadSelectedEmployee(id) {
    const res = await fetch(`${BASE_URL}/employees`);
    const employees = await res.json();

    const emp = employees.find(e => e.id == id);
    if (!emp) return showMessage("Employee not found", true);

    selectedEmpInfo.innerHTML = `
        <h3>Assigning Task To:</h3>
        <p><b>Name:</b> ${emp.name}</p>
        <p><b>Email:</b> ${emp.email}</p>
        <p><b>Dept:</b> ${emp.department}</p>
        <p><b>Role:</b> ${emp.role}</p>`;
}

async function assignTaskToSelected(event) {
    event.preventDefault();

    const body = {
        title: taskTitle.value.trim(),
        description: taskDesc.value.trim(),
        status: taskStatus.value.trim()
    };

    try {
        await fetch(`${BASE_URL}/tasks/employee/${assignEmpId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        showMessage("Task assigned successfully!");
        taskTitle.value = taskDesc.value = taskStatus.value = "";
    } catch {
        showMessage("Error assigning task", true);
    }
}


/******************************
 * VIEW TASKS BY DEPARTMENT
 ******************************/
async function loadTasksByDept() {
    cachedTasks = [];
    const empRes = await fetch(`${BASE_URL}/employees`);
    const employees = await empRes.json();

    const allDepts = new Set();
    for (const emp of employees) {
        allDepts.add(emp.department);
        const tRes = await fetch(`${BASE_URL}/tasks/employee/${emp.id}`);
        const tasks = tRes.ok ? await tRes.json() : [];

        tasks.forEach(t => cachedTasks.push({ dept: emp.department, emp: emp.name, title: t.title, status: t.status }));
    }

    populateDeptDropdown([...allDepts]);
    renderTasksTable(cachedTasks);
}

function populateDeptDropdown(depts) {
    deptFilter.innerHTML = `<option value="ALL">All Departments</option>`;
    depts.forEach(d => deptFilter.innerHTML += `<option>${d}</option>`);
}

function renderTasksTable(list) {
    tasksTableBody.innerHTML = list.map(t => `
        <tr>
            <td>${t.dept}</td>
            <td>${t.emp}</td>
            <td>${t.title}</td>
            <td class="${t.status.toLowerCase()}-status">${t.status}</td>
        </tr>`).join("");
}

function filterTasksByDept() {
    const d = deptFilter.value;
    renderTasksTable(d === "ALL" ? cachedTasks : cachedTasks.filter(t => t.dept === d));
}

function sortTasksByStatus() {
    const order = ["Pending", "In-progress", "Completed"];
    renderTasksTable([...cachedTasks].sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status)));
}


/******************************
 * EMPLOYEE SORT BY DEPARTMENT
 ******************************/
function populateEmployeeDeptDropdown(emps) {
    deptFilter.innerHTML = `<option value="ALL">All Departments</option>`;
    [...new Set(emps.map(e => e.department))].forEach(d =>
        deptFilter.innerHTML += `<option>${d}</option>`
    );
}

function filterEmployeesByDept() {
    const d = deptFilter.value;
    renderEmployeesTable(d === "ALL" ? cachedEmployeeViews :
        cachedEmployeeViews.filter(({ employee }) => employee.department === d)
    );
}
