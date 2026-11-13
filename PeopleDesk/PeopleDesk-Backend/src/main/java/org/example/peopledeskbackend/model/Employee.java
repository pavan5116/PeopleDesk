package org.example.peopledeskbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emp_seq")
    @SequenceGenerator(name = "emp_seq", sequenceName = "employee_id_seq", initialValue = 10, allocationSize = 1)
    private Integer id;
    private String employeeCode ;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String gender;
    private Date dateOfBirth;
    private String department;
    private String designation;
    private BigDecimal salary;
    private Date dateOfJoining;
    private String employmentStatus;
    private Date createdAt;
    private Date updatedAt;


    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

}
