json.extract! @plan, *@plan.attributes.keys

json.intended_courses @plan.intended_courses
json.completed_courses @plan.completed_courses
json.required_courses @plan.required_courses

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
  if @plan.concentration.thesis_track
    json.thesis_track do
      json.extract! @plan.concentration.thesis_track, *@plan.concentration.thesis_track.attributes.keys
      json.courses @plan.concentration.thesis_track.courses
    end
  end
  json.non_thesis_track do
    json.extract! @plan.concentration.non_thesis_track, *@plan.concentration.non_thesis_track.attributes.keys
  end
  json.elective_courses do
    json.array! @plan.electives do |elective|
      json.extract! elective.course, *elective.course.attributes.keys
      json.category_name elective.category_name
      json.elective_id elective.id
      json.completed elective.completed
      json.intended elective.intended
    end
  end
end
