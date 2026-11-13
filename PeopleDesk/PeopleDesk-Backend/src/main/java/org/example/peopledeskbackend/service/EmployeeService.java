package org.example.peopledeskbackend.service;

import org.example.peopledeskbackend.model.Employee;
import org.example.peopledeskbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;


    public void creatEmployee(Employee employee) {
        repo.save(employee);
    }
    public List<Employee> AllEmployees() {
        return repo.findAll();
    }
    public Employee EmployeeByID(int id) {
        return repo.findById(id).orElse(null);
    }
    public Employee updateEmployee(int id, Employee employee) {
        return repo.save(employee);
    }

    public void deleteEmployee(int id) {
        repo.deleteById(id);
    }


    public List<Employee> searchEmployees(String keyword) {
        return repo.searchEmployees(keyword);

    }
}