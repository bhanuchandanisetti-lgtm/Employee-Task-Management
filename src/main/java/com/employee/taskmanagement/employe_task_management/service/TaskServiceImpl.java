package com.employee.taskmanagement.employe_task_management.service;

import com.employee.taskmanagement.employe_task_management.model.Employee;
import com.employee.taskmanagement.employe_task_management.model.Task;
import com.employee.taskmanagement.employe_task_management.repository.EmployeeRepository;
import com.employee.taskmanagement.employe_task_management.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Task createTask(Long employeeId, Task task) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        task.setEmployee(employee);

        return taskRepository.save(task);
    }

    @Override
    public List<Task> getTasksByEmployee(Long employeeId) {
        return taskRepository.findByEmployeeId(employeeId);
    }

    @Override
    public Task updateTask(Long taskId, Task updatedTask) {
        Task existing = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setStatus(updatedTask.getStatus());

        return taskRepository.save(existing);
    }

    @Override
    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}
