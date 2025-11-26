package com.employee.taskmanagement.employe_task_management.service;

import com.employee.taskmanagement.employe_task_management.model.Employee;
import com.employee.taskmanagement.employe_task_management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    @Override
    public Employee updateEmployee(Long id, Employee updatedData) {
        Employee existing = getEmployeeById(id);
        existing.setName(updatedData.getName());
        existing.setEmail(updatedData.getEmail());
        existing.setDepartment(updatedData.getDepartment());
        existing.setRole(updatedData.getRole());
        return employeeRepository.save(existing);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
