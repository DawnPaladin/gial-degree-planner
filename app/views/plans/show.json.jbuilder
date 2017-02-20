json.extract! @plan, *@plan.attributes.keys

json.intended_courses @plan.intended_courses

json.completed_courses @plan.completed_courses

json.required_courses @plan.required_courses do |required_course|
  json.extract! required_course, *required_course.attributes.keys
  json.term required_course.term
  json.sessions required_course.sessions
end

json.scheduled_classes @plan.scheduled_classes

json.years Year.all do |year|
  json.id year.id
  json.value year.value
  json.terms year.terms.get_all do |term|
    json.id term.id
    json.sessions term.sessions do |session|
      json.id session.id
      json.courses do
        json.array! @plan.find_scheduled_classes(year, term, session) do |course|
          json.extract! course, *course.attributes.keys
          json.term course.term
          json.sessions course.sessions
        end
      end        
    end
  end
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
