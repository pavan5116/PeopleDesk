package org.example.peopledeskbackend.controller;

import org.example.peopledeskbackend.model.Employee;
import org.example.peopledeskbackend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class EmployeeController {

    @Autowired
    EmployeeService service;

    @PostMapping("/api/employees")
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee){
        service.creatEmployee(employee);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/api/employees")
    public ResponseEntity<List<Employee>> getAllemployees(){
        return new ResponseEntity<>(service.AllEmployees(), HttpStatus.OK);
    }

    @GetMapping("/api/employees/{id}")
    public ResponseEntity<?> getEmployeeByID(@PathVariable int id){
        return new ResponseEntity<>(service.EmployeeByID(id), HttpStatus.OK);
    }

    @PutMapping("/api/employees/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable int id, @RequestBody Employee employee){
        service.updateEmployee(id, employee);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/api/employees/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable int id){
        service.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/employees/search")
    public ResponseEntity<List<Employee>> searchEmployees(@RequestParam String keyword){
        List<Employee> emp = service.searchEmployees(keyword);

        return new ResponseEntity<>(emp, HttpStatus.OK);
    }

}