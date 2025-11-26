package com.employee.taskmanagement.employe_task_management.service;

import com.employee.taskmanagement.employe_task_management.model.Task;

import java.util.List;

public interface TaskService {

    Task createTask(Long employeeId, Task task);

    List<Task> getTasksByEmployee(Long employeeId);

    Task updateTask(Long taskId, Task task);

    void deleteTask(Long taskId);
}
