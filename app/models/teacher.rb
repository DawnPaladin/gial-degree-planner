class Teacher < ApplicationRecord

  has_many :teacher_permissions
  has_many :permissable_courses, through: :teacher_permissions,
           source: :course

  has_many :meetings_teachers
  has_many :meetings, :through :meetings_teachers

end
