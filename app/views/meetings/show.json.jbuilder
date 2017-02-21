json.extract! @meeting, *@meeting.attributes.keys
json.sessions @meeting.sessions
json.enrollment_count @meeting.enrollments.count
json.course @meeting.course