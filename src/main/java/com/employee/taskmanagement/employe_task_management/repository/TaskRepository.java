package com.employee.taskmanagement.employe_task_management.repository;

import com.employee.taskmanagement.employe_task_management.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // find tasks by employee id
    List<Task> findByEmployeeId(Long employeeId);
}
