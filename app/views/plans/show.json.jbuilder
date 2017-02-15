json.extract! @plan, *@plan.attributes.keys
json.intended_courses @plan.intended_courses
json.completed_courses @plan.completed_courses
json.required_courses @plan.required_courses
if @plan.concentration
  json.available_courses @plan.concentration.categories do |category|
    json.id category.id
    json.name category.name
    json.courses category.courses
  end
end
json.course_groupings @plan.course_groupings