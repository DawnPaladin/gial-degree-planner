FactoryGirl.define do

  factory :advisor do
    first_name "Dr."
    last_name "Phil"
    email "dr@phil.com"
    password "password"
    is_admin false
  end  

end
