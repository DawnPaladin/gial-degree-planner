json.array! @students do |student|
  json.first_name student.first_name
  json.last_name student.last_name
  json.id student.id
  if student.plan && student.plan.concentration
    json.concentration student.plan.concentration.name
    json.thesis_starts student.plan.thesis_starts
    json.graduation_date student.plan.graduation_term.titleize + ' ' + student.plan.graduation_year.to_s
  end
end
