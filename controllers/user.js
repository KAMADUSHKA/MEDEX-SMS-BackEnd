// const User = require("../model/user");
// const Card = require("../model/cards");
// const tableData = require("../model/table");
// const { body, validationResult } = require("express-validator");
// const config = require("@adeona-tech/common").config;
// const jwt = require("jsonwebtoken");
// const admin = require("../model/user");

// const bcrypt = require("bcryptjs");
// const Employee = require("../model/Employee");
// const EmploymentTypeSeq = require("../model/EmploymentType");
// const DepartmentSeq = require("../model/Departments");
// const WorkingLocationsSeq = require("../model/WorkingLocation");
// const JobPositionSeq = require("../model/JobPosition");
// const DepartureEmployeeSeq = require("../model/DepartureEmployee");
// const SalarySeq = require("../model/Salary");
// const AllowanceSeq = require("../model/Allowance");
// require("dotenv").config();
// const expiresIn = process.env.expiresIn;

// exports.userLogin = async (req, res, next) => {
//   try {
//     const userTrue = await User.findOne({
//       where: { email: req.body.email },
//     });

//     if (!userTrue) throw Error("user not found");
//     if (bcrypt.compareSync(req.body.password, userTrue.dataValues.password)) {
//       const accountStatus = userTrue.dataValues.account_lock;

//       if (accountStatus == 0) {
//         const token = jwt.sign(
//           { email: req.body.email },
//           process.env.SECRET_KEY,
//           { expiresIn: expiresIn }
//         );

//         res.status(200).json({
//           status: "success",
//           comment: "user Login Authentication!",
//           token: token,
//           data: {
//             email: req.body.email,
//           },
//         });
//       } else {
//         const lockDurationTime = process.env.lockDurationTime;
//         const userUnlockTime = new Date(
//           userTrue.dataValues.locked_at.getTime() + lockDurationTime * 1000
//         );

//         const remaningTime = Math.ceil((userUnlockTime - Date.now()) / 1000);

//         if (remaningTime > 0) {
//           // true time
//           res.status(403).json({
//             status: "fail",
//             comment: "Now your account was locked!",
//             unlockTime: remaningTime,
//           });
//         } else {
//           // false user account lock time
//           await User.update(
//             {
//               account_lock: false,
//               locked_at: 0,
//               login_count: 0,
//             },
//             {
//               where: { email: req.body.email },
//             }
//           );
//           res.status(200).json({
//             status: "Success",
//             comment: "Now you can login your account, Try again!",
//           });
//         }
//       }
//     } else {
//       //wrong password and ++ counter
//       var counter = userTrue.dataValues.login_count;
//       counter++;
//       await User.update(
//         { login_count: counter }, // Update the login_count value
//         { where: { email: req.body.email } }
//       );

//       if (counter > 3) {
//         ///lock account more than conter 3
//         const lockDurationTime = process.env.lockDurationTime;
//         const lockedAt = new Date();
//         const unlockTime = new Date(
//           lockedAt.getTime() + lockDurationTime * 1000
//         );

//         await User.update(
//           {
//             account_lock: true,
//             locked_at: lockedAt,
//           },
//           {
//             where: { email: req.body.email },
//           }
//         );

//         res.status(401).json({
//           status: "fail",
//           comment: "Your account is Lock for 30 second",
//         });
//       } else {
//         res.status(401).json({
//           status: "fail",
//           comment:
//             "incorect your password try again and enter correct password",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "fail",
//       comment: "login fail!, enter correct email",
//       data: {
//         Error: error,
//       },
//     });
//   }
// };

// /// employee table create //

// exports.createEmployeData = async (req, res) => {
//   try {
//     console .log("backend respons check",req.body)
//     const EmpID = req.body.EmpID;
//     const FName = req.body.FName;
//     const LName = req.body.LName;
//     const HomeCnt = req.body.HomeCnt;
//     const PersonalCnt = req.body.PersonalCnt;
//     const Address = req.body.Address;
//     const WorkEmail = req.body.WorkEmail;
//     const NIC = req.body.NIC;
//     const JobPosition = req.body.JobPosition;
//     const EmploymentType = req.body.EmploymentType;
//     const EmpDate = req.body.EmpDate;
//     const FinalDate = req.body.FinalDate;
//     const Location = req.body.Location;
//     const Manager = req.body.Manager;
//     const WorkCnt = req.body.WorkCnt;

//     const newEmp = await Employee.create({
//       EmpID: EmpID,
//       FName: FName,
//       LName: LName,
//       HomeCnt: HomeCnt,
//       PersonalCnt: PersonalCnt,
//       Address: Address,
//       WorkEmail: WorkEmail,
//       NIC: NIC,
//       JobPosition: JobPosition,
//       EmploymentType: EmploymentType,
//       EmpDate: EmpDate,
//       FinalDate: FinalDate,
//       Location: Location,
//       Manager: Manager,
//       WorkCnt: WorkCnt,
//     });
//     res.status(200).json({
//       status: "successss",
//       comment: "Create new employee!",
//       data: newEmp,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       comment: "error of this",
//       data: {
//         Error: error,
//       },
//     });
//   }
// };

// exports.EmployeeData = async (req, res) => {
//   try {
//     const empDetailDB = await Employee.findAll();
//     res.status(200).json({
//       status: "success",
//       comment: "get all data",
//       data: { empDetailDB },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "fail",
//       comment: "have some error",
//       data: {
//         cardDetails:empDetailDB,
//         Error: error,
//       },
//     });
//   }
// };
// //             /// employee data delete

// exports.EmployeeDataDelete = async (req, res) => {
//   console.log("check request");
//   try {
//     const empID = req.body.EmpID;
//     console.log("table id is : ", empID);

//     const employeeInUpdateRow = await Employee.findOne({
//       where: { EmpID : empID },
//     });
//     // console.log("check row  : ", employmentTypeInUpdateRow )

//     if (employeeInUpdateRow == null) throw new Error("Invalid ID");

//     const deletedEmployee = await Employee.update(
//       {
//         delete_status: 1,
//       },
//       {
//         where: { EmpID : empID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data delete succesfully",
//       data: {
//         tableID: empID,
//         tableDataInUpdateRow: employeeInUpdateRow,
//         deletData: deletedEmployee,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data delete fail!",
//       Error: error,
//     });
//   }
// };
// //             /// employee data Update

// exports.EmployeeDataUpdate = async (req, res) => {
//   console.log("check request");
//   try {
//     const EmpID = req.body.EmpID;
//     const FName = req.body.FName;
//     const LName = req.body.LName;
//     const HomeCnt = req.body.HomeCnt;
//     const PersonalCnt = req.body.PersonalCnt;
//     const Address = req.body.Address;
//     const WorkEmail = req.body.WorkEmail;
//     const NIC = req.body.NIC;
//     const JobPosition = req.body.JobPosition;
//     const EmploymentType = req.body.EmploymentType;
//     const EmpDate = req.body.EmpDate;
//     const FinalDate = req.body.FinalDate;
//     const Location = req.body.Location;
//     const Manager = req.body.Manager;
//     const WorkCnt = req.body.WorkCnt;
//     console.log("table id is : ", EmpID);

//     const employeeInUpdateRow = await Employee.findOne({
//       where: { EmpID : EmpID },
//     });
//     // console.log("check row  : ", employmentTypeInUpdateRow )

//     if (employeeInUpdateRow == null) throw new Error("Invalid ID");

//     const updatedEmployee = await Employee.update(
//       {
//         FName: FName,
//         LName: LName,
//         HomeCnt: HomeCnt,
//         PersonalCnt: PersonalCnt,
//         Address: Address,
//         WorkEmail: WorkEmail,
//         NIC: NIC,
//         JobPosition: JobPosition,
//         EmploymentType: EmploymentType,
//         EmpDate: EmpDate,
//         FinalDate: FinalDate,
//         Location: Location,
//         Manager: Manager,
//         WorkCnt: WorkCnt,
//       },
//       {
//         where: { EmpID : EmpID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data delete succesfully",
//       data: {
//         tableID: EmpID,
//         tableDataInUpdateRow: employeeInUpdateRow,
//         deletData: updatedEmployee,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data delete fail!",
//       Error: error,
//     });
//   }
// };

// //// create employee type ///

// exports.createEmployeTypeData = async (req, res) => {
//   try {
//     console.log("req.body : ", req.body);
//     // const EmploymentTypeID = req.body.EmploymentTypeID;
//     const EmploymentType = req.body.EmploymentType;

//     const newEmpType = await EmploymentTypeSeq.create({
//       // EmploymentTypeID: EmploymentTypeID,
//       EmploymentType: EmploymentType,
//     });

//     res.status(200).json({
//       status: "success",
//       comment: "Hi from user login!",
//       data: newEmpType,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       comment: "error of this",
//       data: {
//         Error: error,
//       },
//     });
//   }
// };

// exports.EmploymentTypeData = async (req, res) => {
//   try {
//     const empTypeInDB = await EmploymentTypeSeq.findAll();
//     res.status(200).json({
//       status: "success",
//       comment: "get all data",
//       data: { empTypeInDB },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "fail",
//       comment: "have some error",
//       data: {
//         cardDetails: empTypeInDB,
//         Error: error,
//       },
//     });
//   }
// };

// //             /// employment type data delete

// exports.EmployeTypeDataDelete = async (req, res) => {
//   console.log("check request");
//   try {
//     const employmentTypeID = req.body.EmploymentTypeID;
//     console.log("table id is : ", employmentTypeID);

//     const employmentTypeInUpdateRow = await EmploymentTypeSeq.findOne({
//       where: { EmploymentTypeID: employmentTypeID },
//     });
//     // console.log("check row  : ", employmentTypeInUpdateRow )

//     if (employmentTypeInUpdateRow == null) throw new Error("Invalid ID");

//     const deletedEmploymentType = await EmploymentTypeSeq.update(
//       {
//         delete_status: 1,
//       },
//       {
//         where: { EmploymentTypeID: employmentTypeID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data delete succesfully",
//       data: {
//         tableID: employmentTypeTableID,
//         tableDataInUpdateRow: employmentTypeInUpdateRow,
//         deletData: deletedEmploymentType,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data delete fail!",
//       Error: error,
//     });
//   }
// };
// //          ///Update employment type

// exports.EmploymentTypeDataUpdate = async (req, res) => {
//   try {
//     console.log("check for request");
//     // const EmploymentTypeID = req.body.EmploymentTypeID;
//     const EmploymentType = req.body.EmploymentType;

//     const EmploymentTypeID = req.body.EmploymentTypeID;

//     const employmentTypeInUpdateRow = await EmploymentTypeSeq.findOne({
//       where: { EmploymentTypeID: EmploymentTypeID },
//     });
//     console.log(
//       "check 02 : ",
//       EmploymentTypeID,
//       EmploymentType,
//       EmploymentTypeID
//     );

//     if (employmentTypeInUpdateRow == null) throw new Error("Invalid tableID");
//     /// update quary
//     const updatedEmploymentTypeData = await EmploymentTypeSeq.update(
//       {
//         // EmploymentTypeID: EmploymentTypeID,
//         EmploymentType: EmploymentType,
//       },
//       {
//         where: { EmploymentTypeID: EmploymentTypeID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data find succesfully",
//       data: {
//         ID: EmploymentTypeID,
//         tableDataInUpdateRow: employmentTypeInUpdateRow,
//         updatedTableDataRow: updatedEmploymentTypeData,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data find fail!",
//       Error: error,
//     });
//   }
// };

// //// create employee department///

// exports.createDepartmentData = async (req, res) => {
//   try {
//     // const departmentID = req.body.departmentID;
//     const department = req.body.department;

//     const newdepartment = await DepartmentSeq.create({
//       // departmentID: departmentID,
//       department: department,
//     });

//     res.status(200).json({
//       status: "success",
//       comment: "Hi from user login!",
//       data: newdepartment,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       comment: "error of this",
//       data: {
//         Error: error,
//       },
//     });
//   }
// };

// exports.DepartmentData = async (req, res) => {
//   try {
//     const empDepartmentInDB = await DepartmentSeq.findAll();
//     res.status(200).json({
//       status: "success",
//       comment: "get all data",
//       data: { empDepartmentInDB },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "fail",
//       comment: "have some error",
//       data: {
//         cardDetails: empDepartmentInDB,
//         Error: error,
//       },
//     });
//   }
// };

// //                        /// department data delete

// exports.DepartmentDataDelete = async (req, res) => {
//   console.log("check request");
//   try {
//     const departmentID = req.body.departmentID;
//     console.log("table id is : ", departmentID);

//     const departmentInUpdateRow = await DepartmentSeq.findOne({
//       where: { departmentID: departmentID },
//     });
//     // console.log("check row  : ", employmentTypeInUpdateRow )

//     if (departmentInUpdateRow == null) throw new Error("Invalid ID");

//     const deletedDepartment = await DepartmentSeq.update(
//       {
//         delete_status: 1,
//       },
//       {
//         where: { departmentID: departmentID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data delete succesfully",
//       data: {
//         tableID: departmentID,
//         tableDataInUpdateRow: departmentInUpdateRow,
//         deletData: deletedDepartment,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data delete fail!",
//       Error: error,
//     });
//   }
// };
// //          ///Update department

// exports.DepartmentDataUpdate = async (req, res) => {
//   try {
//     console.log("check for request");
//     // const departmentID = req.body.departmentID;
//     const department = req.body.department;

//     const departmentID = req.body.departmentID;

//     const departmentInUpdateRow = await DepartmentSeq.findOne({
//       where: { departmentID: departmentID },
//     });
//     console.log("check 02 : ", departmentID, department, departmentID);

//     if (departmentInUpdateRow == null) throw new Error("Invalid tableID");
//     /// update quary
//     const updatedDepartmentData = await DepartmentSeq.update(
//       {
//         // departmentID: departmentID,
//         department: department,
//       },
//       {
//         where: { departmentID: departmentID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data find succesfully",
//       data: {
//         ID: departmentID,
//         tableDataInUpdateRow: departmentInUpdateRow,
//         updatedTableDataRow: updatedDepartmentData,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data find fail!",
//       Error: error,
//     });
//   }
// };

// //// create employee work location///

// exports.createWorkingLocationData = async (req, res) => {
//   try {
//     // const workingLocationID = req.body.workingLocationID;
//     const workingLocation = req.body.workingLocation;

//     const newWorkingLocation = await WorkingLocationsSeq.create({
//       // workingLocationID: workingLocationID,
//       workingLocation: workingLocation,
//     });

//     res.status(200).json({
//       status: "success",
//       comment: "Hi from user login!",
//       data: newWorkingLocation,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       comment: "error of this",
//       data: {
//         Error: error,
//       },
//     });
//   }
// };

// exports.WorkingLocationData = async (req, res) => {
//   try {
//     const empWorkingLocationInDB = await WorkingLocationsSeq.findAll();
//     res.status(200).json({
//       status: "success",
//       comment: "get all data",
//       data: { empWorkingLocationInDB },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "fail",
//       comment: "have some error",
//       data: {
//         cardDetails: empWorkingLocationInDB,
//         Error: error,
//       },
//     });
//   }
// };

// //                        /// worck location data delete

// exports.WorkLocationDataDelete = async (req, res) => {
//   console.log("check request");
//   try {
//     const workingLocationID = req.body.workingLocationID;
//     console.log("table id is : ", workingLocationID);

//     const workingLocationInUpdateRow = await WorkingLocationsSeq.findOne({
//       where: { workingLocationID: workingLocationID },
//     });
//     // console.log("check row  : ", employmentTypeInUpdateRow )

//     if (workingLocationInUpdateRow == null) throw new Error("Invalid ID");

//     const deletedWorkLocation = await WorkingLocationsSeq.update(
//       {
//         delete_status: 1,
//       },
//       {
//         where: { workingLocationID: workingLocationID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data delete succesfully",
//       data: {
//         tableID: workingLocationID,
//         tableDataInUpdateRow: workingLocationInUpdateRow,
//         deletData: deletedWorkLocation,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data delete fail!",
//       Error: error,
//     });
//   }
// };

// //          ///Update work location

// exports.WorkLocationDataUpdate = async (req, res) => {
//   try {
//     console.log("check for request");
//     // const workingLocationID = req.body.workingLocationID;
//     const workingLocation = req.body.workingLocation;

//     const workingLocationID = req.body.workingLocationID;

//     const workingLocationInUpdateRow = await WorkingLocationsSeq.findOne({
//       where: { workingLocationID: workingLocationID },
//     });
//     console.log(
//       "check 02 : ",
//       workingLocationID,
//       workingLocation,
//       workingLocationID
//     );

//     if (workingLocationInUpdateRow == null) throw new Error("Invalid tableID");
//     /// update quary
//     const updatedWorkLocationData = await WorkingLocationsSeq.update(
//       {
//         // workingLocationID: workingLocationID,
//         workingLocation: workingLocation,
//       },
//       {
//         where: { workingLocationID: workingLocationID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data find succesfully",
//       data: {
//         ID: workingLocationID,
//         tableDataInUpdateRow: workingLocationInUpdateRow,
//         updatedTableDataRow: updatedWorkLocationData,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data find fail!",
//       Error: error,
//     });
//   }
// };

// //// create employee Job Position///

// exports.createJobPositionData = async (req, res) => {
//   try {
//     // const JobPositionID = req.body.JobPositionID;
//     const JobTitle = req.body.JobTitle;
//     const DepartmentName = req.body.DepartmentName;
//     const NumberOfEmployees = req.body.NumberOfEmployees;
//     const Reporting = req.body.Reporting;

//     const newJobPosition = await JobPositionSeq.create({
//       // JobPositionID: JobPositionID,
//       JobTitle: JobTitle,
//       DepartmentName: DepartmentName,
//       NumberOfEmployees: NumberOfEmployees,
//       Reporting: Reporting,
//     });

//     res.status(200).json({
//       status: "success",
//       comment: "Hi from user login!",
//       data: newJobPosition,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       comment: "error of this",
//       data: {
//         Error: error,
//       },
//     });
//   }
// };

// exports.JobPositionData = async (req, res) => {
//   try {
//     const empJobPositionInDB = await JobPositionSeq.findAll();
//     res.status(200).json({
//       status: "success",
//       comment: "get all data",
//       data: { empJobPositionInDB },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "fail",
//       comment: "have some error",
//       data: {
//         cardDetails: empJobPositionInDB,
//         Error: error,
//       },
//     });
//   }
// };

// //                        ///job position data delete

// exports.JobPositionDataDelete = async (req, res) => {
//   console.log("check request");
//   try {
//     const JobPositionID = req.body.JobPositionID;
//     console.log("table id is : ", JobPositionID);

//     const JobPositionInUpdateRow = await JobPositionSeq.findOne({
//       where: { JobPositionID: JobPositionID },
//     });
//     // console.log("check row  : ", employmentTypeInUpdateRow )

//     if (JobPositionInUpdateRow == null) throw new Error("Invalid ID");

//     const deletedJobPosition = await JobPositionSeq.update(
//       {
//         delete_status: 1,
//       },
//       {
//         where: { JobPositionID: JobPositionID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data delete succesfully",
//       data: {
//         tableID: JobPositionID,
//         tableDataInUpdateRow: JobPositionInUpdateRow,
//         deletData: deletedJobPosition,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data delete fail!",
//       Error: error,
//     });
//   }
// };
// //          ///Update job position

// exports.JobPositionDataUpdate = async (req, res) => {
//   try {
//     console.log("check for request");
//     // const JobPositionID = req.body.JobPositionID;
//     const JobTitle = req.body.JobTitle;
//     const DepartmentName = req.body.DepartmentName;
//     const NumberOfEmployees = req.body.NumberOfEmployees;
//     const Reporting = req.body.Reporting;

//     const JobPositionID = req.body.JobPositionID;

//     const JobPositionInUpdateRow = await JobPositionSeq.findOne({
//       where: { JobPositionID: JobPositionID },
//     });

//     if (JobPositionInUpdateRow == null) throw new Error("Invalid tableID");
//     /// update quary
//     const updatedJobPositionData = await JobPositionSeq.update(
//       {
//         // JobPositionID: JobPositionID,
//         JobTitle: JobTitle,
//         DepartmentName: DepartmentName,
//         NumberOfEmployees: NumberOfEmployees,
//         Reporting: Reporting,
//       },
//       {
//         where: { JobPositionID: JobPositionID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data find succesfully",
//       data: {
//         ID: JobPositionID,
//         tableDataInUpdateRow: JobPositionInUpdateRow,
//         updatedTableDataRow: updatedJobPositionData,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data find fail!",
//       Error: error,
//     });
//   }
// };

// //// create departure employee///

// exports.createDepartureEmployeeData = async (req, res) => {
//   try {
//     // const EmpID = req.body.EmpID;
//     const DepartureReason = req.body.DepartureReason;

//     const newDepartureEmployee = await DepartureEmployeeSeq.create({
//       // EmpID: EmpID,
//       DepartureReason: DepartureReason,
//     });

//     res.status(200).json({
//       status: "success",
//       comment: "Hi from user login!",
//       data: newDepartureEmployee,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       comment: "error of this",
//       data: {
//         Error: error,
//       },
//     });
//   }
// };

// exports.DepartureEmployeeData = async (req, res) => {
//   try {
//     const departureEmployeeInDB = await DepartureEmployeeSeq.findAll();
//     res.status(200).json({
//       status: "success",
//       comment: "get all data",
//       data: { departureEmployeeInDB },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "fail",
//       comment: "have some error",
//       data: {
//         cardDetails: departureEmployeeInDB,
//         Error: error,
//       },
//     });
//   }
// };

// //                        /// departur reson data delete

// exports.DepartureReasonDataDelete = async (req, res) => {
//   console.log("check request");
//   try {
//     const DepartureReasonID = req.body.DepartureReasonID;
//     console.log("table id is : ", DepartureReasonID);

//     const DepartureReasonInUpdateRow = await DepartureEmployeeSeq.findOne({
//       where: { DepartureReasonID: DepartureReasonID },
//     });

//     if (DepartureReasonInUpdateRow == null) throw new Error("Invalid ID");

//     const deletedDepartureReason = await DepartureEmployeeSeq.update(
//       {
//         delete_status: 1,
//       },
//       {
//         where: { DepartureReasonID: DepartureReasonID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data delete succesfully",
//       data: {
//         tableID: DepartureReasonID,
//         tableDataInUpdateRow: DepartureReasonInUpdateRow,
//         deletData: deletedDepartureReason,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data delete fail!",
//       Error: error,
//     });
//   }
// };
// //          ///Update departure

// exports.DepartureReasonDataUpdate = async (req, res) => {
//   try {
//     console.log("check for request");
//     // const EmpID = req.body.EmpID;
//     const DepartureReason = req.body.DepartureReason;

//     const DepartureReasonID = req.body.DepartureReasonID;

//     const DepartureDataInUpdateRow = await DepartureEmployeeSeq.findOne({
//       where: { DepartureReasonID: DepartureReasonID },
//     });

//     if (DepartureDataInUpdateRow == null) throw new Error("Invalid tableID");
//     /// update quary
//     const updatedDepartureData = await DepartureEmployeeSeq.update(
//       {
//         // EmpID: EmpID,
//         DepartureReason: DepartureReason,
//       },
//       {
//         where: { DepartureReasonID: DepartureReasonID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data find succesfully",
//       data: {
//         ID: DepartureReasonID,
//         tableDataInUpdateRow: DepartureDataInUpdateRow,
//         updatedTableDataRow: updatedDepartureData,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data find fail!",
//       Error: error,
//     });
//   }
// };

// //// create employee salary ////

// exports.createSalaryData = async (req, res) => {
//   try {
//     const EmpID = req.body.EmpID;
//     const EmpName = req.body.EmpName;
//     const BasicSalary = Number(req.body.BasicSalary);
//     const allEmpAllowance = req.body.allEmpAllowance;

//     let sumOfAllowance = 0;

//     for (i = 0; i < allEmpAllowance.length; i++) {
//       const allowanceId = allEmpAllowance[i];
//       console.log("aaaaaaaaaa", allowanceId);

//       const allowanceInDB = await AllowanceSeq.findOne({
//         where: { AllowanceID: allowanceId },
//       });
//       const allowanceAmountInDB = allowanceInDB.AllowanceAmount;
//       console.log("amaunt", allowanceAmountInDB);

//       sumOfAllowance += allowanceAmountInDB;
//     }
//     console.log("amaunt sum", sumOfAllowance);

//     const totalSalary = BasicSalary + sumOfAllowance

//     const newSalary = await SalarySeq.create({
//       // AllowanceID: AllowanceID,
//       EmpID : EmpID,
//       EmpName: EmpName,
//       BasicSalary : BasicSalary,
//       TotalAllowance: sumOfAllowance,
//       TotalSalary: totalSalary
//     });

//     res.status(200).json({
//       status: "success",
//       comment: "Hi from user login!",
//       data: newSalary,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       comment: "error of this",
//       data: {
//         Error: error,
//       },
//     });
//   }
// };

// exports.SalaryData = async (req, res) => {
//   try {
//     const SalaryInDB = await SalarySeq.findAll();
//     res.status(200).json({
//       status: "success",
//       comment: "get all data",
//       data: { SalaryInDB },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "fail",
//       comment: "have some error",
//       data: {
//         cardDetails: SalaryInDB,
//         Error: error,
//       },
//     });
//   }
// };
// //                        /// employe salary data delete

// exports.SalaryDataDelete = async (req, res) => {
//   console.log("check request");
//   try {
//     const EmpID = req.body.EmpID;
//     console.log("table id is : ", EmpID);

//     const SalaryInUpdateRow = await SalarySeq.findOne({
//       where: { EmpID: EmpID },
//     });

//     if (SalaryInUpdateRow == null) throw new Error("Invalid ID");

//     const deletedSalary = await SalaryInUpdateRow.update(
//       {
//         delete_status: 1,
//       },
//       {
//         where: { EmpID: EmpID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data delete succesfully",
//       data: {
//         tableID: EmpID,
//         tableDataInUpdateRow: SalaryInUpdateRow,
//         deletData: deletedSalary,

//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data delete fail!",
//       Error: error,
//     });
//   }
// };
// //          ///Update employ salary
// exports.SalaryDataUpdate = async (req, res) => {
//   try {
//     const EmpID = req.body.EmpID;
//     const EmpName = req.body.EmpName;
//     const BasicSalary = Number(req.body.BasicSalary);
//     const allEmpAllowance = req.body.allEmpAllowance;

//     const AllowanceDataInUpdateRow = await SalarySeq.findOne({
//       where: { EmpID: EmpID },
//     });

//     let sumOfAllowance = 0;

//     for (i = 0; i < allEmpAllowance.length; i++) {
//       const allowanceId = allEmpAllowance[i];
//       console.log("aaaaaaaaaa", allowanceId);

//       const allowanceInDB = await AllowanceSeq.findOne({
//         where: { AllowanceID: allowanceId },
//       });
//       const allowanceAmountInDB = allowanceInDB.AllowanceAmount;
//       console.log("amaunt", allowanceAmountInDB);

//       sumOfAllowance += allowanceAmountInDB;
//     }
//     console.log("amaunt sum", sumOfAllowance);

//     const totalSalary = BasicSalary + sumOfAllowance

//     // const newSalary = await SalarySeq.create({
//     //   // AllowanceID: AllowanceID,
//     //   EmpID : EmpID,
//     //   EmpName: EmpName,
//     //   BasicSalary : BasicSalary,
//     //   TotalAllowance: sumOfAllowance,
//     //   TotalSalary: totalSalary
//     // });

//     const updatedSalary = await SalarySeq.update(
//       {

//         EmpName: EmpName,
//         BasicSalary : BasicSalary,
//         TotalAllowance: sumOfAllowance,
//         TotalSalary: totalSalary
//       },
//       {
//         where: { EmpID: EmpID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data find succesfully",
//       data: {
//         ID: EmpID,
//         tableDataInUpdateRow: AllowanceDataInUpdateRow,
//         updatedTableDataRow: updatedSalary,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data find fail!",
//       Error: error,
//     });
//   }
// };

// //// create Allewance ////

// exports.createAllowanceData = async (req, res) => {
//   try {
//     // const AllowanceID = req.body.AllowanceID;
//     const AllowanceName = req.body.AllowanceName;
//     const AllowanceAmount = req.body.AllowanceAmount;

//     const newAllowance = await AllowanceSeq.create({
//       // AllowanceID: AllowanceID,
//       AllowanceName: AllowanceName,
//       AllowanceAmount: AllowanceAmount,
//     });

//     res.status(200).json({
//       status: "success",
//       comment: "Create newq allowance!",
//       data: newAllowance,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       comment: "error of this",
//       data: {
//         Error: error,
//       },
//     });
//   }
// };

// exports.AllowanceData = async (req, res) => {
//   try {
//     const AllowanceInDB = await AllowanceSeq.findAll();
//     res.status(200).json({
//       status: "success",
//       comment: "get all data",
//       data: { AllowanceInDB },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "fail",
//       comment: "have some error",
//       data: {
//         cardDetails: AllowanceInDB,
//         Error: error,
//       },
//     });
//   }
// };
// //                        /// Allowance data delete

// exports.AllowanceDataDelete = async (req, res) => {
//   console.log("check request");
//   try {
//     const AllowanceID = req.body.AllowanceID;
//     console.log("table id is : ", AllowanceID);

//     const AllowanceInUpdateRow = await AllowanceSeq.findOne({
//       where: { AllowanceID: AllowanceID },
//     });

//     if (AllowanceInUpdateRow == null) throw new Error("Invalid ID");

//     const deletedAllowance = await AllowanceSeq.update(
//       {
//         delete_status: 1,
//       },
//       {
//         where: { AllowanceID: AllowanceID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data delete succesfully",
//       data: {
//         tableID: AllowanceID,
//         tableDataInUpdateRow: AllowanceInUpdateRow,
//         deletData: deletedAllowance,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data delete fail!",
//       Error: error,
//     });
//   }
// };

// //          ///Update allowance

// exports.AllowanceDataUpdate = async (req, res) => {
//   try {
//     // const AllowanceID = req.body.AllowanceID;
//     const AllowanceName = req.body.AllowanceName;
//     const AllowanceAmount = req.body.AllowanceAmount;
//     const AllowanceID = req.body.AllowanceID;

//     const AllowanceDataInUpdateRow = await AllowanceSeq.findOne({
//       where: { AllowanceID: AllowanceID },
//     });

//     if (AllowanceDataInUpdateRow == null) throw new Error("Invalid tableID");
//     /// update quary
//     const updatedAllowanceData = await AllowanceSeq.update(
//       {
//         // AllowanceID: AllowanceID,
//         AllowanceName: AllowanceName,
//         AllowanceAmount: AllowanceAmount,
//       },
//       {
//         where: { AllowanceID: AllowanceID },
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       comment: "table data find succesfully",
//       data: {
//         ID: AllowanceID,
//         tableDataInUpdateRow: AllowanceDataInUpdateRow,
//         updatedTableDataRow: updatedAllowanceData,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data find fail!",
//       Error: error,
//     });
//   }
// };

// /// get data salary slip one data

// exports.SalarySlipOneData = async (req, res) => {
//   console.log("check request");
//   try {
//     const EmpID = req.query.EmpID;
//     console.log("table id is : ", EmpID);

//     const EmpIDInSalaryRow = await SalarySeq.findOne({
//       where: { EmpID: EmpID },
//     });

//     const EmpIDInEmployeeRow = await  Employee.findOne({
//       where: { EmpID: EmpID },
//     });

//     if (EmpIDInSalaryRow == null) throw new Error("Invalid ID");
//     if (EmpIDInEmployeeRow == null) throw new Error("Invalid ID");

//     const combinedObject = { ...EmpIDInSalaryRow.dataValues, ...EmpIDInEmployeeRow.dataValues };

//     res.status(200).json({
//       status: "success",
//       comment: "slip one data colect",
//       data: {
//         // tableID: EmpID,
//         // tableDataInSalary: EmpIDInSalaryRow,
//         // tableDataInEmployee: EmpIDInEmployeeRow,
//         dataSet: combinedObject

//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data collect fail!",
//       Error: error,
//     });
//   }
// };

// /// get data salary slip two data

// exports.SalarySlipTwoData = async (req, res) => {
//   console.log("check request");
//   try {
//     const EmpID = req.query.EmpID;
//     console.log("table id is : ", EmpID);

//     const EmpIDInSalaryRow = await SalarySeq.findOne({
//       where: { EmpID: EmpID },
//     });

//     const EmpIDInEmployeeRow = await  Employee.findOne({
//       where: { EmpID: EmpID },
//     });

//     if (EmpIDInSalaryRow == null) throw new Error("Invalid ID");
//     if (EmpIDInEmployeeRow == null) throw new Error("Invalid ID");

//     const combinedObject = { ...EmpIDInSalaryRow.dataValues, ...EmpIDInEmployeeRow.dataValues };

//     res.status(200).json({
//       status: "success",
//       comment: "table data collect succesfully",
//       data: {
//         // tableID: EmpID,
//         // tableDataInSalary: EmpIDInSalaryRow,
//         // tableDataInEmployee: EmpIDInEmployeeRow,
//         dataSet: combinedObject

//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       comment: "table data collect fail!",
//       Error: error,
//     });
//   }
// };
