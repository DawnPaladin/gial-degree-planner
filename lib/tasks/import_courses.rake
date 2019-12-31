desc "Import courses from a CSV into the database"
task import_courses: [:environment] do
	CSV_PATH = Rails.root.join('lib', 'seeds', '2020-world-arts-courses.csv')
	
	require 'csv'
	csv_text = File.read(CSV_PATH)
	csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')
	csv.each do |row|
		course = Course.new({
			number: row['Course #'],
			name: row['Course Name'],
			level: 'Graduate',
			units: 3,
		})
		course.terms << Term.find_by(name: 'Spring') if row['S'] == 'S'
		course.terms << Term.find_by(name: 'Summer') if row['M'] == 'Sm'
		course.terms << Term.find_by(name: 'Fall') if row['F'] == 'F'
		course.terms << Term.find_by(name: 'May') if row['M'] == 'M'
		course.terms << Term.find_by(name: 'May Extended') if row['M'] == 'ME'
		
		if course.save
			puts "Saved " + row['Course Name']
		else
			puts course.errors.full_messages
		end
	end
end
