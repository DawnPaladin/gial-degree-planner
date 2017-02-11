class Teacher < ApplicationRecord

  has_many :teacher_permissions, dependent: :destroy
  has_many :permissable_courses, through: :teacher_permissions,
           source: :course

  has_many :meetings_teachers, dependent: :destroy
  has_many :meetings, through: :meetings_teachers

end
