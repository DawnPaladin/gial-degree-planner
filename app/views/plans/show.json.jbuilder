json.extract! @plan, *@plan.attributes.keys

json.intended_courses do
  json.array! @plan.intended_courses do |intended|
    json.extract! intended, *intended.attributes.keys
    json.term intended.term
    json.sessions intended.sessions
  end
end

json.completed_courses do
  json.array! @plan.completed_courses do |completed|
    json.extract! completed, *completed.attributes.keys
    json.term completed.term
    json.sessions completed.sessions
  end
end

json.required_courses @plan.required_courses

if @plan.concentration
  json.available_courses @plan.concentration.categories do |category|
   json.id  category.id
   json.name  category.name
  json.required_units category.required_units
  json.courses category.courses
  end
end
