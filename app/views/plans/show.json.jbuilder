json.extract! @plan, *@plan.attributes.keys

json.intended_courses @plan.intended_courses

json.completed_courses @plan.completed_courses

json.required_courses @plan.required_courses do |required_course|
  json.extract! required_course, *required_course.attributes.keys
  json.term required_course.term
  json.sessions required_course.sessions
end

json.scheduled_classes @plan.scheduled_classes

json.years Year.includes({ terms: { courses: [:term, :sessions]}}) do |year|
  json.id year.id
  json.value year.value
  json.terms year.terms.get_all do |term|
    json.id term.id
    json.name term.name
    json.courses do
      json.array! @plan.find_scheduled_classes(year, term) do |course|
        json.extract! course, *course.attributes.keys
        json.term course.term
        json.sessions course.sessions
      end
    end        
  end
end

if @plan.concentration
  json.concentration @plan.concentration.name
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
      json.courses @plan.concentration.thesis_track.courses do |course|
        json.extract! course, *course.attributes.keys
        json.term course.term
      end
    end
  end
  json.non_thesis_track do
    json.extract! @plan.concentration.non_thesis_track, *@plan.concentration.non_thesis_track.attributes.keys
  end
  json.elective_courses do
    json.array! @plan.electives do |elective|
      json.extract! elective.course, *elective.course.attributes.keys
      json.term elective.course.term
      json.sessions elective.course.sessions
      json.category_name elective.category_name
      json.elective_id elective.id
      json.completed elective.completed
      json.intended elective.intended
    end
  end
end
