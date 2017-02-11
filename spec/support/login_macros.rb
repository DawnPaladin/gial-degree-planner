module LoginMacros

  def sign_in(advisor)
    visit root_path
    fill_in('Email', with: advisor.email)
    fill_in('Password', with: advisor.password)
    find('input[type="submit"]').click
  end

end
