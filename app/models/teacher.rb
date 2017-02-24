class Teacher < ApplicationRecord

  has_many :teacher_permissions, dependent: :destroy
  has_many :permission_courses, through: :teacher_permissions,
           source: :course

  has_many :meetings_teachers, dependent: :destroy
  has_many :meetings, through: :meetings_teachers

  before_save :titleize_name

  def titleize_name
    self.first_name = self.first_name.titleize if self.first_name
    self.last_name = self.last_name.titleize if self.last_name
  end

end
