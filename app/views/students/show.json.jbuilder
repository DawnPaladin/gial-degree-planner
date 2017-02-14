json.extract! @student, *@student.attributes.keys
json.degree do
  json.name @degree.name
  json.description @degree.description
  json.concentrations @degree.concentrations
end