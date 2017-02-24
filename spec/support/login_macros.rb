module LoginMacros

  def sign_in(advisor)
    visit root_path
    fill_in('Email', with: advisor.email)
    fill_in('Password', with: advisor.password)
    find('input[type="submit"]').click
  end

  def fill_out_sign_up(advisor)
    fill_in('advisor_first_name', with: advisor.first_name)
    fill_in('advisor_last_name', with: advisor.last_name)
    fill_in('advisor_email', with: advisor.email)
    fill_in('advisor_password', with: advisor.password)
    fill_in('advisor_password_confirmation', with: advisor.password)
    if advisor.is_admin
      check('advisor_is_admin')
    end
  end

  def sign_up(advisor)
    fill_in('advisor_first_name', with: advisor.first_name)
    fill_in('advisor_last_name', with: advisor.last_name)
    fill_in('advisor_email', with: advisor.email)
    fill_in('advisor_password', with: advisor.password)
    fill_in('advisor_password_confirmation', with: advisor.password)
    if advisor.is_admin
      check('advisor_is_admin')
    end
    click_on('Create Advisor')
  end

end
