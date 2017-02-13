include ActionDispatch::TestProcess

FactoryGirl.define do
  factory :advisor do
    
    first_name 'Advisor'
    last_name 'Smith'
    sequence(:email) { |n| "advisor#{n}@gial.edu"}
    password 'password'
    is_admin false

    trait(:admin) do
      is_admin true
    end
  end
end
