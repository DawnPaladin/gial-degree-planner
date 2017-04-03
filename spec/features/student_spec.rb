require 'rails_helper'


feature 'Create student' do

  let(:advisor){ create(:advisor) }

  before do
    sign_in(advisor)
    visit angular_app_index_path
  end

  context 'on students page', :students do
    scenario 'open page', js: true do
      expect(advisor.is_admin).to be_truthy
      click_button('new-student-button')
      fill_in('First name', with: 'Misha')
      fill_in('Last name', with: 'Testovich')
      within(:css, '.create-student-button') do
        find('input').click
      end
      # click_on('Create student')
      within(:css, '.unarchived-students') do
        expect(page).to have_content('Misha')
        expect(page).to have_content('Testovich')
      end
      save_and_open_page
    end
  end

end
