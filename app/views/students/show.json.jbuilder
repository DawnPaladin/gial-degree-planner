json.extract! @student, *@student.attributes.keys
json.advisor @student.advisor
json.plan do
  json.extract! @plan, *@plan.attributes.keys
  json.courses @plan.courses
  json.term = @term
  json.degree do
    json.name @degree.name
    json.description @degree.description
    json.concentrations @degree.concentrations
  end
end
