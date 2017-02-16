NUM_ADVISORS = 3
NUM_STUDENTS = 1
NUM_COURSES = 5
NUM_CATEGORIES = 4
NUM_MEETINGS = 3
NUM_CONCENTRATIONS = 2
NUM_TEACHERS = 4
NUM_FOREIGN_COURSES = 2
TERMS = ['SPRING', 'SUMMER', 'FALL', 'ANY']
LOREM = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos reiciendis doloremque, tenetur nulla illo eaque, qui excepturi assumenda aspernatur praesentium quo cumque sint repellat natus.'

puts 'Destroying...'
puts 'advisors'
Advisor.destroy_all
puts 'students'
Student.destroy_all
puts 'plans'
Plan.destroy_all
puts 'courses'
Course.destroy_all
puts 'thesis tracks'
ThesisTrack.destroy_all
puts 'non thesis tracks'
NonThesisTrack.destroy_all
puts 'terms'
Term.destroy_all
puts 'sessions'
Session.destroy_all
puts 'meetings'
Meeting.destroy_all
puts 'concentrations'
Concentration.destroy_all
puts 'degrees'
Degree.destroy_all
puts 'teachers'
Teacher.destroy_all
puts 'categories'
Category.destroy_all
puts 'foreign courses'
ForeignCourse.destroy_all

puts 'creating terms'
TERMS.each do |term|
  Term.create({ name: term })
end

puts 'creating sessions'
['1', '2', '3', '4'].each do |session|
  Session.create({ name: session })
end

puts 'creating admin'
Advisor.create({
  email: 'admin@gial.edu',
  first_name: 'Admin',
  last_name: 'Admin',
  password: 'adminpass',
  password_confirmation: 'adminpass',
  is_admin: true
})

puts 'creating advisors'
NUM_ADVISORS.times do |num|
  advisor = Advisor.create({
    email: "advisor#{num}@gial.edu",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    password: 'password',
    password_confirmation: 'password',
    is_admin: false
  })

  puts 'creating student for an advisor'
  advisor.students.create({
    email: "student#{num}@gial.edu",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  })
end

puts 'creating courses'
require 'csv'
csv_text = File.read(Rails.root.join('lib', 'seeds', 'world-arts-courses.csv'))
csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')
csv.each do |row|
  course = Course.create({
    number: row['Category'] + row['Number'],
    name: row['Name'],
    level: row['Course Level'],
    units: row['Credit Hours'],
    term: Term.find_by(name: row['Course Term'].upcase),
  })
  unless row['Sessions'].nil?
    session_names = row['Sessions'].split(',')
    session_names.each do |session_name|
      course.sessions << Session.find_by(name: session_name)
    end
  end
end

puts 'creating degree'
degree = Degree.create({
  name: 'MA with Major in World Arts',
  description: LOREM
})

def addCoursesToCategory(category, courses)
  courses.each do |course_name|
    course = Course.find_by(name: course_name)
    if course.nil?
      puts "Cannot find " + course_name
      next
    else
      category.courses << course
    end
  end
end

puts 'creating concentrations, categories, and thesis/non-thesis tracks'
conc = degree.concentrations.create({
  name: "Applied Arts",
  description: LOREM
})
  cat = conc.categories.create({
    name: "Arts analysis specialization",
    required_units: 6
  })
  addCoursesToCategory(cat, [
    "Oral Tradition and Literature",
    "Song Transcription and Analysis",
    "Advanced Form Analysis",
    "Discourse Analysis",
  ])
  cat = conc.categories.create({
    name: "Application domain courses",
    required_units: 6
  })
  addCoursesToCategory(cat, [
    "Contextualization Issues Among Muslim Peoples",
    "Principles of Literacy",
    "Principles of Multilingual Education",
    "Language Development and Planning",
    "Scripture Engagement Strategy and Methods",
    "Language Survey Methods",
    "Theories and Practices in Community Development",
    "Religion and Worldview",
    "Christianity Across Cultures",
    "Arts and Trauma Healing",
    "Training Across Cultures",
    "Theory and Practice of Translation",
    "Language Documentation",
  ])
  thesis = conc.create_thesis_track({
    thesis_hours: 6,
    elective_hours: 3
  })
  thesis.courses << Course.thesis_writing
  thesis.courses << Course.thesis_course
  conc.create_non_thesis_track({
    elective_hours: 9
  })
conc = degree.concentrations.create({
  name: "Arts & Islam",
  description: LOREM
})
  cat = conc.categories.create({
    name: "Arts analysis specialization",
    required_units: 6
  })
  addCoursesToCategory(cat, [
    "Oral Tradition and Literature",
    "Song Transcription and Analysis",
    "Advanced Form Analysis",
    "Discourse Analysis",
  ])
  cat = conc.categories.create({
    name: "Application domain courses",
    required_units: 3
  })
  addCoursesToCategory(cat, [
    "Principles of Literacy",
    "Principles of Multilingual Education",
    "Scripture Engagement Strategy and Methods",
    "Theories and Practices in Community Development",
    "Religion and Worldview",
    "Christianity Across Cultures",
    "Arts and Trauma Healing",
    "Training Across Cultures",
  ])
  cat = conc.categories.create({
    name: "Concentration-specific courses",
    required_units: 6
  })
  addCoursesToCategory(cat, [
    "Core Components of Islam",
    "Contextualization Issues Among Muslim Peoples",
  ])
  conc.create_non_thesis_track({
    elective_hours: 6
  })
conc = degree.concentrations.create({
  name: "Arts & Scripture Engagement",
  description: LOREM
})
  cat = conc.categories.create({
    name: "Arts analysis specialization",
    required_units: 6
  })
  addCoursesToCategory(cat, [
    "Oral Tradition and Literature",
    "Song Transcription and Analysis",
    "Advanced Form Analysis",
    "Discourse Analysis",
  ])
  cat = conc.categories.create({
    name: "Application domain courses",
    required_units: 3
  })
  addCoursesToCategory(cat, [
    "Contextualization Issues Among Muslim Peoples",
    "Principles of Literacy",
    "Principles of Multilingual Education",
    "Language Development and Planning",
    "Theories and Practices in Community Development",
    "Training Across Cultures",
    "Theory and Practice of Translation",
  ])
  cat = conc.categories.create({
    name: "Concentration-specific courses",
    required_units: 9
  })
  addCoursesToCategory(cat, [
    "Scripture Engagement Strategy and Methods",
    "Current Issues in Scripture Engagement",
    "Culture Change & Minority Cultures",
  ])
  cat = conc.categories.create({
    name: "Choose one of the following",
    required_units: 3
  })
  addCoursesToCategory(cat, [
    "Religion and Worldview",
    "Christianity Across Cultures",
    "Arts and Trauma Healing",
  ])
  conc.create_non_thesis_track({
    elective_hours: 6
  })
conc = degree.concentrations.create({
  name: "Linguistics",
  description: LOREM
})
  cat = conc.categories.create({
    name: "Concentration-specific courses",
    required_units: 12
  })
  addCoursesToCategory(cat, [
    "Field Methods",
    "Field Data Management",
    "Discourse Analysis",
    "Semantic & Pragmatics",
  ])
  cat = conc.categories.create({
    name: "Choose one of the following",
    required_units: 3
  })
  addCoursesToCategory(cat, [
    "Theory and Practice of Translation",
    "Oral Tradition and Literature",
    "Principles of Literacy",
    "Scripture Engagement Strategy and Methods",
  ])
  thesis = conc.create_thesis_track({
    thesis_hours: 6,
    elective_hours: 0
  })
  thesis.courses << Course.thesis_writing
  thesis.courses << Course.thesis_course
  conc.create_non_thesis_track({
    elective_hours: 6
  })

puts 'creating meetings through courses'
Course.all.each do |course|
  course.create_meetings
end

puts 'creating and adding teachers to meetings'
NUM_TEACHERS.times do |num|
  teacher = Teacher.create({
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    title: Faker::Name.prefix
  })

  Course.all.sample.permitting_teachers << teacher
  Meeting.all.sample.teachers << teacher
end

puts 'creating foreign courses'
NUM_FOREIGN_COURSES.times do |num|
  foreign_course = ForeignCourse.create({
    name: "#{Faker::Music.instrument} 30#{num}",
    number: "FC400#{num}",
    units: 3
  })

  if num.even?
    puts 'adding foreign course as prereq'
    Course.all.sample.foreign_courses \
      << foreign_course
  end
end

puts 'creating plans through students'
Student.all.each do |student|

  plan = student.create_plan({
    graduation_year: 2020,
    graduation_term: 'SPRING',
    degree_id: degree.id
  })

  3.times do |num|
    puts 'adding intended course to plan'
    intended = Course.all.sample
    plan.intended_courses << intended
    if num.even?
      puts 'adding scheduled course to plan'
      plan.scheduled_classes << intended.meetings.sample
    end
    completed = Course.all.sample
    break if completed == intended
    puts 'adding completed course to plan'
    plan.completed_courses << completed
  end

  puts 'adding foreign course to plan'
  plan.foreign_courses << ForeignCourse.all.sample
end

puts 'creating on-track student'
on_track = Student.last.plan
on_track.concentration = Concentration.last
on_track.completed_courses << Course.thesis_writing
on_track.scheduled_classes << Course.thesis_writing.meetings.first
on_track.save


# degree
# terms
# sessions
# advisor
# student
# courses
# concentrations
# non-thesis
# thesis
# categories
# foreign courses
# meetings
# plans
