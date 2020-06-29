Rails.application.routes.draw do
  resources :orders do 
    resources :photos, controller: "photos"
  end

  resources :credentials, only: [:index]
end
