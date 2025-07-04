class Employee {
  String? id;
  String employeeName;
  String employeeCode;
  String headQtr;
  String stateName;
  String staffType;
  String designation;
  String divisionGroup;
  DateTime dateOfJoining;
  bool temporaryOrWaiting;
  String department;
  String panNo;
  String? addressLine1;
  String? addressLine2;
  String? addressLine3;
  String? addressLine4;
  String? city;
  String? pin;
  DateTime dobCertificate;
  DateTime? dobActual;
  DateTime? dateOfMarriage;
  DateTime? dateOfResignation;
  DateTime? dateOfStopTrans;
  String? gender;
  String? fatherOrSpouse;
  String? employeeCodeMachine;
  String? phone;
  String? mobile;
  String? email;
  String? aadharNo;
  String? phoneNoResi;
  String? otherEmail;
  String? payrollCompany;
  DateTime? doc;
  String? experience;
  String? maritalStatus;
  String? grade;
  String? permanentAddress;
  String? employeeState;
  String? qualification;
  String? metroNonMetro;
  String? bloodGroup;
  String? birthProof;
  String? expenseType;
  String? remark;
  String? image;

  Employee({
    this.id,
    required this.employeeName,
    required this.employeeCode,
    required this.headQtr,
    required this.stateName,
    required this.staffType,
    required this.designation,
    required this.divisionGroup,
    required this.dateOfJoining,
    this.temporaryOrWaiting = false,
    required this.department,
    required this.panNo,
    this.addressLine1,
    this.addressLine2,
    this.addressLine3,
    this.addressLine4,
    this.city,
    this.pin,
    required this.dobCertificate,
    this.dobActual,
    this.dateOfMarriage,
    this.dateOfResignation,
    this.dateOfStopTrans,
    this.gender,
    this.fatherOrSpouse,
    this.employeeCodeMachine,
    this.phone,
    this.mobile,
    this.email,
    this.aadharNo,
    this.phoneNoResi,
    this.otherEmail,
    this.payrollCompany,
    this.doc,
    this.experience,
    this.maritalStatus,
    this.grade,
    this.permanentAddress,
    this.employeeState,
    this.qualification,
    this.metroNonMetro,
    this.bloodGroup,
    this.birthProof,
    this.expenseType,
    this.remark,
    this.image,
  });

  factory Employee.fromJson(Map<String, dynamic> json) => Employee(
        id: json['_id'],
        employeeName: json['employeeName'],
        employeeCode: json['employeeCode'],
        headQtr: json['headQtr'],
        stateName: json['stateName'],
        staffType: json['staffType'],
        designation: json['designation'],
        divisionGroup: json['divisionGroup'],
        dateOfJoining: DateTime.parse(json['dateOfJoining']),
        temporaryOrWaiting: json['temporaryOrWaiting'] ?? false,
        department: json['department'],
        panNo: json['panNo'],
        addressLine1: json['addressLine1'],
        addressLine2: json['addressLine2'],
        addressLine3: json['addressLine3'],
        addressLine4: json['addressLine4'],
        city: json['city'],
        pin: json['pin'],
        dobCertificate: DateTime.parse(json['dobCertificate']),
        dobActual: json['dobActual'] != null ? DateTime.tryParse(json['dobActual']) : null,
        dateOfMarriage: json['dateOfMarriage'] != null ? DateTime.tryParse(json['dateOfMarriage']) : null,
        dateOfResignation: json['dateOfResignation'] != null ? DateTime.tryParse(json['dateOfResignation']) : null,
        dateOfStopTrans: json['dateOfStopTrans'] != null ? DateTime.tryParse(json['dateOfStopTrans']) : null,
        gender: json['gender'],
        fatherOrSpouse: json['fatherOrSpouse'],
        employeeCodeMachine: json['employeeCodeMachine'],
        phone: json['phone'],
        mobile: json['mobile'],
        email: json['email'],
        aadharNo: json['aadharNo'],
        phoneNoResi: json['phoneNoResi'],
        otherEmail: json['otherEmail'],
        payrollCompany: json['payrollCompany'],
        doc: json['doc'] != null ? DateTime.tryParse(json['doc']) : null,
        experience: json['experience'],
        maritalStatus: json['maritalStatus'],
        grade: json['grade'],
        permanentAddress: json['permanentAddress'],
        employeeState: json['employeeState'],
        qualification: json['qualification'],
        metroNonMetro: json['metroNonMetro'],
        bloodGroup: json['bloodGroup'],
        birthProof: json['birthProof'],
        expenseType: json['expenseType'],
        remark: json['remark'],
        image: json['image'],
      );

  Map<String, dynamic> toJson() => {
        if (id != null) '_id': id,
        'employeeName': employeeName,
        'employeeCode': employeeCode,
        'headQtr': headQtr,
        'stateName': stateName,
        'staffType': staffType,
        'designation': designation,
        'divisionGroup': divisionGroup,
        'dateOfJoining': dateOfJoining.toIso8601String(),
        'temporaryOrWaiting': temporaryOrWaiting,
        'department': department,
        'panNo': panNo,
        'addressLine1': addressLine1,
        'addressLine2': addressLine2,
        'addressLine3': addressLine3,
        'addressLine4': addressLine4,
        'city': city,
        'pin': pin,
        'dobCertificate': dobCertificate.toIso8601String(),
        'dobActual': dobActual?.toIso8601String(),
        'dateOfMarriage': dateOfMarriage?.toIso8601String(),
        'dateOfResignation': dateOfResignation?.toIso8601String(),
        'dateOfStopTrans': dateOfStopTrans?.toIso8601String(),
        'gender': gender,
        'fatherOrSpouse': fatherOrSpouse,
        'employeeCodeMachine': employeeCodeMachine,
        'phone': phone,
        'mobile': mobile,
        'email': email,
        'aadharNo': aadharNo,
        'phoneNoResi': phoneNoResi,
        'otherEmail': otherEmail,
        'payrollCompany': payrollCompany,
        'doc': doc?.toIso8601String(),
        'experience': experience,
        'maritalStatus': maritalStatus,
        'grade': grade,
        'permanentAddress': permanentAddress,
        'employeeState': employeeState,
        'qualification': qualification,
        'metroNonMetro': metroNonMetro,
        'bloodGroup': bloodGroup,
        'birthProof': birthProof,
        'expenseType': expenseType,
        'remark': remark,
        'image': image,
      };
} 