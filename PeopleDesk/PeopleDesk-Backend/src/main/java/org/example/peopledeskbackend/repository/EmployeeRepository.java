package org.example.peopledeskbackend.repository;

import org.example.peopledeskbackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query("SELECT emp FROM Employee emp WHERE " +
            "LOWER(emp.employeeCode) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(emp.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(emp.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(emp.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(emp.department) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(emp.designation) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employee> searchEmployees(String keyword);
}