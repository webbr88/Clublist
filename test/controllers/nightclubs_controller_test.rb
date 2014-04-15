require 'test_helper'

class NightclubsControllerTest < ActionController::TestCase
  setup do
    @nightclub = nightclubs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:nightclubs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create nightclub" do
    assert_difference('Nightclub.count') do
      post :create, nightclub: { address: @nightclub.address, name: @nightclub.name, phone_number: @nightclub.phone_number }
    end

    assert_redirected_to nightclub_path(assigns(:nightclub))
  end

  test "should show nightclub" do
    get :show, id: @nightclub
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @nightclub
    assert_response :success
  end

  test "should update nightclub" do
    patch :update, id: @nightclub, nightclub: { address: @nightclub.address, name: @nightclub.name, phone_number: @nightclub.phone_number }
    assert_redirected_to nightclub_path(assigns(:nightclub))
  end

  test "should destroy nightclub" do
    assert_difference('Nightclub.count', -1) do
      delete :destroy, id: @nightclub
    end

    assert_redirected_to nightclubs_path
  end
end
