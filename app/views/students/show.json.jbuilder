json.extract! @student, *@student.attributes.keys
json.plan do
  json.extract! @plan, *@plan.attributes.keys
  json.term = @term
  json.courses @plan.courses
  json.degree do
    json.name @degree.name
    json.description @degree.description
    json.concentrations @degree.concentrations
  end
end