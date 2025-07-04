import 'package:flutter/material.dart';
import '../models/employee.dart';
import '../services/api_service.dart';
import '../widgets/employee_form.dart';

class EmployeeMasterScreen extends StatefulWidget {
  const EmployeeMasterScreen({Key? key}) : super(key: key);

  @override
  State<EmployeeMasterScreen> createState() => _EmployeeMasterScreenState();
}

class _EmployeeMasterScreenState extends State<EmployeeMasterScreen> {
  List<Employee> employees = [];
  int total = 0;
  int page = 1;
  int limit = 10;
  String search = '';
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchEmployees();
  }

  Future<void> fetchEmployees() async {
    setState(() => isLoading = true);
    try {
      final result = await ApiService.getEmployees(search: search, page: page, limit: limit);
      setState(() {
        employees = List<Employee>.from(result['employees']);
        total = result['total'];
        isLoading = false;
      });
    } catch (e) {
      setState(() => isLoading = false);
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  void openAddDialog() async {
    await showDialog(
      context: context,
      builder: (ctx) => Dialog(
        child: SizedBox(
          width: 400,
          child: EmployeeForm(
            onSave: (employee) async {
              Navigator.of(ctx).pop();
              setState(() => isLoading = true);
              try {
                await ApiService.createEmployee(employee);
                await fetchEmployees();
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Employee added.')));
              } catch (e) {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
              } finally {
                setState(() => isLoading = false);
              }
            },
          ),
        ),
      ),
    );
  }

  void openEditDialog(Employee employee) async {
    await showDialog(
      context: context,
      builder: (ctx) => Dialog(
        child: SizedBox(
          width: 400,
          child: EmployeeForm(
            employee: employee,
            isEdit: true,
            onSave: (updated) async {
              Navigator.of(ctx).pop();
              setState(() => isLoading = true);
              try {
                await ApiService.updateEmployee(employee.id!, updated);
                await fetchEmployees();
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Employee updated.')));
              } catch (e) {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
              } finally {
                setState(() => isLoading = false);
              }
            },
          ),
        ),
      ),
    );
  }

  void openViewDialog(Employee employee) async {
    await showDialog(
      context: context,
      builder: (ctx) => Dialog(
        child: SizedBox(
          width: 400,
          child: EmployeeForm(
            employee: employee,
            isView: true,
            onSave: (_) {}, // No-op
          ),
        ),
      ),
    );
  }

  void deleteEmployee(Employee employee) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete Employee'),
        content: Text('Are you sure you want to delete ${employee.employeeName}?'),
        actions: [
          TextButton(onPressed: () => Navigator.of(ctx).pop(false), child: const Text('Cancel')),
          ElevatedButton(onPressed: () => Navigator.of(ctx).pop(true), child: const Text('Delete')),
        ],
      ),
    );
    if (confirm == true) {
      setState(() => isLoading = true);
      try {
        await ApiService.deleteEmployee(employee.id!);
        await fetchEmployees();
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Employee deleted.')));
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
      } finally {
        setState(() => isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Employee Master')),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          decoration: const InputDecoration(
                            labelText: 'Search',
                            prefixIcon: Icon(Icons.search),
                          ),
                          onChanged: (val) {
                            search = val;
                            page = 1;
                            fetchEmployees();
                          },
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton(
                        onPressed: openAddDialog,
                        child: const Text('Add Employee'),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: DataTable(
                      columns: const [
                        DataColumn(label: Text('Name')),
                        DataColumn(label: Text('Code')),
                        DataColumn(label: Text('Head Qtr')),
                        DataColumn(label: Text('Staff Type')),
                        DataColumn(label: Text('Designation')),
                        DataColumn(label: Text('Actions')),
                      ],
                      rows: employees.map((e) => DataRow(cells: [
                        DataCell(Text(e.employeeName)),
                        DataCell(Text(e.employeeCode)),
                        DataCell(Text(e.headQtr)),
                        DataCell(Text(e.staffType)),
                        DataCell(Text(e.designation)),
                        DataCell(Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.visibility),
                              onPressed: () => openViewDialog(e),
                              tooltip: 'View',
                            ),
                            IconButton(
                              icon: const Icon(Icons.edit),
                              onPressed: () => openEditDialog(e),
                              tooltip: 'Edit',
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete),
                              onPressed: () => deleteEmployee(e),
                              tooltip: 'Delete',
                            ),
                          ],
                        )),
                      ])).toList(),
                    ),
                  ),
                ),
                if (total > limit)
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.chevron_left),
                          onPressed: page > 1 ? () { setState(() { page--; fetchEmployees(); }); } : null,
                        ),
                        Text('Page $page of ${((total - 1) / limit + 1).floor()}'),
                        IconButton(
                          icon: const Icon(Icons.chevron_right),
                          onPressed: page * limit < total ? () { setState(() { page++; fetchEmployees(); }); } : null,
                        ),
                      ],
                    ),
                  ),
              ],
            ),
    );
  }
} 