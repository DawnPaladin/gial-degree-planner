json.extract! @degree, *@degree.attributes.keys

json.required_courses @degree.required_courses
