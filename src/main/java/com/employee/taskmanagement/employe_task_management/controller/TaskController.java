package com.employee.taskmanagement.employe_task_management.controller;

import com.employee.taskmanagement.employe_task_management.model.Task;
import com.employee.taskmanagement.employe_task_management.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/employee/{employeeId}")
    public Task createTask(@PathVariable Long employeeId, @RequestBody Task task) {
        return taskService.createTask(employeeId, task);
    }

    @GetMapping("/employee/{employeeId}")
    public List<Task> getTasksByEmployee(@PathVariable Long employeeId) {
        return taskService.getTasksByEmployee(employeeId);
    }

    @PutMapping("/{taskId}")
    public Task updateTask(@PathVariable Long taskId, @RequestBody Task task) {
        return taskService.updateTask(taskId, task);
    }

    @DeleteMapping("/{taskId}")
    public String deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return "Task deleted successfully!";
    }
}
