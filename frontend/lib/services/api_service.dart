import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/employee.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:5000/api';

  // Get employees with optional search and pagination
  static Future<Map<String, dynamic>> getEmployees({String search = '', int page = 1, int limit = 10}) async {
    final response = await http.get(Uri.parse('$baseUrl/employees?search=$search&page=$page&limit=$limit'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      final List<Employee> employees = (data['employees'] as List)
          .map((e) => Employee.fromJson(e))
          .toList();
      return {'total': data['total'], 'employees': employees};
    } else {
      throw Exception('Failed to load employees');
    }
  }

  // Get single employee by ID
  static Future<Employee> getEmployeeById(String id) async {
    final response = await http.get(Uri.parse('$baseUrl/employees/$id'));
    if (response.statusCode == 200) {
      return Employee.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load employee');
    }
  }

  // Create new employee
  static Future<Employee> createEmployee(Employee employee) async {
    final response = await http.post(
      Uri.parse('$baseUrl/employees'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(employee.toJson()),
    );
    if (response.statusCode == 201) {
      return Employee.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to create employee');
    }
  }

  // Update employee
  static Future<Employee> updateEmployee(String id, Employee employee) async {
    final response = await http.put(
      Uri.parse('$baseUrl/employees/$id'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(employee.toJson()),
    );
    if (response.statusCode == 200) {
      return Employee.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to update employee');
    }
  }

  // Delete employee
  static Future<void> deleteEmployee(String id) async {
    final response = await http.delete(Uri.parse('$baseUrl/employees/$id'));
    if (response.statusCode != 200) {
      throw Exception('Failed to delete employee');
    }
  }
} 