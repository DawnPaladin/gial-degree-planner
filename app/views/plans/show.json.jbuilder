json.extract! @plan, *@plan.attributes.keys

json.intended_courses @plan.intended_courses
json.completed_courses @plan.completed_courses
json.required_courses @plan.required_courses do |required_course|
  json.id required_course.id
  json.name required_course.name
  json.number required_course.number
  json.term required_course.term
  json.sessions required_course.sessions
end

if @plan.concentration
  json.available_courses @plan.concentration.categories do |category|
    json.id  category.id
    json.name  category.name
    json.required_units category.required_units
    json.courses do
      json.array! category.courses do |course|
        json.extract! course, *course.attributes.keys
        json.term course.term
        json.sessions course.sessions
      end
    end
  end
end
