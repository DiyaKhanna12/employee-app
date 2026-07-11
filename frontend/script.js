
const API = "/api/employees";

// Load Employees
async function loadEmployees() {

    const response = await fetch(API);

    const employees = await response.json();

    const table = document.getElementById("employeeTable");

    table.innerHTML = "";

    employees.forEach(emp => {

        table.innerHTML += `
        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.role}</td>

            <td>

                <button onclick="editEmployee(${emp.id}, '${emp.name}', '${emp.role}')">
                    Edit
                </button>

                <button onclick="deleteEmployee(${emp.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

}

// Add Employee
async function addEmployee() {

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;

    if (!name || !role) {

        alert("Please fill all fields");

        return;

    }

    await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            role
        })

    });

    document.getElementById("name").value = "";
    document.getElementById("role").value = "";

    loadEmployees();

}

// Edit Employee
async function editEmployee(id, currentName, currentRole) {

    const name = prompt("Enter new name", currentName);

    const role = prompt("Enter new role", currentRole);

    if (!name || !role)
        return;

    await fetch(`${API}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            role
        })

    });

    loadEmployees();

}

// Delete Employee
async function deleteEmployee(id) {

    const confirmDelete = confirm("Delete this employee?");

    if (!confirmDelete)
        return;

    await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

    loadEmployees();

}

// Load data when page opens
loadEmployees();
