json.extract! @meeting, *@meeting.attributes.keys
json.sessions @meeting.sessions
json.enrollment_count @meeting.enrollments.count
json.teachers_attributes @meeting.teachers
json.course do 
  json.extract! @meeting.course, *@meeting.course.attributes.keys
  json.full_name @meeting.course.full_name
end