include ActionDispatch::TestProcess

FactoryGirl.define do

  sequence(:email) { |e| "Email#{e}@email.com" }

  factory :advisor do
    
    first_name 'Advisor'
    last_name 'Smith'
    email
    password 'password'
    is_admin true

    trait(:non_admin) do
      is_admin false
    end
    
  end
end
