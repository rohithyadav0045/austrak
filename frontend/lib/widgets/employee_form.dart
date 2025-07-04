import 'package:flutter/material.dart';
import '../models/employee.dart';
import 'package:flutter_google_places_hoc081098/flutter_google_places_hoc081098.dart';
import 'package:google_maps_webservice/places.dart';

const String googleApiKey = 'AIzaSyDFykh5gEH-QlMduEtg_WK_bdAyj9_Nt6M';
final GoogleMapsPlaces _places = GoogleMapsPlaces(apiKey: googleApiKey);

class EmployeeForm extends StatefulWidget {
  final Employee? employee;
  final Function(Employee) onSave;
  final bool isEdit;
  final bool isView;

  const EmployeeForm({Key? key, this.employee, required this.onSave, this.isEdit = false, this.isView = false}) : super(key: key);

  @override
  State<EmployeeForm> createState() => _EmployeeFormState();
}

class _EmployeeFormState extends State<EmployeeForm> {
  final _formKey = GlobalKey<FormState>();

  // Dropdown options (example, adjust as needed)
  final List<String> staffTypeOptions = ['TBE/BM', 'ASO', 'ASM', 'RM', 'ADMIN'];
  final List<String> designationOptions = ['AREA MANAGER', 'AREA SALES MANAGER', 'BUSINESS MANAGER'];
  final List<String> genderOptions = ['Male', 'Female', 'Other'];

  // Controllers
  final _nameController = TextEditingController();
  final _codeController = TextEditingController();
  final _headQtrController = TextEditingController();
  String? _selectedStaffType;
  String? _selectedDesignation;
  String? _selectedGender;
  DateTime? _dateOfJoining;
  DateTime? _dobCertificate;

  @override
  void initState() {
    super.initState();
    if (widget.employee != null) {
      final e = widget.employee!;
      _nameController.text = e.employeeName;
      _codeController.text = e.employeeCode;
      _headQtrController.text = e.headQtr;
      _selectedStaffType = e.staffType;
      _selectedDesignation = e.designation;
      _selectedGender = e.gender;
      _dateOfJoining = e.dateOfJoining;
      _dobCertificate = e.dobCertificate;
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _codeController.dispose();
    _headQtrController.dispose();
    super.dispose();
  }

  void save() {
    if (_formKey.currentState!.validate()) {
      final employee = Employee(
        id: widget.employee?.id,
        employeeName: _nameController.text.trim(),
        employeeCode: _codeController.text.trim(),
        headQtr: _headQtrController.text.trim(),
        stateName: '',
        staffType: _selectedStaffType ?? '',
        designation: _selectedDesignation ?? '',
        divisionGroup: '',
        dateOfJoining: _dateOfJoining ?? DateTime.now(),
        temporaryOrWaiting: false,
        department: '',
        panNo: '',
        dobCertificate: _dobCertificate ?? DateTime.now(),
      );
      widget.onSave(employee);
    }
  }

  @override
  Widget build(BuildContext context) {
    final readOnly = widget.isView;
    return Form(
      key: _formKey,
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Employee Name'),
              readOnly: readOnly,
              validator: (val) => val == null || val.isEmpty ? 'Required' : null,
            ),
            TextFormField(
              controller: _codeController,
              decoration: const InputDecoration(labelText: 'Employee Code'),
              readOnly: readOnly,
              validator: (val) => val == null || val.isEmpty ? 'Required' : null,
            ),
            TextFormField(
              controller: _headQtrController,
              readOnly: true,
              decoration: const InputDecoration(labelText: 'Head Qtr (Google Places)'),
              onTap: readOnly
                  ? null
                  : () async {
                      Prediction? p = await PlacesAutocomplete.show(
                        context: context,
                        apiKey: googleApiKey,
                        mode: Mode.overlay,
                        language: 'en',
                        components: [Component(Component.country, 'in')],
                        hint: 'Search for a city or place in India',
                      );
                      if (p != null) {
                        setState(() {
                          _headQtrController.text = p.description ?? '';
                        });
                      }
                    },
              validator: (val) => val == null || val.isEmpty ? 'Required' : null,
            ),
            DropdownButtonFormField<String>(
              value: _selectedStaffType,
              decoration: const InputDecoration(labelText: 'Staff Type'),
              items: staffTypeOptions.map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
              onChanged: readOnly ? null : (val) => setState(() => _selectedStaffType = val),
              validator: (val) => val == null || val.isEmpty ? 'Required' : null,
            ),
            DropdownButtonFormField<String>(
              value: _selectedDesignation,
              decoration: const InputDecoration(labelText: 'Designation'),
              items: designationOptions.map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
              onChanged: readOnly ? null : (val) => setState(() => _selectedDesignation = val),
              validator: (val) => val == null || val.isEmpty ? 'Required' : null,
            ),
            DropdownButtonFormField<String>(
              value: _selectedGender,
              decoration: const InputDecoration(labelText: 'Gender'),
              items: genderOptions.map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
              onChanged: readOnly ? null : (val) => setState(() => _selectedGender = val),
            ),
            ListTile(
              title: Text(_dateOfJoining == null ? 'Select Date of Joining' : 'Date of Joining: ${_dateOfJoining!.day}/${_dateOfJoining!.month}/${_dateOfJoining!.year}'),
              trailing: const Icon(Icons.calendar_today),
              onTap: readOnly ? null : () async {
                final picked = await showDatePicker(
                  context: context,
                  initialDate: _dateOfJoining ?? DateTime.now(),
                  firstDate: DateTime(1950),
                  lastDate: DateTime(2100),
                );
                if (picked != null) setState(() => _dateOfJoining = picked);
              },
            ),
            ListTile(
              title: Text(_dobCertificate == null ? 'Select DOB (Certificate)' : 'DOB (Certificate): ${_dobCertificate!.day}/${_dobCertificate!.month}/${_dobCertificate!.year}'),
              trailing: const Icon(Icons.calendar_today),
              onTap: readOnly ? null : () async {
                final picked = await showDatePicker(
                  context: context,
                  initialDate: _dobCertificate ?? DateTime.now(),
                  firstDate: DateTime(1950),
                  lastDate: DateTime(2100),
                );
                if (picked != null) setState(() => _dobCertificate = picked);
              },
            ),
            if (!readOnly)
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  ElevatedButton(
                    onPressed: save,
                    child: Text(widget.isEdit ? 'Update' : 'Save'),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
} 