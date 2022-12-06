server.js should be run
port 8080


//Staff Members

Functionality: login Route: staffMember/login body:{email,password} Request type: POST Response: TOKEN

Functionality: logout headers: token Route: staffMember/logout Request type: GET

Functionality: view my profile Route: staffMember/viewMyProfile headers: token Request type: GET Response: {id,name,email,salary}

Functionality: reset password Route: staffMember/resetPassword headers: token body:{old_password, password, password_confirmation} Request type: POST

Functionality: update my profile Route: staffMember/updateProfile headers: token body:{email, salary (hr only) } Request type: PUT

Functionality: sign in, simulates entering campus Route: staffMember/signin headers: token Request type: GET

Functionality: sign out, simulates exiting campus Route: staffMember/signout headers: token Request type: GET

Functionality: view attendance records Route: staffMember/viewAttendance headers: token body:{month(1-12), year (<0) } Request type: POST Response: all sign ins and sign outs done by the user in a specific month and year

Functionality: view missing days Route: staffMember/viewMissingDays headers: token Request type: GET Response: array of dates of missing days

Functionality: view if missing or extra hours Route: staffMember/viewHours headers: token Request type: GET Response: you attended hh:mm:ss out of hh::mm:ss

//HR Members

Functionality: Add a location
Route: localhost:8080/hrMember/AddLocation
Request type: Post
Request body: 
{
	"name":"C7-100", 
	"loc_type":"Lab",
	"max_capacity":20,
	"current_capacity":10
}
Responce:'A new Room has been Added'


Functionality: update a location
Route:localhost:8080/hrMember/updateLocation
Request type: Post
Request body: //loc_type is changing the type of location wether its a Hall or Office or Tutorial or Lab
{
	"name":"C7-100", 
	"newname":"C7-101",
	"loc_type":"Lab"
}   
Responce:'The room has been updated'

Functionality: Delete a location
Route: localhost:8080/hrMember/DeleteLocation
Request type: Delete
Request body: 	{"name":"C7-101"}
Responce:'The Location has been deleted'


Functionality: Add a faculty
Route: localhost:8080/hrMember/AddFaculty
Request type: POST
Request body: {"name":"Engineering"}
Responce:'New faculty has been added'


Functionality: Update a faculty
Route: localhost:8080/hrMember/updatefaculty
Request type: POST
Request body: {"name":"Engineering","newname":"Business"}
Responce:'This faculty has been updated'

Functionality: Delete a faculty
Route: localhost:8080/hrMember/DeleteFaculty
Request type: Delete
Request body:{"name":"Business"}
// If department has this faculty id , it will be set by null in the department database
Responce:'This faculty has been deleted'

Functionality: Add a Department
Route:localhost:8080/hrMember/Faculty/AddDepartment
Request type: POST
Request body: {
"name":"Mechatronics",
"faculty_id":"5fe534c68c1d974ad8e365f3",
"hod_id":"5fe39520a17ab812efa5a9b3"
}
// this Academic member role is updated to HOD when the hod_id is assigned to this member.
Responce:'New Department has been added'

Functionality: Update a Department
Route:localhost:8080/hrMember/Faculty/UpdateDepartment
Request type: POST
Request body: {"id":"5fe5c2c1ca8e8b4444d1df53"
	,"name":"IET"
}
or

{"id":"5fe5c2c1ca8e8b4444d1df53"
	,"faculty_id":"5fe534c68c1d974ad8e365f3"
}// this will switch to business faculty in the database

or
{"id":"5fe5c2c1ca8e8b4444d1df53"
	,"hod_id":""
}
//ID is the department id you want to update and name is the new name
// you can choose to update name or faculty id .
Response:'The name has been updated'

Functionality: Delete a Department
Route:localhost:8080/hrMember/Faculty/DeleteDepartment
Request type: Delete 
Request body: token
Responce:'This Department has been deleted'


Functionality: Add a Course
Route:localhost:8080/hrMember/Faculty/Department/AddCourse
Request type: post 
Request body: {
	"name":"Physics", 
	"department_id":"5fe5c2c1ca8e8b4444d1df53", 
	"course_coordinator_id":"5fdfb1ea740d3023c433f877"
} // if academic member role is not CC(course coordinator) , it will display this course coordinator is not found
Responce:The course has been added
//NOTE: sometimes it doesnot work and requires us to drop the collection from mongoose then re-add (error returned is duplicate key related)

Functionality: update a Course
Route:localhost:8080/hrMember/Faculty/Department/UpdateCourse
Request type: post
Request body:
// When Academic member is assigned to Course coordinator in the course schema , it will automaticcaly make his role in academic member as a (course coordinator)

// it can update name or Course cordinator id or department id 
 {"id":"5fe5ccc2c22b333e5467282d", "name":"Math"}
 or
 {"id":"5fe5ccc2c22b333e5467282d", "department_id":"5fe5c2c1ca8e8b4444d1df53"}
or
{"id":"5fe5ccc2c22b333e5467282d", "course_coordinator_id":"5fe395e97df8a4135bcea6f6"}
Responce:'The name is updated' //if its name
'The course coordinator has been updated' //if it course coordinator id
'The department id has been updated' // if department id has been updated

Functionality: Delete a Course
Route:localhost:8080/hrMember/Faculty/Department/DeleteCourse
Request type: Delete 
Request body: {"name":"Physics"}
// once the course has been deleted , it will let course_id in slots schema empty
Responce:'The course has been deleted'

Functionality: add user to the system by hr Route: hrMember/addUser headers: token body: {name,email,gender,role, salary, day_off, location_id} Request type: POST

Functionality: add signin record by hr Route: hrMember/addSignin headers: token body: {id} Request type: POST

Functionality: add signout record by hr Route: hrMember/addSignout headers: token body: {id} Request type: POST

Functionality: update a user
Route:localhost:8080/hrMember/User/UpdateUser
Request type: post
Request body: 
// you can update mail or name or offic location
{
	"id":"ac-4",
	"email":"mo@gmail.com"
}
// once the course has been deleted , it will let course_id in slots schema empty
{
	"id":"ac-4",
	"office_loc":"5fe5fe5133aa3e2fe89c5149"
}
// The old location gets decremented and the new one gets incremented
// Its will not be updated unless its a location of type office


//to update name
{
	
	"id":"ac-4",
	"name":"Hassan"

}

Responce:email has been updated // if its email update
This location is not an office  //if it is name update
he name has been updated //if it is name

Functionality: Delete a user
Route:localhost:8080/hrMember/DeleteUser
Request type: Delete 
Request body: {"id":"ac-4"} or {"id":"hr-,
// once the course has been deleted , it will let course_id in slots schema empty
Reesponce: 'The Academic Member has been deleted' // if it is academic member
'The HR Member has been deleted' // if it is HR member


Functionality: view attendance record
Route: localhost:8080/hrMember/ViewAttendenceRecord
Request type: post
Request body: {"id":"ac-4"} or {"id":"hr-6"}
Responce: tottal hours attended as an output


Functionality: View staff members with missing days
Route: localhost:8080/hrMember//view_missingdays
Request type: post
Request body: {"id":"ac-4"} or {"id":"hr-6"}
Response: Array of missing days

Functionality: View staff members with missing hours
Route: localhost:8080/hrMember/view_missinghours
Request type: post
Request body: {"id":"ac-4"} or {"id":"hr-6"}
Response: Array of missing hours

Functionality: Update the salary of a staff member
Route: localhost:8080/hrMember/User/UpdateSalary
Request type: post
Request body: {"id":"ac-5","salary":5000} or {"id":"hr-5","salary":5000}
Response:'The salary has been updated for HR member' //when its HR ,
'The salary has been updated for Academic member' //when its academic member


//Course Instructors

Functionality: view the coverage of the courses this instructor is assigned to. Route: localhost:8080/courseInstructor/viewCourseCoverage Request type: POST Request header: token Request body: { "academicMemberID":"ac44", "status":"assigned" } Response: number (the coverage)

Functionality: view the slots this instructor is assigned to. Route: localhost:8080/courseInstructor/viewSlotsAssignment Request type: POST Request header: token Request body: { "id":"ac4" } Response: Array of slots

Functionality: view all the staff in this instructor's course. Route: localhost:8080/courseInstructor/viewAllStaff Request type: POST Request header: token Request body: { "courseName":"cms" } Response: Array of academic members assigned ti the same course

Functionality: assign an academic member to unassigned slots. Route: localhost:8080/courseInstructor/assignInstructorToSlot Request type: POST Request header: token Request body: { "id": "ac4", "courseName":"mecha" } Response: { "msg": "Instructor has been assigned to this slot successfully" }

Functionality: update the assignment of an academic member. Route: localhost:8080/courseInstructor/updateAnAssignment Request type: POST Request header: token Request body: { "id": "ac4", "courseName":"mecha" } Response:{ "msg": "Role is updated successfully" }

Functionality: remove an assigned academic member from his/her courses. Route: localhost:8080/courseInstructor/removeAnAssignedMember Request type: DELETE Request header: token Request body: {"id":"abc"} Response: { "msg": "This member has been removed" }

Functionality: assign an academic member to be a course coordinator. Route: localhost:8080/courseInstructor/academicMemberToCourseCoordinator Request type: POST Request header: token Request body: { "id":"ac-4" } Response: { "msg": "This member has been assigned to be a course coordinator" }

//HEAD OF DEPARTMENT

Functionality: assign a course instructor for each course in his department.
Route: /headOfDepartment/assignInst
Request type: POST
Request body: {"course_name": "csen701", "id": "ac-1"}
Response: {"_id": "5fe2499250", "name": "csen701", "department_id": "5fddfd65450", 
	"instructors": [{"password": "123456", "sign_in": [], "sign_out": [], "annual_leave_balance": 2.5, 
	"accidential_leave_balance": 6, "total_hours_attended": 0, "missing_days": [], "_id": "5fdfb1ea740d3023c433f877", "id": "ac-1",
	"name": "Mohamed", "email": "mohame12amh.com", "salary": 1, "office_loc": "c7-645", "day_off": "Saturday",
        "schedule": [], "__v": 0}], "slots": ["29439edd3", "33939didkd", "3iedjdnm3"], "__v": 0, "course_coordinator_id": "123"}


Functionality: delete a course instructor for each course in his department.
Route: /headOfDepartment/unassignInst
Request type: POST
Request body: {"course_name": "csen701", "id": "ac-1"}
Response: {"_id": "5fe2499250", "name": "csen701", "department_id": "5fddfd65450", 
	"instructors": [{"password": "123456", "sign_in": [], "sign_out": [], "annual_leave_balance": 2.5, 
	"accidential_leave_balance": 6, "total_hours_attended": 0, "missing_days": [], "_id": "5fdfb1ea740d3023c433f877", "id": "ac4",
	"name": "Mohamed", "email": "mohame12amh.com", "salary": 1, "office_loc": "c7-645", "day_off": "Saturday",
        "schedule": [], "__v": 0}], "slots": ["29439edd3", "33939didkd", "3iedjdnm3"], "__v": 0, "course_coordinator_id": "123"}


Functionality: update a course instructor for each course in his department.
Route: /headOfDepartment/reassignInst
Request type: POST
Request body: {"course_name_remove": "csen701", "course_name_add": "csen702", "id": "ac-1"}
Response: {"course_remove": course1, "course_add": course2}. 
	Example of a course: {"_id": "5fe2499250", "name": "csen701", "department_id": "5fddfd65450", 
	"instructors": [{"password": "123456", "sign_in": [], "sign_out": [], "annual_leave_balance": 2.5, 
	"accidential_leave_balance": 6, "total_hours_attended": 0, "missing_days": [], "_id": "5fdfb1ea740d3023c433f877", "id": "ac4",
	"name": "Mohamed", "email": "mohame12amh.com", "salary": 1, "office_loc": "c7-645", "day_off": "Saturday",
        "schedule": [], "__v": 0}], "slots": ["29439edd3", "33939didkd", "3iedjdnm3"], "__v": 0, "course_coordinator_id": "123"}


Functionality: view all the staff in his/her department with their profiles.
Route: /headOfDepartment/viewStaffAll
Request type: GET
Response: Array of staffs. 
	Example of one cell in array: {{"password": "123456", "sign_in": [], "sign_out": [], "annual_leave_balance": 2.5, 
	"accidential_leave_balance": 6, "total_hours_attended": 0, "missing_days": [], "_id": "5fdfb1ea740d3023c433f877", "id": "ac4",
	"name": "Mohamed", "email": "mohame12amh.com", "salary": 1, "office_loc": "c7-645", "day_off": "Saturday",
        "schedule": [], "__v": 0}}}


Functionality: view all the staff per course along with their profiles.
Route: /headOfDepartment/viewStaffCourse
Request type: GET
Request body: {"course_name": "csen701"}
Response: Array of staffs corresponding to course names. 
	Example of one cell in array: {"course_name": "csen701", "instructors": [{"password": "123456", "sign_in": [], "sign_out": [], 
	"annual_leave_balance": 2.5, "accidential_leave_balance": 6, "total_hours_attended": 0, "missing_days": [], 
	"_id": "5fdfb1ea740d3023c433f877", "id": "ac4", "name": "Mohamed", "email": "mohame12amh.com", "salary": 1, 
	"office_loc": "c7-645", "day_off": "Saturday", "schedule": [], "__v": 0}]}


Functionality: view the day off of all the staff in his/her department.
Route: /headOfDepartment/viewDayOffAll
Request type: GET
Response: Array of day offs with corresponding ac id. 
	Example of one cell in array: {"id": "ac-5", "day_off": "Saturday"}


Functionality: view the day off of a single staff in his/her department.
Route: /headOfDepartment/viewDayOffX
Request type: GET
Request body: {"id": "ac-5"}
Response: {"day_off": "Saturday"}


Functionality: view all the requests "change day off/leave" sent by staff members in his/her department.
Route: /headOfDepartment/viewRequests
Request type: GET
Response: Array of requests. 
	Example of request: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "compensation leave", 
	"sender_id": "204030303de4", "receiver_id": "5fe395cbdd9d60134cd253b8", "reason": "was sick",
        "dayComp": "2021-10-13T09:13:00.000Z", "__v": 0}


Functionality: accept a request. if a request is accepted, appropriate logic should be executed to handle
this request.
Route: /headOfDepartment/acceptRequest
Request type: POST
Request body: {"id": "5fe5e4c0750d936ee4b3e4c1"} 
Response: {"status": "Accepted", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "compensation leave", 
	"sender_id": "204030303de4", "receiver_id": "5fe395cbdd9d60134cd253b8", "reason": "was sick",
        "dayComp": "2021-10-13T09:13:00.000Z", "__v": 0}


Functionality: reject a request, and optionally leave a comment as to why this request was rejected.
Route: /headOfDepartment/rejectRequest
Request type: POST
Request body: {"id": "5fe5e4c0750d936ee4b3e4c1", "reject_reason": "because"}
Response: {"status": "Rejected", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "compensation leave", 
	"sender_id": "204030303de4", "receiver_id": "5fe395cbdd9d60134cd253b8", "reason": "was sick", 
	"reject_reason": "because", "dayComp": "2021-10-13T09:13:00.000Z", "__v": 0}


Functionality: view the coverage of each course in his/her department.
Route: /headOfDepartment/viewCoverage
Request type: GET
Request body: {"course_name": "Math"}
Response: {"coverage": 0.5}


Functionality: view teaching assignments (which staff members teach which slots) of course offered by his department.
Route: /headOfDepartment/viewAssignments
Request type: GET
Response: Array of course ids and corresponding slots (include slot details and staff member that teaches it)
	Example of slot: {"slot_number": "3", "location": "345533s45f5f3", "day": "Saturday", "time": "11:45", "academic_member_id": String,
    	"status: "unassigned", "course_id": "String}

//Course coordinator

Add_Slot Functionality: Course coordinator adds a slot to the system. Route: /coursecoordinator/AddSlot Request type: POST Request body: { "slot_number" : 1, "location" : "C", "day" : "Monday", "course_id" : "5fe245768ec4822e44499250" } Response: msg: “Slot added.”

Update_Slot Functionality: Course coordinator updates a slot on the system. Route: /coursecoordinator/UpdateSlot Request type: POST Request body: { "slot_number" : 1, "location" : "C", "day" : "Monday", "course_id" : "5fe245768ec4822e44499250",

"new_slot_number" : 2, 
"new_location" : "D",
"new_day" : "Tuesday"
                     }
Response: msg: “Slot updated.”

Delete_Slot Functionality: Course coordinator deletes a slot from the system. Route: /coursecoordinator/DeleteSlot Request type: DELETE Request body: { "slot_number" : 2, "location" : "D", "day" : "Tuesday", "course_id" : "5fe245768ec4822e44499250" } Response: msg: “Removed successfully”

View_Requests Functionality: Course coordinator views his/her requests. Route: /coursecoordinator/ViewRequests Request type: GET Response: [ { "status": "Pending", "_id": "5fe4e14fdb423168510f93d6", "type": "slot_linking", "sender_id": "3344", "receiver_id": "5fdfb1ea740d3023c433f877", "date_to_be_requested": "2002-12-11T22:00:00.000Z", "slot_id": "5fe38c26ca2b843880c027dd", "reason": "Sick", "dayOffReq": "10", "dayComp": "2003-10-09T22:00:00.000Z" } ]

Accept_Request Functionality: Course coordinator accepts a request which changes request status to accepted and adds the slot to the academic member’s schedule. Route: /coursecoordinator/AcceptRequest Request type: POST Request body: { "request_id" : "5fe4e14fdb423168510f93d6" } Response: msg: “Request status updated!”

Reject_Request Functionality: Course coordinator rejects a request which changes request status to rejected. Route: /coursecoordinator/RejectRequest Request type: POST Request body: { "request_id" : "5fe4e14fdb423168510f93d6" } Response: msg: “Request status updated!”


// ACADEMIC MEMEBER

Functionality: view their schedule. Schedule should show teaching activities and replacements if present.
Route: localhost:8080/academicMember/viewSchedule
Request type: GET
Response: schedule is an array of slots and replacements were already added to schedule
	Example of slot: {"slot_number": "3", "location": "345533s45f5f3", "day": "Saturday", "time": "11:45", "academic_member_id": String,
    	"status: "unassigned", "course_id": "String}
	Example: {"Schedule": [slots]}


Functionality: send "replacement" request(s).
Route: localhost:8080/academicMember/replacementReq
Request type: POST
Request body: {"receiver_id": "ac-3", "date_to_be_requested": "2021-10-13T09:13:00.000Z", "slot_id": "5fe5e4c0750d936ee4b3e4c1"}
Response: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "replacement", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "date_to_be_requested": "2021-10-13T09:13:00.000Z"}


Functionality: view "replacement" request(s).
Route: localhost:8080/academicMember/viewReplacementReq
Request type: GET
Response: Array of "replacement requests"
	Example of replacement request: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "replacement", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "date_to_be_requested": "2021-10-13T09:13:00.000Z"}


Functionality: send a "slot linking" request (automatically sent to course coordinator). A "slot linking" request is a request done 
by the academic member to indicate their desire to teach a slot.
Route: localhost:8080/academicMember/slotLinkingReq
Request type: POST
Request body: {"dateReq": "2021-10-13T09:13:00.000Z", "slot_id": "5fe5e4c0750d936ee4b3e4c1"}
Response: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "slot linking", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "dateReq": "2021-10-13T09:13:00.000Z"}


Functionality: change their day off by sending a "change day off" request (automatically sent to HOD), and optionally leave a reason.
Route: localhost:8080/academicMember/dayOffReq
Request type: POST
Request body: {"newDayOff": "Saturday", "reason": "because"}
Response: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "change day off", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "newDayOff": "Saturday", "reason": "because"}


Functionality: submit a "compensation leave" request (automatically sent to HOD). "Compensation" leave must have a reason. 
Route: localhost:8080/academicMember/compLeaveReq
Request type: POST
Request body: {"dayAbsent": "2021-10-13T09:13:00.000Z", "dayComp": "2021-10-17T09:13:00.000Z", "reason": "because"}
Response: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "compensation leave", "dayComp": "2021-10-17T09:13:00.000Z",
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "date_to_be_requested": "2021-10-13T09:13:00.000Z", "reason": "because"}


Functionality: submit a "maternity leave" request (automatically sent to HOD).
Route: localhost:8080/academicMember/maternityLeaveReq
Request type: POST
Request body: {"absentDate": "2021-10-13T09:13:00.000Z", "reason": "because"}
Response: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "maternity leave", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "date_to_be_requested": "2021-10-13T09:13:00.000Z", "reason": "because"}


Functionality: submit a "accidental leave" request (automatically sent to HOD).
Route: localhost:8080/academicMember/acciLeaveReq
Request type: POST
Request body: {"absentDate": "2021-10-13T09:13:00.000Z", "reason": "because"}
Response: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "accidental leave", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "date_to_be_requested": "2021-10-13T09:13:00.000Z", "reason": "because"}


Functionality: submit a "annual leave" request (automatically sent to HOD).
Route: localhost:8080/academicMember/annualLeaveReq
Request type: POST
Request body: {"absentDate": "2021-10-13T09:13:00.000Z", "reason": "because"}
Response: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "annual leave", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "date_to_be_requested": "2021-10-13T09:13:00.000Z", "reason": "because"}


Functionality: submit a "sick leave" request (automatically sent to HOD).
Route: localhost:8080/academicMember/sickLeaveReq
Request type: POST
Request body: {"absentDate": "2021-10-13T09:13:00.000Z", "reason": "because"}
Response: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "sick leave", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "date_to_be_requested": "2021-10-13T09:13:00.000Z", "reason": "because"}


Functionality: view the status of all submitted requests.
Route: localhost:8080/academicMember/viewReqStatus
Request type: GET
Response: Array of request ids with their status
	Example: {["status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1"], [....]}


Functionality: view only the accepted requests.
Route: localhost:8080/academicMember/viewAcceptedReq
Request type: GET
Response: Array of accepted requests
	Example of request: {"status": "Accepted", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "replacement", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "date_to_be_requested": "2021-10-13T09:13:00.000Z"}


Functionality: view only the pending requests.
Route: localhost:8080/academicMember/viewPendingReq
Request type: GET
Response: Array of pending requests
	Example of request: {"status": "Pending", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "replacement", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "date_to_be_requested": "2021-10-13T09:13:00.000Z"}


Functionality: view only the rejected requests.
Route: localhost:8080/academicMember/viewRejectedReq
Request type: GET
Response: Array of rejected requests
	Example of replacement request: {"status": "Rejected", "_id": "5fe5e4c0750d936ee4b3e4c1", "type": "replacement", 
	"sender_id": "204030303de4", "receiver_id": "5fe5e4c0750d936ee4b3e4c1", "date_to_be_requested": "2021-10-13T09:13:00.000Z"}


Functionality: cancel a still pending request or a request whose day is yet to come.
Route: localhost:8080/academicMember/cancelReq
Request type: POST
Request body: {"reqId": "5fe5e4c0750d936ee4b3e4c1"}
Response: "Request cancelled"