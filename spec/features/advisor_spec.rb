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
      fill_in('Email', with: advisor.email)
      fill_in('Password', with: advisor.password)
      find('input[type="submit"]').click
    end

    scenario 'redirects to root path' do
      expect(current_path).to eq(root_path)
    end

    scenario 'renders a flash' do
      expect(page).to have_css('#flash')
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