json.extract! @concentration, *@concentration.attributes.keys
json.degree do
  json.name @degree.name
  json.required_courses do
    json.array! @required_courses
  end
end
json.categories @categories do |category|
  json.extract! category, :name, :required_units, :id
  json.courses do
    json.array! category.courses
  end
end
json.thesis_track @concentration.thesis_track
json.non_thesis_track = @concentration.non_thesis_track
