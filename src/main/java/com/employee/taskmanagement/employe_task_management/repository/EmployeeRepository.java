package com.employee.taskmanagement.employe_task_management.repository;

import com.employee.taskmanagement.employe_task_management.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
