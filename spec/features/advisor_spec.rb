require 'rails_helper'


feature 'Advisor log in' do

  let(:advisor){ create(:advisor) }

  before do
    visit root_path
  end


  context 'Before logging in' do

    scenario 'defaults to log in path' do
      expect(current_path).to eq(new_advisor_session_path)
    end

    context 'Trying to visit another page' do

      before do
        visit angular_app_index_path
      end

      scenario 'redirects to sign in page when accessing url and not signed in' do
        expect(current_path).to eq(new_advisor_session_path)
      end

      scenario 'renders a flash when accessing url and not signed in' do
        expect(page).to have_css('#flash')
      end

    end

  end


  context 'When logging in correctly' do

    before do
      sign_in(advisor)
    end

    scenario 'redirects to root path' do
      expect(current_path).to eq(root_path)
    end

  end


  context 'When logging in with incorrect credentials' do

    before do
      fill_in('Email', with: advisor.email)
      fill_in('Password', with: "not password")
      find('input[type="submit"]').click
    end

    scenario 'remains on the sign in page' do
      expect(current_path).to eq(new_advisor_session_path)
    end

    scenario 'renders a flash' do
      expect(page).to have_css('#flash')
    end

  end


end



feature 'Advisor creation' do

  let(:advisor) { create(:advisor) }

  before do
    sign_in(advisor)
    click_link "Edit Advisors"
    find('#add-advisor').click
  end


  context 'When signing up a new advisor with correct credentials' do

    let(:new_advisor) { build(:advisor) }

    before do
      fill_out_sign_up(new_advisor)
    end

    scenario 'it creates a new advisor', js: true do
      expect { click_on('Sign up') }.to change(Advisor, :count).by(1)
    end

  end


  context 'When signing up a new advisor with correct credentials' do

    let(:new_advisor) { build(:advisor, is_admin: false) }

    before do
      sign_up(new_advisor)
    end

    scenario 'it redirects to the root path', js: true do
      expect(current_path).to eq(root_path)
    end

    scenario 'it renders a flash message', js: true do
      expect(page).to have_css('#flash')
    end

    scenario 'it does not log in as the newly signed up advisor', js: true do
      click_on('Edit my account settings')
      email = find_field('Email').value
      expect(email).to_not eq(new_advisor.email)
      expect(email).to eq(advisor.email)
    end

  end


  context 'When signing up a new admin with correct credentials' do

    let(:new_admin) { build(:advisor) }

    before do
      sign_up(new_admin)
    end

    scenario 'it redirects to the root path', js: true do
      expect(current_path).to eq(root_path)
    end

    scenario 'it renders a flash message', js: true do
      expect(page).to have_css('#flash')
    end

  end


end



feature 'Advisor logout' do

  let(:advisor){ create(:advisor) }

  before do
    sign_in(advisor)
  end

  context 'when logging out' do

    before do
      click_on('Sign Out')
    end

    scenario 'it redirects to the log in page', js: true do
      expect(current_path).to eq(new_advisor_session_path)
    end

    scenario 'it renders a flash message', js: true do
      expect(page).to have_css('#flash')
    end

  end

end



feature 'Advisor deletion' do

  context 'when deleting another advisor' do

    let(:advisor){ create(:advisor) }
    let(:other_advisor) { create(:advisor) }

    before do
      sign_in(advisor)
      other_advisor
      click_on('View advisors')
      execute_script('$("a[data-confirm]").removeAttr("data-confirm")');
    end

    scenario 'it deletes the advisor', js: true do
      expect{ click_on('Delete') }.to change(Advisor, :count).by(-1)
    end

    scenario 'it renders a flash message', js: true do
      click_on('Delete')
      expect(page).to have_css('#flash')
    end

    scenario 'it remains on the advisors index page', js: true do
      click_on('Delete')
      expect(current_path).to eq(advisors_path)
    end

  end

  context 'when attempting to delete own account' do

    let(:advisor){ create(:advisor) }

    before do
      sign_in(advisor)
      click_on('View advisors')
    end

    scenario 'it does not display a delete link', js: true, test_me: true do

      within(:css, "td:last-child") do
        expect(page).to_not have_content('Delete')
      end
    end

  end

end
