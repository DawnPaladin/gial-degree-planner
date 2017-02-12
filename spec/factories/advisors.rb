FactoryGirl.define do

  sequence(:email) { |e| "Email#{e}@email.com" }

  factory :advisor do
    first_name "Dr."
    last_name "Phil"
    email
    password "password"
    is_admin true
  end  

end
